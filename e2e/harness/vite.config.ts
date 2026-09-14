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
            )
        }
    }
})
