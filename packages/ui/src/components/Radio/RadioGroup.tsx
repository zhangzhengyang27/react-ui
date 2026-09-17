import { useMemo } from 'react'
import { useUncontrolled } from '@xiaoye-react/hooks'
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
    /** 受控值 */
    value?: RadioGroupValue

    /** 非受控组件的初始值 */
    defaultValue?: RadioGroupValue

    /** 值变化时调用 */
    onChange?: (value: RadioGroupValue) => void

    /** Label rendered above the radios */
    label?: React.ReactNode

    /** 渲染在标签下方的描述 */
    description?: React.ReactNode

    /** 单选框下方渲染的错误s */
    error?: React.ReactNode

    /** 如果设置，则会在标签上添加必填星号 */
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

    // context value 身份稳定化：内联对象每渲染新身份会使 React.memo 包裹的子组件全量失效
    // （setSelectedValue 已是 use-uncontrolled 的稳定 setter）
    const ctxValue = useMemo(
        () => ({ value: selectedValue, onChange: setSelectedValue, name, disabled, size }),
        [selectedValue, setSelectedValue, name, disabled, size]
    )

    const content = (
        <RadioGroupContext.Provider value={ctxValue}>
            {/* role="radiogroup"：RadioCard（role="radio" 按钮组）场景下原生同名 input 分组语义不存在，
                根节点需显式建立分组语义供读屏器感知（对齐 Rating 的做法） */}
            <div ref={ref} role="radiogroup" {...getStyles('root')} {...others}>
                {children}
            </div>
        </RadioGroupContext.Provider>
    )

    if (!hasWrapper) {
        return content
    }

    // root 样式仅挂内层 div 一处（对齐 CheckboxGroup）：InputWrapper 再挂会导致 className/style 与 .root 类双重应用
    return (
        <InputWrapper label={label} description={description} error={error} required={required}>
            {content}
        </InputWrapper>
    )
})

RadioGroup.displayName = '@xiaoye-react/ui/RadioGroup'

export namespace RadioGroup {
    export type Props = RadioGroupProps
    export type Factory = RadioGroupFactory
}
