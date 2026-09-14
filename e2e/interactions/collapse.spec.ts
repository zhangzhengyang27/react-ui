import { expect, test } from '@playwright/test'

/**
 * transitionend 时序：transitionend 丢失（duration=0 / 隐藏容器内展开）时
 * 折叠状态卡在 entering、内容永久不可见的 P0 只能在真实浏览器复现。
 */
test.describe('collapse blind spots', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('duration=0 shows content immediately on expand', async ({ page }) => {
        // keepMounted 默认 true：收起时经 Activity 隐藏（留在 DOM 但不可见）
        await expect(page.getByTestId('collapse-fast-content')).toBeHidden()

        await page.getByRole('button', { name: 'toggle-fast' }).click()
        // 0ms 过渡不会派发 transitionend：旧实现会卡死在 entering
        await expect(page.getByTestId('collapse-fast-content')).toBeVisible()
    })

    test('expand while hidden then reveal: content must be visible', async ({ page }) => {
        const wrap = page.getByTestId('hidden-wrap')
        const content = page.getByTestId('collapse-hidden-content')

        await expect(wrap).toBeHidden()
        // 隐藏期间 expanded=true：隐藏容器内测量不到 transitionend
        await expect(content).toHaveCount(1)

        await page.getByRole('button', { name: 'toggle-wrap' }).click()
        // 旧实现：卡在 entering、height:0 + overflow:hidden → 显示后内容被裁成 0
        await expect(content).toBeVisible()
        const box = await content.boundingBox()
        expect(box?.height ?? 0).toBeGreaterThan(0)
    })
})
