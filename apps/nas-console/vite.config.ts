import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url))

// 与 apps/docs 的 .dumirc.ts alias 策略同构：
// - ui/hooks/pro 指向构建产物 es/（ui 从 src 引用会破坏 CSS module 顺序）
// - 源码级生态包直接指向 src/index.ts，免去构建步骤
export default defineConfig({
    plugins: [react()],
    resolve: {
        // 注意：alias 按顺序匹配（前缀命中即返回），子路径 style.css 必须排在包名之前
        alias: {
            '@xiaoye-react/ui/style.css': r('../../packages/ui/es/style.css'),
            '@xiaoye-react/pro/style.css': r('../../packages/@xiaoye-react/pro/es/style.css'),
            '@xiaoye-react/ui': r('../../packages/ui/es/index.js'),
            '@xiaoye-react/hooks': r('../../packages/hooks/es/index.js'),
            '@xiaoye-react/pro': r('../../packages/@xiaoye-react/pro/es/index.js'),
            '@xiaoye-react/modals': r('../../packages/@xiaoye-react/modals/src/index.ts'),
            '@xiaoye-react/notifications': r('../../packages/@xiaoye-react/notifications/src/index.ts'),
            '@xiaoye-react/spotlight': r('../../packages/@xiaoye-react/spotlight/src/index.ts'),
            '@xiaoye-react/charts': r('../../packages/@xiaoye-react/charts/src/index.ts')
        }
    },
    server: {
        port: 5173,
        host: '127.0.0.1'
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        chunkSizeWarningLimit: 1600
    }
})
