import { useEffect, useRef, useState, type RefObject } from 'react'

function toInt(value?: string) {
    return value ? parseInt(value, 10) : 0
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

    useEffect(() => {
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
    }, [onTransitionEnd])

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
