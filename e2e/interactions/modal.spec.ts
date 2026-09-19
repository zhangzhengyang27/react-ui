import { expect, test, type Page } from '@playwright/test'

/**
 * Modal 的焦点行为全部依赖真实焦点/命中：内容 portal 到 body、FocusTrap 靠 keydown
 * 拦 Tab、returnFocus 靠 document.activeElement。jsdom 的焦点实现不完整，
 * 这里锁住打开聚焦、Tab/Shift+Tab 不外逃、关闭归还焦点、Escape 只关最上层。
 */

const activeTestId = (page: Page) =>
    page.evaluate(() => document.activeElement?.getAttribute('data-testid') ?? document.activeElement?.tagName)

const focusInsideDialog = (page: Page) =>
    page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'))

const dialog = (page: Page) => page.getByRole('dialog')

test.describe('Modal focus', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/interactions.html')
    })

    test('open focuses [data-autofocus] inside the portal', async ({ page }) => {
        await page.getByRole('button', { name: 'open-modal' }).click()
        await expect(dialog(page)).toBeVisible()

        await expect
            .poll(() => activeTestId(page), { message: '未聚焦 [data-autofocus]' })
            .toBe('autofocus-target')
    })

    test('Tab and Shift+Tab never escape the dialog', async ({ page }) => {
        await page.getByRole('button', { name: 'open-modal' }).click()
        await expect(dialog(page)).toBeVisible()
        await expect.poll(() => activeTestId(page)).toBe('autofocus-target')

        for (let i = 1; i <= 8; i++) {
            await page.keyboard.press('Tab')
            expect(await focusInsideDialog(page), `第 ${i} 次 Tab 焦点逃出了对话框`).toBe(true)
        }
        for (let i = 1; i <= 8; i++) {
            await page.keyboard.press('Shift+Tab')
            expect(await focusInsideDialog(page), `第 ${i} 次 Shift+Tab 焦点逃出了对话框`).toBe(true)
        }
    })

    test('Escape closes and returns focus to the trigger', async ({ page }) => {
        const trigger = page.getByRole('button', { name: 'open-modal' })
        await trigger.click()
        await expect(dialog(page)).toBeVisible()

        await page.keyboard.press('Escape')
        await expect(dialog(page)).toHaveCount(0)
        await expect
            .poll(() => page.evaluate(() => document.activeElement?.textContent?.trim()))
            .toBe('open-modal')
    })

    test('overlay click closes but clicking the content does not', async ({ page }) => {
        await page.getByRole('button', { name: 'open-modal' }).click()
        await expect(dialog(page)).toBeVisible()

        await page.getByTestId('modal-action').click()
        await expect(dialog(page)).toBeVisible()

        await page.mouse.click(5, 5)
        await expect(dialog(page)).toHaveCount(0)
    })

    test('Escape closes only the topmost dialog', async ({ page }) => {
        await page.getByRole('button', { name: 'open-outer' }).click()
        await expect(page.getByTestId('outer-body')).toBeVisible()

        await page.getByRole('button', { name: 'open-inner' }).click()
        await expect(page.getByTestId('inner-body')).toBeVisible()
        expect(await dialog(page).count()).toBe(2)

        await page.keyboard.press('Escape')
        await expect(page.getByTestId('inner-body')).toHaveCount(0)
        await expect(page.getByTestId('outer-body')).toBeVisible()

        await page.keyboard.press('Escape')
        await expect(page.getByTestId('outer-body')).toHaveCount(0)
    })
})
