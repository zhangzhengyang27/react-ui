import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
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

function resolveOffset(offset: number | FloatingAxesOffsets): number {
    return typeof offset === 'number' ? offset : (offset.mainAxis ?? 0) + (offset.crossAxis ?? 0)
}

function computePosition(
    reference: HTMLElement,
    floating: HTMLElement,
    position: FloatingPosition,
    offset: number
): { x: number; y: number; placement: FloatingPosition } {
    const refRect = reference.getBoundingClientRect()
    const floatRect = floating.getBoundingClientRect()
    const scrollX = window.scrollX
    const scrollY = window.scrollY

    let x = 0
    let y = 0
    let placement = position

    const [side, align] = position.split('-') as [string, string | undefined]

    if (side === 'top' || side === 'bottom') {
        x = refRect.left + scrollX
        if (side === 'bottom') {
            y = refRect.bottom + scrollY + offset
        } else {
            y = refRect.top - scrollY - floatRect.height - offset
        }
    } else {
        y = refRect.top + scrollY
        if (side === 'right') {
            x = refRect.right + scrollX + offset
        } else {
            x = refRect.left - scrollX - floatRect.width - offset
        }
    }

    if (align === 'start') {
        if (side === 'top' || side === 'bottom') {
            x = refRect.left + scrollX
        } else {
            y = refRect.top + scrollY
        }
    } else if (align === 'end') {
        if (side === 'top' || side === 'bottom') {
            x = refRect.right + scrollX - floatRect.width
        } else {
            y = refRect.bottom + scrollY - floatRect.height
        }
    } else {
        if (side === 'top' || side === 'bottom') {
            x = refRect.left + scrollX + (refRect.width - floatRect.width) / 2
        } else {
            y = refRect.top + scrollY + (refRect.height - floatRect.height) / 2
        }
    }

    return { x, y, placement }
}

function computeArrow(
    reference: HTMLElement,
    floating: HTMLElement,
    placement: FloatingPosition,
    arrowElement: HTMLElement | null,
    arrowOffset: number
): { x?: number; y?: number } {
    if (!arrowElement) return {}

    const refRect = reference.getBoundingClientRect()
    const floatRect = floating.getBoundingClientRect()
    const [side] = placement.split('-')

    if (side === 'top' || side === 'bottom') {
        const centerX = refRect.left + refRect.width / 2 - floatRect.left
        return { x: centerX - arrowElement.offsetWidth / 2 }
    } else {
        const centerY = refRect.top + refRect.height / 2 - floatRect.top
        return { y: centerY - arrowElement.offsetHeight / 2 }
    }
}

export function usePopover(options: UsePopoverOptions): UsePopoverReturn {
    const [_opened, setOpened] = useUncontrolled({
        value: options.opened,
        defaultValue: options.defaultOpened,
        finalValue: false,
        onChange: options.onChange
    })

    const referenceRef = useRef<HTMLElement | null>(null)
    const floatingRef = useRef<HTMLElement | null>(null)
    const [position, setPosition] = useState<{ x: number; y: number; placement: FloatingPosition }>({
        x: 0,
        y: 0,
        placement: options.position
    })
    const [arrowData, setArrowData] = useState<{ x?: number; y?: number }>({})

    const update = useCallback(() => {
        const reference = referenceRef.current
        const floating = floatingRef.current
        if (!reference || !floating) return

        const computed = computePosition(reference, floating, options.position, resolveOffset(options.offset))
        setPosition(computed)

        setArrowData(
            computeArrow(reference, floating, computed.placement, options.arrowRef.current, options.arrowOffset)
        )
    }, [options.position, options.offset, options.arrowRef, options.arrowOffset])

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

    const setReference = useCallback((node: HTMLElement | null) => {
        referenceRef.current = node
        if (node && _opened) {
            requestAnimationFrame(update)
        }
    }, [_opened, update])

    const setFloating = useCallback((node: HTMLElement | null) => {
        floatingRef.current = node
        if (node && _opened) {
            requestAnimationFrame(update)
        }
    }, [_opened, update])

    // 打开时计算定位
    useLayoutEffect(() => {
        if (!_opened) return
        update()
    }, [_opened, update])

    // 监听 resize/scroll，打开时重新计算
    useEffect(() => {
        if (!_opened) return
        const handle = () => update()
        window.addEventListener('resize', handle)
        window.addEventListener('scroll', handle, true)
        return () => {
            window.removeEventListener('resize', handle)
            window.removeEventListener('scroll', handle, true)
        }
    }, [_opened, update])

    const previousPlacementRef = useRef(position.placement)
    if (previousPlacementRef.current !== position.placement) {
        previousPlacementRef.current = position.placement
        options.onPositionChange?.(position.placement)
    }

    return {
        floating: {
            x: position.x,
            y: position.y,
            placement: position.placement,
            refs: { setReference, setFloating },
            middlewareData: { arrow: arrowData }
        },
        controlled: typeof options.opened === 'boolean',
        opened: _opened,
        onClose,
        onToggle
    }
}

export { useId }
