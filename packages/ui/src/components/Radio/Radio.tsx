import { useId, useUncontrolled } from '@react-ui/hooks'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getSize,
    getThemeColor,
    UIColor,
    UISize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { useRadioGroupContext } from './RadioGroup.context'
import { RadioGroup, type RadioGroupProps, type RadioGroupFactory } from './RadioGroup'
import { RadioIndicator, type RadioIndicatorProps, type RadioIndicatorFactory } from './RadioIndicator'
import { RadioCard, type RadioCardProps, type RadioCardFactory } from './RadioCard'
import classes from './Radio.module.css'

export type RadioStylesNames =
    | 'root'
    | 'input'
    | 'inner'
    | 'icon'
    | 'body'
    | 'label'
    | 'description'
    | 'error'
    | 'required'

export type RadioCssVariables = {
    root: '--radio-size' | '--radio-color' | '--radio-icon-color'
}

export interface RadioProps extends BoxProps, StylesApiProps<RadioFactory>, ElementProps<'input', 'size'> {
    /** Label rendered next to the radio input */
    label?: React.ReactNode

    //** 渲染在标签下方的描述 */
    description?: React.ReactNode

    /** 单选框下方渲染的错误 */
    error?: React.ReactNode

    /** 控制单选框和标签的大小 */
    size?: UISize | (string & {})

    /** 主题颜色的键或任意有效的 CSS 颜色 to set radio background when checked */
    color?: UIColor

    /** Color of the radio dot, defaults to white */
    iconColor?: string

    //** 如果设置，则会在标签上添加必填星号 */
    required?: boolean

    /** 传递给根标签元素的属性 */
    wrapperProps?: Record<string, any>

    /** If set, component is controlled */
    checked?: boolean

    /** 非受控组件的默认选中状态 */
    defaultChecked?: boolean

    /** 选中状态变化时调用 */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void

    /** 在 Radio.Group 内部使用时使用的值 */
    value?: string
}

export type RadioFactory = Factory<{
    props: RadioProps
    ref: HTMLInputElement
    stylesNames: RadioStylesNames
    vars: RadioCssVariables
    staticComponents: {
        Group: typeof RadioGroup
        Indicator: typeof RadioIndicator
        Card: typeof RadioCard
    }
}>

const defaultProps = {
    size: 'sm'
} satisfies Partial<RadioProps>

const varsResolver = createVarsResolver<RadioFactory>((theme, { size, color, iconColor }) => ({
    root: {
        '--radio-size': getSize(size, 'radio-size'),
        '--radio-color': color ? getThemeColor(color, theme) : undefined,
        '--radio-icon-color': iconColor
    }
}))

export const Radio = factory<RadioFactory>((_props, ref) => {
    const props = useProps('Radio', defaultProps, _props)
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
        color,
        iconColor,
        required,
        wrapperProps,
        checked,
        defaultChecked,
        onChange,
        mod,
        value,
        ...others
    } = props

    const group = useRadioGroupContext()
    const getStyles = useStyles<RadioFactory>({
        name: 'Radio',
        classes,
        props,
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
    const resolvedChecked = isGroupControlled ? group.value === value : checkedState
    const resolvedId = useId(id)
    const hasLabel = !!label
    const hasDescription = !!description
    const hasError = !!error

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isGroupControlled) {
            group.onChange(value!)
        } else if (checked === undefined) {
            setCheckedState(event.currentTarget.checked)
        }
        onChange?.(event)
    }

    return (
        <Box
            component="label"
            htmlFor={resolvedId}
            {...getStyles('root')}
            {...wrapperProps}
            mod={[{ disabled, error: hasError, 'with-label': hasLabel }, mod]}
        >
            <Box
                component="input"
                ref={ref}
                id={resolvedId}
                type="radio"
                disabled={disabled}
                checked={resolvedChecked}
                name={group?.name}
                value={value}
                onChange={handleChange}
                {...getStyles('input')}
                {...others}
            />

            <span {...getStyles('inner')} data-checked={resolvedChecked || undefined}>
                {resolvedChecked && <span {...getStyles('icon')} />}
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

Radio.classes = classes
;(Radio as any).varsResolver = varsResolver
Radio.displayName = '@react-ui/ui/Radio'
Radio.Group = RadioGroup
Radio.Indicator = RadioIndicator
Radio.Card = RadioCard

export namespace Radio {
    export type Props = RadioProps
    export type StylesNames = RadioStylesNames
    export type CssVariables = RadioCssVariables
    export type Factory = RadioFactory

    export namespace Group {
        export type Props = RadioGroupProps
        export type Factory = RadioGroupFactory
    }

    export namespace Indicator {
        export type Props = RadioIndicatorProps
        export type Factory = RadioIndicatorFactory
    }

    export namespace Card {
        export type Props = RadioCardProps
        export type Factory = RadioCardFactory
    }
}
