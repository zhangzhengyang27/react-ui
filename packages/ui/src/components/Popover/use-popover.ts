import { useCallback, useEffect, useRef, useState } from 'react'
import {
    useFloating,
    offset as offsetMiddleware,
    flip as flipMiddleware,
    shift as shiftMiddleware,
    arrow as arrowMiddleware,
    autoUpdate,
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

    // computedPlacement 是 flip/shift 生效后的实际位置（可能与请求的 placement 不同），
    // 对外暴露与 onPositionChange 回调必须用它，否则翻转后箭头方向/回调全部错误
    const { x, y, refs, middlewareData, update, placement: computedPlacement } = useFloating({
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

    // 打开期间挂 autoUpdate：滚动 / 缩放 / 目标尺寸变化时自动重定位。
    // floating-ui 0.27 的 useFloating 不会自动接管这些更新，必须显式挂载；
    // autoUpdate 自身返回清理函数，关闭时解绑。
    useEffect(() => {
        if (_opened && refs.reference.current && refs.floating.current) {
            return autoUpdate(refs.reference.current, refs.floating.current, update)
        }
    }, [_opened, update])

    // onPositionChange：比对实际 placement（含 flip 后）变化后调用，避免渲染阶段调用用户回调
    const previousPlacementRef = useRef(computedPlacement)
    useEffect(() => {
        if (previousPlacementRef.current !== computedPlacement) {
            previousPlacementRef.current = computedPlacement
            options.onPositionChange?.(computedPlacement as FloatingPosition)
        }
    }, [computedPlacement, options.onPositionChange])

    return {
        floating: {
            x,
            y,
            placement: computedPlacement as FloatingPosition,
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
