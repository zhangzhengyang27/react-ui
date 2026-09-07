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
        // 日历视图组件单文件渲染量大（数百节点 × 多视图切换流程），
        // 并发全量跑时在 5s 默认超时边缘偶发抖动
        testTimeout: 20000,
        setupFiles: ['../tests/src/setup.ts'],
        include: ['src/**/*.test.{ts,tsx}'],
        css: true
    }
})
