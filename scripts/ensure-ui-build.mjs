// 文档站的 @xiaoye-react/ui 别名指向 packages/ui/es 构建产物（见 apps/docs/.dumirc.ts），
// 而 predev/prebuild 原本只跑 docgen——src 改完没重建时，文档站与截图回归会静默跑旧代码。
// 这里在文档站启动/构建前比对源码与产物 mtime，陈旧就自动重建。
// 跳过重建（例如只改文档内容时）：DOCS_SKIP_UI_BUILD=1 pnpm dev
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))
const uiDir = path.join(repoRoot, 'packages/ui')
const srcDir = path.join(uiDir, 'src')
const bundle = path.join(uiDir, 'es/index.js')

const isSource = file => /\.(ts|tsx|css)$/.test(file) && !/\.test\./.test(file)

function newestSourceMtime(dir) {
    let newest = 0
    let file = ''
    for (const name of readdirSync(dir)) {
        if (name === 'node_modules') continue
        const full = path.join(dir, name)
        const stat = statSync(full)
        if (stat.isDirectory()) {
            const nested = newestSourceMtime(full)
            if (nested.newest > newest) {
                newest = nested.newest
                file = nested.file
            }
        } else if (isSource(name) && stat.mtimeMs > newest) {
            newest = stat.mtimeMs
            file = full
        }
    }
    return { newest, file }
}

const { newest: srcMtime, file: newestFile } = newestSourceMtime(srcDir)
const artifactMtime = existsSync(bundle) ? statSync(bundle).mtimeMs : 0

if (!srcMtime) {
    console.error(`[ensure-ui-build] 未在 ${srcDir} 找到源码文件`)
    process.exit(1)
}

if (srcMtime <= artifactMtime) {
    process.exit(0)
}

const relative = path.relative(repoRoot, newestFile)

if (process.env.DOCS_SKIP_UI_BUILD) {
    console.warn(
        `[ensure-ui-build] packages/ui/es 早于源码改动（最近：${relative}），` +
            '已按 DOCS_SKIP_UI_BUILD 跳过重建——文档站仍会使用旧产物。'
    )
    process.exit(0)
}

console.log(`[ensure-ui-build] 源码比产物新（最近改动：${relative}），重建 @xiaoye-react/ui …`)
const started = Date.now()
// 必须走包自身的 build 脚本而不是直接调 vite：ui 的 prebuild 会先把 @xiaoye-react/hooks
// 构建出来。直接跑 vite 时 hooks/es 不存在（干净克隆里必然如此），vite-plugin-dts 会给
// 每个 import '@xiaoye-react/hooks' 的文件报 TS2307，整个文档站 prebuild 随之失败。
// 走脚本还顺带执行 build 里的 check:published-types。
const result = spawnSync('pnpm', ['run', 'build'], { cwd: uiDir, stdio: 'inherit' })

if (result.status !== 0) {
    console.error('[ensure-ui-build] @xiaoye-react/ui 构建失败，文档站所需的产物不可信。')
    process.exit(result.status ?? 1)
}

console.log(`[ensure-ui-build] 重建完成，用时 ${((Date.now() - started) / 1000).toFixed(1)}s`)
