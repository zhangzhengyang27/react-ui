import { useEffect, useRef } from 'react'
import { Box, BoxProps, Factory, factory, StylesApiProps, useDirection, useProps, useStyles } from '../../../core'
import classes from '../Splitter.module.css'
import { useSplitterContext } from '../SplitterContext'

export interface SplitterResizerProps extends BoxProps, StylesApiProps<SplitterResizerFactory> {
    /** Index of the resizer between panel index and index + 1 */
    index: number
}

export type SplitterResizerFactory = Factory<{
    props: SplitterResizerProps
    ref: HTMLDivElement
    stylesNames: 'resizer'
}>

const defaultProps = {} satisfies Partial<SplitterResizerProps>

export const SplitterResizer = factory<SplitterResizerFactory>((_props, ref) => {
    const props = useProps('SplitterResizer', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, index, ...others } = props
    const ctx = useSplitterContext()
    const { dir } = useDirection()
    const startStateRef = useRef<{ sizes: number[]; position: number; containerSize: number } | null>(null)
    // 记录挂到 document 上的拖拽监听器实例,卸载时精确移除对应的函数引用
    const dragListenersRef = useRef<{ move: (event: MouseEvent) => void; up: () => void } | null>(null)

    const removeDragListeners = () => {
        if (dragListenersRef.current) {
            document.removeEventListener('mousemove', dragListenersRef.current.move)
            document.removeEventListener('mouseup', dragListenersRef.current.up)
            dragListenersRef.current = null
        }
    }

    // 拖拽进行中组件卸载时监听器不会自然移除,在 cleanup 中兜底,避免内存泄漏
    useEffect(() => {
        return () => {
            removeDragListeners()
        }
    }, [])

    const getStyles = useStyles<SplitterResizerFactory>({
        name: 'Splitter',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        rootSelector: 'resizer'
    })

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        const container = ctx.containerRef.current
        if (!container) return

        const rect = container.getBoundingClientRect()
        const containerSize = ctx.orientation === 'horizontal' ? rect.width : rect.height
        const position = ctx.orientation === 'horizontal' ? event.clientX : event.clientY

        startStateRef.current = {
            sizes: [...ctx.sizes],
            position,
            containerSize
        }

        removeDragListeners()
        dragListenersRef.current = { move: handleMouseMove, up: handleMouseUp }
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseMove = (event: MouseEvent) => {
        if (!startStateRef.current) return
        const { sizes, position, containerSize } = startStateRef.current
        const currentPosition = ctx.orientation === 'horizontal' ? event.clientX : event.clientY
        let deltaPercent = ((currentPosition - position) / containerSize) * 100
        // RTL 下水平分栏的面板行被反排（panel[index] 在右侧），拖拽方向语义相反
        if (ctx.orientation === 'horizontal' && dir === 'rtl') {
            deltaPercent = -deltaPercent
        }

        const nextSizes = [...sizes]
        nextSizes[index] = Math.max(5, Math.min(95, sizes[index] + deltaPercent))
        nextSizes[index + 1] = Math.max(5, Math.min(95, sizes[index + 1] - deltaPercent))

        // Normalize when one panel hits the boundary
        const total = nextSizes[index] + nextSizes[index + 1]
        if (total !== sizes[index] + sizes[index + 1]) {
            const originalTotal = sizes[index] + sizes[index + 1]
            nextSizes[index] = (nextSizes[index] / total) * originalTotal
            nextSizes[index + 1] = (nextSizes[index + 1] / total) * originalTotal

            // 等比重缩放可能击穿 5% 最小宽度约束,优先保最小宽度:
            // 低于下限的一侧拉回 5,另一侧吸收差值以维持总和不变
            if (nextSizes[index] < 5) {
                nextSizes[index + 1] -= 5 - nextSizes[index]
                nextSizes[index] = 5
            } else if (nextSizes[index + 1] < 5) {
                nextSizes[index] -= 5 - nextSizes[index + 1]
                nextSizes[index + 1] = 5
            }
        }

        ctx.setSizes(nextSizes)
    }

    const handleMouseUp = () => {
        startStateRef.current = null
        removeDragListeners()
    }

    // 键盘调整步长 1%,与拖拽的百分比单位一致,且细于 5% 最小宽度约束
    const KEYBOARD_STEP = 1

    // 键盘与拖拽共用的最小面板宽度约束
    const MIN_SIZE = 5

    // 按 deltaPercent 调整当前 resizer 两侧面板:主动侧 clamp 到 [5, total-5]
    // (保证另一侧也满足 5% 下限),另一侧吸收差值,两侧总量保持不变
    const adjustSizes = (deltaPercent: number) => {
        const total = ctx.sizes[index] + ctx.sizes[index + 1]
        // 两侧无法同时满足 5% 下限时(如动态新增的 0 宽面板)不响应,避免算出负宽度
        if (total < MIN_SIZE * 2) return

        const next = Math.max(MIN_SIZE, Math.min(total - MIN_SIZE, ctx.sizes[index] + deltaPercent))
        if (next === ctx.sizes[index]) return

        const nextSizes = [...ctx.sizes]
        nextSizes[index] = next
        nextSizes[index + 1] = total - next
        ctx.setSizes(nextSizes)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        // 水平分栏(面板左右排列)用 Left/Right,垂直分栏(面板上下排列)用 Up/Down,
        // 正向键使 index 侧面板增大,与拖拽方向语义一致
        const isHorizontal = ctx.orientation === 'horizontal'
        let delta = 0

        if (event.key === (isHorizontal ? 'ArrowLeft' : 'ArrowUp')) {
            delta = -KEYBOARD_STEP
        } else if (event.key === (isHorizontal ? 'ArrowRight' : 'ArrowDown')) {
            delta = KEYBOARD_STEP
        } else {
            return
        }

        // RTL 水平分栏：方向键语义跟随视觉方向反转
        if (isHorizontal && dir === 'rtl') {
            delta = -delta
        }

        event.preventDefault()
        adjustSizes(delta)
    }

    return (
        <Box
            ref={ref}
            role="separator"
            data-orientation={ctx.orientation}
            // 可聚焦的分隔条:aria-valuenow 表达 index 侧面板占比;
            // 水平分栏的分隔条本身是竖直的,aria-orientation 按分隔条自身方向取值
            tabIndex={0}
            aria-orientation={ctx.orientation === 'horizontal' ? 'vertical' : 'horizontal'}
            // 与实际拖拽钳位一致（MIN_SIZE 约束）：此前声明 0-100，读屏报告的范围与
            // 实际可调范围不符
            aria-valuemin={5}
            aria-valuemax={95}
            aria-valuenow={Math.round(ctx.sizes[index] ?? 0)}
            {...getStyles('resizer')}
            onMouseDown={handleMouseDown}
            onKeyDown={handleKeyDown}
            {...others}
        />
    )
})

SplitterResizer.classes = classes
SplitterResizer.displayName = '@xiaoye-react/ui/SplitterResizer'

export namespace SplitterResizer {
    export type Props = SplitterResizerProps
    export type Factory = SplitterResizerFactory
}
