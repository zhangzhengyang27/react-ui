import { useCallback, useRef, useState } from 'react'
import { arrow, autoUpdate, flip, hide, inline, offset, shift, useFloating, type Middleware } from '@floating-ui/react'
import { useId, useUncontrolled } from '@react-ui/hooks'
import type { FloatingAxesOffsets, FloatingPosition, FloatingStrategy } from '../../core'
import type { PopoverMiddlewares, PopoverWidth } from './Popover.types'

interface UsePopoverFloating {
    x: number | undefined
    y: number | undefined
    placement: FloatingPosition
    refs: {
        setReference: (node: HTMLElement | null) => void
        setFloating: (node: HTMLElement | null) => void
    }
    middlewareData: {
        arrow?: { x?: number; y?: number }
    }
}

interface UsePopoverReturn {
    floating: UsePopoverFloating
    controlled: boolean
    opened: boolean
    onClose: () => void
    onToggle: () => void
}

interface UsePopoverOptions {
    offset: number | FloatingAxesOffsets
    position: FloatingPosition
    onPositionChange?: (position: FloatingPosition) => void
    opened: boolean | undefined
    defaultOpened: boolean | undefined
    onChange?: (opened: boolean) => void
    onClose?: () => void
    onOpen?: () => void
    width: PopoverWidth
    middlewares: PopoverMiddlewares | undefined
    arrowRef: React.RefObject<HTMLDivElement | null>
    arrowOffset: number
    strategy?: FloatingStrategy
    disabled: boolean | undefined
}

function getPopoverMiddlewares(options: UsePopoverOptions): Middleware[] {
    const middlewares: Middleware[] = [offset(options.offset), hide()]

    if (options.middlewares?.flip !== false) {
        middlewares.push(flip())
    }

    if (options.middlewares?.shift !== false) {
        middlewares.push(shift({ padding: 8 }))
    }

    if (options.middlewares?.inline) {
        middlewares.push(inline())
    }

    middlewares.push(arrow({ element: options.arrowRef, padding: options.arrowOffset }))

    return middlewares
}

export function usePopover(options: UsePopoverOptions): UsePopoverReturn {
    const [_opened, setOpened] = useUncontrolled({
        value: options.opened,
        defaultValue: options.defaultOpened,
        finalValue: false,
        onChange: options.onChange
    })

    const onClose = useCallback(() => {
        if (_opened && !options.disabled) {
            setOpened(false)
            options.onClose?.()
        }
    }, [_opened, options.disabled, options.onClose, setOpened])

    const onToggle = useCallback(() => {
        if (!options.disabled) {
            const next = !_opened
            setOpened(next)
            if (next) {
                options.onOpen?.()
            } else {
                options.onClose?.()
            }
        }
    }, [_opened, options.disabled, options.onOpen, options.onClose, setOpened])

    const floating = useFloating({
        open: _opened,
        strategy: options.strategy,
        placement: options.position,
        middleware: getPopoverMiddlewares(options),
        whileElementsMounted: autoUpdate
    })

    const previousPlacementRef = useRef(floating.placement)
    if (previousPlacementRef.current !== floating.placement) {
        previousPlacementRef.current = floating.placement
        options.onPositionChange?.(floating.placement)
    }

    return {
        floating: floating as UsePopoverFloating,
        controlled: typeof options.opened === 'boolean',
        opened: _opened,
        onClose,
        onToggle
    }
}

export { useId }
