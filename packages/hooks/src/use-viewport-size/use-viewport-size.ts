import { useCallback, useEffect, useState } from 'react'
import { useWindowEvent } from '../use-window-event/use-window-event'

export interface UseViewportSizeReturnValue {
    width: number
    height: number
}

export function useViewportSize(): UseViewportSizeReturnValue {
    const [windowSize, setWindowSize] = useState<UseViewportSizeReturnValue>({
        width: 0,
        height: 0
    })

    const setSize = useCallback(() => {
        setWindowSize({ width: window.innerWidth || 0, height: window.innerHeight || 0 })
    }, [])

    useWindowEvent('resize', setSize, { passive: true })
    useWindowEvent('orientationchange', setSize, { passive: true })
    useEffect(setSize, [])

    return windowSize
}

export namespace useViewportSize {
    export type ReturnValue = UseViewportSizeReturnValue
}
