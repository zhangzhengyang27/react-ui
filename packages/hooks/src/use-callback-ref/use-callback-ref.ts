import { useInsertionEffect, useMemo, useRef } from 'react'

export function useCallbackRef<T extends (...args: any[]) => any>(callback: T | undefined): T {
    const callbackRef = useRef(callback)

    // useInsertionEffect 在 commit 阶段同步刷新，避免 commit 与 passive effect 之间
    // 触发的事件读到上一轮回调
    useInsertionEffect(() => {
        callbackRef.current = callback
    })

    return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, [])
}
