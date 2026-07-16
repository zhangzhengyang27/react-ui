import { useUncontrolled } from '@react-ui/hooks'
import { BoxProps, ElementProps, factory, Factory, UISize, StylesApiProps, useProps, useStyles } from '../../core'
import { InputWrapper } from '../Input'
import { RadioGroupContext } from './RadioGroup.context'
import classes from './Radio.module.css'

export type RadioGroupStylesNames = 'root'

export type RadioGroupValue = string

export interface RadioGroupProps
    extends BoxProps,
        StylesApiProps<RadioGroupFactory>,
        ElementProps<'div', 'value' | 'defaultValue' | 'onChange'> {
    //** 受控值 */
    value?: RadioGroupValue

    //** 非受控组件的初始值 */
    defaultValue?: RadioGroupValue

    //** 值变化时调用 */
    onChange?: (value: RadioGroupValue) => void

    /** Label rendered above the radios */
    label?: React.ReactNode

    //** 渲染在标签下方的描述 */
    description?: React.ReactNode

    /** 单选框下方渲染的错误s */
    error?: React.ReactNode

    //** 如果设置，则会在标签上添加必填星号 */
    required?: boolean

    /** Controls size of all radios in the group @default 'sm' */
    size?: UISize

    /** Name attribute passed to all radios */
    name?: string

    /** If set, all radios in the group are disabled */
    disabled?: boolean

    /** Radio elements */
    children?: React.ReactNode
}

export type RadioGroupFactory = Factory<{
    props: RadioGroupProps
    ref: HTMLDivElement
    stylesNames: RadioGroupStylesNames
}>

const defaultProps = {
    size: 'sm'
} satisfies Partial<RadioGroupProps>

export const RadioGroup = factory<RadioGroupFactory>((_props, ref) => {
    const props = useProps('RadioGroup', defaultProps, _props)
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

    const [selectedValue, setSelectedValue] = useUncontrolled<RadioGroupValue>({
        value,
        defaultValue,
        finalValue: '',
        onChange
    })

    const getStyles = useStyles<RadioGroupFactory>({
        name: 'RadioGroup',
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
        <RadioGroupContext.Provider value={{ value: selectedValue, onChange: setSelectedValue, name }}>
            <div ref={ref} {...getStyles('root')} {...others}>
                {children}
            </div>
        </RadioGroupContext.Provider>
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

RadioGroup.displayName = '@react-ui/ui/RadioGroup'

export namespace RadioGroup {
    export type Props = RadioGroupProps
    export type Factory = RadioGroupFactory
}
