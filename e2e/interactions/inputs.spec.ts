import { expect, test } from '@playwright/test'

/**
 * pointer-events 继承与 MaskInput 光标：jsdom 的 fireEvent 绕过真实命中测试，
 * Input 右侧 section 默认 pointer-events:none 导致步进/清除按钮收不到点击的
 * P0 只能在真实浏览器里锁住。
 */
test.describe('inputs blind spots', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('NumberInput stepper buttons receive real clicks', async ({ page }) => {
        // NumberInput 的 input 带 role=spinbutton（aria-valuenow 等）
        const input = page.getByRole('spinbutton', { name: 'number' })
        await expect(input).toHaveValue('5')

        await page.getByRole('button', { name: 'Increment' }).click()
        await expect(input).toHaveValue('6')

        await page.getByRole('button', { name: 'Decrement' }).click()
        await expect(input).toHaveValue('5')
    })

    test('FileInput clear button clears the selected file', async ({ page }) => {
        await page.locator('input[type="file"]').setInputFiles({
            name: 'upload.txt',
            mimeType: 'text/plain',
            buffer: Buffer.from('hello')
        })
        await expect(page.getByText('upload.txt')).toBeVisible()

        await page.getByRole('button', { name: 'Clear' }).click()
        await expect(page.getByText('upload.txt')).toHaveCount(0)
        await expect(page.getByText('选择文件')).toBeVisible()
    })

    test('MaskInput keeps cursor order during continuous typing', async ({ page }) => {
        const input = page.getByRole('textbox', { name: 'mask' })
        await input.click()
        await page.keyboard.type('123456', { delay: 20 })

        // 旧实现光标算法忽略字面量：连续键入 123456 会得到 123-654
        await expect(input).toHaveValue('123-456')
    })
})
