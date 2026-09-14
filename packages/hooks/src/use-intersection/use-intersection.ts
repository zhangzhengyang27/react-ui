import { useCallback, useRef, useState } from 'react'

export interface UseIntersectionReturnValue<T> {
    ref: React.RefCallback<T | null>
    entry: IntersectionObserverEntry | null
}

export function useIntersection<T extends HTMLElement = any>(
    options?: IntersectionObserverInit
): UseIntersectionReturnValue<T> {
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

    const observer = useRef<IntersectionObserver | null>(null)
    // options 经 ref 转发：threshold 数组等内联引用不再每渲染 disconnect/重建 observer
    const optionsRef = useRef(options)
    optionsRef.current = options

    const ref: React.RefCallback<T | null> = useCallback(
        (element) => {
            if (observer.current) {
                observer.current.disconnect()
                observer.current = null
            }

            if (element === null) {
                setEntry(null)
                return
            }

            observer.current = new IntersectionObserver(([_entry]) => {
                setEntry(_entry)
            }, optionsRef.current)

            observer.current.observe(element)
        },
        []
    )

    return { ref, entry }
}

export namespace useIntersection {
    export type ReturnValue<T> = UseIntersectionReturnValue<T>
}
