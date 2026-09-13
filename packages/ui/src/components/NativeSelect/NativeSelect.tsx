import { useId, useUncontrolled } from '@xiaoye-react/hooks'
import {
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getSize,
    UISize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { ComboboxItemGroup } from '../ComboboxPopover'
import { __BaseInputProps } from '../Input'
import { InputBase } from '../InputBase'
import { InputWrapper } from '../Input'
import classes from './NativeSelect.module.css'

export type NativeSelectStylesNames = 'root' | 'input' | 'section'

export type NativeSelectCssVariables = {
    root: '--native-select-chevron-size'
}

export interface NativeSelectDataItem {
    value: string
    label?: string
    disabled?: boolean
}

export type NativeSelectData = (string | NativeSelectDataItem | ComboboxItemGroup)[]

export interface NativeSelectProps
    extends BoxProps,
        __BaseInputProps,
        ElementProps<'select', 'size'>,
        StylesApiProps<NativeSelectFactory> {
    /** Controls input and chevron size @default 'sm' */
    size?: UISize

    /** Select options data */
    data?: NativeSelectData

    //** 渲染在输入框上方的标签 */
    label?: React.ReactNode

    //** 渲染在标签下方的描述 */
    description?: React.ReactNode

    //** 渲染在输入框下方的错误 */
    error?: React.ReactNode

    /** 如果设置，则应用禁用样式和行为 */
    disabled?: boolean

    //** 受控值 */
    value?: string

    //** 非受控组件的初始值 */
    defaultValue?: string

    /** 选中值变化时调用 */
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export type NativeSelectFactory = Factory<{
    props: NativeSelectProps
    ref: HTMLSelectElement
    stylesNames: NativeSelectStylesNames
    vars: NativeSelectCssVariables
}>

const defaultProps = {
    size: 'sm'
} satisfies Partial<NativeSelectProps>

const varsResolver = createVarsResolver<NativeSelectFactory>((theme, { size }) => ({
    root: {
        '--native-select-chevron-size': getSize(size, 'native-select-chevron-size')
    }
}))

function NativeSelectChevronIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    )
}

export const NativeSelect = factory<NativeSelectFactory>((_props, ref) => {
    const props = useProps('NativeSelect', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        attributes,
        size,
        data,
        label,
        description,
        error,
        disabled,
        value,
        defaultValue,
        onChange,
        id,
        ...others
    } = props

    const [selectedValue, setSelectedValue] = useUncontrolled<string | undefined>({
        value,
        defaultValue,
        finalValue: ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (disabled) {
            return
        }

        if (value === undefined) {
            setSelectedValue(event.currentTarget.value)
        }

        onChange?.(event)
    }

    const inputId = useId(id)

    const getStyles = useStyles<NativeSelectFactory>({
        name: 'NativeSelect',
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

    const options = data?.map((item, index) => {
        // 分组数据渲染为原生 optgroup，条目支持字符串简写
        if (item && typeof item === 'object' && 'items' in item) {
            return (
                <optgroup key={`group-${item.group}-${index}`} label={item.group}>
                    {item.items.map((child, childIndex) => {
                        const normalized =
                            typeof child === 'string' ? { value: child, label: child } : child
                        return (
                            <option
                                key={normalized.value || childIndex}
                                value={normalized.value}
                                disabled={normalized.disabled}
                            >
                                {normalized.label || normalized.value}
                            </option>
                        )
                    })}
                </optgroup>
            )
        }

        if (typeof item === 'string') {
            return (
                <option key={`${item}-${index}`} value={item}>
                    {item}
                </option>
            )
        }

        return (
            <option key={item.value || index} value={item.value} disabled={item.disabled}>
                {item.label || item.value}
            </option>
        )
    })

    return (
        <InputWrapper {...getStyles('root')} label={label} description={description} error={error} inputId={inputId}>
            <InputBase
                component="select"
                id={inputId}
                ref={ref as any}
                disabled={disabled}
                // 与 Select/MultiSelect 对齐：错误时 select 本体获得错误样式与 aria-invalid
                invalid={!!error}
                value={selectedValue ?? ''}
                onChange={handleChange as any}
                size={size}
                rightSection={<NativeSelectChevronIcon {...getStyles('section')} />}
                {...getStyles('input')}
                {...(others as any)}
            >
                {options}
            </InputBase>
        </InputWrapper>
    )
})

NativeSelect.classes = classes
;(NativeSelect as any).varsResolver = varsResolver
NativeSelect.displayName = '@xiaoye-react/ui/NativeSelect'

export namespace NativeSelect {
    export type Props = NativeSelectProps
    export type StylesNames = NativeSelectStylesNames
    export type CssVariables = NativeSelectCssVariables
    export type Factory = NativeSelectFactory
}
