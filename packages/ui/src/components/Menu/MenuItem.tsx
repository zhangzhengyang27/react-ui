import { useMergedRef } from '@xiaoye-react/hooks'
import {
    AnchorPassthroughProps,
    BoxProps,
    CompoundStylesApiProps,
    createScopedKeydownHandler,
    ElementProps,
    factory,
    Factory,
    UIColor,
    useUITheme,
    useProps
} from '../../core'
import { UnstyledButton } from '../UnstyledButton'
import { useMenuContext } from './Menu.context'
import classes from './Menu.module.css'

export type MenuItemStylesNames = 'item' | 'itemLabel' | 'itemSection'

export interface MenuItemProps
    extends BoxProps,
        AnchorPassthroughProps,
        CompoundStylesApiProps<MenuItemFactory>,
        ElementProps<'button'> {
    'data-disabled'?: boolean

    /** Item label */
    children?: React.ReactNode

    /** 主题颜色的键或任意有效的 CSS 颜色 */
    color?: UIColor

    /** Controls whether the menu closes when this item is clicked */
    closeMenuOnClick?: boolean

    /** Section displayed at the start of the label */
    leftSection?: React.ReactNode

    /** Section displayed at the end of the label */
    rightSection?: React.ReactNode

    /** Sets disabled attribute, applies disabled styles */
    disabled?: boolean

    /** Click handler */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export type MenuItemFactory = Factory<{
    props: MenuItemProps
    ref: HTMLButtonElement
    stylesNames: MenuItemStylesNames
    compound: true
}>

export const MenuItem = factory<MenuItemFactory>((props, ref) => {
    const {
        classNames,
        className,
        style,
        styles,
        vars,
        color,
        closeMenuOnClick,
        leftSection,
        rightSection,
        children,
        disabled,
        'data-disabled': dataDisabled,
        onClick,
        ...others
    } = useProps('MenuItem', null, props)

    const ctx = useMenuContext()
    const theme = useUITheme()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (dataDisabled) {
            return
        }
        if (typeof closeMenuOnClick === 'boolean') {
            closeMenuOnClick && ctx.closeDropdownImmediately()
        } else {
            ctx.closeOnItemClick && ctx.closeDropdownImmediately()
        }
        onClick?.(event)
    }

    const colorValue = color ? theme.colors[color]?.[6] || color : undefined

    return (
        <UnstyledButton
            onMouseDown={event => event.preventDefault()}
            {...others}
            unstyled={ctx.unstyled}
            tabIndex={ctx.menuItemTabIndex}
            {...ctx.getStyles('item', { className, style, styles, classNames })}
            ref={useMergedRef(ref)}
            role="menuitem"
            disabled={disabled}
            data-menu-item
            data-disabled={disabled || dataDisabled || undefined}
            data-ui-stop-propagation
            onClick={handleClick}
            onKeyDown={createScopedKeydownHandler({
                siblingSelector: '[data-menu-item]:not([data-disabled])',
                parentSelector: '[data-menu-dropdown]',
                activateOnFocus: false,
                loop: ctx.loop,
                dir: 'ltr',
                orientation: 'vertical'
            })}
            __vars={{
                '--menu-item-color': colorValue,
                '--menu-item-hover': colorValue ? `${colorValue}1a` : undefined
            }}
        >
            {leftSection && (
                <div {...ctx.getStyles('itemSection', { styles, classNames })} data-position="left">
                    {leftSection}
                </div>
            )}
            {children && (
                <div {...ctx.getStyles('itemLabel', { styles, classNames })} data-menu-item-label>
                    {children}
                </div>
            )}
            {rightSection && (
                <div {...ctx.getStyles('itemSection', { styles, classNames })} data-position="right">
                    {rightSection}
                </div>
            )}
        </UnstyledButton>
    )
})

MenuItem.classes = classes
MenuItem.displayName = '@xiaoye-react/ui/MenuItem'
