import { expect, test } from '@playwright/test'

/**
 * mouseenter 先于 click 的合成事件顺序：Rating clearable 用含 hover 的值
 * 做清零判断时，鼠标点击任何星都会清零（P0 只在真实浏览器复现）。
 */
test.describe('rating blind spots', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('clicking a new star sets its value', async ({ page }) => {
        const star5 = page.getByRole('radio', { name: '5 star' })
        await star5.hover()
        await star5.click()
        await expect(star5).toBeChecked()
    })

    test('clearable: clicking the active star clears instead of zeroing everything', async ({ page }) => {
        const star3 = page.getByRole('radio', { name: '3 star' })
        await expect(star3).toBeChecked() // defaultValue=3

        // 悬停已选星再点击：旧实现 roundedValue 被 hover 污染，恒命中清零分支
        // 但这里预期行为是清零；换一颗新星点击应设为该星而非 0
        const star5 = page.getByRole('radio', { name: '5 star' })
        await star5.hover()
        await star5.click()
        await expect(star5).toBeChecked()

        // 清零路径：悬停当前值（5）后点击 → 0
        await star5.hover()
        await star5.click()
        await expect(star5).not.toBeChecked()
        for (let value = 1; value <= 5; value++) {
            await expect(page.getByRole('radio', { name: `${value} star` })).not.toBeChecked()
        }
    })
})
