import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    timeout: 60_000,
    expect: {
        toHaveScreenshot: {
            // 允许轻微渲染差异（字体反锯齿等），超出阈值判定回归
            maxDiffPixelRatio: 0.02
        }
    },
    use: {
        baseURL: 'http://127.0.0.1:4173',
        viewport: { width: 1280, height: 800 },
        // 截图回归必须禁用动画，避免逐帧差异
        animations: 'disabled'
    },
    webServer: {
        command: 'node scripts/serve-docs-dist.mjs',
        port: 4173,
        timeout: 20_000,
        reuseExistingServer: true
    }
})
