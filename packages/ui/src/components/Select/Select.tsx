import { useMemo, useState } from 'react'
import { useId, useUncontrolled } from '@react-ui/hooks'
import { BoxProps, factory, Factory, UISize, rem, StylesApiProps, useProps, useStyles } from '../../core'
import { CloseButton } from '../CloseButton'
import { Combobox } from '../Combobox'
import type { ComboboxOptionData } from '../Combobox'
import { InputBase } from '../InputBase'
import { InputWrapper } from '../Input'
import classes from './Select.module.css'

export type SelectStylesNames = 'root' | 'dropdown' | 'options' | 'option' | 'empty' | 'group' | 'groupLabel'

export interface SelectItem {
    value: string
    label: string
    disabled?: boolean
    group?: string
}

export type SelectData = (string | SelectItem)[]

export interface SelectProps
    extends BoxProps,
        StylesApiProps<SelectFactory>,
        Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'style' | 'value' | 'defaultValue' | 'onChange'> {
    /** Select options data */
    data?: SelectData

    //** 受控值 */
    value?: string

    //** 非受控组件的初始值 */
    defaultValue?: string

    /** 选中值变化时调用 */
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

    /** 决定 Select 是否可以搜索 */
    searchable?: boolean

    /** 决定选中的值是否可以清除 */
    clearable?: boolean

    /** If set, select is disabled */
    disabled?: boolean

    //** 没有选项匹配搜索值时显示的消息 */
    nothingFoundMessage?: React.ReactNode

    //** 下拉框的最大高度 */
    maxDropdownHeight?: React.CSSProperties['maxHeight']

    //** 下拉框相对于目标元素的位置 */
    position?: import('../../core').FloatingPosition

    /** 下拉项中对勾图标的位置 @default 'left' */
    checkIconPosition?: 'left' | 'right'
}

export type SelectFactory = Factory<{
    props: SelectProps
    ref: HTMLInputElement
    stylesNames: SelectStylesNames
}>

const defaultProps = {
    size: 'sm'
} satisfies Partial<SelectProps>

function SelectChevronIcon(props: React.ComponentProps<'svg'>) {
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

function SelectCheckIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

function parseSelectData(data?: SelectData): ComboboxOptionData[] {
    if (!data) return []
    return data.map(item => {
        if (typeof item === 'string') {
            return { value: item, label: item }
        }
        return { value: item.value, label: item.label ?? item.value, disabled: item.disabled, group: item.group }
    })
}

export const Select = factory<SelectFactory>((_props, ref) => {
    const props = useProps('Select', defaultProps, _props)
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
        searchable,
        clearable,
        disabled,
        nothingFoundMessage,
        maxDropdownHeight,
        position,
        checkIconPosition,
        id,
        ...others
    } = props

    const parsedData = useMemo(() => parseSelectData(data), [data])
    const [selectedValue, setSelectedValue] = useUncontrolled<string>({
        value,
        defaultValue,
        finalValue: '',
        onChange
    })

    const [searchValue, setSearchValue] = useState('')
    const [opened, setOpened] = useState(false)
    const inputId = useId(id)

    const selectedOption = parsedData.find(item => item.value === selectedValue)

    const filteredData = useMemo(() => {
        if (!searchable || !searchValue) return parsedData
        const query = searchValue.toLowerCase()
        return parsedData.filter(item => item.label.toLowerCase().includes(query))
    }, [parsedData, searchable, searchValue])

    const handleOptionSubmit = (optionValue: string) => {
        if (value === undefined) {
            setSelectedValue(optionValue)
        }
        onChange?.(optionValue)
        setSearchValue('')
        setOpened(false)
    }

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        if (value === undefined) {
            setSelectedValue('')
        }
        onChange?.('')
    }

    const rightSection = (
        <div className={classes.section}>
            {clearable && selectedValue ? (
                <CloseButton size="xs" onClick={handleClear} aria-label="清除选择" />
            ) : (
                <SelectChevronIcon className={classes.chevron} />
            )}
        </div>
    )

    const inputValue = searchable ? (opened ? searchValue : selectedOption?.label ?? '') : selectedOption?.label ?? ''

    const getStyles = useStyles<SelectFactory>({
        name: 'Select',
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
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            selectedValues={selectedValue ? [selectedValue] : []}
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
                    value={inputValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={!searchable}
                    role="combobox"
                    size={size}
                    rightSection={rightSection}
                    onFocus={() => {
                        if (!disabled) {
                            setOpened(true)
                        }
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        if (searchable) {
                            setSearchValue(event.currentTarget.value)
                            if (!opened) {
                                setOpened(true)
                            }
                        }
                    }}
                    wrapperProps={{ style: { cursor: searchable ? undefined : 'pointer' } }}
                />
            </Combobox.Target>

            <Combobox.Dropdown style={{ maxHeight: maxDropdownHeight ? rem(maxDropdownHeight) : undefined }}>
                <Combobox.Options>
                    {filteredData.length === 0 && nothingFoundMessage ? (
                        <Combobox.Empty>{nothingFoundMessage}</Combobox.Empty>
                    ) : (
                        renderOptions(filteredData, selectedValue, checkIconPosition)
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

function renderOptions(
    data: ComboboxOptionData[],
    selectedValue: string,
    checkIconPosition?: 'left' | 'right'
) {
    const result: React.ReactNode[] = []
    let lastGroup: string | undefined

    data.forEach(item => {
        if (item.group && item.group !== lastGroup) {
            result.push(<Combobox.Group key={`group-${item.group}`} label={item.group} />)
            lastGroup = item.group
        }

        const selected = selectedValue === item.value
        const check = <SelectCheckIcon className={classes.check} />

        result.push(
            <Combobox.Option key={item.value} value={item.value} disabled={item.disabled}>
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        justifyContent: checkIconPosition === 'right' ? 'space-between' : undefined
                    }}
                >
                    {checkIconPosition === 'left' && selected && check}
                    {item.label}
                    {checkIconPosition === 'right' && selected && check}
                </span>
            </Combobox.Option>
        )
    })

    return result
}

Select.classes = classes
Select.displayName = '@react-ui/ui/Select'

export namespace Select {
    export type Props = SelectProps
    export type StylesNames = SelectStylesNames
    export type Factory = SelectFactory
}
