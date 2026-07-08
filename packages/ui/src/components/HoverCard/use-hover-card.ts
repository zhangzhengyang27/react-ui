import { useCallback, useRef, useState } from 'react'
import {
    arrow,
    autoUpdate,
    flip,
    offset,
    shift,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useRole,
    type Middleware
} from '@floating-ui/react'
import { useId } from '@react-ui/hooks'
import type { FloatingAxesOffsets, FloatingPosition, FloatingStrategy } from '../../core'

export interface HoverCardMiddlewares {
    shift?: boolean
    flip?: boolean
}

interface UseHoverCardReturn {
    x: number | undefined
    y: number | undefined
    arrowX: number | undefined
    arrowY: number | undefined
    reference: (node: HTMLElement | null) => void
    floating: (node: HTMLElement | null) => void
    getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>
    getReferenceProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>
    opened: boolean | undefined
    placement: FloatingPosition
    uid: string
}

interface UseHoverCardOptions {
    position: FloatingPosition
    offset: number | FloatingAxesOffsets
    openDelay?: number
    closeDelay?: number
    opened?: boolean
    defaultOpened?: boolean
    onOpen?: () => void
    onClose?: () => void
    onPositionChange?: (position: FloatingPosition) => void
    arrowRef: React.RefObject<HTMLDivElement | null>
    arrowOffset?: number
    strategy?: FloatingStrategy
    middlewares?: HoverCardMiddlewares
}

function getHoverCardMiddlewares(options: UseHoverCardOptions): Middleware[] {
    const middlewares: Middleware[] = [offset(options.offset)]

    if (options.middlewares?.shift !== false) {
        middlewares.push(shift({ padding: 8 }))
    }

    if (options.middlewares?.flip !== false) {
        middlewares.push(flip())
    }

    middlewares.push(arrow({ element: options.arrowRef!, padding: options.arrowOffset }))

    return middlewares
}

export function useHoverCard(options: UseHoverCardOptions): UseHoverCardReturn {
    const [uncontrolledOpened, setUncontrolledOpened] = useState(options.defaultOpened)
    const controlled = typeof options.opened === 'boolean'
    const opened = controlled ? options.opened : uncontrolledOpened
    const uid = useId()

    const openTimeout = useRef(-1)
    const closeTimeout = useRef(-1)

    const clearTimeouts = useCallback(() => {
        window.clearTimeout(openTimeout.current)
        window.clearTimeout(closeTimeout.current)
    }, [])

    const onChange = useCallback(
        (_opened: boolean) => {
            setUncontrolledOpened(_opened)
            if (_opened) {
                options.onOpen?.()
            } else {
                options.onClose?.()
            }
        },
        [options.onOpen, options.onClose]
    )

    const {
        x,
        y,
        context,
        refs,
        placement,
        middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }
    } = useFloating({
        strategy: options.strategy,
        placement: options.position,
        open: opened,
        onOpenChange: onChange,
        middleware: getHoverCardMiddlewares(options),
        whileElementsMounted: autoUpdate
    })

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useHover(context, {
            enabled: true,
            delay: { open: options.openDelay, close: options.closeDelay },
            mouseOnly: false
        }),
        useFocus(context, { enabled: true, visibleOnly: true }),
        useRole(context, { role: 'dialog' }),
        useDismiss(context, { enabled: !controlled })
    ])

    const previousPlacementRef = useRef(placement)
    if (previousPlacementRef.current !== placement) {
        previousPlacementRef.current = placement
        options.onPositionChange?.(placement)
    }

    return {
        x,
        y,
        arrowX,
        arrowY,
        reference: refs.setReference,
        floating: refs.setFloating,
        getFloatingProps,
        getReferenceProps,
        opened,
        placement: placement as FloatingPosition,
        uid
    }
}
