import { useCallback, useEffect, useRef, useState } from 'react'
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
import type { FloatingAxesOffsets, FloatingPosition } from '../../core'

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

    // onPositionChange 不能在渲染阶段调用（用户回调内 setState 会触发 render-phase 更新警告），
    // 改为在 effect 中比对 placement 变化后再调用
    const previousPlacementRef = useRef(placement)
    useEffect(() => {
        if (previousPlacementRef.current !== placement) {
            previousPlacementRef.current = placement
            options.onPositionChange?.(placement)
        }
    }, [placement, options.onPositionChange])

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
