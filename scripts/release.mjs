#!/usr/bin/env node
/**
 * 发布流程脚本化——与根 README「发布流程」的手工步骤一一对应：
 *
 *   node scripts/release.mjs --preflight
 *       只跑本地预检：工作树干净、当前在 main、main 与 origin/main 对齐、
 *       三包版本可解析、ui 的 peer 下限能被本次要发的 hooks 版本满足。
 *       不联网（不 fetch，比对本地记住的 origin/main）、不构建。
 *
 *   node scripts/release.mjs
 *       预检 + hooks → ui → pro 依次「测试 → dry-run」。测试显式跑 `pnpm --filter <包> test`
 *       （包级 prepublishOnly 只有 build，不含测试），dry-run 再触发包级构建并列出
 *       将要上传的文件清单，相当于把正式发布排练一遍（README 第 0–1 步）。
 *
 *   node scripts/release.mjs --publish [--otp=123456] [--no-tag]
 *       正式发布（README 第 2–4 步）：每包先测试再发布，发一个立刻核对注册表版本；
 *       全部发完后做消费者侧 ESM 复验（比手工流程多验 pro 的具名导出）；
 *       最后按 ui 的版本打附注标签并推送。
 *
 *   --from=<包名>：从指定包开始断点续跑，其之前的包只核对注册表不重发。
 *       用于发布中断后（如 CDN 核对超时但包实际已入库）的场景。
 *
 * 为什么顺序固定 hooks → ui → pro：ui 的 peer 指向 hooks、pro 的 peer 指向 ui 与
 * hooks，反过来发会出现「peer 指向注册表上还不存在的版本」的窗口。
 */
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

const REPO = path.resolve(import.meta.dirname, '..');
const VERIFY_DIR = '/tmp/verify';

// 发布顺序固定：被依赖的先发。
const PACKAGES = [
    { name: '@xiaoye-react/hooks', dir: 'packages/hooks' },
    { name: '@xiaoye-react/ui', dir: 'packages/ui' },
    { name: '@xiaoye-react/pro', dir: 'packages/@xiaoye-react/pro' },
];

const args = process.argv.slice(2);
const PREFLIGHT_ONLY = args.includes('--preflight');
const PUBLISH = args.includes('--publish');
const NO_TAG = args.includes('--no-tag');
const OTP = args.map((a) => /^--otp=(.+)$/.exec(a)?.[1]).find(Boolean);
const FROM = args.map((a) => /^--from=(.+)$/.exec(a)?.[1]).find(Boolean);

const pkgJson = (p) => JSON.parse(readFileSync(path.join(REPO, p.dir, 'package.json'), 'utf8'));
const run = (cmd, cwd = REPO) => execSync(cmd, { stdio: 'inherit', cwd });
const capture = (cmd, cwd = REPO) => execSync(cmd, { encoding: 'utf8', cwd }).trim();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function fail(msg) {
    console.error(`\n✗ ${msg}`);
    process.exit(1);
}

function parseVersion(v) {
    const m = /^v?(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/.exec(v);
    return m ? { major: +m[1], minor: +m[2], patch: +m[3] } : null;
}

/** 只支持本仓实际使用的 ^x.y.z 形态（不跨 major，上界 < x+1.0.0）；其他形态（含 workspace: 协议）返回 null，表示无法判断、交给人 */
export function satisfiesCaret(version, range) {
    const m = /^\^(\d+)\.(\d+)\.(\d+)/.exec((range ?? '').trim());
    const v = parseVersion(version ?? '');
    if (!m || !v) return null;
    const min = { major: +m[1], minor: +m[2], patch: +m[3] };
    if (v.major !== min.major) return false;
    if (v.minor !== min.minor) return v.minor > min.minor;
    return v.patch >= min.patch;
}

function validateArgs() {
    const known = ['--preflight', '--publish', '--no-tag'];
    const unknown = args.filter((a) => !known.includes(a) && !/^--(otp|from)=/.test(a));
    if (unknown.length) fail(`未知参数：${unknown.join(' ')}。支持：--preflight / --publish / --otp=123456 / --no-tag / --from=<包名>`);
    // OTP 会原样拼进 shell 命令，只接受数字
    if (OTP && !/^\d{6,8}$/.test(OTP)) fail(`--otp 应为 6–8 位数字，收到：${OTP}`);
    if (PREFLIGHT_ONLY && PUBLISH) fail('--preflight 与 --publish 不能同时使用');
    if (FROM && !PUBLISH) fail('--from 只配合 --publish 使用');
    if (FROM && !PACKAGES.some((p) => p.name === FROM)) {
        fail(`--from 的包名不在发布序列里：${FROM}。可选：${PACKAGES.map((p) => p.name).join(' / ')}`);
    }
}

/**
 * 包级 prepublishOnly 只有 build（ui 另含 dts 校验），不含测试；
 * 测试门禁在排练/发布前在这里显式执行——与手工路径根脚本 publish:* 链式 prepublishOnly:* 的 build + test 等价。
 */
const runPackageTests = (p) => run(`pnpm --filter ${p.name} test`);

/** 排练中途工作树可能变脏（自己的改动、或前序步骤产出未忽略文件）；在每个包开跑前快速失败，
 * 避免跑完十几分钟测试才在 dry-run 的 git 检查上撞死。只在排练模式用：发布模式中途退出会绕过断点续发指引 */
const assertCleanTree = () => {
    const dirty = capture('git status --porcelain');
    if (dirty) {
        fail(
            '工作树在预检后变脏（preflight 时还是干净的）：\n' +
                '  1. 自己的未提交改动——先 commit 或 stash；\n' +
                '  2. 前序步骤产出了未被 gitignore 的文件——确认该忽略还是该提交。\n' +
                `当前脏文件：\n${dirty}`,
        );
    }
};

function preflight({ online }) {
    console.log('== 预检 ==');

    const dirty = capture('git status --porcelain');
    if (dirty) fail(`工作树不干净（pnpm publish 连未跟踪文件都算不干净）：\n${dirty}`);
    console.log('✓ 工作树干净');

    const branch = capture('git branch --show-current');
    if (branch !== 'main') fail(`当前分支是 ${branch}，发布分支应为 main`);
    console.log('✓ 当前在 main');

    if (online) {
        try {
            run('git fetch origin main');
            console.log('✓ 已 fetch origin main');
        } catch {
            console.log('⚠ git fetch 失败（网络抖动），按本地记住的 origin/main 比对——pnpm publish 自身也会查远端');
        }
    } else {
        console.log('ℹ --preflight 不联网不 fetch，比对的是本地记住的 origin/main');
    }
    const local = capture('git rev-parse main');
    const remote = capture('git rev-parse origin/main');
    if (local !== remote) fail('本地 main 与 origin/main 不一致：先 git fetch origin main 并 push/pull 对齐');
    console.log('✓ main 与 origin/main 对齐');

    const versions = {};
    for (const p of PACKAGES) versions[p.name] = pkgJson(p).version;
    console.log(`✓ 本次发布：${PACKAGES.map((p) => `${p.name}@${versions[p.name]}`).join(' → ')}`);

    // README「发布相关的坑」#2：ui 产物 import 了 hooks 的具体导出，peer 下限必须对得上本次要发的版本，
    // 留低了会让 npm 解析到旧版并在 ESM 下报错。
    const uiPeer = pkgJson(PACKAGES[1]).peerDependencies['@xiaoye-react/hooks'];
    const hooksOk = satisfiesCaret(versions['@xiaoye-react/hooks'], uiPeer);
    if (hooksOk === false) {
        fail(`ui 的 peer 要求 hooks ${uiPeer}，但本次要发的 hooks 是 ${versions['@xiaoye-react/hooks']}——先改 ui 的 peer 下限并 pnpm install`);
    }
    if (hooksOk === null) console.log(`⚠ ui 的 peer（${uiPeer}）不是 ^x.y.z 形态，无法自动核对，请人工确认`);
    else console.log(`✓ ui peer（${uiPeer}）能被本次 hooks 版本满足`);

    const proPeers = pkgJson(PACKAGES[2]).peerDependencies;
    const workspacePeers = Object.entries(proPeers).filter(([, spec]) => String(spec).startsWith('workspace:'));
    if (workspacePeers.length) {
        console.log(`ℹ pro 的 peer 是 ${workspacePeers.map(([n]) => n).join(' / ')} 的 workspace 协议，发布时由 pnpm 重写，无法提前核对`);
    }

    return versions;
}

async function registryVersion(name, expected) {
    // 发布成功后 CDN 同步有延迟（实战实测超过 12 秒）；且 npm view 会吃本地缓存，
    // 必须 --prefer-online 强制回源，否则重试读到的永远是同一份旧 packument
    for (let i = 1; i <= 12; i++) {
        try {
            const got = capture(`npm view ${name} version --prefer-online`);
            if (got === expected) {
                console.log(`✓ 注册表核对：${name}@${got}`);
                return;
            }
            console.log(`  注册表返回 ${got}，期望 ${expected}，第 ${i}/12 次重试（每 5 秒）…`);
        } catch {
            console.log(`  查询失败，第 ${i}/12 次重试（每 5 秒）…`);
        }
        await sleep(5000);
    }
    fail(
        `${name}：60 秒内核对不到 ${expected}。发布大概率已成功（pnpm 打印过 + name@version 即已入库），` +
            `等 CDN 同步后用 npm view ${name} version 确认；续发剩余包加 --from=<下一个包名>`,
    );
}

function consumerVerify(versions) {
    console.log('\n== 消费者侧 ESM 复验 ==');
    console.log('（vitest、Vite harness 和文档站都挑 module 那份构建，只有纯 Node ESM 走 main 的 CJS 构建）');

    rmSync(VERIFY_DIR, { recursive: true, force: true });
    mkdirSync(VERIFY_DIR, { recursive: true });
    run('npm init -y >/dev/null', VERIFY_DIR);
    const deps = [
        `@xiaoye-react/ui@${versions['@xiaoye-react/ui']}`,
        `@xiaoye-react/hooks@${versions['@xiaoye-react/hooks']}`,
        `@xiaoye-react/pro@${versions['@xiaoye-react/pro']}`,
        'react@19',
        'react-dom@19',
    ].join(' ');
    run(`npm i --no-audit ${deps}`, VERIFY_DIR);

    // README 手工流程验证 ui + hooks；pro 是纯 ESM 包，具名导出跨不过 CJS 互操作时同样只有这里能暴露
    writeFileSync(
        path.join(VERIFY_DIR, 'verify.mjs'),
        [
            "import { UIProvider, Button, useMatches } from '@xiaoye-react/ui';",
            "import { attachMediaListener } from '@xiaoye-react/hooks';",
            "import { PageContainer, SearchFilter, ProTable } from '@xiaoye-react/pro';",
            '',
            'const pro = { PageContainer, SearchFilter, ProTable };',
            'const missing = Object.entries(pro).filter(([, v]) => typeof v !== "object" && typeof v !== "function");',
            'console.log("link ok", typeof Button, typeof attachMediaListener, typeof useMatches,',
            '    pro.PageContainer.name || "?", pro.SearchFilter.name || "?", pro.ProTable.name || "?");',
            'if (missing.length) { console.error("pro 具名导出缺失:", missing.map(([k]) => k)); process.exit(1); }',
            '',
        ].join('\n'),
    );
    run('node verify.mjs', VERIFY_DIR);
    console.log('✓ 纯 Node ESM 具名导入全部通过');
}

function tagUi(versions) {
    const tag = `v${versions['@xiaoye-react/ui']}`;
    console.log('\n== 打标签 ==');
    if (capture(`git tag -l ${tag}`)) {
        console.log(`ℹ 标签 ${tag} 已存在，跳过（hooks / pro 的发版如需记录，手工补 ${PACKAGES[0].name.split('/').pop()}-v… 式标签）`);
        return;
    }
    run(`git tag -a "${tag}" -m "release: ${tag}"`);
    run(`git push origin "${tag}"`);
    console.log(`✓ 已推送标签 ${tag}`);
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
    validateArgs();
    const versions = preflight({ online: !PREFLIGHT_ONLY });

    if (PREFLIGHT_ONLY) {
        console.log('\n✓ 预检通过。下一步：node scripts/release.mjs 排练 dry-run');
        process.exit(0);
    }

    if (!PUBLISH) {
        for (const p of PACKAGES) {
            assertCleanTree();
            console.log(`\n== ${p.name}：测试 → dry-run ==`);
            runPackageTests(p);
            run(`pnpm --filter ${p.name} publish --access public --dry-run`);
        }
        console.log('\n✓ 排练通过。核对过三个包列出的文件清单后：node scripts/release.mjs --publish' + (OTP ? '' : '（包带 2FA 时加 --otp=123456）'));
        process.exit(0);
    }

    const queue = FROM ? PACKAGES.slice(PACKAGES.findIndex((p) => p.name === FROM)) : PACKAGES;
    const skipped = PACKAGES.filter((p) => !queue.includes(p));
    if (skipped.length) {
        console.log(`\n== 断点续跑：跳过 ${skipped.map((p) => p.name).join(', ')}，只核对注册表 ==`);
        for (const p of skipped) await registryVersion(p.name, versions[p.name]);
    }

    console.log('\n== 正式发布（顺序固定：hooks → ui → pro）==');
    const published = [];
    let current = queue[0];
    try {
        for (current of queue) {
            console.log(`\n-- ${current.name}@${versions[current.name]} --`);
            runPackageTests(current);
            run(`pnpm --filter ${current.name} publish --access public${OTP ? ` --otp=${OTP}` : ''}`);
            await registryVersion(current.name, versions[current.name]);
            published.push(current.name);
        }
    } catch {
        const remaining = queue.filter((p) => !published.includes(p.name));
        const next = remaining[0];
        fail(
            `发布中断于 ${current.name}（原始报错见上方）。已成功：${[...skipped.map((p) => p.name), ...published].join(', ') || '无'}。` +
                (next
                    ? `\n中断的包若实际已入库（pnpm 打印过 + 号即是），确认后断点续跑：\n` +
                      `  node scripts/release.mjs --publish --from=${next.name}${OTP ? ` --otp=${OTP}` : ''}`
                    : `\n若 ${current.name} 实际已发出，核对注册表后补收尾步骤（消费者复验 / 打标签）即可`),
        );
    }

    consumerVerify(versions);
    if (!NO_TAG) tagUi(versions);

    console.log(`\n✓ 发布完成：${PACKAGES.map((p) => `${p.name}@${versions[p.name]}`).join(', ')}`);
}
