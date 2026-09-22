import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { FullConfig } from '@playwright/test'

/**
 * webServer.reuseExistingServer 只检查"端口上有 HTTP 响应"。端口被别的项目占用时
 * （本机曾出现另一个项目的 http.server 占着同一端口），全部用例会对着那个站点跑，
 * 报出来的是一堆 "element(s) not found"，看起来像组件回归。这里先把页面验明正身。
 */
export default async function assertHarness(config: FullConfig) {
    const baseURL = config.projects[0]?.use?.baseURL
    if (!baseURL) {
        throw new Error('e2e 配置缺少 use.baseURL')
    }

    const html = await (await fetch(baseURL)).text()
    const title = /<title>([^<]*)<\/title>/.exec(
        readFileSync(resolve('e2e/harness/index.html'), 'utf8')
    )?.[1]

    if (!title || !html.includes(title)) {
        throw new Error(
            `${baseURL} 返回的不是 e2e harness（期望 <title>${title}</title>）。` +
                '端口大概率被其他项目占用，先释放或换端口再跑。'
        )
    }
}
