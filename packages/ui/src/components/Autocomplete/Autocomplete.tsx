import { useMemo, useState } from 'react'
import { useId, useUncontrolled } from '@xiaoye-react/hooks'
import { BoxProps, factory, Factory, UISize, rem, StylesApiProps, useProps, useStyles } from '../../core'
import { CloseButton } from '../CloseButton'
import { Combobox } from '../Combobox'
import type { ComboboxOptionData } from '../Combobox'
import { InputBase } from '../InputBase'
import { InputWrapper } from '../Input'
import classes from './Autocomplete.module.css'

export type AutocompleteStylesNames = 'root' | 'dropdown' | 'options' | 'option' | 'empty' | 'group' | 'groupLabel'

export interface AutocompleteItem {
    value: string
    label: string
    disabled?: boolean
    group?: string
}

export type AutocompleteData = (string | AutocompleteItem)[]

export interface AutocompleteProps
    extends BoxProps,
        StylesApiProps<AutocompleteFactory>,
        Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'style' | 'value' | 'defaultValue' | 'onChange'> {
    //** 自动补全选项数据 */
    data?: AutocompleteData

    //** 受控值 */
    value?: string

    //** 非受控组件的初始值 */
    defaultValue?: string

    //** 值变化时调用 */
    onChange?: (value: string) => void

    //** 未选择值时显示的占位符 */
    placeholder?: string

    //** 渲染在输入框上方的标签 */
    label?: React.ReactNode

    //** 渲染在标签下方的描述 */
    description?: React.ReactNode

    //** 渲染在输入框下方的错误 */
    error?: React.ReactNode

    //** 如果设置，则会在标签上添加必填星号 */
    required?: boolean

    //** 控制输入框大小 @default 'sm' */
    size?: UISize

    //** 决定是否可以清除值 */
    clearable?: boolean

    //** 如果设置，则禁用输入框 */
    disabled?: boolean

    //** 没有选项匹配搜索值时显示的消息 */
    nothingFoundMessage?: React.ReactNode

    //** 下拉框的最大高度 */
    maxDropdownHeight?: React.CSSProperties['maxHeight']

    //** 下拉框相对于目标元素的位置 */
    position?: import('../../core').FloatingPosition
}

export type AutocompleteFactory = Factory<{
    props: AutocompleteProps
    ref: HTMLInputElement
    stylesNames: AutocompleteStylesNames
}>

const defaultProps = {
    size: 'sm'
} satisfies Partial<AutocompleteProps>

function AutocompleteChevronIcon(props: React.ComponentProps<'svg'>) {
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

function parseAutocompleteData(data?: AutocompleteData): ComboboxOptionData[] {
    if (!data) return []
    return data.map(item => {
        if (typeof item === 'string') {
            return { value: item, label: item }
        }
        return { value: item.value, label: item.label ?? item.value, disabled: item.disabled, group: item.group }
    })
}

export const Autocomplete = factory<AutocompleteFactory>((_props, ref) => {
    const props = useProps('Autocomplete', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        data,
        value,
        defaultValue,
        onChange,
        placeholder,
        label,
        description,
        error,
        required,
        size,
        clearable,
        disabled,
        nothingFoundMessage,
        maxDropdownHeight,
        position,
        id,
        ...others
    } = props

    const parsedData = useMemo(() => parseAutocompleteData(data), [data])
    // 不向 useUncontrolled 传 onChange：其非受控 setter 内部会调 onChange，
    // 而下方 handler 已显式调用 onChange?.()，两处都传会导致每次变更触发两次
    const [selectedValue, setSelectedValue] = useUncontrolled<string>({
        value,
        defaultValue,
        finalValue: ''
    })

    const [opened, setOpened] = useState(false)
    const inputId = useId(id)

    const filteredData = useMemo(() => {
        if (!selectedValue) return parsedData
        const query = selectedValue.toLowerCase()
        return parsedData.filter(item => item.label.toLowerCase().includes(query))
    }, [parsedData, selectedValue])

    const handleOptionSubmit = (optionValue: string) => {
        if (disabled) return

        if (value === undefined) {
            setSelectedValue(optionValue)
        }
        onChange?.(optionValue)
        setOpened(false)
    }

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        if (disabled) return

        if (value === undefined) {
            setSelectedValue('')
        }
        onChange?.('')
    }

    const rightSection = (
        <div className={classes.section}>
            {clearable && selectedValue ? (
                <CloseButton size="xs" onClick={handleClear} aria-label="Clear input" />
            ) : (
                <AutocompleteChevronIcon className={classes.chevron} />
            )}
        </div>
    )

    const getStyles = useStyles<AutocompleteFactory>({
        name: 'Autocomplete',
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

    const input = (
        <Combobox
            opened={opened}
            onChange={setOpened}
            selectedValues={[selectedValue]}
            onOptionSubmit={handleOptionSubmit}
            position={position}
            disabled={disabled}
        >
            <Combobox.Target>
                <InputBase
                    {...others}
                    id={inputId}
                    ref={ref}
                    component="input"
                    type="text"
                    value={selectedValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    // 与 Select/MultiSelect 对齐：错误时输入框本体获得错误样式与 aria-invalid
                    invalid={!!error}
                    role="combobox"
                    size={size}
                    rightSection={rightSection}
                    onClick={() => {
                        if (!disabled) {
                            setOpened(true)
                        }
                    }}
                    onFocus={() => {
                        if (!disabled) {
                            setOpened(true)
                        }
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const nextValue = event.currentTarget.value
                        if (value === undefined) {
                            setSelectedValue(nextValue)
                        }
                        onChange?.(nextValue)
                        if (!opened) {
                            setOpened(true)
                        }
                    }}
                />
            </Combobox.Target>

            <Combobox.Dropdown style={{ maxHeight: maxDropdownHeight ? rem(maxDropdownHeight) : undefined }}>
                <Combobox.Options>
                    {filteredData.length === 0 && nothingFoundMessage ? (
                        <Combobox.Empty>{nothingFoundMessage}</Combobox.Empty>
                    ) : (
                        renderOptions(filteredData)
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    )

    const hasWrapper = label || description || error

    if (!hasWrapper) {
        return input
    }

    return (
        <InputWrapper
            {...getStyles('root')}
            label={label}
            description={description}
            error={error}
            required={required}
            inputId={inputId}
        >
            {input}
        </InputWrapper>
    )
})

function renderOptions(data: ComboboxOptionData[]) {
    const result: React.ReactNode[] = []
    // 记录每个组名的出现次数，组不连续（如 A,B,A）时为同名组生成唯一 key
    const groupOccurrences = new Map<string, number>()

    const renderOption = (item: ComboboxOptionData) => (
        <Combobox.Option key={item.value} value={item.value} disabled={item.disabled}>
            {item.label}
        </Combobox.Option>
    )

    let index = 0
    while (index < data.length) {
        const item = data[index]

        if (item.group) {
            const group = item.group
            const occurrence = groupOccurrences.get(group) ?? 0
            groupOccurrences.set(group, occurrence + 1)

            // 收集同一连续段的选项，渲染进 Combobox.Group 内部（而非组外的空壳）
            const groupItems: ComboboxOptionData[] = []
            while (index < data.length && data[index].group === group) {
                groupItems.push(data[index])
                index++
            }

            result.push(
                <Combobox.Group key={`group-${group}-${occurrence}`} label={group}>
                    {groupItems.map(renderOption)}
                </Combobox.Group>
            )
        } else {
            result.push(renderOption(item))
            index++
        }
    }

    return result
}

Autocomplete.classes = classes
Autocomplete.displayName = '@xiaoye-react/ui/Autocomplete'

export namespace Autocomplete {
    export type Props = AutocompleteProps
    export type StylesNames = AutocompleteStylesNames
    export type Factory = AutocompleteFactory
}
