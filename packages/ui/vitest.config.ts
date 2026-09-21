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
        // dates/schedule 日历类单测交互链路长，沿用旧扩展包的 20s 超时
        testTimeout: 20000,
        include: ['src/**/*.test.{ts,tsx}'],
        css: true,
        // 336 个测试文件 = 336 次 jsdom 环境。默认并发按核数取 11 个 worker，
        // 实测在本机（12 核 / 16 GB，可用内存仅 0.1 GB）会把全量跑拖到 105 分钟
        // 并伪造出 5 条失败 + 4 处超时（单独重跑那 6 个文件 45s 全绿）。
        // 压到 4 个 worker 换取可复现的红绿，而不是让人工分辨真假失败。
        pool: 'threads',
        poolOptions: {
            threads: {
                maxThreads: 4,
                minThreads: 1
            }
        }
    }
})
