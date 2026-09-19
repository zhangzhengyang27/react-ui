import { expect, test, type Locator, type Page } from '@playwright/test'

/**
 * Slider 的承载交互层是一个铺满 root 的透明 input[type=range]，可见 thumb 只是装饰。
 * 这个分层只有真实浏览器的命中测试能验证：thumb 一旦恢复成可命中，按下落在 div 上，
 * input 收不到 mousedown，拖拽静默失效——jsdom 的 fireEvent 永远测不出来。
 * 「拖出元素边界仍然跟随」（隐式指针捕获）与「keyup 补发 onChangeEnd」同样只能真机验证。
 */

function parts(page: Page) {
    return {
        input: page.getByRole('slider', { name: 'volume' }),
        thumb: page.getByTestId('slider-thumb'),
        endValues: page.getByTestId('slider-end-values')
    }
}

const valueOf = (input: Locator) => input.inputValue()

test.describe('Slider pointer drag', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/interactions.html')
        await expect(parts(page).input).toHaveValue('20')
    })

    test('pressing on the visible thumb hits the range input, not the thumb', async ({ page }) => {
        const { thumb } = parts(page)
        const box = await thumb.boundingBox()
        expect(box, 'thumb 未渲染出可见尺寸').not.toBeNull()

        const hit = await page.evaluate(point => {
            const el = document.elementFromPoint(point.x, point.y)
            return el ? el.tagName : 'none'
        }, { x: box!.x + box!.width / 2, y: box!.y + box!.height / 2 })

        expect(hit, '按下位置被装饰层吃掉 → 拖拽会静默失效').toBe('INPUT')
    })

    test('dragging from the thumb updates the value and fires onChangeEnd once', async ({ page }) => {
        const { input, thumb, endValues } = parts(page)
        const box = await thumb.boundingBox()
        const inputBox = await input.boundingBox()
        const centerY = box!.y + box!.height / 2

        await page.mouse.move(box!.x + box!.width / 2, centerY)
        await page.mouse.down()
        await page.mouse.move(inputBox!.x + inputBox!.width * 0.85, centerY, { steps: 10 })
        await page.mouse.up()

        const value = Number(await valueOf(input))
        expect(value, '拖拽未改变值').toBeGreaterThan(60)
        // 闭包读旧值会报滞后值：onChangeEnd 必须收到抬手时的最终值
        await expect(endValues).toHaveText(String(value))
    })

    test('dragging past the left edge keeps tracking and clamps to min', async ({ page }) => {
        const { input, thumb, endValues } = parts(page)
        const box = await thumb.boundingBox()
        const inputBox = await input.boundingBox()
        const centerY = box!.y + box!.height / 2

        await page.mouse.move(box!.x + box!.width / 2, centerY)
        await page.mouse.down()
        // x=0 落在 input 左边界之外：隐式指针捕获下应继续跟随并夹到 min
        await page.mouse.move(0, centerY, { steps: 10 })
        expect(Number(await valueOf(input))).toBe(0)

        // 回到中间：指针捕获一旦丢失，值会冻结在 0
        await page.mouse.move(inputBox!.x + inputBox!.width * 0.5, centerY, { steps: 5 })
        const value = Number(await valueOf(input))
        expect(value).toBeGreaterThan(35)
        expect(value).toBeLessThan(65)

        await page.mouse.up()
        await expect(endValues).toHaveText(String(value))
    })

    test('keyboard step fires onChangeEnd with the committed value', async ({ page }) => {
        const { input, endValues } = parts(page)
        await input.focus()
        await page.keyboard.press('ArrowRight')

        await expect(input).toHaveValue('21')
        await expect(endValues).toHaveText('21')
    })
})
