// 交互 e2e harness：Vite dev server 直接加载 ui/hooks 的源码（含 CSS Modules），
// 让 Playwright 在真实浏览器里跑 jsdom 无法覆盖的交互（pointer-events、
// mouseenter→click、transitionend 时序）。直连源码无需先构建产物。
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
    root: fileURLToPath(new URL('.', import.meta.url)),
    esbuild: {
        jsx: 'automatic'
    },
    server: {
        port: 4174,
        strictPort: true
    },
    resolve: {
        alias: {
            '@xiaoye-react/ui': fileURLToPath(new URL('../../packages/ui/src/index.ts', import.meta.url)),
            '@xiaoye-react/hooks': fileURLToPath(
                new URL('../../packages/hooks/src/index.ts', import.meta.url)
            ),
            // 与 apps/docs/.dumirc.ts 的 alias 保持一致：DemoEngine 的真身只有一份，
            // 在 .dumi/theme/builtins 下（dumi 按目录约定自动注册 builtin）。
            // 不设这条的话挂载扫描会解析到另一份实现，等于测的不是上线的那套。
            '@xiaoye-react/demo': fileURLToPath(
                new URL('../../apps/docs/.dumi/theme/builtins/DemoEngine/index.ts', import.meta.url)
            )
        }
    }
})
