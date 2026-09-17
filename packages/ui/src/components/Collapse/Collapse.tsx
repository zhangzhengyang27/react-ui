import { useRef } from 'react'
import { useCollapse, useHorizontalCollapse, useIsomorphicEffect, useReducedMotion } from '@xiaoye-react/hooks'
import {
    Activity,
    Box,
    BoxProps,
    Factory,
    factory,
    getStyleObject,
    useUIEnv,
    useUITheme,
    useProps
} from '../../core'

export interface CollapseProps extends BoxProps, Omit<React.ComponentProps<'div'>, keyof BoxProps | 'onTransitionStart' | 'onTransitionEnd'> {
    /** Collapse orientation @default 'vertical' */
    orientation?: 'vertical' | 'horizontal'

    /** Expanded state */
    expanded: boolean

    /** Called when the transition ends */
    onTransitionEnd?: () => void

    /** Called when transition starts */
    onTransitionStart?: () => void

    /** Transition duration in ms @default 200 */
    transitionDuration?: number

    /** Transition timing function @default ease */
    transitionTimingFunction?: string

    /** Determines whether the opacity is animated @default true */
    animateOpacity?: boolean

    /** If set, the element is kept in the DOM when collapsed. When `true`, React 19 `Activity` is used to preserve state while collapsed. When `false`, the element is unmounted after the exit animation. @default true */
    keepMounted?: boolean
}

export type CollapseFactory = Factory<{
    props: CollapseProps
    ref: HTMLDivElement
}>

const defaultProps = {
    transitionDuration: 200,
    transitionTimingFunction: 'ease',
    animateOpacity: true,
    orientation: 'vertical',
    keepMounted: true
} satisfies Partial<CollapseProps>

/**
 * 折叠容器：基于 useCollapse 实现高度/宽度过渡动画。
 * 对齐 ui Collapse。引擎无关（Box + 内联样式 + React 19 Activity）。
 */
export const Collapse = factory<CollapseFactory>((props, ref) => {
    const {
        children,
        expanded,
        transitionDuration,
        transitionTimingFunction,
        style,
        onTransitionEnd,
        onTransitionStart,
        animateOpacity,
        keepMounted,
        orientation,
        ...others
    } = useProps('Collapse', defaultProps, props)

    const env = useUIEnv()
    const theme = useUITheme()
    const shouldReduceMotion = useReducedMotion()
    const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false
    const duration = reduceMotion ? 0 : transitionDuration
    const hook = orientation === 'horizontal' ? useHorizontalCollapse : useCollapse

    const collapse = hook({
        expanded,
        transitionDuration: duration,
        transitionTimingFunction,
        onTransitionEnd,
        onTransitionStart,
        keepMounted: false
    })

    // duration=0（显式 0 或 reduced motion）时走下方早退分支、不进入 useCollapse，
    // 消费者传入的 onTransitionStart/onTransitionEnd 会被静默丢弃，hooks 层的
    // finalizeTransition 兜底也被绕过；此处保持与 hooks 层一致的回调契约：
    // expanded 变化时同步触发一对回调（跳过首次挂载，与过渡语义对齐）
    const prevExpandedRef = useRef(expanded)
    useIsomorphicEffect(() => {
        if (duration !== 0) {
            prevExpandedRef.current = expanded
            return
        }
        if (prevExpandedRef.current !== expanded) {
            prevExpandedRef.current = expanded
            onTransitionStart?.()
            onTransitionEnd?.()
        }
    }, [expanded, duration])

    if (duration === 0) {
        if (keepMounted === true && env !== 'test') {
            return (
                <Activity mode={expanded ? 'visible' : 'hidden'}>
                    <Box {...others} style={style} ref={ref as any}>
                        {children}
                    </Box>
                </Activity>
            )
        }

        return expanded ? (
            <Box {...others} style={style} ref={ref as any}>
                {children}
            </Box>
        ) : null
    }

    const isExited = collapse.state === 'exited'

    let content: React.ReactNode
    if (keepMounted === false) {
        content = isExited ? null : children
    } else if (keepMounted === true) {
        content = <Activity mode={isExited ? 'hidden' : 'visible'}>{children}</Activity>
    } else {
        content = children
    }

    return (
        <Box
            {...others}
            {...collapse.getCollapseProps({
                style: {
                    opacity: expanded || !animateOpacity ? 1 : 0,
                    transition: animateOpacity ? `opacity ${duration}ms ${transitionTimingFunction}` : 'none',
                    ...getStyleObject(style, theme)
                },
                ref: ref as any
            })}
        >
            {content}
        </Box>
    )
})

Collapse.displayName = '@xiaoye-react/ui/Collapse'

export namespace Collapse {
    export type Props = CollapseProps
    export type Factory = CollapseFactory
}
