import { forwardRef, useMemo, useRef, useState } from 'react'
import { useId, useMergedRef, useUncontrolled } from '@xiaoye-react/hooks'
import { BoxProps, factory, Factory, UISize, rem, StylesApiProps, useProps, useStyles } from '../../core'
import { Badge } from '../Badge'
import { CloseButton } from '../CloseButton'
import { Combobox } from '../Combobox'
import type { ComboboxOptionData, ComboboxProps } from '../Combobox'
import { InputBase } from '../InputBase'
import { InputWrapper } from '../Input'
import classes from './MultiSelect.module.css'

export type MultiSelectStylesNames =
    | 'root'
    | 'dropdown'
    | 'options'
    | 'option'
    | 'empty'
    | 'group'
    | 'groupLabel'
    | 'pill'
    | 'input'
    | 'valuesList'

export interface MultiSelectItem {
    value: string
    label: string
    disabled?: boolean
    group?: string
}

export type MultiSelectData = (string | MultiSelectItem)[]

export interface MultiSelectProps
    extends BoxProps,
        StylesApiProps<MultiSelectFactory>,
        Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'style' | 'value' | 'defaultValue' | 'onChange'> {
    /** Select options data */
    data?: MultiSelectData

    //** 受控值 */
    value?: string[]

    //** 非受控组件的初始值 */
    defaultValue?: string[]

    /** Called when selected values change */
    onChange?: (value: string[]) => void

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

    /** Determines whether selected values can be cleared */
    clearable?: boolean

    /** If set, select is disabled */
    disabled?: boolean

    /** Maximum number of selected values */
    maxSelectedValues?: number

    //** 没有选项匹配搜索值时显示的消息 */
    nothingFoundMessage?: React.ReactNode

    //** 下拉框的最大高度 */
    maxDropdownHeight?: React.CSSProperties['maxHeight']

    //** 下拉框相对于目标元素的位置 */
    position?: import('../../core').FloatingPosition

    /** 下拉项中对勾图标的位置 @default 'left' */
    checkIconPosition?: 'left' | 'right'

    /** Props passed down to the Combobox component（核心受控 props 由 MultiSelect 内部管理，不可覆盖） */
    comboboxProps?: Omit<
        Partial<ComboboxProps>,
        'opened' | 'onChange' | 'searchValue' | 'onSearchChange' | 'selectedValues' | 'onOptionSubmit' | 'disabled' | 'children'
    >
}

export type MultiSelectFactory = Factory<{
    props: MultiSelectProps
    ref: HTMLInputElement
    stylesNames: MultiSelectStylesNames
}>

const defaultProps = {
    size: 'sm'
} satisfies Partial<MultiSelectProps>

function MultiSelectChevronIcon(props: React.ComponentProps<'svg'>) {
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

function MultiSelectCheckIcon(props: React.ComponentProps<'svg'>) {
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

function parseMultiSelectData(data?: MultiSelectData): ComboboxOptionData[] {
    if (!data) return []
    return data.map(item => {
        if (typeof item === 'string') {
            return { value: item, label: item }
        }
        return { value: item.value, label: item.label ?? item.value, disabled: item.disabled, group: item.group }
    })
}

const MultiSelectTarget = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
    ({ children, ...others }, ref) => (
        <div ref={ref} {...others}>
            {children}
        </div>
    )
)
MultiSelectTarget.displayName = '@xiaoye-react/ui/MultiSelectTarget'

export const MultiSelect = factory<MultiSelectFactory>((_props, ref) => {
    const props = useProps('MultiSelect', defaultProps, _props)
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
        maxSelectedValues,
        nothingFoundMessage,
        maxDropdownHeight,
        position,
        checkIconPosition,
        comboboxProps,
        id,
        ...others
    } = props

    const parsedData = useMemo(() => parseMultiSelectData(data), [data])
    // 不向 useUncontrolled 传 onChange：其非受控 setter 内部会调 onChange，
    // 而下方 handler 已显式调用 onChange?.()，两处都传会导致每次变更触发两次
    const [selectedValues, setSelectedValues] = useUncontrolled<string[]>({
        value,
        defaultValue,
        finalValue: []
    })

    const [searchValue, setSearchValue] = useState('')
    const [opened, setOpened] = useState(false)
    const inputId = useId(id)
    const inputRef = useRef<HTMLInputElement>(null)

    const filteredData = useMemo(() => {
        if (!searchable || !searchValue) return parsedData
        const query = searchValue.toLowerCase()
        return parsedData.filter(item => item.label.toLowerCase().includes(query))
    }, [parsedData, searchable, searchValue])

    const handleOptionSubmit = (optionValue: string) => {
        if (disabled) return

        const isSelected = selectedValues.includes(optionValue)
        let nextValues: string[]

        if (isSelected) {
            nextValues = selectedValues.filter(v => v !== optionValue)
        } else if (maxSelectedValues === undefined || selectedValues.length < maxSelectedValues) {
            nextValues = [...selectedValues, optionValue]
        } else {
            nextValues = selectedValues
        }

        if (value === undefined) {
            setSelectedValues(nextValues)
        }
        onChange?.(nextValues)

        if (searchable) {
            setSearchValue('')
        }
    }

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>, optionValue: string) => {
        event.stopPropagation()
        if (disabled) return

        const nextValues = selectedValues.filter(v => v !== optionValue)
        if (value === undefined) {
            setSelectedValues(nextValues)
        }
        onChange?.(nextValues)
    }

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        if (disabled) return

        if (value === undefined) {
            setSelectedValues([])
        }
        onChange?.([])
    }

    const valuesList = selectedValues.map(selectedValue => {
        const option = parsedData.find(item => item.value === selectedValue)
        const displayLabel = option?.label ?? selectedValue

        return (
            <Badge
                key={selectedValue}
                className={classes.pill}
                size="xs"
                variant="light"
                rightSection={
                    <CloseButton
                        size="xs"
                        aria-label={`移除 ${displayLabel}`}
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleRemove(event, selectedValue)}
                    />
                }
            >
                {displayLabel}
            </Badge>
        )
    })

    const shouldShowClear = clearable && selectedValues.length > 0
    const rightSection = (
        <div className={classes.section}>
            {shouldShowClear ? (
                <CloseButton size="xs" onClick={handleClear} aria-label="清除选择" />
            ) : (
                <MultiSelectChevronIcon className={classes.chevron} />
            )}
        </div>
    )

    const inputValue = searchable ? searchValue : ''
    const isMaxSelected = maxSelectedValues !== undefined && selectedValues.length >= maxSelectedValues
    const mergedInputRef = useMergedRef(ref, inputRef)

    const getStyles = useStyles<MultiSelectFactory>({
        name: 'MultiSelect',
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
            {...comboboxProps}
            opened={opened}
            onChange={setOpened}
            searchValue={searchable ? searchValue : undefined}
            onSearchChange={searchable ? setSearchValue : undefined}
            selectedValues={selectedValues}
            onOptionSubmit={handleOptionSubmit}
            position={position}
            disabled={disabled}
        >
            <Combobox.Target>
                <MultiSelectTarget
                    className={classes.wrapper}
                    onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                        if (!(event.target as HTMLElement).closest('button')) {
                            inputRef.current?.focus()
                        }
                    }}
                >
                    {valuesList.length > 0 && <div className={classes.valuesList}>{valuesList}</div>}
                    <InputBase
                        {...others}
                        id={inputId}
                        ref={mergedInputRef}
                        component="input"
                        type="text"
                        value={inputValue}
                        placeholder={selectedValues.length === 0 ? placeholder : undefined}
                        disabled={disabled}
                        readOnly={!searchable}
                        role="combobox"
                        size={size}
                        rightSection={rightSection}
                        onFocus={event => {
                            // 仅键盘导航（Tab 切入）时打开；鼠标点击的开/关由 wrapper 的 click toggle 统一处理，
                            // 否则 focus 先打开、随后的 click toggle 又关闭，造成闪现即收
                            if (!disabled && event.currentTarget.matches(':focus-visible')) {
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
                        wrapperProps={{ className: classes.inputWrapper }}
                    />
                </MultiSelectTarget>
            </Combobox.Target>

            <Combobox.Dropdown style={{ maxHeight: maxDropdownHeight ? rem(maxDropdownHeight) : undefined }}>
                <Combobox.Options>
                    {filteredData.length === 0 && nothingFoundMessage ? (
                        <Combobox.Empty>{nothingFoundMessage}</Combobox.Empty>
                    ) : (
                        renderOptions(filteredData, selectedValues, isMaxSelected, checkIconPosition)
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
    selectedValues: string[],
    isMaxSelected: boolean,
    checkIconPosition?: 'left' | 'right'
) {
    const result: React.ReactNode[] = []
    // 记录每个组名的出现次数，组不连续（如 A,B,A）时为同名组生成唯一 key
    const groupOccurrences = new Map<string, number>()

    const renderOption = (item: ComboboxOptionData) => {
        const selected = selectedValues.includes(item.value)
        const disabled = item.disabled || (isMaxSelected && !selected)
        const check = <MultiSelectCheckIcon className={classes.check} />

        return (
            <Combobox.Option key={item.value} value={item.value} disabled={disabled}>
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
    }

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

MultiSelect.classes = classes
MultiSelect.displayName = '@xiaoye-react/ui/MultiSelect'

export namespace MultiSelect {
    export type Props = MultiSelectProps
    export type StylesNames = MultiSelectStylesNames
    export type Factory = MultiSelectFactory
}
