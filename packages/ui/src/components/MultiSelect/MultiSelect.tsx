import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import { useId, useMergedRef, useUncontrolled } from '@xiaoye-react/hooks'
import { BoxProps, factory, Factory, UISize, rem, StylesApiProps, useProps, useStyles } from '../../core'
import { Badge } from '../Badge'
import { CloseButton } from '../CloseButton'
import { Combobox } from '../Combobox'
import type { ComboboxOptionData, ComboboxProps } from '../Combobox'
import {
    ComboboxItem,
    ComboboxItemGroup,
    ComboboxParsedItem,
    OptionsFilter,
    defaultOptionsFilter,
    getParsedComboboxData,
    isOptionsGroup,
    toComboboxItem
} from '../ComboboxPopover'
import { usePillsReorder } from '../Combobox/use-pills-reorder/use-pills-reorder'
import { __BaseInputProps } from '../Input'
import { InputBase } from '../InputBase'
import { InputWrapper } from '../Input'
import { Loader } from '../Loader'
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

/** 选项对象类型别名，与 Combobox 选项数据同构；允许携带扩展字段（如 renderPill 用的 image） */
export type MultiSelectItem = ComboboxItem & { group?: string } & Record<string, any>

/** 分组数据格式，展开后等价于为每个 item 补充 group 字段 */
export type MultiSelectGroupData = ComboboxItemGroup

export type MultiSelectData = (string | MultiSelectItem | MultiSelectGroupData)[]

/** 自定义选项渲染，`checked` 为该选项是否已被选中 */
export type MultiSelectRenderOption = (input: { option: ComboboxItem; checked: boolean }) => React.ReactNode

/** 自定义已选胶囊渲染，`option` 为该值对应的原始数据项（含扩展字段） */
export type MultiSelectRenderPill = (input: {
    option: ComboboxOptionData & Record<string, any>
    value: string
    label: string
    onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void
    disabled: boolean
}) => React.ReactNode

export interface MultiSelectProps
    extends BoxProps,
        __BaseInputProps,
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

    /** 隐藏已被选中的选项 @default false */
    hidePickedOptions?: boolean

    /** 决定是否可以通过拖动或键盘重新排序已选胶囊 @default false */
    withPillsReorder?: boolean

    /** 自定义已选胶囊渲染 */
    renderPill?: MultiSelectRenderPill

    /** 自定义选项渲染函数 */
    renderOption?: MultiSelectRenderOption

    /** 自定义搜索过滤函数 */
    filter?: OptionsFilter

    /** 最多渲染的选项数量，用于大数据量优化 */
    limit?: number

    /** 输入框获得焦点时打开下拉框 @default false */
    openOnFocus?: boolean

    //** 没有选项匹配搜索值时显示的消息 */
    nothingFoundMessage?: React.ReactNode

    //** 下拉框的最大高度 */
    maxDropdownHeight?: React.CSSProperties['maxHeight']

    //** 下拉框相对于目标元素的位置 */
    position?: import('../../core').FloatingPosition

    /** 下拉框与目标元素的偏移距离（px） */
    offset?: number

    /** 下拉项中对勾图标的位置 @default 'left' */
    checkIconPosition?: 'left' | 'right'

    /** 输入框失焦时是否关闭下拉框 @default true */
    closeOnBlur?: boolean

    /** 受控搜索值 */
    searchValue?: string

    /** 搜索值变化时调用 */
    onSearchChange?: (value: string) => void

    /** 清除按钮的额外属性（如自定义 aria-label） */
    clearButtonProps?: React.ComponentPropsWithoutRef<'button'>

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
    size: 'sm',
    closeOnBlur: true
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

/** 把分组结构拍平为渲染用的选项列表，group 字符串落在每个选项上；扩展字段原样保留 */
function flattenParsedItems(items: ComboboxParsedItem[]): (ComboboxOptionData & Record<string, any>)[] {
    const result: ComboboxOptionData[] = []
    items.forEach(item => {
        if (isOptionsGroup(item)) {
            item.items.forEach(raw => {
                const child = toComboboxItem(raw)
                result.push({
                    ...child,
                    value: child.value,
                    label: child.label ?? child.value,
                    disabled: child.disabled,
                    group: item.group
                })
            })
        } else {
            // MultiSelectData 允许选项自带 group 字段（历史 MultiSelectItem 形状），解析时保留
            const group = (item as ComboboxItem & { group?: string }).group
            result.push({
                ...item,
                value: item.value,
                label: item.label ?? item.value,
                disabled: item.disabled,
                group
            })
        }
    })
    return result
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
        loading,
        hidePickedOptions,
        withPillsReorder,
        renderPill,
        renderOption,
        filter = defaultOptionsFilter,
        limit,
        openOnFocus,
        nothingFoundMessage,
        maxDropdownHeight,
        position,
        offset,
        checkIconPosition,
        closeOnBlur,
        searchValue: searchValueProp,
        onSearchChange,
        clearButtonProps,
        comboboxProps,
        id,
        wrapperProps: wrapperPropsProp,
        rightSection: rightSectionProp,
        onFocus: consumerOnFocus,
        onBlur: consumerOnBlur,
        onMouseDown: consumerOnMouseDown,
        onKeyDown: consumerOnKeyDown,
        ...others
    } = props

    // parsedItems 保留分组结构（供 OptionsFilter 使用），flatData 拍平后供渲染与选中值查找
    const parsedItems = useMemo(() => getParsedComboboxData(data), [data])
    const flatData = useMemo(() => flattenParsedItems(parsedItems), [parsedItems])
    // 不向 useUncontrolled 传 onChange：其非受控 setter 内部会调 onChange，
    // 而下方 handler 已显式调用 onChange?.()，两处都传会导致每次变更触发两次
    const [selectedValues, setSelectedValues] = useUncontrolled<string[]>({
        value,
        defaultValue,
        finalValue: []
    })

    const [searchValue, setSearchValue] = useUncontrolled<string>({
        value: searchValueProp,
        finalValue: '',
        onChange: onSearchChange
    })
    const [opened, setOpened] = useState(false)
    const inputId = useId(id)
    const inputRef = useRef<HTMLInputElement>(null)
    // 区分"鼠标点击聚焦"与"键盘聚焦"：点击路径 mousedown → focus → click，
    // focus 时不打开（click 会负责 toggle/打开），避免闪现即收
    const skipFocusOpenRef = useRef(false)

    const commitValues = useCallback(
        (nextValues: string[]) => {
            if (value === undefined) {
                setSelectedValues(nextValues)
            }
            onChange?.(nextValues)
        },
        [value, setSelectedValues, onChange]
    )

    const filteredData = useMemo(() => {
        let base = flatData
        if (searchable && searchValue) {
            // defaultOptionsFilter 等实现会按 limit 限制条数（分组按选项条数累计），
            // 此处兜底再 slice 一次，保证自定义 filter 未处理 limit 时行为一致
            base = flattenParsedItems(
                filter({ options: parsedItems, search: searchValue, limit: limit ?? Infinity })
            )
        }
        if (hidePickedOptions) {
            base = base.filter(item => !selectedValues.includes(item.value))
        }
        return limit !== undefined ? base.slice(0, limit) : base
    }, [parsedItems, flatData, searchable, searchValue, filter, limit, hidePickedOptions, selectedValues])

    const handleOpenedChange = useCallback(
        (next: boolean) => {
            setOpened(next)
            // 打开时清空上次搜索：残留的 searchValue 会让列表保持过滤、输入框显示旧查询。
            // 在打开时（而非关闭时）清空，可避免关闭过渡动画期间列表突然展开的闪动
            if (next) {
                setSearchValue('')
            }
        },
        [setSearchValue]
    )

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

        commitValues(nextValues)

        if (searchable) {
            setSearchValue('')
        }
    }

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>, optionValue: string) => {
        event.stopPropagation()
        if (disabled) return

        commitValues(selectedValues.filter(v => v !== optionValue))
    }

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        if (disabled) return

        commitValues([])
        setSearchValue('')
    }

    // 胶囊拖拽/键盘重排：与选项提交同一条 commit 通道，受控/非受控行为一致
    const pillsReorder = usePillsReorder<string>({
        value: selectedValues,
        onChange: commitValues,
        enabled: withPillsReorder && !disabled
    })

    const isMaxSelected = maxSelectedValues !== undefined && selectedValues.length >= maxSelectedValues

    const valuesList = selectedValues.map((selectedValue, index) => {
        const option = flatData.find(item => item.value === selectedValue)
        const displayLabel = option?.label ?? selectedValue

        if (renderPill) {
            return (
                <span key={selectedValue}>
                    {renderPill({
                        option: option ?? { value: selectedValue, label: displayLabel },
                        value: selectedValue,
                        label: displayLabel,
                        onRemove: event => handleRemove(event, selectedValue),
                        disabled: !!disabled
                    })}
                </span>
            )
        }

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
                {...pillsReorder.getPillProps(index)}
            >
                {displayLabel}
            </Badge>
        )
    })

    const shouldShowClear = clearable && selectedValues.length > 0 && !disabled && !loading
    const rightSection = rightSectionProp ?? (
        <div className={classes.section}>
            {shouldShowClear && (
                <CloseButton
                    size="xs"
                    onClick={handleClear}
                    onMouseDown={event => event.preventDefault()}
                    aria-label="清除已选值"
                    {...clearButtonProps}
                />
            )}
            <MultiSelectChevronIcon className={classes.chevron} data-opened={opened || undefined} />
        </div>
    )

    const inputValue = searchable ? searchValue : ''
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

    const dropdownStyles = getStyles('dropdown')

    const input = (
        <Combobox
            {...comboboxProps}
            opened={opened}
            onChange={handleOpenedChange}
            searchValue={searchable ? searchValue : undefined}
            onSearchChange={searchable ? setSearchValue : undefined}
            selectedValues={selectedValues}
            onOptionSubmit={handleOptionSubmit}
            position={position}
            offset={offset}
            disabled={disabled}
            closeOnBlur={closeOnBlur}
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
                    {valuesList.length > 0 && (
                        <div className={classes.valuesList} {...pillsReorder.getListProps()}>
                            {valuesList}
                        </div>
                    )}
                    <InputBase
                        {...others}
                        id={inputId}
                        ref={mergedInputRef}
                        component="input"
                        type="text"
                        value={inputValue}
                        placeholder={selectedValues.length === 0 ? placeholder : undefined}
                        disabled={disabled}
                        invalid={!!error}
                        loading={loading}
                        readOnly={!searchable}
                        role="combobox"
                        size={size}
                        rightSection={rightSection}
                        onFocus={event => {
                            consumerOnFocus?.(event)
                            if (disabled) {
                                return
                            }
                            const fromPointerDown = skipFocusOpenRef.current
                            skipFocusOpenRef.current = false
                            if (fromPointerDown) {
                                return
                            }
                            // 仅键盘导航（Tab 切入）时通过 focus 打开；鼠标点击的开/关由 wrapper 的 click toggle 统一处理，
                            // 否则 focus 先打开、随后的 click toggle 又关闭，造成闪现即收
                            if (event.currentTarget.matches(':focus-visible') || openOnFocus) {
                                handleOpenedChange(true)
                            }
                        }}
                        onMouseDown={event => {
                            consumerOnMouseDown?.(event)
                            skipFocusOpenRef.current = true
                        }}
                        onBlur={event => {
                            consumerOnBlur?.(event)
                        }}
                        onKeyDown={event => {
                            // 胶囊键盘重排（Alt+方向键）：Combobox 捕获阶段只处理 Enter/方向键上下，
                            // ArrowLeft 等按键冒泡到此处处理
                            pillsReorder.handleInputKeyDown(event)
                            // 不吞掉消费者传入的 onKeyDown（与 focus/mouse 处理器同模式）
                            consumerOnKeyDown?.(event)
                        }}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            if (searchable) {
                                setSearchValue(event.currentTarget.value)
                                if (!opened) {
                                    // 输入打开下拉时直接 setOpened：handleOpenedChange 打开时会清空搜索，
                                    // 同一批次内会覆盖刚设置的搜索词
                                    setOpened(true)
                                }
                            }
                        }}
                        wrapperProps={{
                            ...wrapperPropsProp,
                            style: {
                                ...wrapperPropsProp?.style,
                                cursor: searchable ? undefined : 'pointer'
                            }
                        }}
                    />
                </MultiSelectTarget>
            </Combobox.Target>

            <Combobox.Dropdown
                className={dropdownStyles.className}
                style={{
                    ...dropdownStyles.style,
                    maxHeight: maxDropdownHeight ? rem(maxDropdownHeight) : undefined
                }}
            >
                <Combobox.Options {...getStyles('options')}>
                    {filteredData.length === 0 && nothingFoundMessage ? (
                        <Combobox.Empty {...getStyles('empty')}>{nothingFoundMessage}</Combobox.Empty>
                    ) : (
                        renderOptions(
                            filteredData,
                            selectedValues,
                            isMaxSelected,
                            checkIconPosition,
                            getStyles,
                            renderOption
                        )
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
    checkIconPosition: 'left' | 'right' | undefined,
    getStyles: (selector: 'option' | 'group' | 'groupLabel') => { className?: string; style?: React.CSSProperties },
    renderOption?: MultiSelectRenderOption
) {
    const result: React.ReactNode[] = []
    // 记录每个组名的出现次数，组不连续（如 A,B,A）时为同名组生成唯一 key
    const groupOccurrences = new Map<string, number>()
    // 同一渲染内所有选项共享的样式与图标，避免循环内重复创建
    const optionStyles = getStyles('option')
    const groupStyles = getStyles('group')
    const groupLabelStyles = getStyles('groupLabel')
    const check = <MultiSelectCheckIcon className={classes.check} />
    const contentStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        justifyContent: checkIconPosition === 'right' ? 'space-between' : undefined
    }

    const renderSingleOption = (item: ComboboxOptionData, keySuffix: number) => {
        const selected = selectedValues.includes(item.value)
        const disabled = item.disabled || (isMaxSelected && !selected)

        return (
            <Combobox.Option
                key={`${item.value}-${keySuffix}`}
                value={item.value}
                disabled={disabled}
                className={optionStyles.className}
                style={optionStyles.style}
            >
                <span style={contentStyle}>
                    {checkIconPosition === 'left' && selected && check}
                    {renderOption ? renderOption({ option: item, checked: selected }) : item.label}
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
                <Combobox.Group
                    key={`group-${group}-${occurrence}`}
                    label={group}
                    className={groupStyles.className}
                    style={groupStyles.style}
                    groupLabelProps={{
                        className: groupLabelStyles.className,
                        style: groupLabelStyles.style
                    }}
                >
                    {groupItems.map((groupItem, groupItemIndex) =>
                        renderSingleOption(groupItem, groupItemIndex)
                    )}
                </Combobox.Group>
            )
        } else {
            result.push(renderSingleOption(item, index))
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
