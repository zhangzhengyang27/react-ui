import { useEffect, useRef, useState, type RefObject } from 'react'

function toInt(value?: string) {
    return value ? parseInt(value, 10) : 0
}

// 将 CSS transition-duration('s' 或 'ms' 单位)统一换算为毫秒,无法解析时按 0 处理
function toMs(value: string) {
    const parsed = parseFloat(value)
    if (Number.isNaN(parsed)) {
        return 0
    }

    return value.trim().endsWith('ms') ? parsed : parsed * 1000
}

function isParent(
    parentElement: HTMLElement | EventTarget | null,
    childElement: HTMLElement | null
) {
    if (!childElement || !parentElement) {
        return false
    }

    let parent = childElement.parentNode
    while (parent != null) {
        if (parent === parentElement) {
            return true
        }
        parent = parent.parentNode
    }
    return false
}

interface UseFloatingIndicatorInput {
    target: HTMLElement | null | undefined
    parent: HTMLElement | null | undefined
    ref: RefObject<HTMLElement | null>
    displayAfterTransitionEnd?: boolean
    onTransitionStart?: () => void
    onTransitionEnd?: () => void
}

export function useFloatingIndicator({
    target,
    parent,
    ref,
    displayAfterTransitionEnd,
    onTransitionStart,
    onTransitionEnd
}: UseFloatingIndicatorInput) {
    const transitionTimeout = useRef<number>(-1)
    const previousTarget = useRef<HTMLElement | null | undefined>(target)
    const [initialized, setInitialized] = useState(false)

    const [hidden, setHidden] = useState(
        typeof displayAfterTransitionEnd === 'boolean' ? displayAfterTransitionEnd : false
    )

    const updatePosition = () => {
        if (!target || !parent || !ref.current) {
            return
        }

        const targetRect = target.getBoundingClientRect()
        const parentRect = parent.getBoundingClientRect()

        const targetComputedStyle = window.getComputedStyle(target)
        const parentComputedStyle = window.getComputedStyle(parent)

        const borderTopWidth =
            toInt(targetComputedStyle.borderTopWidth) + toInt(parentComputedStyle.borderTopWidth)
        const borderLeftWidth =
            toInt(targetComputedStyle.borderLeftWidth) + toInt(parentComputedStyle.borderLeftWidth)

        const position = {
            top: targetRect.top - parentRect.top - borderTopWidth,
            left: targetRect.left - parentRect.left - borderLeftWidth,
            width: targetRect.width,
            height: targetRect.height
        }

        ref.current.style.transform = `translateY(${position.top}px) translateX(${position.left}px)`
        ref.current.style.width = `${position.width}px`
        ref.current.style.height = `${position.height}px`
    }

    const updatePositionWithoutAnimation = () => {
        window.clearTimeout(transitionTimeout.current)
        if (ref.current) {
            ref.current.style.transitionDuration = '0ms'
        }
        updatePosition()
        transitionTimeout.current = window.setTimeout(() => {
            if (ref.current) {
                ref.current.style.transitionDuration = ''
            }
        }, 30)
    }

    // 跟踪最新的 updatePositionWithoutAnimation,供异步事件回调(MutationObserver/transitionend)
    // 引用,避免捕获过期闭包导致 target/parent 变化后位置不更新
    const updatePositionWithoutAnimationRef = useRef(updatePositionWithoutAnimation)
    updatePositionWithoutAnimationRef.current = updatePositionWithoutAnimation

    const targetResizeObserver = useRef<ResizeObserver | null>(null)
    const parentResizeObserver = useRef<ResizeObserver | null>(null)

    useEffect(() => {
        if (initialized && previousTarget.current !== target && onTransitionStart) {
            onTransitionStart()
        }

        previousTarget.current = target
        updatePosition()

        if (target) {
            targetResizeObserver.current = new ResizeObserver(updatePositionWithoutAnimation)
            targetResizeObserver.current.observe(target)

            if (parent) {
                parentResizeObserver.current = new ResizeObserver(updatePositionWithoutAnimation)
                parentResizeObserver.current.observe(parent)
            }

            return () => {
                targetResizeObserver.current?.disconnect()
                parentResizeObserver.current?.disconnect()
                window.clearTimeout(transitionTimeout.current)
            }
        }

        return undefined
    }, [parent, target])

    useEffect(() => {
        if (parent) {
            const handleTransitionEnd = (event: TransitionEvent) => {
                if (isParent(event.target, parent)) {
                    updatePositionWithoutAnimationRef.current()
                    setHidden(false)
                }
            }

            parent.addEventListener('transitionend', handleTransitionEnd)
            return () => {
                parent.removeEventListener('transitionend', handleTransitionEnd)
            }
        }

        return undefined
    }, [parent])

    // displayAfterTransitionEnd 依赖 parent 的 transitionend 事件复位 hidden;
    // 当 parent 无过渡(如减弱动效下 transition-duration 为 0,不产生 transitionend 事件)时直接显示,
    // 并以安全超时兜底复位,避免指示器永久隐藏
    useEffect(() => {
        if (!displayAfterTransitionEnd || !hidden || !parent) {
            return undefined
        }

        const maxDuration = window
            .getComputedStyle(parent)
            .transitionDuration.split(',')
            .reduce((max, item) => Math.max(max, toMs(item)), 0)

        if (maxDuration === 0) {
            setHidden(false)
            return undefined
        }

        const timer = window.setTimeout(() => setHidden(false), maxDuration + 100)
        return () => {
            window.clearTimeout(timer)
        }
    }, [displayAfterTransitionEnd, hidden, parent])

    useEffect(() => {
        // target/parent 就绪前组件渲染 null,ref 尚未赋值;需将其纳入依赖,
        // 否则 effect 不会在指示器元素挂载后重跑,transitionend 监听器永远不会挂载
        if (ref.current && onTransitionEnd) {
            const node = ref.current
            const handleIndicatorTransitionEnd = (event: TransitionEvent) => {
                if (event.propertyName === 'transform') {
                    onTransitionEnd()
                }
            }

            node.addEventListener('transitionend', handleIndicatorTransitionEnd)
            return () => {
                node.removeEventListener('transitionend', handleIndicatorTransitionEnd)
            }
        }

        return undefined
    }, [onTransitionEnd, target, parent])

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setInitialized(true)
        }, 20)

        return () => {
            window.clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
                    updatePositionWithoutAnimationRef.current()
                }
            })
        })

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] })

        return () => {
            observer.disconnect()
        }
    }, [])

    return { initialized, hidden }
}
