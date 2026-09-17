import { useCallback, useMemo } from 'react'
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

    /** 受控值 */
    value?: ChipGroupValue

    /** 非受控组件的初始值 */
    defaultValue?: ChipGroupValue

    /** 值变化时调用 */
    onChange?: (value: ChipGroupValue) => void

    /** Label rendered above the chips */
    label?: React.ReactNode

    /** 渲染在标签下方的描述 */
    description?: React.ReactNode

    /** Error rendered below the chips */
    error?: React.ReactNode

    /** 如果设置，则会在标签上添加必填星号 */
    required?: boolean

    /** Controls size of all chips in the group @default 'sm' */
    size?: UISize

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

    // 渲染期重建的闭包会让 context value 身份必然变化：先 useCallback 稳定两个函数，
    // 再 useMemo 稳定 value（React.memo 包裹的子组件不再全量失效）
    const isChipSelected = useCallback(
        (val: string) => (Array.isArray(_value) ? _value.includes(val) : val === _value),
        [_value]
    )

    const handleChange = useCallback(
        (val: string) => {
            if (Array.isArray(_value)) {
                setValue(_value.includes(val) ? _value.filter((v) => v !== val) : [..._value, val])
            } else {
                setValue(val)
            }
        },
        [_value, setValue]
    )

    const hasWrapper = label || description || error

    const ctxValue = useMemo(
        () => ({ isChipSelected, onChange: handleChange, multiple, disabled, size }),
        [isChipSelected, handleChange, multiple, disabled, size]
    )

    const content = (
        <ChipGroupContext.Provider value={ctxValue}>
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
