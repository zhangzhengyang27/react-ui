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
    MantineColor,
    MantineSize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { useRadioGroupContext } from './RadioGroup.context'
import { RadioGroup } from './RadioGroup'
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

    /** Description rendered below the label */
    description?: React.ReactNode

    /** Error rendered below the radio */
    error?: React.ReactNode

    /** Controls size of the radio and label */
    size?: MantineSize | (string & {})

    /** Key of theme.colors or any valid CSS color to set radio background when checked */
    color?: MantineColor

    /** Color of the radio dot, defaults to white */
    iconColor?: string

    /** If set, required asterisk is added to the label */
    required?: boolean

    /** Props passed to the root label element */
    wrapperProps?: Record<string, any>

    /** If set, component is controlled */
    checked?: boolean

    /** Default checked state for uncontrolled component */
    defaultChecked?: boolean

    /** Called when checked state changes */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void

    /** Value used when component is used inside Radio.Group */
    value?: string
}

export type RadioFactory = Factory<{
    props: RadioProps
    ref: HTMLInputElement
    stylesNames: RadioStylesNames
    vars: RadioCssVariables
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
;(Radio as any).Group = RadioGroup

export namespace Radio {
    export type Props = RadioProps
    export type StylesNames = RadioStylesNames
    export type CssVariables = RadioCssVariables
    export type Factory = RadioFactory
}
