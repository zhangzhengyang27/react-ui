import { useRef } from 'react'
import { useMergedRef, useUncontrolled } from '@react-ui/hooks'
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
import { useMenuCheckboxGroupContext } from './MenuCheckboxGroup.context'
import classes from './Menu.module.css'

export type MenuCheckboxItemStylesNames = 'item' | 'itemLabel' | 'itemSection' | 'itemIndicator'

export interface MenuCheckboxItemProps
    extends BoxProps, CompoundStylesApiProps<MenuCheckboxItemFactory>, ElementProps<'button', 'color' | 'onChange' | 'value'> {
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

    /** Value used when inside Menu.CheckboxGroup */
    value?: string

    /** 受控的选中状态 */
    checked?: boolean

    /** Uncontrolled default checked state */
    defaultChecked?: boolean

    /** 选中状态变化时调用 */
    onChange?: (checked: boolean) => void
}

export type MenuCheckboxItemFactory = Factory<{
    props: MenuCheckboxItemProps
    ref: HTMLButtonElement
    stylesNames: MenuCheckboxItemStylesNames
    compound: true
}>

export const MenuCheckboxItem = factory<MenuCheckboxItemFactory>((props, ref) => {
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
        defaultChecked,
        onChange,
        ...others
    } = useProps('MenuCheckboxItem', null, props)

    const ctx = useMenuContext()
    const groupCtx = useMenuCheckboxGroupContext()
    const theme = useUITheme()
    const itemRef = useRef<HTMLButtonElement>(null)

    const groupChecked = groupCtx && value !== undefined ? groupCtx.values.includes(value) : undefined

    const [_checked, setChecked] = useUncontrolled<boolean>({
        value: checkedProp ?? groupChecked,
        defaultValue: defaultChecked,
        finalValue: false,
        onChange
    })

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (dataDisabled || disabled) {
            return
        }
        if (groupCtx && value !== undefined) {
            groupCtx.onChange(value)
        } else {
            setChecked(!_checked)
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
            role="menuitemcheckbox"
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
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

MenuCheckboxItem.classes = classes
MenuCheckboxItem.displayName = '@react-ui/ui/MenuCheckboxItem'
