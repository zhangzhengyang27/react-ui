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
    // 当前拖拽的 pointerId:多点触控/中断恢复时只响应发起拖拽的那根指针
    const activePointerIdRef = useRef<number | null>(null)
    // 记录挂到 document 上的拖拽监听器实例,卸载时精确移除对应的函数引用
    const dragListenersRef = useRef<{
        move: (event: PointerEvent) => void
        up: (event: PointerEvent) => void
        cancel: (event: PointerEvent) => void
    } | null>(null)

    const removeDragListeners = () => {
        if (dragListenersRef.current) {
            document.removeEventListener('pointermove', dragListenersRef.current.move)
            document.removeEventListener('pointerup', dragListenersRef.current.up)
            document.removeEventListener('pointercancel', dragListenersRef.current.cancel)
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

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        // 非主指针(多指触控的第二指)或非左键不启动拖拽
        if (!event.isPrimary || (event.button !== undefined && event.button !== 0)) {
            return
        }
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
        activePointerIdRef.current = event.pointerId

        removeDragListeners()
        dragListenersRef.current = { move: handlePointerMove, up: handlePointerUp, cancel: handlePointerCancel }
        document.addEventListener('pointermove', handlePointerMove)
        document.addEventListener('pointerup', handlePointerUp)
        document.addEventListener('pointercancel', handlePointerCancel)

        // 指针捕获:指针移出分隔条/窗口后事件流仍持续派发;部分环境(如 jsdom)
        // 未实现该 API 或对未知 pointerId 抛错,捕获失败时 document 监听仍生效
        if (typeof event.currentTarget.setPointerCapture === 'function') {
            try {
                event.currentTarget.setPointerCapture(event.pointerId)
            } catch {
                // 忽略:捕获失败不影响拖拽,document 级监听兜底
            }
        }
    }

    const handlePointerMove = (event: PointerEvent) => {
        if (!startStateRef.current || activePointerIdRef.current !== event.pointerId) return
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

    const endDrag = (event: PointerEvent) => {
        if (activePointerIdRef.current !== event.pointerId) return
        startStateRef.current = null
        activePointerIdRef.current = null
        removeDragListeners()
    }

    const handlePointerUp = (event: PointerEvent) => {
        endDrag(event)
    }

    // 触摸拖拽被系统手势(滚动/通知/电话)打断时浏览器派发 pointercancel:
    // 必须结束拖拽并移除监听,否则拖拽状态残留,之后任何指针移动都会在
    // 未按住按键的状态下持续改写 sizes("分栏自己跟着指针走")
    const handlePointerCancel = (event: PointerEvent) => {
        endDrag(event)
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
            onPointerDown={handlePointerDown}
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
