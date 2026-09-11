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
        // DateTimePicker 等日历组件单测交互链路长（数百节点渲染 × 多步点击），
        // 并发全量跑时在 5s 默认超时边缘偶发超时
        testTimeout: 20000,
        setupFiles: ['../tests/src/setup.ts'],
        include: ['src/**/*.test.{ts,tsx}'],
        css: true
    }
})
