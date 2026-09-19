import { expect, test, type Page } from '@playwright/test'

/**
 * 虚拟化 DataTable：jsdom 没有布局（所有元素高度都是 0），滚动的定位正确性完全
 * 测不出来。这里锁住三件真实浏览器才可能错的事：
 * 1. 只挂载视口内的行，且索引连续（漏挂/重挂会留下空洞或重复行）
 * 2. 滚到底能取到最后一行（总高按实测行高校正，measureElement 断链时滚不到）
 * 3. 展开行的「主行+展开行」合成高度计入滚动总高（resizeItem 路径）
 */

const scroller = (page: Page) => page.locator('[data-testid="virtual-table"] table').locator('xpath=..')

const renderedIndexes = (page: Page) =>
    page.$$eval('tr[data-index]', rows => rows.map(row => Number(row.getAttribute('data-index'))))

function toContiguousRange(indexes: number[]) {
    const gaps: string[] = []
    for (let i = 1; i < indexes.length; i++) {
        if (indexes[i] !== indexes[i - 1] + 1) {
            gaps.push(`${indexes[i - 1]} -> ${indexes[i]}`)
        }
    }
    return gaps
}

async function scrollTo(page: Page, top: number) {
    await scroller(page).evaluate((el, value) => {
        el.scrollTop = value
    }, top)
}

test.describe('virtualized DataTable', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/interactions.html')
        await expect(page.getByText('R1', { exact: true })).toBeVisible()
    })

    test('mounts a contiguous window of rows instead of the whole dataset', async ({ page }) => {
        await expect(page.getByText('R2000', { exact: true })).toHaveCount(0)

        const indexes = await renderedIndexes(page)
        expect(indexes.length).toBeGreaterThan(0)
        // 360px 视口 / 40px 行高 + overscan 8：远超这个数说明虚拟化没生效
        expect(indexes.length).toBeLessThan(60)
        expect(toContiguousRange(indexes)).toEqual([])
        expect(indexes[0]).toBe(0)
    })

    test('scrolling to the bottom reaches the last record', async ({ page }) => {
        const total = await scroller(page).evaluate(el => el.scrollHeight)
        // 未测量的行按 estimatedRowHeight 计：2000 × 40 = 80000 起步，
        // thead 与实测行高的偏差让实际值略大；远小于此说明实测高度没收进来（行被压扁）
        expect(total).toBeGreaterThanOrEqual(80_000)
        expect(total).toBeLessThan(82_000)

        await scrollTo(page, total)
        await expect(page.getByText('R2000', { exact: true })).toBeVisible()

        const indexes = await renderedIndexes(page)
        expect(toContiguousRange(indexes)).toEqual([])
        expect(indexes[indexes.length - 1]).toBe(1999)
    })

    test('expanded row height is folded into the scroll extent', async ({ page }) => {
        const before = await scroller(page).evaluate(el => el.scrollHeight)

        await page.locator('tr[data-index="0"]').getByRole('button', { name: '展开行' }).click()
        await expect(page.getByTestId('expanded-detail')).toBeVisible()

        const after = await scroller(page).evaluate(el => el.scrollHeight)
        // 展开内容固定 120px：合成高度未上报给 virtualizer 时总高一毫米都不涨
        expect(after - before).toBeGreaterThanOrEqual(100)

        // 收起后总高回落，且展开行真的从 DOM 卸载（ResizeObserver 必须随之 disconnect）
        await page.locator('tr[data-index="0"]').getByRole('button', { name: '收起行' }).click()
        await expect(page.getByTestId('expanded-detail')).toHaveCount(0)
        await expect
            .poll(() => scroller(page).evaluate(el => el.scrollHeight))
            .toBeLessThanOrEqual(before + 1)
    })

    test('a mid-range offset renders that window, and returning to 0 restores the head', async ({ page }) => {
        await scrollTo(page, 20_000)
        // 20000 / 40px = 第 500 行附近
        await expect(page.getByText('R501', { exact: true })).toBeVisible()
        const middle = await renderedIndexes(page)
        expect(middle[0]).toBeGreaterThan(400)
        expect(toContiguousRange(middle)).toEqual([])

        await scrollTo(page, 0)
        await expect(page.getByText('R1', { exact: true })).toBeVisible()
        expect((await renderedIndexes(page))[0]).toBe(0)
    })
})
