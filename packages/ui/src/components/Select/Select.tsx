import { useCallback, useMemo, useRef, useState } from 'react'
import { useId, useUncontrolled } from '@xiaoye-react/hooks'
import { BoxProps, factory, Factory, UISize, rem, StylesApiProps, useProps, useStyles } from '../../core'
import { CloseButton } from '../CloseButton'
import { Combobox } from '../Combobox'
import type { ComboboxOptionData } from '../Combobox'
import {
    ComboboxItem,
    ComboboxItemGroup,
    ComboboxParsedItem,
    OptionsFilter,
    defaultOptionsFilter,
    getParsedComboboxData,
    isOptionsGroup
} from '../ComboboxPopover'
import { __BaseInputProps } from '../Input'
import { InputBase } from '../InputBase'
import { InputWrapper } from '../Input'
import { Loader } from '../Loader'
import classes from './Select.module.css'

export type SelectStylesNames = 'root' | 'dropdown' | 'options' | 'option' | 'empty' | 'group' | 'groupLabel'

/** 选项对象类型别名，与 Combobox 选项数据同构 */
export type SelectItem = ComboboxItem & { group?: string }

/** 分组数据格式，展开后等价于为每个 item 补充 group 字段 */
export type SelectGroupData = ComboboxItemGroup

export type SelectData = (string | SelectItem | SelectGroupData)[]

/** 自定义选项渲染，`checked` 为该选项是否为当前选中值 */
export type SelectRenderOption = (input: { option: ComboboxItem; checked: boolean }) => React.ReactNode

export interface SelectProps
    extends BoxProps,
        __BaseInputProps,
        StylesApiProps<SelectFactory>,
        Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'style' | 'value' | 'defaultValue' | 'onChange'> {
    /** Select options data */
    data?: SelectData

    //** 受控值，null 表示未选中（'' 是合法选项值） */
    value?: string | null

    //** 非受控组件的初始值 */
    defaultValue?: string | null

    /** 选中值变化时调用，null 表示未选中 */
    onChange?: (value: string | null) => void

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

    /** 点击已选中选项时是否取消选择 @default true */
    allowDeselect?: boolean

    /** 显示加载指示器，替代右侧图标 */
    loading?: boolean

    /** 输入框获得焦点时打开下拉框 @default false */
    openOnFocus?: boolean

    /** 最多渲染的选项数量，用于大数据量优化 */
    limit?: number

    /** 自定义选项渲染函数 */
    renderOption?: SelectRenderOption

    /** 自定义搜索过滤函数 */
    filter?: OptionsFilter
    /** 下拉框与目标元素的偏移距离（px） */
    offset?: number

    /** 输入框失焦时是否关闭下拉框 @default true */
    closeOnBlur?: boolean

    /** 受控搜索值 */
    searchValue?: string

    /** 搜索值变化时调用 */
    onSearchChange?: (value: string) => void
}

export type SelectFactory = Factory<{
    props: SelectProps
    ref: HTMLInputElement
    stylesNames: SelectStylesNames
}>

const defaultProps = {
    size: 'sm',
    allowDeselect: true,
    closeOnBlur: true
} satisfies Partial<SelectProps>

/** 把分组结构拍平为渲染用的选项列表，group 字符串落在每个选项上 */
function flattenParsedItems(items: ComboboxParsedItem[]): ComboboxOptionData[] {
    const result: ComboboxOptionData[] = []
    items.forEach(item => {
        if (isOptionsGroup(item)) {
            item.items.forEach(child => {
                result.push({
                    value: child.value,
                    label: child.label ?? child.value,
                    disabled: child.disabled,
                    group: item.group
                })
            })
        } else {
            // SelectData 允许选项自带 group 字段（历史 SelectItem 形状），解析时保留
            const group = (item as ComboboxItem & { group?: string }).group
            result.push({
                value: item.value,
                label: item.label ?? item.value,
                disabled: item.disabled,
                group
            })
        }
    })
    return result
}

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
        allowDeselect,
        loading,
        openOnFocus,
        limit,
        renderOption,
        filter = defaultOptionsFilter,
        offset,
        closeOnBlur,
        searchValue: searchValueProp,
        onSearchChange,
        id,
        wrapperProps: wrapperPropsProp,
        rightSection: rightSectionProp,
        onFocus: consumerOnFocus,
        onBlur: consumerOnBlur,
        onMouseDown: consumerOnMouseDown,
        ...others
    } = props

    // parsedItems 保留分组结构（供 OptionsFilter 使用），flatData 拍平后供渲染与选中值查找
    const parsedItems = useMemo(() => getParsedComboboxData(data), [data])
    const flatData = useMemo(() => flattenParsedItems(parsedItems), [parsedItems])
    // 用 null 而非 '' 表示"未选中"，避免 '' 选项值被当作未选中哨兵
    // 不向 useUncontrolled 传 onChange：其非受控 setter 内部会调 onChange，
    // 而下方 handler 已显式调用 onChange?.()，两处都传会导致每次变更触发两次
    const [selectedValue, setSelectedValue] = useUncontrolled<string | null>({
        value,
        defaultValue,
        finalValue: null
    })

    const [searchValue, setSearchValue] = useUncontrolled<string>({
        value: searchValueProp,
        finalValue: '',
        onChange: onSearchChange
    })
    const [opened, setOpened] = useState(false)
    const inputId = useId(id)
    // 区分"鼠标点击聚焦"与"键盘聚焦"：点击路径 mousedown → focus → click，
    // focus 时不打开（click 会负责 toggle/打开），避免闪现即收
    const skipFocusOpenRef = useRef(false)

    const selectedOption = useMemo(
        () => flatData.find(item => item.value === selectedValue),
        [flatData, selectedValue]
    )

    const filteredData = useMemo(() => {
        if (searchable && searchValue) {
            // defaultOptionsFilter 等实现会按 limit 限制条数（分组按选项条数累计），
            // 此处兜底再 slice 一次，保证自定义 filter 未处理 limit 时行为一致
            const filtered = flattenParsedItems(
                filter({ options: parsedItems, search: searchValue, limit: limit ?? Infinity })
            )
            return limit !== undefined ? filtered.slice(0, limit) : filtered
        }
        return limit !== undefined ? flatData.slice(0, limit) : flatData
    }, [parsedItems, flatData, searchable, searchValue, filter, limit])

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
        // allowDeselect：点击已选中项取消选择；否则保持原值
        const nextValue = allowDeselect && optionValue === selectedValue ? null : optionValue
        if (value === undefined) {
            setSelectedValue(nextValue)
        }
        onChange?.(nextValue)
        setSearchValue('')
        handleOpenedChange(false)
    }

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        if (value === undefined) {
            setSelectedValue(null)
        }
        onChange?.(null)
        setSearchValue('')
    }

    // memo 化：稳定数组引用，避免 Combobox 内部 context 因 selectedValues 身份变化而整体失效
    const selectedValues = useMemo(() => (selectedValue !== null ? [selectedValue] : []), [selectedValue])

    const rightSection = rightSectionProp ?? (
        <div className={classes.section}>
            {clearable && selectedValue !== null && !disabled && !loading && (
                <CloseButton
                    size="xs"
                    onClick={handleClear}
                    onMouseDown={event => event.preventDefault()}
                    aria-label="Clear selection"
                />
            )}
            <SelectChevronIcon className={classes.chevron} data-opened={opened || undefined} />
        </div>
    )

    const inputValue = searchable && opened ? searchValue : selectedOption?.label ?? ''

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

    const dropdownStyles = getStyles('dropdown')

    const input = (
        <Combobox
            opened={opened}
            onChange={handleOpenedChange}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            selectedValues={selectedValues}
            onOptionSubmit={handleOptionSubmit}
            position={position}
            offset={offset}
            disabled={disabled}
            closeOnBlur={closeOnBlur}
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
                        // 仅键盘导航（Tab 切入）时通过 focus 打开；鼠标点击的打开由 onMouseDown 负责
                        if (event.currentTarget.matches(':focus-visible') || openOnFocus) {
                            handleOpenedChange(true)
                        }
                    }}
                    onMouseDown={event => {
                        consumerOnMouseDown?.(event)
                        skipFocusOpenRef.current = true
                        // 可搜索时输入框 readOnly=false，ComboboxTarget 会忽略 click 事件，
                        // 鼠标路径 focus 又无 :focus-visible，必须由 mousedown 负责打开/重开
                        if (searchable && !disabled && !opened) {
                            handleOpenedChange(true)
                        }
                    }}
                    onBlur={event => {
                        consumerOnBlur?.(event)
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
                        style: { ...wrapperPropsProp?.style, cursor: searchable ? undefined : 'pointer' }
                    }}
                />
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
                        renderOptions(filteredData, selectedValue, checkIconPosition, getStyles, renderOption)
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
    selectedValue: string | null,
    checkIconPosition: 'left' | 'right' | undefined,
    getStyles: (selector: 'option' | 'group') => { className?: string; style?: React.CSSProperties },
    renderOption?: SelectRenderOption
) {
    const result: React.ReactNode[] = []
    // 记录每个组名的出现次数，组不连续（如 A,B,A）时为同名组生成唯一 key
    const groupOccurrences = new Map<string, number>()
    // 同一渲染内所有选项共享的样式与图标，避免循环内重复创建
    const optionStyles = getStyles('option')
    const groupStyles = getStyles('group')
    const check = <SelectCheckIcon className={classes.check} />
    const contentStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        justifyContent: checkIconPosition === 'right' ? 'space-between' : undefined
    }

    const renderSingleOption = (item: ComboboxOptionData, keySuffix: number) => {
        const selected = selectedValue === item.value

        return (
            <Combobox.Option
                key={`${item.value}-${keySuffix}`}
                value={item.value}
                disabled={item.disabled}
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

Select.classes = classes
Select.displayName = '@xiaoye-react/ui/Select'

export namespace Select {
    export type Props = SelectProps
    export type StylesNames = SelectStylesNames
    export type Factory = SelectFactory
}
