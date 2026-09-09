import { expect, test } from '@playwright/test'

/**
 * 组件库截图回归：覆盖管理端倾斜后的关键组件 demo。
 * 运行前提：apps/docs/dist 已构建（`pnpm --filter @xiaoye-react/docs build`）。
 * 首次运行或更新基线：`pnpm exec playwright test --update-snapshots`。
 *
 * demo 路由为 dumi 的单 demo 渲染页，内容干净、状态稳定，适合做像素级比对。
 */
const DEMO_ROUTES = [
    // DataTable
    'components-data-table-demo-usage',
    'components-data-table-demo-sorting',
    'components-data-table-demo-selection',
    'components-data-table-demo-pagination',
    'components-data-table-demo-virtualized',
    // Cascader
    'components-cascader-demo-usage',
    'components-cascader-demo-lazyload',
    // Transfer
    'components-transfer-demo-usage',
    // Descriptions
    'components-descriptions-demo-bordered',
    // pro 模式层
    'docs-x-pro-demo-crud'
]

for (const route of DEMO_ROUTES) {
    test(`screenshot: ${route}`, async ({ page }) => {
        await page.goto(`/~demos/${route}/`)
        await page.waitForLoadState('networkidle')
        // 字体与首帧渲染稳定后再截图
        await page.evaluate(() => document.fonts?.ready)
        await page.waitForTimeout(300)
        await expect(page).toHaveScreenshot(`${route}.png`, { fullPage: true })
    })
}
