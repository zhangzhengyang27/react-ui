import { useEffect, useRef } from 'react'

export function useWindowEvent<K extends string>(
    type: K,
    listener: K extends keyof WindowEventMap
        ? (this: Window, ev: WindowEventMap[K]) => void
        : (this: Window, ev: CustomEvent) => void,
    options?: boolean | AddEventListenerOptions
) {
    const listenerRef = useRef(listener)
    listenerRef.current = listener as any

    useEffect(() => {
        const stableListener = ((...args: any[]) => (listenerRef.current as any)(...args)) as EventListener

        window.addEventListener(type as any, stableListener, options)
        return () => window.removeEventListener(type as any, stableListener, options)
    }, [type])
}
