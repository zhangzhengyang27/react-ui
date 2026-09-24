# react-ui

`@xiaoye-react` React 组件库的 pnpm workspace：`packages/ui`（组件与主题）、`packages/hooks`（无 UI 依赖的 hooks）、`packages/@xiaoye-react/pro`（管理端页面模式层）三个包对外发布，其余 `packages/@xiaoye-react/*` 与 `apps/docs` 为 `private` 的内部包和文档站。

日常命令：`pnpm dev` / `pnpm build:packages` / `pnpm test:packages`；门禁在根 `package.json` 里——`lint:es`（`--max-warnings` 是**棘轮**，只允许调低，理由分类写在 `eslint.config.mjs` 注释里）、`typecheck`（ui + hooks + demos 三套配置）、`docs:lint`、`check:exports`、`e2e:interactions`（24 条，Vite harness）、`e2e:screenshots`（10 条，托管 `apps/docs/dist`）。门禁同时跑在 GitHub Actions（`.github/workflows/ci.yml`，push / PR 触发；e2e 暂不入 CI，截图基线跨平台不通用）。

## 发布流程

第 0–4 步已固化为 `scripts/release.mjs`，日常按下面的入口走；分步手册保留在后面，用于理解每一步为什么存在、出问题时定位。

```bash
pnpm release:preflight              # 本地预检：工作树干净、在 main、与远端对齐、ui 的 peer 下限对得上本次要发的 hooks 版本
pnpm release:check                  # 预检 + 三包依次「测试 → dry-run」（测试显式跑：包级 prepublishOnly 只有 build，不含测试）
pnpm release:publish --otp=123456   # 正式发布：每包「测试 → 发布」→ 逐包核对注册表 → 消费者侧 ESM 复验 → 给 ui 版本打 tag 并推送
```

测试门禁与手工根脚本（`publish:*` 链式 `prepublishOnly:*` 的 build + test）等价，由脚本显式执行；消费者复验在第 4 步的基础上**追加了 pro 包的具名导出检查**（pro 是纯 ESM 包，同样只有这里能暴露互操作问题）。`--publish` 可追加 `--no-tag` 跳过打标签。

13 个 workspace 包里只有 3 个不是 `private`：`@xiaoye-react/hooks`、`@xiaoye-react/ui`、`@xiaoye-react/pro`。三者版本互相独立，但 ui 的 peer 要求 `@xiaoye-react/hooks`，pro 的 peer 要求 ui 与 hooks，所以**被依赖的先发，顺序固定 hooks → ui → pro**：反过来就会短暂出现"peer 指向注册表上还不存在的版本"。

### 0. 前置

```bash
export PATH="$HOME/.nvm/versions/node/v22.15.0/bin:$PATH"   # 本机 node 走 nvm
cd /Users/zhangzhengyang/Desktop/PROJECT/react-ui

git status --porcelain    # 必须为空：pnpm publish 默认会检查当前分支是发布分支、工作树干净、且不落后于远端
git fetch origin main     # 让本地 main 与 origin/main 对齐，否则上面的检查会拦下发布
npm whoami                # 报 E401 就先登录（作用域包 + 2FA 走交互式登录）
npm login --scope=@xiaoye-react --auth-type=interactive
```

版本号手工改三个 `package.json` 的 `version`（本仓不用 changesets）。改了 workspace 内的版本或 peer 范围后跑一次 `pnpm install`，确认 `pnpm-lock.yaml` 是否需要同步提交（只改 `version` 与 peer 规格通常不动 lockfile）。

### 1. 干跑，核对将上传的内容

```bash
pnpm --filter @xiaoye-react/hooks publish --access public --dry-run
pnpm --filter @xiaoye-react/ui    publish --access public --dry-run
pnpm --filter @xiaoye-react/pro   publish --access public --dry-run
```

每个包的 `files` 都是 `["es"]`，**发出去的就是构建目录里的东西**。`pnpm publish` 在干跑阶段也会先跑包自己的 `prepublishOnly`（即重新 build，实测 `es/index.js` 的 mtime 会被刷新），所以 dry-run 列出的就是要上传的清单；但它**不跑测试**，测试在下一步。

顺手记下 dry-run 会撞到的第一个错：`ERR_PNPM_GIT_UNCLEAN`——连未跟踪文件都算不干净。先提交，或临时加 `--no-git-checks`。

### 2. 正式发布

```bash
npm run publish:hooks   # = build + test + pnpm publish（发布包里带 2FA 时追加 --otp=123456）
npm run publish:ui
npm run publish:pro
```

三条根脚本都会先跑包自己的 `prepublishOnly`（ui 的那条还包含 `check:exports` 与 dts 编译校验）。**别绕过它用裸 `npm publish`**：`npm` 不重写 `workspace:` 协议，会把 `workspace:*` 原样发出去。

### 3. 核对注册表并打标签

```bash
npm view @xiaoye-react/hooks version   # 应为刚发的版本
npm view @xiaoye-react/ui    version
npm view @xiaoye-react/pro   version

npm run release:tag   # 从 packages/ui/package.json 读版本，打 v<version> 附注标签并推送
```

### 4. 消费者侧复验（约 30 秒，能拦住 ESM 互操作类回归）

```bash
rm -rf /tmp/verify && mkdir /tmp/verify && cd /tmp/verify
npm init -y >/dev/null
npm i --no-audit @xiaoye-react/ui@latest @xiaoye-react/hooks@latest react@19 react-dom@19
node --input-type=module -e "
import { UIProvider, Button, useMatches } from '@xiaoye-react/ui';
import { attachMediaListener } from '@xiaoye-react/hooks';
console.log('link ok', typeof Button, typeof attachMediaListener, typeof useMatches);
"
```

这条不是形式主义：vitest、Vite harness 和 webpack 文档站都会挑 `module` 字段那份构建，**只有纯 Node ESM 会走 `main` 的 CJS 构建**，所以具名导入跨不过去的包（例如 `rrule`）只在单测和站点全绿的情况下也能把发布版本弄坏。

## 发布相关的坑

- **`workspace:` 协议**：只有 `pnpm publish` 会重写成真实版本范围。`pro` 的 peer 是 `workspace:^`，用 npm 发就直接坏。
- **peer 下限要对得上已发布的包**：`ui` 产物会 `import { attachMediaListener } from '@xiaoye-react/hooks'`，该导出是 hooks 1.4.0 才有的，所以 ui 的 peer 抬到 `^1.4.0`。留 `^1.0.0` 会让 npm 解析到旧版并在 ESM 下报错。
- **CJS/ESM 双入口依赖**（当前是 `rrule`）：`main` 与 `module` 指向不同构建，必须写成"先按命名空间取值、取不到再退回 default"，且 `default` 用计算键访问，否则 Node 报缺具名导出、webpack 报缺 default。
- **`'use client'` 指令**：rollup 不保留入口的 directive 序言，ESM 产物靠 `output.banner` 统一补回（`preserveModules` 下每个模块都带）。CJS 输出**不加**，否则会把开头的 `'use strict'` 挤掉。
- **`apps/docs` 的 workspace 包解析**：`tsconfig.json` 的 `paths` 与 `.dumirc.ts` 的 `alias` 都要指回 `src`。漏一个的包只在"本地恰好留着旧的 `es/` 产物"时看着是绿的，干净克隆里 typecheck/build 直接 TS2307 级失败。
- **截图 e2e 的端口**：`webServer.reuseExistingServer` 只看端口有没有 HTTP 响应，不认是谁。别的程序占用同一端口时，整批用例会对着那个站点跑出满屏 `element(s) not found`。`e2e/interactions/assert-harness.ts` 会先比对 harness 的 `<title>` 再放行。
- **回滚窗口**：npm 只在发布后 72 小时内允许 unpublish，之后只能 `npm deprecate`。
