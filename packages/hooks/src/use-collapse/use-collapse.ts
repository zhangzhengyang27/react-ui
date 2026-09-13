import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { useDidUpdate } from '../use-did-update/use-did-update'
import { mergeRefs } from '../use-merged-ref/use-merged-ref'

function getAutoHeightDuration(height: number | string) {
    if (!height || typeof height === 'string') {
        return 0
    }
    const constant = height / 36
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10)
}

export function getElementHeight(elementRef: React.RefObject<HTMLElement | null>) {
    return elementRef.current ? elementRef.current.scrollHeight : 'auto'
}

export interface UseCollapseInput {
    /** Expanded state */
    expanded: boolean

    /** Transition duration in milliseconds, by default calculated based on content height */
    transitionDuration?: number

    /** Transition timing function, `ease` by default */
    transitionTimingFunction?: string

    /** Called when transition ends */
    onTransitionEnd?: () => void

    /** Called when transition starts */
    onTransitionStart?: () => void

    /** If true, collapsed content is kept in the DOM and hidden with `display: none` styles */
    keepMounted?: boolean
}

interface GetCollapsePropsInput {
    style?: CSSProperties
    ref?: React.Ref<HTMLDivElement>
}

interface GetCollapsePropsReturnValue {
    'aria-hidden': boolean
    inert: boolean
    ref: React.RefCallback<HTMLDivElement>
    onTransitionEnd: (event: React.TransitionEvent<Element>) => void
    style: React.CSSProperties
}

export type UseCollapseState = 'entering' | 'entered' | 'exiting' | 'exited'

export interface UseCollapseReturnValue {
    /** Current transition state */
    state: UseCollapseState

    /** Props to pass down to the collapsible element */
    getCollapseProps: (input?: GetCollapsePropsInput) => GetCollapsePropsReturnValue
}

/**
 * 垂直折叠动画 hook：通过测量内容高度对 height 做 transition。
 * 对齐 ui useCollapse。
 */
export function useCollapse({
    transitionDuration,
    transitionTimingFunction = 'ease',
    onTransitionEnd,
    onTransitionStart,
    expanded,
    keepMounted
}: UseCollapseInput): UseCollapseReturnValue {
    const collapsedStyles = {
        height: 0,
        overflow: 'hidden',
        ...(keepMounted ? {} : { display: 'none' })
    }

    const elementRef = useRef<HTMLElement>(null)
    const [styles, setStylesRaw] = useState<CSSProperties>(expanded ? {} : collapsedStyles)
    const [state, setState] = useState<UseCollapseState>(expanded ? 'entered' : 'exited')
    const setStyles = (newStyles: React.SetStateAction<CSSProperties>) => {
        flushSync(() => setStylesRaw(newStyles))
    }

    const mergeStyles = (newStyles: CSSProperties) => {
        setStyles(oldStyles => ({ ...oldStyles, ...newStyles }))
    }

    const getTransitionStyles = (height: number | string) => {
        const duration = transitionDuration ?? getAutoHeightDuration(height)
        return {
            transition: `height ${duration}ms ${transitionTimingFunction}, opacity ${duration}ms ${transitionTimingFunction}`
        }
    }

    // rAF 链句柄：卸载或 expanded 快速翻转时取消未完成的动画帧，
    // 避免卸载后 flushSync/setState 的脏副作用与新旧两条链的样式交错
    const rafIdsRef = useRef<number[]>([])
    const cancelPendingRafs = () => {
        rafIdsRef.current.forEach(id => window.cancelAnimationFrame(id))
        rafIdsRef.current = []
    }

    const queueRaf = (callback: () => void) => {
        const id = window.requestAnimationFrame(() => {
            rafIdsRef.current = rafIdsRef.current.filter(existing => existing !== id)
            callback()
        })
        rafIdsRef.current.push(id)
    }

    // 镜像最新状态：收尾兜底定时器在数帧后触发，闭包里的 expanded/styles 已过期
    const expandedRef = useRef(expanded)
    expandedRef.current = expanded
    const stylesRef = useRef(styles)
    stylesRef.current = styles
    const onTransitionEndRef = useRef(onTransitionEnd)
    onTransitionEndRef.current = onTransitionEnd

    const finalizeTimerRef = useRef<number | null>(null)
    const cancelFinalize = () => {
        if (finalizeTimerRef.current !== null) {
            window.clearTimeout(finalizeTimerRef.current)
            finalizeTimerRef.current = null
        }
    }

    // 把过渡落到终态（与 handleTransitionEnd 的收尾逻辑一致，幂等）。
    // duration=0 时 0ms 过渡不会派发 transitionend，必须直接调用；
    // duration>0 时作为 transitionend 丢失（如祖先 display:none）的超时兜底
    const finalizeTransition = () => {
        finalizeTimerRef.current = null
        if (expandedRef.current) {
            const height = getElementHeight(elementRef)
            if (height === stylesRef.current.height) {
                setStyles({})
            } else {
                mergeStyles({ height })
            }
            setState('entered')
            onTransitionEndRef.current?.()
        } else if (stylesRef.current.height === 0) {
            setStyles(collapsedStyles)
            setState('exited')
            onTransitionEndRef.current?.()
        }
    }

    const scheduleFinalize = (height: number | string) => {
        cancelFinalize()
        const duration = transitionDuration ?? getAutoHeightDuration(height)
        if (duration === 0) {
            finalizeTransition()
        } else {
            finalizeTimerRef.current = window.setTimeout(finalizeTransition, duration + 60)
        }
    }

    useDidUpdate(() => {
        cancelPendingRafs()
        cancelFinalize()
        const shouldTransition = transitionDuration !== 0

        if (shouldTransition) {
            onTransitionStart?.()
        }

        if (expanded) {
            queueRaf(() => {
                flushSync(() => setState('entering'))
                mergeStyles({ willChange: 'height', display: 'block', overflow: 'hidden' })
                queueRaf(() => {
                    const height = getElementHeight(elementRef)
                    mergeStyles({ ...getTransitionStyles(height), height })
                    scheduleFinalize(height)
                })
            })
        } else {
            queueRaf(() => {
                flushSync(() => setState('exiting'))
                const height = getElementHeight(elementRef)
                mergeStyles({ ...getTransitionStyles(height), willChange: 'height', height })
                queueRaf(() => {
                    mergeStyles({ height: 0, overflow: 'hidden' })
                    scheduleFinalize(height)
                })
            })
        }
    }, [expanded])

    useEffect(
        () => () => {
            cancelPendingRafs()
            cancelFinalize()
        },
        []
    )

    const handleTransitionEnd = (event: React.TransitionEvent): void => {
        if (event.target !== elementRef.current || event.propertyName !== 'height') {
            return
        }

        // 自然触发的 transitionend 优先收尾，取消超时兜底避免 onTransitionEnd 双触发
        cancelFinalize()

        if (expanded) {
            const height = getElementHeight(elementRef)

            if (height === styles.height) {
                setStyles({})
            } else {
                mergeStyles({ height })
            }

            setState('entered')
            onTransitionEnd?.()
        } else if (styles.height === 0) {
            setStyles(collapsedStyles)
            setState('exited')
            onTransitionEnd?.()
        }
    }

    return {
        state,
        getCollapseProps: input => ({
            'aria-hidden': !expanded,
            inert: !expanded,
            ref: mergeRefs(elementRef, input?.ref),
            onTransitionEnd: handleTransitionEnd,
            style: { boxSizing: 'border-box', ...input?.style, ...styles }
        })
    }
}

export namespace useCollapse {
    export type Input = UseCollapseInput
    export type ReturnValue = UseCollapseReturnValue
    export type State = UseCollapseState
}
