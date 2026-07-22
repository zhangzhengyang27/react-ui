import { useUncontrolled } from '@xiaoye-react/hooks'
import { BoxProps, ElementProps, factory, Factory, UISize, StylesApiProps, useProps, useStyles } from '../../core'
import { InputWrapper } from '../Input'
import { CheckboxGroupContext } from './CheckboxGroup.context'
import classes from './Checkbox.module.css'

export type CheckboxGroupStylesNames = 'root'

export type CheckboxGroupValue = string[]

export interface CheckboxGroupProps
    extends BoxProps,
        StylesApiProps<CheckboxGroupFactory>,
        ElementProps<'div', 'value' | 'defaultValue' | 'onChange'> {
    //** 受控值 */
    value?: CheckboxGroupValue

    //** 非受控组件的初始值 */
    defaultValue?: CheckboxGroupValue

    //** 值变化时调用 */
    onChange?: (value: CheckboxGroupValue) => void

    /** Label rendered above the checkboxes */
    label?: React.ReactNode

    //** 渲染在标签下方的描述 */
    description?: React.ReactNode

    /** Error rendered below the checkboxes */
    error?: React.ReactNode

    //** 如果设置，则会在标签上添加必填星号 */
    required?: boolean

    /** Controls size of all checkboxes in the group @default 'sm' */
    size?: UISize

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
        <CheckboxGroupContext.Provider value={{ value: selectedValues, onChange: setSelectedValues, name, disabled, size }}>
            <div ref={ref} {...getStyles('root')} {...others}>
                {children}
            </div>
        </CheckboxGroupContext.Provider>
    )

    if (!hasWrapper) {
        return content
    }

    // root 样式仅挂内层 div 一处：InputWrapper 再挂会导致 className/style 与 .root 类双重应用
    return (
        <InputWrapper label={label} description={description} error={error} required={required}>
            {content}
        </InputWrapper>
    )
})

CheckboxGroup.displayName = '@xiaoye-react/ui/CheckboxGroup'

export namespace CheckboxGroup {
    export type Props = CheckboxGroupProps
    export type Factory = CheckboxGroupFactory
}
