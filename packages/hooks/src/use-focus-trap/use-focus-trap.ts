import { useCallback, useEffect, useRef, type MutableRefObject } from 'react'
import { useIsomorphicEffect } from '../use-isomorphic-effect/use-isomorphic-effect'
import { FOCUS_SELECTOR, focusable, tabbable } from './tabbable'
import { scopeTab } from './scope-tab'

export function useFocusTrap(active = true): React.RefCallback<HTMLElement | null> {
    const ref = useRef<HTMLElement | null>(null) as MutableRefObject<HTMLElement | null>
    const focusTimeoutRef = useRef<number | null>(null)

    const clearFocusTimeout = () => {
        if (focusTimeoutRef.current !== null) {
            window.clearTimeout(focusTimeoutRef.current)
            focusTimeoutRef.current = null
        }
    }

    const focusNode = (node: HTMLElement) => {
        let focusElement: HTMLElement | null = node.querySelector('[data-autofocus]')

        if (!focusElement) {
            const children = Array.from<HTMLElement>(node.querySelectorAll(FOCUS_SELECTOR))
            focusElement = children.find(tabbable) || children.find(focusable) || null
            if (!focusElement && focusable(node)) {
                focusElement = node
            }
        }

        if (focusElement) {
            focusElement.focus({ preventScroll: true })
        } else if (process.env.NODE_ENV === 'development') {
            console.warn(
                '[@xiaoye-react/hooks/use-focus-trap] Failed to find focusable element within provided node',
                node
            )
        }
    }

    const setRef = useCallback(
        (node: HTMLElement | null) => {
            if (!active) {
                return
            }

            if (node === null) {
                // 节点分离时清理挂起的 focus 定时器，避免对已卸载节点调用 focus
                clearFocusTimeout()
                ref.current = null
                return
            }

            if (ref.current === node) {
                return
            }

            // Delay processing the HTML node by a frame. This ensures focus is assigned correctly.
            // 清理上一次未触发的 timer,避免 ref 重调时遗留挂起的 focus 调用
            clearFocusTimeout()
            focusTimeoutRef.current = window.setTimeout(() => {
                focusTimeoutRef.current = null
                if (node.getRootNode()) {
                    focusNode(node)
                } else if (process.env.NODE_ENV === 'development') {
                    console.warn('[@xiaoye-react/hooks/use-focus-trap] Ref node is not part of the dom', node)
                }
            })

            ref.current = node
        },
        [active]
    )

    useIsomorphicEffect(() => {
        if (!active) {
            return undefined
        }

        if (ref.current) {
            clearFocusTimeout()
            focusTimeoutRef.current = window.setTimeout(() => {
                focusTimeoutRef.current = null
                if (ref.current) {
                    focusNode(ref.current)
                }
            })
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Tab' && ref.current) {
                scopeTab(ref.current, event)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            clearFocusTimeout()
        }
    }, [active])

    return setRef
}
