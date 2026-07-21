import { useCallback, useEffect, useRef, useState } from 'react'
import { useId, useIsomorphicEffect, useUncontrolled } from '@react-ui/hooks'
import type { FloatingAxesOffsets, FloatingPosition } from '../../core'
import type { PopoverMiddlewares } from './Popover.types'

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
    middlewares: PopoverMiddlewares | undefined
    arrowRef: React.RefObject<HTMLDivElement | null>
    arrowOffset: number
    disabled: boolean | undefined
}

function resolveOffset(offset: number | FloatingAxesOffsets): number {
    return typeof offset === 'number' ? offset : (offset.mainAxis ?? 0) + (offset.crossAxis ?? 0)
}

function computePosition(
    reference: HTMLElement,
    floating: HTMLElement,
    position: FloatingPosition,
    offset: number,
    middlewares?: PopoverMiddlewares
): { x: number; y: number; placement: FloatingPosition } {
    const refRect = reference.getBoundingClientRect()
    const floatRect = floating.getBoundingClientRect()
    const scrollX = window.scrollX
    const scrollY = window.scrollY
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const [initialSide, align] = position.split('-') as [string, string | undefined]
    let side = initialSide

    // flip：检查当前方向是否超出视口，超出则尝试反方向
    if (middlewares?.flip) {
        if (side === 'bottom' && refRect.bottom + floatRect.height + offset > viewportHeight) {
            side = 'top'
        } else if (side === 'top' && refRect.top - floatRect.height - offset < 0) {
            side = 'bottom'
        } else if (side === 'right' && refRect.right + floatRect.width + offset > viewportWidth) {
            side = 'left'
        } else if (side === 'left' && refRect.left - floatRect.width - offset < 0) {
            side = 'right'
        }
    }

    const placement = (align ? `${side}-${align}` : side) as FloatingPosition

    let x = 0
    let y = 0

    if (side === 'top' || side === 'bottom') {
        x = refRect.left + scrollX
        if (side === 'bottom') {
            y = refRect.bottom + scrollY + offset
        } else {
            // getBoundingClientRect 返回视口坐标，需 + scrollY 转文档绝对坐标
            y = refRect.top + scrollY - floatRect.height - offset
        }
    } else {
        y = refRect.top + scrollY
        if (side === 'right') {
            x = refRect.right + scrollX + offset
        } else {
            x = refRect.left + scrollX - floatRect.width - offset
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

    // shift：交叉轴方向 clamp 到视口内
    if (middlewares?.shift) {
        if (side === 'top' || side === 'bottom') {
            const viewLeft = scrollX
            const viewRight = scrollX + viewportWidth
            if (x < viewLeft) x = viewLeft
            if (x + floatRect.width > viewRight) x = viewRight - floatRect.width
        } else {
            const viewTop = scrollY
            const viewBottom = scrollY + viewportHeight
            if (y < viewTop) y = viewTop
            if (y + floatRect.height > viewBottom) y = viewBottom - floatRect.height
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

    // middlewares 常以内联对象传入（如 middlewares={{ flip: true }}），每次渲染都是新引用；
    // 若将其放入 update 的依赖数组，会导致 update 重建 → 定位 effect 重跑 → 无限渲染循环。
    // 因此用 ref 持有最新值，依赖数组只保留原始值（flip/shift 布尔）。
    const middlewaresRef = useRef(options.middlewares)
    middlewaresRef.current = options.middlewares

    const update = useCallback(() => {
        const reference = referenceRef.current
        const floating = floatingRef.current
        if (!reference || !floating) return

        const computed = computePosition(
            reference,
            floating,
            options.position,
            resolveOffset(options.offset),
            middlewaresRef.current
        )
        // 值未变化时返回 prev，避免 setState 触发不必要的重渲染（同时也是循环的熔断器）
        setPosition(prev =>
            prev.x === computed.x && prev.y === computed.y && prev.placement === computed.placement
                ? prev
                : computed
        )

        const nextArrow = computeArrow(
            reference,
            floating,
            computed.placement,
            options.arrowRef.current,
            options.arrowOffset
        )
        setArrowData(prev => (prev.x === nextArrow.x && prev.y === nextArrow.y ? prev : nextArrow))
    }, [
        options.position,
        options.offset,
        options.middlewares?.flip,
        options.middlewares?.shift,
        options.arrowRef,
        options.arrowOffset
    ])

    const onClose = useCallback(() => {
        if (_opened) {
            setOpened(false)
            options.onClose?.()
        }
    }, [_opened, options.onClose, setOpened])

    const onToggle = useCallback(() => {
        // disabled 仅阻止打开，已打开状态下允许关闭，避免 Popover 卡死
        if (options.disabled && !_opened) return
        const next = !_opened
        setOpened(next)
        if (next) {
            options.onOpen?.()
        } else {
            options.onClose?.()
        }
    }, [_opened, options.disabled, options.onOpen, options.onClose, setOpened])

    // rAF id 存入 ref：重调时先取消上一帧避免堆积，卸载时统一 cancel，防止卸载后仍执行 update
    const rafRef = useRef(-1)

    const scheduleUpdate = useCallback(() => {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(update)
    }, [update])

    const setReference = useCallback((node: HTMLElement | null) => {
        referenceRef.current = node
        if (node && _opened) {
            scheduleUpdate()
        }
    }, [_opened, scheduleUpdate])

    const setFloating = useCallback((node: HTMLElement | null) => {
        floatingRef.current = node
        if (node && _opened) {
            scheduleUpdate()
        }
    }, [_opened, scheduleUpdate])

    useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

    // 打开时计算定位（SSR 下退化为 useEffect，避免 useLayoutEffect 警告）
    useIsomorphicEffect(() => {
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

    // onPositionChange 不能在渲染阶段调用（用户回调内 setState 会触发 render-phase 更新警告），
    // 改为在 effect 中比对 placement 变化后再调用
    const previousPlacementRef = useRef(position.placement)
    useEffect(() => {
        if (previousPlacementRef.current !== position.placement) {
            previousPlacementRef.current = position.placement
            options.onPositionChange?.(position.placement)
        }
    }, [position.placement, options.onPositionChange])

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
