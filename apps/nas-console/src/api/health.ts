import type { ServiceDef } from '../config/services'

export interface HealthResult {
    id: string
    status: 'up' | 'down'
    /** null = 未得到延迟（down） */
    latencyMs: number | null
    checkedAt: number
    error?: string
}

export type HealthMap = Record<string, HealthResult>

/**
 * 浏览器端健康检查：no-cors fetch 只关心「是否可达 + 延迟」。
 * opaque response 拿不到状态码，对自建 HTTPS 站点足够用；
 * HTTPS 页面探测 HTTP 端点会被混合内容拦截 → 统一表现为 down。
 */
export async function checkService(service: ServiceDef, timeoutMs = 8000): Promise<HealthResult> {
    const startedAt = performance.now()
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), timeoutMs)
    try {
        await fetch(service.url, { mode: 'no-cors', cache: 'no-store', signal: controller.signal })
        return {
            id: service.id,
            status: 'up',
            latencyMs: Math.round(performance.now() - startedAt),
            checkedAt: Date.now()
        }
    } catch (error) {
        const aborted = error instanceof DOMException && error.name === 'AbortError'
        return {
            id: service.id,
            status: 'down',
            latencyMs: null,
            checkedAt: Date.now(),
            error: aborted ? `超过 ${Math.round(timeoutMs / 1000)}s 未响应` : '网络不可达'
        }
    } finally {
        window.clearTimeout(timer)
    }
}

/** 带并发窗口的批量检查，避免几十个 fetch 同时打出 */
export async function checkServices(services: ServiceDef[], concurrency = 4): Promise<HealthResult[]> {
    const results: HealthResult[] = []
    const queue = [...services]

    async function worker() {
        while (queue.length > 0) {
            const next = queue.shift()
            if (!next) break
            results.push(await checkService(next))
        }
    }

    await Promise.all(Array.from({ length: Math.min(concurrency, services.length) }, worker))
    return results
}
