import { useUncontrolled } from '@react-ui/hooks'
import {
    BoxProps,
    ElementProps,
    factory,
    Factory,
    UISize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { InputWrapper } from '../Input'
import { SwitchGroupContext } from './SwitchGroup.context'
import classes from './Switch.module.css'

export type SwitchGroupStylesNames = 'root'

export type SwitchGroupValue = string[]

export interface SwitchGroupProps
    extends BoxProps,
        StylesApiProps<SwitchGroupFactory>,
        ElementProps<'div', 'value' | 'defaultValue' | 'onChange'> {
    //** 受控值 */
    value?: SwitchGroupValue

    //** 非受控组件的初始值 */
    defaultValue?: SwitchGroupValue

    //** 值变化时调用 */
    onChange?: (value: SwitchGroupValue) => void

    /** Label rendered above the switches */
    label?: React.ReactNode

    //** 渲染在标签下方的描述 */
    description?: React.ReactNode

    /** Error rendered below the switches */
    error?: React.ReactNode

    //** 如果设置，则会在标签上添加必填星号 */
    required?: boolean

    /** Controls size of all switches in the group @default 'sm' */
    size?: UISize

    /** Name attribute passed to all switches */
    name?: string

    /** If set, all switches in the group are disabled */
    disabled?: boolean

    /** Switch elements */
    children?: React.ReactNode
}

export type SwitchGroupFactory = Factory<{
    props: SwitchGroupProps
    ref: HTMLDivElement
    stylesNames: SwitchGroupStylesNames
}>

const defaultProps = {
    size: 'sm'
} satisfies Partial<SwitchGroupProps>

export const SwitchGroup = factory<SwitchGroupFactory>((_props, ref) => {
    const props = useProps('SwitchGroup', defaultProps, _props)
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

    const [selectedValues, setSelectedValues] = useUncontrolled<SwitchGroupValue>({
        value,
        defaultValue,
        finalValue: [],
        onChange
    })

    const getStyles = useStyles<SwitchGroupFactory>({
        name: 'SwitchGroup',
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
        <SwitchGroupContext.Provider value={{ value: selectedValues, onChange: setSelectedValues, name }}>
            <div ref={ref} {...getStyles('root')} {...others}>
                {children}
            </div>
        </SwitchGroupContext.Provider>
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

SwitchGroup.displayName = '@react-ui/ui/SwitchGroup'

export namespace SwitchGroup {
    export type Props = SwitchGroupProps
    export type Factory = SwitchGroupFactory
}
