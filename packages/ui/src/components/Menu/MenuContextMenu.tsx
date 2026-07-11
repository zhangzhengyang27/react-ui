import { cloneElement, useRef } from 'react'
import { useLongPress } from '@react-ui/hooks'
import { getSingleElementChild, useProps } from '../../core'
import { usePopoverContext } from '../Popover/Popover.context'
import { useMenuContext } from './Menu.context'

export interface MenuContextMenuProps {
    /** Element that opens the menu when right-clicked. Menu dropdown is positioned at the cursor. */
    children: React.ReactNode

    /** If set, the right-click trigger is disabled and the browser's default context menu is shown */
    disabled?: boolean

    /** Delay in ms before a touch long-press opens the dropdown on touch devices, `500` by default */
    longPressDelay?: number
}

function createEventHandler<T>(handler: ((event: T) => void) | undefined, fn: (event: T) => void) {
    return (event: T) => {
        handler?.(event)
        fn(event)
    }
}

export function MenuContextMenu(props: MenuContextMenuProps) {
    const { children, disabled, longPressDelay = 500 } = useProps('MenuContextMenu', null, props)

    const child = getSingleElementChild(children)
    if (!child) {
        throw new Error(
            'Menu.ContextMenu component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
        )
    }

    const menuCtx = useMenuContext()
    const popoverCtx = usePopoverContext()

    const touchActiveRef = useRef(false)
    const gestureHandledRef = useRef(false)
    const touchTargetRef = useRef<object | null>(null)
    const disabledRef = useRef(disabled)
    disabledRef.current = disabled

    const childProps = (child as any).props as Record<string, any>

    const openAtPoint = (clientX: number, clientY: number, contextElement: object | null) => {
        popoverCtx.reference({
            getBoundingClientRect: () => ({
                x: clientX,
                y: clientY,
                width: 0,
                height: 0,
                top: clientY,
                left: clientX,
                right: clientX,
                bottom: clientY,
                toJSON: () => undefined
            }),
            contextElement
        } as any)
        menuCtx.openDropdown()
    }

    const onMouseDown = createEventHandler<any>(childProps.onMouseDown, (event: React.MouseEvent<HTMLElement>) => {
        if (disabled) {
            return
        }
        if (event.button === 2) {
            event.stopPropagation()
        }
    })

    const onContextMenu = createEventHandler<any>(childProps.onContextMenu, (event: React.MouseEvent<HTMLElement>) => {
        if (disabled || event.defaultPrevented) {
            return
        }
        event.preventDefault()
        if (gestureHandledRef.current) {
            return
        }
        openAtPoint(event.clientX, event.clientY, event.currentTarget)
        if (touchActiveRef.current) {
            gestureHandledRef.current = true
        }
    })

    const longPressHandlers = useLongPress(
        (event) => {
            if (disabledRef.current || gestureHandledRef.current) {
                return
            }
            const touchEvent = event as React.TouchEvent<HTMLElement>
            const touch = touchEvent.touches[0] ?? touchEvent.changedTouches[0]
            if (!touch) {
                return
            }
            openAtPoint(touch.clientX, touch.clientY, touchTargetRef.current)
            gestureHandledRef.current = true
        },
        {
            threshold: longPressDelay,
            events: ['touch'],
            cancelOnMove: true,
            onStart: (event) => {
                touchActiveRef.current = true
                gestureHandledRef.current = false
                touchTargetRef.current = event.currentTarget
            },
            onFinish: (event) => {
                touchActiveRef.current = false
                gestureHandledRef.current = false
                if (!disabledRef.current) {
                    event.preventDefault()
                }
            },
            onCancel: () => {
                touchActiveRef.current = false
                gestureHandledRef.current = false
            }
        }
    )

    const onTouchStart = createEventHandler<any>(childProps.onTouchStart, longPressHandlers.onTouchStart ?? (() => {}))
    const onTouchEnd = createEventHandler<any>(childProps.onTouchEnd, longPressHandlers.onTouchEnd ?? (() => {}))
    const onTouchCancel = createEventHandler<any>(childProps.onTouchCancel, longPressHandlers.onTouchCancel ?? (() => {}))
    const onTouchMove = createEventHandler<any>(childProps.onTouchMove, longPressHandlers.onTouchMove ?? (() => {}))

    return cloneElement(child, {
        onContextMenu,
        onMouseDown,
        onTouchStart,
        onTouchEnd,
        onTouchCancel,
        onTouchMove,
        style: disabled
            ? childProps.style
            : {
                  ...childProps.style,
                  WebkitTouchCallout: 'none',
                  WebkitUserSelect: 'none',
                  userSelect: 'none'
              },
        'data-expanded': menuCtx.opened ? true : undefined
    } as any)
}

MenuContextMenu.displayName = '@react-ui/ui/MenuContextMenu'
