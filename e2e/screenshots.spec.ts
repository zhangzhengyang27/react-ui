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
    'components-pro-demo-crud'
]

for (const route of DEMO_ROUTES) {
    test(`screenshot: ${route}`, async ({ page }) => {
        // 构建产物里注入了站外统计脚本（如 analytics.*），它一旦连不上就会让
        // 请求一直挂着：以前等 networkidle 会 60s 超时，且截图内容还可能被第三方
        // 脚本影响。这里把非本机的请求直接断掉，让回归只取决于本地 dist。
        await page.route('**', route => {
            const { hostname } = new URL(route.request().url())
            if (hostname === '127.0.0.1' || hostname === 'localhost') {
                return route.continue()
            }
            return route.abort()
        })

        await page.goto(`/~demos/${route}/`, { waitUntil: 'domcontentloaded' })
        // 等真实渲染发生（而不是等网络安静）：#root 里挂出内容即为已渲染
        await page.waitForFunction(() => {
            const root = document.querySelector('#root')
            return !!root && root.children.length > 0
        })
        await page.evaluate(() => document.fonts?.ready)
        await page.waitForTimeout(300)
        await expect(page).toHaveScreenshot(`${route}.png`, { fullPage: true })
    })
}
