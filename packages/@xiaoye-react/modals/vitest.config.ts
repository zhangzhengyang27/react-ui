import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// 别名指向工作区源码：测试始终运行最新实现，不依赖先构建 ui/hooks
const r = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@xiaoye-react/ui': r('../../ui/src/index.ts'),
            '@xiaoye-react/hooks': r('../../hooks/src/index.ts')
        }
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['../tests/src/setup.ts'],
        include: ['src/**/*.test.{ts,tsx}'],
        css: true
    }
})
