import { useId, useUncontrolled } from '@react-ui/hooks'
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
    MantineColor,
    MantineRadius,
    MantineSize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { useCheckboxGroupContext } from './CheckboxGroup.context'
import { CheckboxGroup } from './CheckboxGroup'
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
    /** Label rendered next to the checkbox input */
    label?: React.ReactNode

    /** Description rendered below the label */
    description?: React.ReactNode

    /** Error rendered below the checkbox */
    error?: React.ReactNode

    /** Controls size of the checkbox and label */
    size?: MantineSize | (string & {})

    /** Key of theme.radius or any valid CSS value to set border-radius of the checkbox square */
    radius?: MantineRadius

    /** Key of theme.colors or any valid CSS color to set checkbox background when checked */
    color?: MantineColor

    /** Color of the check icon, defaults to white */
    iconColor?: string

    /** Custom icon displayed inside the checkbox when checked or indeterminate */
    icon?: React.ReactNode | ((props: { indeterminate: boolean; checked: boolean }) => React.ReactNode)

    /** If set, the checkbox is displayed in an indeterminate state */
    indeterminate?: boolean

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

    /** Value used when component is used inside Checkbox.Group */
    value?: string
}

export type CheckboxFactory = Factory<{
    props: CheckboxProps
    ref: HTMLInputElement
    stylesNames: CheckboxStylesNames
    vars: CheckboxCssVariables
}>

const defaultProps = {
    size: 'sm'
} satisfies Partial<CheckboxProps>

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
    const getStyles = useStyles<CheckboxFactory>({
        name: 'Checkbox',
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

    const iconNode =
        typeof icon === 'function' ? icon({ indeterminate: !!indeterminate, checked: resolvedChecked }) : icon

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
                type="checkbox"
                disabled={disabled}
                checked={resolvedChecked}
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

export namespace Checkbox {
    export type Props = CheckboxProps
    export type StylesNames = CheckboxStylesNames
    export type CssVariables = CheckboxCssVariables
    export type Factory = CheckboxFactory
}
