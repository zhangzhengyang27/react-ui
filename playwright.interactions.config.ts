import { defineConfig } from '@playwright/test'

/**
 * 交互盲区 e2e：jsdom 覆盖不了的真实浏览器行为（pointer-events 命中测试、
 * 合成事件顺序、transitionend 派发）。harness 为 Vite dev server，直连
 * ui/hooks 源码。运行：pnpm e2e:interactions
 */
export default defineConfig({
    testDir: './e2e/interactions',
    globalSetup: './e2e/interactions/assert-harness.ts',
    fullyParallel: true,
    timeout: 120_000,
    use: {
        baseURL: 'http://127.0.0.1:4175',
        viewport: { width: 1280, height: 800 }
    },
    webServer: {
        command: 'node_modules/.bin/vite --config e2e/harness/vite.config.ts --host 127.0.0.1 --port 4175 --strictPort',
        url: 'http://127.0.0.1:4175',
        timeout: 120_000,
        reuseExistingServer: true
    }
})
