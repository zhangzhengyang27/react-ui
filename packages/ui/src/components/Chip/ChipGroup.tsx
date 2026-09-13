import { useUncontrolled } from '@xiaoye-react/hooks'
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
import { ChipGroupContext } from './ChipGroup.context'
import classes from './Chip.module.css'

export type ChipGroupStylesNames = 'root'

export type ChipGroupValue = string | string[] | null

export interface ChipGroupProps
    extends BoxProps,
        StylesApiProps<ChipGroupFactory>,
        ElementProps<'div', 'value' | 'defaultValue' | 'onChange'> {
    /** If set, multiple values can be selected */
    multiple?: boolean

    //** 受控值 */
    value?: ChipGroupValue

    //** 非受控组件的初始值 */
    defaultValue?: ChipGroupValue

    //** 值变化时调用 */
    onChange?: (value: ChipGroupValue) => void

    /** Label rendered above the chips */
    label?: React.ReactNode

    //** 渲染在标签下方的描述 */
    description?: React.ReactNode

    /** Error rendered below the chips */
    error?: React.ReactNode

    //** 如果设置，则会在标签上添加必填星号 */
    required?: boolean

    /** Controls size of all chips in the group @default 'sm' */
    size?: UISize

    /** Name attribute passed to all chips */
    name?: string

    /** If set, all chips in the group are disabled */
    disabled?: boolean

    /** Chip elements */
    children?: React.ReactNode
}

export type ChipGroupFactory = Factory<{
    props: ChipGroupProps
    ref: HTMLDivElement
    stylesNames: ChipGroupStylesNames
}>

const defaultProps = {
    size: 'sm'
} satisfies Partial<ChipGroupProps>

export const ChipGroup = factory<ChipGroupFactory>((_props, ref) => {
    const props = useProps('ChipGroup', defaultProps, _props)
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
        multiple,
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

    const [_value, setValue] = useUncontrolled<ChipGroupValue>({
        value,
        defaultValue,
        finalValue: multiple ? ([] as string[]) : null,
        onChange
    })

    const getStyles = useStyles<ChipGroupFactory>({
        name: 'ChipGroup',
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

    const isChipSelected = (val: string) =>
        Array.isArray(_value) ? _value.includes(val) : val === _value

    const handleChange = (val: string) => {
        if (Array.isArray(_value)) {
            setValue(_value.includes(val) ? _value.filter((v) => v !== val) : [..._value, val])
        } else {
            setValue(val)
        }
    }

    const hasWrapper = label || description || error

    const content = (
        <ChipGroupContext.Provider
            value={{ isChipSelected, onChange: handleChange, multiple, disabled, size }}
        >
            <div ref={ref} {...getStyles('root')} {...others}>
                {children}
            </div>
        </ChipGroupContext.Provider>
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

ChipGroup.displayName = '@xiaoye-react/ui/ChipGroup'

export namespace ChipGroup {
    export type Props = ChipGroupProps
    export type Factory = ChipGroupFactory
}
