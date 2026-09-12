/**
 * Umami API 客户端（浏览器直连；Umami 对 /api/* 开放 CORS）。
 * token 缓存在 sessionStorage，401 时自动重登一次。
 * 账号来自设置页，仅存浏览器 localStorage，不进仓库。
 */

export interface UmamiWebsite {
    id: string
    name: string
    domain: string
}

export interface UmamiStats {
    pageviews: number
    visitors: number
    visits: number
    bounces: number
    totaltime: number
    comparison?: UmamiStats
}

export interface UmamiPoint {
    x: string
    y: number
}

export interface UmamiPageviews {
    pageviews: UmamiPoint[]
    sessions: UmamiPoint[]
}

export interface UmamiMetric {
    x: string
    y: number
}

export interface UmamiCreds {
    baseUrl: string
    username: string
    password: string
}

export class UmamiError extends Error {}

export class UmamiAuthError extends UmamiError {}

const TOKEN_KEY = 'nas-console-umami-token'

function readToken(): string | null {
    try {
        return sessionStorage.getItem(TOKEN_KEY)
    } catch {
        return null
    }
}

function writeToken(token: string | null) {
    try {
        if (token) {
            sessionStorage.setItem(TOKEN_KEY, token)
        } else {
            sessionStorage.removeItem(TOKEN_KEY)
        }
    } catch {
        // 隐私模式下 sessionStorage 不可用，降级为内存态即可
    }
}

export function clearUmamiSession() {
    writeToken(null)
}

function assertCreds({ username, password, baseUrl }: UmamiCreds) {
    if (!baseUrl) throw new UmamiAuthError('未配置 Umami 部署地址')
    if (!username || !password) throw new UmamiAuthError('未配置 Umami 账号，请到「设置」页填写')
}

async function login({ baseUrl, username, password }: UmamiCreds): Promise<string> {
    assertCreds({ baseUrl, username, password })
    const res = await fetch(new URL('/api/auth/login', baseUrl), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    if (res.status === 401 || res.status === 403) {
        throw new UmamiAuthError('Umami 账号或密码错误')
    }
    if (!res.ok) {
        throw new UmamiError(`Umami 登录失败（HTTP ${res.status}）`)
    }
    const data = (await res.json()) as { token?: string }
    if (!data.token) {
        throw new UmamiError('Umami 登录响应中缺少 token')
    }
    writeToken(data.token)
    return data.token
}

async function request<T>(
    creds: UmamiCreds,
    path: string,
    params?: Record<string, string | number | undefined>
): Promise<T> {
    const url = new URL(path, creds.baseUrl)
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined) url.searchParams.set(key, String(value))
        }
    }

    let token = readToken()
    if (!token) {
        token = await login(creds)
    }

    const doFetch = (t: string) => fetch(url, { headers: { Authorization: `Bearer ${t}` } })
    let res = await doFetch(token)
    if (res.status === 401) {
        clearUmamiSession()
        token = await login(creds)
        res = await doFetch(token)
    }
    if (res.status === 401 || res.status === 403) {
        throw new UmamiAuthError('Umami 授权失败，请检查账号')
    }
    if (!res.ok) {
        throw new UmamiError(`Umami API ${path} 请求失败（HTTP ${res.status}）`)
    }
    return (await res.json()) as T
}

export async function fetchUmamiWebsites(creds: UmamiCreds): Promise<UmamiWebsite[]> {
    const data = await request<{ data?: UmamiWebsite[] }>(creds, '/api/websites')
    return data.data ?? []
}

export async function fetchUmamiStats(
    creds: UmamiCreds,
    websiteId: string,
    startAt: number,
    endAt: number
): Promise<UmamiStats> {
    return request<UmamiStats>(creds, `/api/websites/${websiteId}/stats`, { startAt, endAt })
}

export async function fetchUmamiPageviews(
    creds: UmamiCreds,
    websiteId: string,
    options: { startAt: number; endAt: number; unit: 'minute' | 'hour' | 'day'; timezone?: string }
): Promise<UmamiPageviews> {
    return request<UmamiPageviews>(creds, `/api/websites/${websiteId}/pageviews`, options)
}

export async function fetchUmamiMetrics(
    creds: UmamiCreds,
    websiteId: string,
    type: 'path' | 'referrer' | 'browser' | 'os' | 'device' | 'country',
    startAt: number,
    endAt: number
): Promise<UmamiMetric[]> {
    const data = await request<UmamiMetric[] | { data?: UmamiMetric[] }>(
        creds,
        `/api/websites/${websiteId}/metrics`,
        { startAt, endAt, type }
    )
    return Array.isArray(data) ? data : (data.data ?? [])
}

export async function fetchUmamiActive(creds: UmamiCreds, websiteId: string): Promise<number> {
    const data = await request<number | { x?: number; visitors?: number }>(
        creds,
        `/api/websites/${websiteId}/active`
    )
    if (typeof data === 'number') return data
    return data.visitors ?? data.x ?? 0
}

/** Umami 官方文档未提供封端接口，这里按范围换算 startAt/endAt（毫秒）与聚合单位 */
export function resolveRange(
    range: '24h' | '7d' | '30d',
    now = Date.now()
): { startAt: number; endAt: number; unit: 'hour' | 'day' } {
    const endAt = now
    if (range === '24h') {
        return { startAt: now - 24 * 3600_000, endAt, unit: 'hour' }
    }
    const days = range === '7d' ? 7 : 30
    return { startAt: now - days * 24 * 3600_000, endAt, unit: 'day' }
}
