import { useEffect, useRef } from 'react'
import { useIsomorphicEffect } from '@xiaoye-react/hooks'

export function useResizeObserver(element: HTMLElement | null, onResize: () => void) {
    const callbackRef = useRef(onResize)

    useEffect(() => {
        callbackRef.current = onResize
    })

    useIsomorphicEffect(() => {
        let rAF = 0
        if (element) {
            const resizeObserver = new ResizeObserver(() => {
                cancelAnimationFrame(rAF)
                rAF = window.requestAnimationFrame(() => {
                    callbackRef.current()
                })
            })

            resizeObserver.observe(element)

            return () => {
                window.cancelAnimationFrame(rAF)
                resizeObserver.unobserve(element)
            }
        }

        return undefined
    }, [element])
}
