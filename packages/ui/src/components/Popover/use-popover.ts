import { useCallback, useEffect, useRef, useState } from 'react'
import {
    useFloating,
    offset as offsetMiddleware,
    flip as flipMiddleware,
    shift as shiftMiddleware,
    arrow as arrowMiddleware,
    type Placement
} from '@floating-ui/react'
import { useId, useUncontrolled } from '@xiaoye-react/hooks'
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

/**
 * 将库内部 FloatingPosition 映射为 floating-ui 的 Placement。
 * 两者语义一致（side / side-start / side-end），仅做类型归一化。
 */
function toPlacement(position: FloatingPosition): Placement {
    return position as Placement
}

export function usePopover(options: UsePopoverOptions): UsePopoverReturn {
    const [_opened, setOpened] = useUncontrolled({
        value: options.opened,
        defaultValue: options.defaultOpened,
        finalValue: false,
        onChange: options.onChange
    })

    const placement = toPlacement(options.position)

    // 用 ref 持有最新 middlewares，避免内联对象（middlewares={{ flip: true }}）每次渲染
    // 进入 useFloating 的 deps 导致浮层重建/重算；flip/shift 布尔驱动 middleware 开关。
    const middlewaresRef = useRef(options.middlewares)
    middlewaresRef.current = options.middlewares

    const flipEnabled = options.middlewares?.flip ?? false
    const shiftEnabled = options.middlewares?.shift ?? false

    // arrow middleware 始终在存在 arrowRef 时启用；floating-ui 会动态读取 element，
    // 箭头元素尚未挂载（current 为 null）时会安全跳过，挂载后自动参与定位。
    const middlewares = [
        offsetMiddleware(options.offset),
        ...(flipEnabled ? [flipMiddleware()] : []),
        ...(shiftEnabled ? [shiftMiddleware()] : []),
        ...(options.arrowRef ? [arrowMiddleware({ element: options.arrowRef, padding: options.arrowOffset })] : [])
    ]

    const { x, y, refs, middlewareData, update } = useFloating({
        placement,
        middleware: middlewares
    })

    // floating-ui 的 middlewareData.arrow 坐标为浮层内相对偏移，保持兼容返回结构。
    const arrowData = middlewareData.arrow as { x?: number; y?: number } | null

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

    // 打开时重新计算位置
    useEffect(() => {
        if (_opened) {
            update()
        }
    }, [_opened, update])

    // onPositionChange：比对 placement 变化后调用，避免渲染阶段调用用户回调
    const previousPlacementRef = useRef(placement)
    useEffect(() => {
        if (previousPlacementRef.current !== placement) {
            previousPlacementRef.current = placement
            options.onPositionChange?.(placement as FloatingPosition)
        }
    }, [placement, options.onPositionChange])

    return {
        floating: {
            x,
            y,
            placement: placement as FloatingPosition,
            refs: {
                setReference: node => refs.setReference(node),
                setFloating: node => refs.setFloating(node)
            },
            middlewareData: { arrow: arrowData ?? undefined }
        },
        controlled: typeof options.opened === 'boolean',
        opened: _opened,
        onClose,
        onToggle
    }
}

export { useId }
