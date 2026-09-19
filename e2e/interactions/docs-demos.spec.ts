import { expect, test } from '@playwright/test'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

/**
 * 全量文档 demo 挂载回归：逐个挂载 docs-demos 的每个 demo，要求零抛错、零 console 报错。
 * 静态审查与 jsdom 测试都漏掉了这一类（挂载即崩、组件自有 props 漏到 DOM），
 * 只能在真实浏览器里锁住。已知问题记在 docs-demos-known.json，修一个删一行。
 *
 * 重新生成已知问题清单：DEMO_SWEEP_UPDATE=1 pnpm e2e:interactions
 */
// playwright.interactions.config.ts 在仓库根，spec 由 Playwright 以 CJS 加载，故用 cwd 而非 import.meta
const KNOWN_FILE = path.resolve(process.cwd(), 'e2e/interactions/docs-demos-known.json')

interface Issue {
    demo: string
    kind: string
    text: string
}

declare global {
    interface Window {
        __DEMO_SWEEP?: { done: boolean; mounted: number; total: number; issues: Issue[] }
    }
}

test.describe('docs demos mount sweep', () => {
    test.setTimeout(600_000)

    test('every documented demo mounts without errors', async ({ page }) => {
        await page.goto('/demos.html')
        await page.waitForFunction(() => window.__DEMO_SWEEP?.done === true, null, {
            timeout: 480_000
        })

        const { issues, total } = await page.evaluate(() => ({
            issues: window.__DEMO_SWEEP.issues,
            total: window.__DEMO_SWEEP.total
        }))

        expect(total, 'demo 总数为 0 说明 docs-demos 收集逻辑失效').toBeGreaterThan(0)

        // 同一个 demo 反复报同一类错（例如每个选项都漏一次 prop）只算一条
        const byKey = new Map<string, Issue>()
        for (const issue of issues) {
            const key = `${issue.demo}|${issue.kind}`
            if (!byKey.has(key)) {
                byKey.set(key, { ...issue, demo: `${issue.demo}|${issue.kind}` })
            }
        }
        const found = [...byKey.values()].sort((a, b) => a.demo.localeCompare(b.demo))

        if (process.env.DEMO_SWEEP_UPDATE) {
            writeFileSync(KNOWN_FILE, `${JSON.stringify(found, null, 2)}\n`)
            test.skip(true, `已写入 ${found.length} 条已知问题到 docs-demos-known.json`)
        }

        const known: Issue[] = existsSync(KNOWN_FILE)
            ? JSON.parse(readFileSync(KNOWN_FILE, 'utf8'))
            : []
        const knownKeys = new Set(known.map(issue => issue.demo))
        const unknown = found.filter(issue => !knownKeys.has(issue.demo))

        expect(
            unknown,
            `${unknown.length} 个 demo 出现新的挂载问题：\n${unknown
                .map(issue => `- ${issue.demo}: ${issue.text}`)
                .join('\n')}`
        ).toEqual([])
    })
})
