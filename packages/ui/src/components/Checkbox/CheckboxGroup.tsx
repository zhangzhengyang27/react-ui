import { useUncontrolled } from '@react-ui/hooks'
import { BoxProps, ElementProps, factory, Factory, MantineSize, StylesApiProps, useProps, useStyles } from '../../core'
import { InputWrapper } from '../Input'
import { CheckboxGroupContext } from './CheckboxGroup.context'
import classes from './Checkbox.module.css'

export type CheckboxGroupStylesNames = 'root'

export type CheckboxGroupValue = string[]

export interface CheckboxGroupProps
    extends BoxProps,
        StylesApiProps<CheckboxGroupFactory>,
        ElementProps<'div', 'value' | 'defaultValue' | 'onChange'> {
    /** Controlled value */
    value?: CheckboxGroupValue

    /** Initial value for uncontrolled component */
    defaultValue?: CheckboxGroupValue

    /** Called when value changes */
    onChange?: (value: CheckboxGroupValue) => void

    /** Label rendered above the checkboxes */
    label?: React.ReactNode

    /** Description rendered below the label */
    description?: React.ReactNode

    /** Error rendered below the checkboxes */
    error?: React.ReactNode

    /** If set, required asterisk is added to the label */
    required?: boolean

    /** Controls size of all checkboxes in the group @default 'sm' */
    size?: MantineSize

    /** Name attribute passed to all checkboxes */
    name?: string

    /** If set, all checkboxes in the group are disabled */
    disabled?: boolean

    /** Checkbox elements */
    children?: React.ReactNode
}

export type CheckboxGroupFactory = Factory<{
    props: CheckboxGroupProps
    ref: HTMLDivElement
    stylesNames: CheckboxGroupStylesNames
}>

const defaultProps = {
    size: 'sm'
} satisfies Partial<CheckboxGroupProps>

export const CheckboxGroup = factory<CheckboxGroupFactory>((_props, ref) => {
    const props = useProps('CheckboxGroup', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        value,
        defaultValue,
        onChange,
        label,
        description,
        error,
        required,
        size,
        name,
        disabled,
        children,
        ...others
    } = props

    const [selectedValues, setSelectedValues] = useUncontrolled<CheckboxGroupValue>({
        value,
        defaultValue,
        finalValue: [],
        onChange
    })

    const getStyles = useStyles<CheckboxGroupFactory>({
        name: 'CheckboxGroup',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        rootSelector: 'root'
    })

    const hasWrapper = label || description || error

    const content = (
        <CheckboxGroupContext.Provider value={{ value: selectedValues, onChange: setSelectedValues, name }}>
            <div ref={ref} {...getStyles('root')} {...others}>
                {children}
            </div>
        </CheckboxGroupContext.Provider>
    )

    if (!hasWrapper) {
        return content
    }

    return (
        <InputWrapper {...getStyles('root')} label={label} description={description} error={error} required={required}>
            {content}
        </InputWrapper>
    )
})

CheckboxGroup.displayName = '@react-ui/ui/CheckboxGroup'

export namespace CheckboxGroup {
    export type Props = CheckboxGroupProps
    export type Factory = CheckboxGroupFactory
}
