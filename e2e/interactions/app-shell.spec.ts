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

    test('锁随挂载/卸载生效与撤销，且不覆写消费者自己的 inline overflow', async ({ page }) => {
        // 断言计算样式而不是 inline style：锁由 react-remove-scroll 注入的样式表 +
        // body[data-scroll-locked] 实现，inline overflow 属于消费者，组件不该去盖它
        const computed = () => page.evaluate(() => getComputedStyle(document.body).overflow)
        const inline = () => page.evaluate(() => document.body.style.overflow)

        await expect(page.getByTestId('shell')).toBeVisible()
        expect(await computed(), '挂载期内 body 不可滚动').toBe('hidden')
        expect(await inline(), '不写消费者的 inline overflow').toBe('')

        // 卸载 → 锁撤销
        await page.getByTestId('toggle').click()
        await expect(page.getByTestId('shell')).toHaveCount(0)
        expect(await computed()).not.toBe('hidden')

        // 外层已有一把 inline 锁时，组件挂载再卸载应当原样留给外层
        await page.evaluate(() => {
            document.body.style.overflow = 'auto'
        })
        await page.getByTestId('toggle').click()
        await expect(page.getByTestId('shell')).toBeVisible()
        expect(await inline()).toBe('auto')
        expect(await computed(), 'fixed 期间仍然要锁得住').toBe('hidden')

        await page.getByTestId('toggle').click()
        await expect(page.getByTestId('shell')).toHaveCount(0)
        expect(await inline(), '卸载后外层那把 inline 锁原样保留').toBe('auto')
    })
})
