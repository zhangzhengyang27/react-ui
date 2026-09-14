import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// 别名指向工作区源码：合并进来的组件测试与 tests 助手包始终引用同一份源码实现，
// 避免经 dist 产物产生两份 context 实例（UIProvider not found 的根因）
const r = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@xiaoye-react/ui': r('./src/index.ts'),
            '@xiaoye-react/hooks': r('../hooks/src/index.ts')
        }
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test-setup.ts'],
        include: ['src/**/*.test.{ts,tsx}'],
        css: true
    }
})
