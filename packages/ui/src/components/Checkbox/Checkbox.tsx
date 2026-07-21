import { useEffect, useRef } from 'react'
import { useId, useMergedRef, useUncontrolled } from '@react-ui/hooks'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getRadius,
    getSize,
    getThemeColor,
    UIColor,
    UIRadius,
    UISize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { useCheckboxGroupContext } from './CheckboxGroup.context'
import { CheckboxGroup } from './CheckboxGroup'
import { CheckboxCard, type CheckboxCardProps, type CheckboxCardFactory, CheckboxCardContext } from './CheckboxCard'
import { CheckboxIndicator, type CheckboxIndicatorProps, type CheckboxIndicatorFactory } from './CheckboxIndicator'
import classes from './Checkbox.module.css'

export type CheckboxStylesNames =
    | 'root'
    | 'input'
    | 'inner'
    | 'icon'
    | 'body'
    | 'label'
    | 'description'
    | 'error'
    | 'required'

export type CheckboxCssVariables = {
    root: '--checkbox-size' | '--checkbox-radius' | '--checkbox-color' | '--checkbox-icon-color'
}

export interface CheckboxProps extends BoxProps, StylesApiProps<CheckboxFactory>, ElementProps<'input', 'size'> {
    /** 渲染在复选框输入旁的标签 */
    label?: React.ReactNode

    /** 渲染在标签下方的描述 */
    description?: React.ReactNode

    /** 渲染在复选框下方的错误 */
    error?: React.ReactNode

    /** 控制复选框和标签的大小 */
    size?: UISize | (string & {})

    /** 主题圆角键或任意有效 CSS 值，用于设置复选框方块的 border-radius */
    radius?: UIRadius

    /** 主题色键或任意有效 CSS 颜色，用于设置选中时复选框的背景色 */
    color?: UIColor

    /** 勾选图标的颜色，默认为白色 */
    iconColor?: string

    /** 选中或不确定状态时显示在复选框内的自定义图标 */
    icon?: React.ReactNode | ((props: { indeterminate: boolean; checked: boolean }) => React.ReactNode)

    /** 如果设置，则复选框显示为不确定状态 */
    indeterminate?: boolean

    /** 如果设置，则会在标签上添加必填星号 */
    required?: boolean

    /** 传递给根标签元素的属性 */
    wrapperProps?: Record<string, any>

    /** 如果设置，则组件为受控组件 */
    checked?: boolean

    /** 非受控组件的默认选中状态 */
    defaultChecked?: boolean

    /** 选中状态变化时调用 */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void

    /** 在 Checkbox.Group 内使用时所用的值 */
    value?: string
}

export type CheckboxFactory = Factory<{
    props: CheckboxProps
    ref: HTMLInputElement
    stylesNames: CheckboxStylesNames
    vars: CheckboxCssVariables
    staticComponents: {
        Group: typeof CheckboxGroup
        Indicator: typeof CheckboxIndicator
        Card: typeof CheckboxCard
    }
}>

const defaultProps = {} satisfies Partial<CheckboxProps>

const varsResolver = createVarsResolver<CheckboxFactory>((theme, { size, radius, color, iconColor }) => ({
    root: {
        '--checkbox-size': getSize(size, 'checkbox-size'),
        '--checkbox-radius': radius === undefined ? undefined : getRadius(radius),
        '--checkbox-color': color ? getThemeColor(color, theme) : undefined,
        '--checkbox-icon-color': iconColor
    }
}))

const defaultCheckIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
)

const defaultIndeterminateIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
)

export const Checkbox = factory<CheckboxFactory>((_props, ref) => {
    const props = useProps('Checkbox', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        attributes,
        id,
        label,
        description,
        error,
        disabled,
        size,
        radius,
        color,
        iconColor,
        icon,
        indeterminate,
        required,
        wrapperProps,
        checked,
        defaultChecked,
        onChange,
        mod,
        value,
        ...others
    } = props

    const group = useCheckboxGroupContext()
    // group 的 size/disabled 作为兜底（自身 prop 优先）；size 默认值 'sm' 在此解析，
    // 避免在 defaultProps 中写死导致 group.size 永远无法生效
    const resolvedSize = size ?? group?.size ?? 'sm'
    const resolvedDisabled = disabled ?? group?.disabled
    const getStyles = useStyles<CheckboxFactory>({
        name: 'Checkbox',
        classes,
        props: { ...props, size: resolvedSize },
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver,
        attributes,
        rootSelector: 'root'
    })

    const [checkedState, setCheckedState] = useUncontrolled<boolean>({
        value: checked,
        defaultValue: defaultChecked,
        finalValue: false
    })

    const isGroupControlled = group !== null && value !== undefined
    const resolvedChecked = isGroupControlled ? group.value.includes(value!) : checkedState
    const resolvedId = useId(id)
    const hasLabel = !!label
    const hasDescription = !!description
    const hasError = !!error
    const showIcon = resolvedChecked || indeterminate

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isGroupControlled) {
            const itemValue = value!
            const nextValue = event.currentTarget.checked
                ? [...group.value, itemValue]
                : group.value.filter(v => v !== itemValue)
            group.onChange(nextValue)
        } else if (checked === undefined) {
            setCheckedState(event.currentTarget.checked)
        }
        onChange?.(event)
    }

    const inputRef = useRef<HTMLInputElement | null>(null)
    // indeterminate 没有对应的 React 属性，只能通过 DOM property 设置，
    // 否则仅 data-indeterminate 视觉态生效，原生 input 与辅助技术无法感知半选态
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = !!indeterminate
        }
    }, [indeterminate])

    const iconNode =
        typeof icon === 'function' ? icon({ indeterminate: !!indeterminate, checked: resolvedChecked }) : icon

    return (
        <Box
            component="label"
            htmlFor={resolvedId}
            {...getStyles('root')}
            {...wrapperProps}
            mod={[{ disabled: resolvedDisabled, error: hasError, 'with-label': hasLabel }, mod]}
        >
            <Box
                component="input"
                ref={useMergedRef(ref, inputRef)}
                id={resolvedId}
                type="checkbox"
                disabled={resolvedDisabled}
                checked={resolvedChecked}
                aria-checked={indeterminate ? 'mixed' : resolvedChecked}
                name={group?.name}
                value={value}
                onChange={handleChange}
                data-indeterminate={indeterminate || undefined}
                {...getStyles('input')}
                {...others}
            />

            <span
                {...getStyles('inner')}
                data-checked={resolvedChecked || undefined}
                data-indeterminate={indeterminate || undefined}
            >
                {showIcon && (
                    <span {...getStyles('icon')}>
                        {iconNode || (indeterminate ? defaultIndeterminateIcon : defaultCheckIcon)}
                    </span>
                )}
            </span>

            {(hasLabel || hasDescription || hasError) && (
                <span {...getStyles('body')}>
                    {hasLabel && (
                        <span {...getStyles('label')}>
                            {label}
                            {required && <span {...getStyles('required')}>*</span>}
                        </span>
                    )}
                    {hasDescription && <span {...getStyles('description')}>{description}</span>}
                    {hasError && <span {...getStyles('error')}>{error}</span>}
                </span>
            )}
        </Box>
    )
})

Checkbox.classes = classes
;(Checkbox as any).varsResolver = varsResolver
Checkbox.displayName = '@react-ui/ui/Checkbox'
;(Checkbox as any).Group = CheckboxGroup
Checkbox.Indicator = CheckboxIndicator
Checkbox.Card = CheckboxCard

export namespace Checkbox {
    export type Props = CheckboxProps
    export type StylesNames = CheckboxStylesNames
    export type CssVariables = CheckboxCssVariables
    export type Factory = CheckboxFactory

    export namespace Indicator {
        export type Props = CheckboxIndicatorProps
        export type Factory = CheckboxIndicatorFactory
    }

    export namespace Card {
        export type Props = CheckboxCardProps
        export type Factory = CheckboxCardFactory
    }
}
