import { expect, test } from '@playwright/test'

/**
 * AppShell `fixed` 布局只能在真实浏览器里验：position: fixed 的包含块、
 * body 滚动锁、以及"滚动只发生在 main 内部"这三件事 jsdom 都给不出答案。
 * fixture 单独一页（app-shell-fixed.html），因为锁 body 会影响其它 fixtures。
 */
test.describe('AppShell fixed layout', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/app-shell-fixed.html')
    })

    test('root covers the viewport and body scrolling is locked', async ({ page }) => {
        const shell = page.getByTestId('shell')
        await expect(shell).toBeVisible()

        const box = await shell.boundingBox()
        const viewport = page.viewportSize()
        expect(box, 'fixed 的根元素应当正好铺满视口').toEqual({ x: 0, y: 0, width: viewport!.width, height: viewport!.height })

        expect(await shell.evaluate(el => getComputedStyle(el).position)).toBe('fixed')
        expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe('hidden')
    })

    test('only main scrolls; header and footer stay put', async ({ page }) => {
        const header = page.getByTestId('header')
        const footer = page.getByTestId('footer')
        const before = { header: (await header.boundingBox())!, footer: (await footer.boundingBox())! }

        const scrolled = await page.getByTestId('main').evaluate((el: HTMLElement) => {
            el.scrollTop = 300
            return el.scrollTop
        })
        expect(scrolled, 'main 内部应当可滚动').toBeGreaterThan(0)

        // 文档本身没有被滚走（body 已锁），header/footer 位置不动
        expect(await page.evaluate(() => window.scrollY)).toBe(0)
        expect(await header.boundingBox()).toEqual(before.header)
        expect(await footer.boundingBox()).toEqual(before.footer)
    })

    test('mount and unmount save/restore the previous body overflow', async ({ page }) => {
        const bodyOverflow = () => page.evaluate(() => document.body.style.overflow)

        await expect(page.getByTestId('shell')).toBeVisible()
        expect(await bodyOverflow()).toBe('hidden')

        // 卸载还原成"进入前"的值，而不是硬编码空串
        await page.getByTestId('toggle').click()
        await expect(page.getByTestId('shell')).toHaveCount(0)
        expect(await bodyOverflow()).toBe('')

        // 模拟外层已有一把锁，再挂载 → 卸载后应回到外层那把锁的值
        await page.evaluate(() => {
            document.body.style.overflow = 'auto'
        })
        await page.getByTestId('toggle').click()
        await expect(page.getByTestId('shell')).toBeVisible()
        expect(await bodyOverflow()).toBe('hidden')

        await page.getByTestId('toggle').click()
        await expect(page.getByTestId('shell')).toHaveCount(0)
        expect(await bodyOverflow()).toBe('auto')
    })
})
