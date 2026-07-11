import { useCallback, useRef } from 'react'
import { useUncontrolled, useId } from '@react-ui/hooks'
import { useProps, type FloatingPosition } from '../../core'
import { Popover, type PopoverProps } from '../Popover'
import { useMenuContext } from './Menu.context'
import { SubMenuContext } from './MenuSub.context'
import { MenuSubDropdown } from './MenuSubDropdown'
import { MenuSubItem } from './MenuSubItem'
import { MenuSubTarget } from './MenuSubTarget'

export interface MenuSubProps extends Omit<PopoverProps, 'onChange' | 'opened' | 'defaultOpened' | 'children'> {
    /** Menu.Sub children */
    children: React.ReactNode

    /** Controlled opened state */
    opened?: boolean

    /** Called with current state when dropdown opens or closes */
    onChange?: (opened: boolean) => void

    /** Open delay in ms, applicable when hover trigger is used */
    openDelay?: number

    /** Close delay in ms, applicable when hover trigger is used */
    closeDelay?: number

    /** Dropdown position relative to the target element @default 'right-start' */
    position?: FloatingPosition

    /** Offset of the dropdown element @default 0 */
    offset?: number
}

const defaultProps = {
    offset: 0,
    position: 'right-start' as FloatingPosition,
    openDelay: 0,
    closeDelay: 100,
    transitionProps: { duration: 0 }
} satisfies Partial<MenuSubProps>

export function MenuSub(_props: MenuSubProps) {
    const props = useProps('MenuSub', defaultProps, _props)
    const {
        children,
        closeDelay,
        openDelay,
        position,
        opened: openedProp,
        onChange,
        ...others
    } = props

    // Call useMenuContext to ensure this is used within a Menu
    useMenuContext()

    const [opened, setOpened] = useUncontrolled({
        value: openedProp,
        finalValue: false,
        onChange
    })

    const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const clearTimeouts = () => {
        if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current)
            openTimeoutRef.current = null
        }
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current)
            closeTimeoutRef.current = null
        }
    }

    const open = useCallback(() => {
        clearTimeouts()
        setOpened(true)
    }, [setOpened])

    const close = useCallback(() => {
        clearTimeouts()
        setOpened(false)
    }, [setOpened])

    const openDelayed = () => {
        clearTimeouts()
        openTimeoutRef.current = setTimeout(() => {
            setOpened(true)
        }, openDelay)
    }

    const closeDelayed = () => {
        clearTimeouts()
        closeTimeoutRef.current = setTimeout(() => {
            setOpened(false)
        }, closeDelay)
    }

    return (
        <SubMenuContext.Provider
            value={{
                opened,
                open,
                close,
                parentContext: null
            }}
        >
            <Popover
                {...others}
                position={position}
                opened={opened}
                onChange={(nextOpened) => (nextOpened ? open() : close())}
                withinPortal={false}
                withArrow={false}
                trapFocus={false}
                closeOnClickOutside
                closeOnEscape
            >
                {children}
            </Popover>
        </SubMenuContext.Provider>
    )
}

MenuSub.displayName = '@react-ui/ui/MenuSub'
MenuSub.Target = MenuSubTarget
MenuSub.Dropdown = MenuSubDropdown
MenuSub.Item = MenuSubItem
