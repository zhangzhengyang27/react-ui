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

    useDidUpdate(() => {
        cancelPendingRafs()
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
                })
            })
        } else {
            queueRaf(() => {
                flushSync(() => setState('exiting'))
                const height = getElementHeight(elementRef)
                mergeStyles({ ...getTransitionStyles(height), willChange: 'height', height })
                queueRaf(() => mergeStyles({ height: 0, overflow: 'hidden' }))
            })
        }
    }, [expanded])

    useEffect(
        () => () => {
            cancelPendingRafs()
        },
        []
    )

    const handleTransitionEnd = (event: React.TransitionEvent): void => {
        if (event.target !== elementRef.current || event.propertyName !== 'height') {
            return
        }

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
