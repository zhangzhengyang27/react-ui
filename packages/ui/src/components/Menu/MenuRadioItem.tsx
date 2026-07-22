import { useRef } from 'react'
import { useMergedRef } from '@xiaoye-react/hooks'
import {
    type BoxProps,
    type CompoundStylesApiProps,
    createScopedKeydownHandler,
    type ElementProps,
    factory,
    type Factory,
    type UIColor,
    useUITheme,
    useProps
} from '../../core'
import { UnstyledButton } from '../UnstyledButton'
import { useMenuContext } from './Menu.context'
import { useMenuRadioGroupContext } from './MenuRadioGroup.context'
import classes from './Menu.module.css'

export type MenuRadioItemStylesNames = 'item' | 'itemLabel' | 'itemSection' | 'itemIndicator'

export interface MenuRadioItemProps
    extends BoxProps, CompoundStylesApiProps<MenuRadioItemFactory>, ElementProps<'button', 'color' | 'onChange' | 'value'> {
    'data-disabled'?: boolean

    /** Item label */
    children?: React.ReactNode

    /** 主题颜色的键或任意有效的 CSS 颜色 */
    color?: UIColor

    /** If set, closes the menu when this item is clicked */
    closeMenuOnClick?: boolean

    /** Section displayed at the end of the label */
    rightSection?: React.ReactNode

    /** Sets disabled attribute, applies disabled styles */
    disabled?: boolean

    /** Value of the radio item */
    value: string

    /** Overrides selected state determined by the parent Menu.RadioGroup */
    checked?: boolean

    /** Called with the item value when item is selected */
    onChange?: (value: string) => void
}

export type MenuRadioItemFactory = Factory<{
    props: MenuRadioItemProps
    ref: HTMLButtonElement
    stylesNames: MenuRadioItemStylesNames
    compound: true
}>

export const MenuRadioItem = factory<MenuRadioItemFactory>((props, ref) => {
    const {
        classNames,
        className,
        style,
        styles,
        vars,
        color,
        closeMenuOnClick,
        rightSection,
        children,
        disabled,
        'data-disabled': dataDisabled,
        value,
        checked: checkedProp,
        onChange,
        ...others
    } = useProps('MenuRadioItem', null, props)

    const ctx = useMenuContext()
    const groupCtx = useMenuRadioGroupContext()
    const theme = useUITheme()
    const itemRef = useRef<HTMLButtonElement>(null)

    const _checked = checkedProp ?? (groupCtx ? groupCtx.value === value : false)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (dataDisabled || disabled) {
            return
        }
        if (!_checked) {
            if (onChange) {
                onChange(value)
            } else if (groupCtx) {
                groupCtx.onChange(value)
            }
        }
        if (closeMenuOnClick) {
            ctx.closeDropdownImmediately()
        }
        others.onClick?.(event)
    }

    const colorValue = color ? theme.colors[color]?.[6] || color : undefined

    return (
        <UnstyledButton
            onMouseDown={event => event.preventDefault()}
            {...others}
            unstyled={ctx.unstyled}
            tabIndex={ctx.menuItemTabIndex}
            {...ctx.getStyles('item', { className, style, styles, classNames })}
            ref={useMergedRef(itemRef, ref)}
            role="menuitemradio"
            aria-checked={_checked}
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
            <div {...ctx.getStyles('itemSection', { styles, classNames })} data-position="left" data-indicator>
                {_checked && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                        <circle cx="4" cy="4" r="3" />
                    </svg>
                )}
            </div>
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

MenuRadioItem.classes = classes
MenuRadioItem.displayName = '@xiaoye-react/ui/MenuRadioItem'
