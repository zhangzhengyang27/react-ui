import { useCallback, useEffect, useRef, useState } from 'react'
import {
    arrow,
    autoUpdate,
    flip,
    inline,
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
import { useId } from '@xiaoye-react/hooks'
import type { FloatingAxesOffsets, FloatingPosition, FloatingStrategy } from '../../core'

export interface TooltipMiddlewares {
    shift?: boolean
    flip?: boolean
    inline?: boolean
}

interface UseTooltipReturn {
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
}

interface UseTooltipOptions {
    position: FloatingPosition
    closeDelay?: number
    openDelay?: number
    onPositionChange?: (position: FloatingPosition) => void
    opened?: boolean
    defaultOpened?: boolean
    offset: number | FloatingAxesOffsets
    arrowRef?: React.RefObject<HTMLDivElement | null>
    arrowOffset?: number
    events?: { hover: boolean; focus: boolean; touch: boolean }
    inline?: boolean
    strategy?: FloatingStrategy
    middlewares?: TooltipMiddlewares
}

function getTooltipMiddlewares(settings: UseTooltipOptions): Middleware[] {
    const middlewares: Middleware[] = [offset(settings.offset)]

    if (settings.middlewares?.shift !== false) {
        middlewares.push(shift({ padding: 8 }))
    }

    if (settings.middlewares?.flip !== false) {
        middlewares.push(flip())
    }

    middlewares.push(arrow({ element: settings.arrowRef!, padding: settings.arrowOffset }))

    if (settings.middlewares?.inline || settings.inline) {
        middlewares.push(inline())
    }

    return middlewares
}

export function useTooltip(settings: UseTooltipOptions): UseTooltipReturn {
    const [uncontrolledOpened, setUncontrolledOpened] = useState(settings.defaultOpened)
    const controlled = typeof settings.opened === 'boolean'
    const opened = controlled ? settings.opened : uncontrolledOpened
    const uid = useId()

    const onChange = useCallback((_opened: boolean) => {
        setUncontrolledOpened(_opened)
    }, [])

    const {
        x,
        y,
        context,
        refs,
        placement,
        middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }
    } = useFloating({
        strategy: settings.strategy,
        placement: settings.position,
        open: opened,
        onOpenChange: onChange,
        middleware: getTooltipMiddlewares(settings),
        whileElementsMounted: autoUpdate
    })

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useHover(context, {
            enabled: settings.events?.hover,
            delay: { open: settings.openDelay, close: settings.closeDelay },
            mouseOnly: !settings.events?.touch
        }),
        useFocus(context, { enabled: settings.events?.focus, visibleOnly: true }),
        useRole(context, { role: 'tooltip' }),
        useDismiss(context, { enabled: typeof settings.opened === 'undefined' })
    ])

    // onPositionChange 不能在渲染阶段调用（用户回调内 setState 会触发 render-phase 更新警告），
    // 改为在 effect 中比对 placement 变化后再调用
    const previousPlacementRef = useRef(placement)
    useEffect(() => {
        if (previousPlacementRef.current !== placement) {
            previousPlacementRef.current = placement
            settings.onPositionChange?.(placement)
        }
    }, [placement, settings.onPositionChange])

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
        placement: placement as FloatingPosition
    }
}
