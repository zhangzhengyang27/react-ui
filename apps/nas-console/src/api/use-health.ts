import { useInterval } from '@xiaoye-react/hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ServiceDef } from '../config/services'
import { checkServices, type HealthMap } from './health'

export interface UseHealthOptions {
    /** 轮询间隔（秒），最小 15 */
    intervalSec: number
    timeoutMs?: number
}

/**
 * 批量健康检查：挂载即跑一轮，之后按 intervalSec 轮询。
 * services 以 id 串作为依赖，避免调用方每次渲染传新数组导致重复检查。
 */
export function useHealthChecks(services: ServiceDef[], { intervalSec, timeoutMs = 8000 }: UseHealthOptions) {
    const [results, setResults] = useState<HealthMap>({})
    const [running, setRunning] = useState(false)

    const checkable = useMemo(() => services.filter((s) => s.checkable), [services])
    const checkableKey = checkable.map((s) => s.id).join(',')

    const refresh = useCallback(async () => {
        if (checkable.length === 0) return
        setRunning(true)
        try {
            const batch = await checkServices(checkable, 4)
            setResults((prev) => {
                const next = { ...prev }
                for (const r of batch) next[r.id] = r
                return next
            })
        } finally {
            setRunning(false)
        }
    }, [checkableKey, timeoutMs])

    useEffect(() => {
        void refresh()
    }, [checkableKey])

    useInterval(refresh, Math.max(15, intervalSec) * 1000, { autoInvoke: true })

    return { results, running, refresh }
}
