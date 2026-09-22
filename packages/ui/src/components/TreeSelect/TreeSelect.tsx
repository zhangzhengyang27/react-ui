import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useId, useUncontrolled } from '@xiaoye-react/hooks'
import {
    BoxProps,
    ElementProps,
    extractStyleProps,
    Factory,
    factory,
    UIColor,
    StylesApiProps,
    useProps,
    useResolvedStylesApi,
    useStyles,
} from '../../core'
import { Combobox } from '../Combobox'
import type { ComboboxProps, ComboboxStylesNames } from '../Combobox'
import {
    __BaseInputProps,
    __InputStylesNames,
    ClearSectionMode,
    InputClearButton,
    InputClearButtonProps,
    InputVariant,
} from '../Input'
import { InputBase } from '../InputBase'
import { Pill } from '../Pill'
import { PillsInput } from '../PillsInput'
import { ScrollArea, ScrollAreaProps } from '../ScrollArea'
import { AccordionChevron } from '../Accordion'
import type { TreeNodeData } from '../Tree'
import { filterTreeData } from '../Tree/filter-tree-data/filter-tree-data'
import {
    findTreeNode,
    getChildrenNodesValues,
} from '../Tree/get-children-nodes-values/get-children-nodes-values'
import { getAllCheckedNodes } from '../Tree/get-all-checked-nodes/get-all-checked-nodes'
import { getTreeExpandedState, TreeExpandedState } from '../Tree/use-tree'
import { flattenTreeSelectData } from './flatten-tree-select-data'
import {
    CheckedStrategy,
    checkedToValue,
    expandToLeafChecked,
} from './get-checked-values-by-strategy'
import {
    TreeSelectChevronAriaLabels,
    TreeSelectOption,
    TreeSelectRenderNodePayload,
} from './TreeSelectOption'
import classes from './TreeSelect.module.css'

export type TreeSelectStylesNames =
    | __InputStylesNames
    | ComboboxStylesNames
    | 'pill'
    | 'pillsList'
    | 'inputField'

export type TreeSelectMode = 'single' | 'multiple' | 'checkbox'

export type TreeSelectValue<Mode extends TreeSelectMode> = Mode extends 'single'
    ? string | null
    : string[]

export interface TreeSelectProps<Mode extends TreeSelectMode = 'single'>
    extends
        BoxProps,
        __BaseInputProps,
        StylesApiProps<TreeSelectFactory>,
        ElementProps<'input', 'size' | 'value' | 'defaultValue' | 'onChange'> {
    data: TreeNodeData[]
    mode?: Mode
    value?: TreeSelectValue<Mode>
    defaultValue?: TreeSelectValue<Mode>
    onChange?: (value: TreeSelectValue<Mode>) => void
    checkStrictly?: boolean
    checkedStrategy?: CheckedStrategy
    defaultExpandedValues?: string[]
    defaultExpandAll?: boolean
    expandedValues?: string[]
    onExpandedChange?: (values: string[]) => void
    expandOnClick?: boolean
    searchable?: boolean
    searchValue?: string
    defaultSearchValue?: string
    onSearchChange?: (value: string) => void
    filter?: (query: string, node: TreeNodeData) => boolean
    nothingFoundMessage?: React.ReactNode
    allowDeselect?: boolean
    clearable?: boolean
    clearSectionMode?: ClearSectionMode
    clearButtonProps?: InputClearButtonProps
    maxValues?: number
    maxDisplayedValues?: number
    maxDisplayedValuesContent?: React.ReactNode | ((overflow: number) => React.ReactNode)
    onRemove?: (value: string) => void
    onClear?: () => void
    renderNode?: (payload: TreeSelectRenderNodePayload) => React.ReactNode
    withLines?: boolean
    hiddenInputProps?: Omit<React.ComponentProps<'input'>, 'value'>
    hiddenInputValuesDivider?: string
    scrollAreaProps?: ScrollAreaProps
    chevronColor?: UIColor
    maxDropdownHeight?: number | string
    dropdownOpened?: boolean
    defaultDropdownOpened?: boolean
    onDropdownOpen?: () => void
    onDropdownClose?: () => void
    comboboxProps?: Omit<
        Partial<ComboboxProps>,
        'opened' | 'onChange' | 'selectedValues' | 'onOptionSubmit' | 'disabled' | 'children'
    >
    clearSearchOnChange?: boolean
    openOnFocus?: boolean
    chevronAriaLabels?: TreeSelectChevronAriaLabels
}

export type TreeSelectBaseProps = TreeSelectProps<TreeSelectMode>

export type TreeSelectFactory = Factory<{
    props: TreeSelectBaseProps
    ref: HTMLInputElement
    stylesNames: TreeSelectStylesNames
    variant: InputVariant
}>

const defaultProps = {
    mode: 'single',
    allowDeselect: true,
    checkedStrategy: 'child',
    maxValues: Infinity,
    hiddenInputValuesDivider: ',',
    clearSearchOnChange: true,
    openOnFocus: true,
    size: 'sm',
    withLines: true,
} satisfies Partial<TreeSelectBaseProps>

const clearSectionOffset: Record<string, number> = {
    xs: 41,
    sm: 50,
    md: 60,
    lg: 72,
    xl: 89,
}

function getAncestorsToNode(value: string, nodes: TreeNodeData[]): string[] | null {
    for (const node of nodes) {
        if (node.value === value) {
            return []
        }
        if (Array.isArray(node.children)) {
            const path = getAncestorsToNode(value, node.children)
            if (path !== null) {
                return [node.value, ...path]
            }
        }
    }
    return null
}

export const TreeSelect = factory<TreeSelectFactory>((_props: TreeSelectBaseProps, _ref) => {
    const props = useProps('TreeSelect', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        size,
        data,
        mode,
        value,
        defaultValue,
        onChange,
        checkStrictly,
        checkedStrategy,
        defaultExpandedValues,
        defaultExpandAll,
        expandedValues,
        onExpandedChange,
        expandOnClick,
        searchable,
        searchValue,
        defaultSearchValue,
        onSearchChange,
        filter,
        nothingFoundMessage,
        allowDeselect,
        clearable,
        clearSectionMode,
        clearButtonProps,
        maxValues,
        maxDisplayedValues,
        maxDisplayedValuesContent,
        onRemove,
        onClear,
        renderNode,
        withLines,
        hiddenInputProps,
        hiddenInputValuesDivider,
        scrollAreaProps,
        chevronColor,
        maxDropdownHeight,
        dropdownOpened,
        defaultDropdownOpened,
        onDropdownOpen,
        onDropdownClose,
        comboboxProps,
        clearSearchOnChange,
        openOnFocus,
        chevronAriaLabels,
        variant,
        onKeyDown,
        onFocus,
        onBlur,
        onClick,
        readOnly,
        disabled,
        radius,
        rightSection,
        rightSectionWidth,
        rightSectionPointerEvents,
        rightSectionProps,
        leftSection,
        leftSectionWidth,
        leftSectionPointerEvents,
        leftSectionProps,
        inputContainer,
        inputWrapperOrder,
        withAsterisk,
        labelProps,
        descriptionProps,
        errorProps,
        successProps,
        wrapperProps,
        description,
        label,
        error,
        success,
        withErrorStyles,
        withSuccessStyles,
        name,
        form,
        id,
        placeholder,
        required,
        mod,
        attributes,
        ...others
    } = props

    const isMulti = mode === 'multiple' || mode === 'checkbox'
    const isCheckbox = mode === 'checkbox'
    const _id = useId(id)

    const [_opened, setOpened] = useUncontrolled<boolean>({
        value: dropdownOpened,
        defaultValue: defaultDropdownOpened,
        finalValue: false,
        onChange: (opened) => {
            if (opened) {
                onDropdownOpen?.()
            } else {
                onDropdownClose?.()
            }
        },
    })

    const initialExpanded = useMemo(() => {
        if (defaultExpandAll) {
            return getTreeExpandedState(data, '*')
        }
        if (defaultExpandedValues) {
            return getTreeExpandedState(data, defaultExpandedValues)
        }
        return getTreeExpandedState(data, [])
    }, [data, defaultExpandAll, defaultExpandedValues])

    const expandedToRecord = useCallback(
        (values: string[] | undefined): TreeExpandedState | undefined => {
            if (!values) {
                return undefined
            }
            return getTreeExpandedState(data, values)
        },
        [data]
    )

    const [_expandedState, setExpandedState] = useUncontrolled<TreeExpandedState>({
        value: expandedToRecord(expandedValues),
        defaultValue: initialExpanded,
        finalValue: {},
        onChange: (val) => {
            if (onExpandedChange) {
                onExpandedChange(
                    Object.entries(val)
                        .filter(([, v]) => v)
                        .map(([k]) => k)
                )
            }
        },
    })

    // 异步数据：useUncontrolled 的 defaultValue 只在挂载时读取一次，data 初始为空时
    // initialExpanded 算出来是 {}，defaultExpandAll 全折叠。data 首次非空时补一次
    // 初始展开（仅未受控且挂载时 data 为空的场景）
    const initialExpandedAppliedRef = useRef(data.length > 0)
    useEffect(() => {
        if (data.length === 0 || initialExpandedAppliedRef.current) {
            return
        }
        initialExpandedAppliedRef.current = true
        if (expandedValues === undefined && (defaultExpandAll || (defaultExpandedValues?.length ?? 0) > 0)) {
            setExpandedState(initialExpanded)
        }
    }, [data, expandedValues, defaultExpandAll, defaultExpandedValues, initialExpanded, setExpandedState])

    const toggleExpand = useCallback(
        (nodeValue: string) => {
            setExpandedState({ ..._expandedState, [nodeValue]: !_expandedState[nodeValue] })
        },
        [_expandedState, setExpandedState]
    )

    const initialSearchValue = useMemo(() => {
        if (mode !== 'single' || !defaultValue) {
            return ''
        }
        const node = findTreeNode(defaultValue as string, data)
        return node ? (typeof node.label === 'string' ? node.label : '') : ''
    }, [mode, defaultValue, data])

    const [_searchValue, setSearchValue] = useUncontrolled({
        value: searchValue,
        defaultValue: defaultSearchValue,
        finalValue: initialSearchValue,
        onChange: onSearchChange,
    })

    const handleSearchChange = (val: string) => {
        setSearchValue(val)
    }

    const [_value, setValue] = useUncontrolled({
        value: value as any,
        defaultValue: defaultValue as any,
        finalValue: isMulti ? [] : null,
        onChange,
    })

    const internalChecked = useMemo(() => {
        if (!isCheckbox || !_value || !Array.isArray(_value)) {
            return []
        }
        if (checkStrictly) {
            return _value
        }
        return expandToLeafChecked(_value, data)
    }, [isCheckbox, _value, data, checkStrictly])

    // checkbox 模式下 isNodeChecked/isNodeIndeterminate 每次调用都全树重算，
    // N 个可见选项渲染即 O(n²)（下拉未打开时 options 也在 render 中构建）。
    // 这里一次性计算全部节点勾选状态并建索引（对齐 use-tree 的 checkedNodesMap 模式）
    const checkedNodesMap = useMemo(() => {
        if (!isCheckbox || checkStrictly) {
            return null
        }
        const map = new Map<string, { checked: boolean; indeterminate: boolean }>()
        for (const node of getAllCheckedNodes(data, internalChecked).result) {
            const existing = map.get(node.value)
            if (existing) {
                // value 重复时合并标记，保持与旧实现 some() 等价的语义
                existing.checked = existing.checked || node.checked
                existing.indeterminate = existing.indeterminate || node.indeterminate
            } else {
                map.set(node.value, { checked: node.checked, indeterminate: node.indeterminate })
            }
        }
        return map
    }, [isCheckbox, checkStrictly, data, internalChecked])

    const filteredData = useMemo(() => {
        if (!searchable || !_searchValue) {
            return data
        }
        if (mode === 'single' && _value != null) {
            const node = findTreeNode(_value as string, data)
            if (node && _searchValue === (typeof node.label === 'string' ? node.label : '')) {
                return data
            }
        }
        return filterTreeData(data, _searchValue, filter)
    }, [data, _searchValue, filter, searchable, mode, _value])

    const expandedForRender = useMemo(() => {
        if (_searchValue && filteredData !== data) {
            const expanded = { ..._expandedState }
            const expandFilteredParents = (nodes: TreeNodeData[]) => {
                for (const node of nodes) {
                    if (Array.isArray(node.children) && node.children.length > 0) {
                        expanded[node.value] = true
                        expandFilteredParents(node.children)
                    }
                }
            }
            expandFilteredParents(filteredData)
            return expanded
        }
        return _expandedState
    }, [filteredData, _expandedState, _searchValue, data])

    const flatNodes = useMemo(
        () => flattenTreeSelectData(filteredData, expandedForRender),
        [filteredData, expandedForRender]
    )

    const nodeLookup = useMemo(() => {
        const lookup: Record<string, TreeNodeData> = {}
        const walk = (nodes: TreeNodeData[]) => {
            for (const node of nodes) {
                lookup[node.value] = node
                if (Array.isArray(node.children)) {
                    walk(node.children)
                }
            }
        }
        walk(data)
        return lookup
    }, [data])

    // memo 化：作为 label 同步 effect 的依赖时，data 变化经 nodeLookup 传导，触发过期 label 重新同步
    const getNodeLabel = useCallback(
        (nodeValue: string): string => {
            const node = nodeLookup[nodeValue]
            if (!node) {
                return nodeValue
            }
            return typeof node.label === 'string' ? node.label : nodeValue
        },
        [nodeLookup]
    )

    const getStyles = useStyles<TreeSelectFactory>({
        name: 'TreeSelect',
        classes,
        props,
        classNames,
        styles,
        unstyled,
        attributes,
    })

    const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<TreeSelectFactory>({
        props,
        styles,
        classNames,
    })

    const {
        styleProps,
        // type/autoComplete 此前解构后丢弃：消费者传 autoComplete="off" 被静默吞掉，
        // 浏览器自动填充干扰无解。type 透传到单选 InputBase；多选 PillsInput.Field 的
        // type 是自身可见性语义（DOM type 恒为 text），故多选只透传 autoComplete
        rest: { type, autoComplete, ...rest },
    } = extractStyleProps(others)

    const handleOptionSubmit = (val: string) => {
        if (mode === 'single') {
            if (expandOnClick) {
                const node = findTreeNode(val, data)
                if (node && Array.isArray(node.children) && node.children.length > 0) {
                    // 展开父节点不是选中，不关闭下拉
                    toggleExpand(val)
                    return
                }
            }
            const nextValue = allowDeselect && val === _value ? null : val
            setValue(nextValue)
            if (clearSearchOnChange) {
                handleSearchChange(nextValue != null ? getNodeLabel(nextValue) : '')
            }
            // 单选语义：选中叶子节点后关闭下拉（Combobox 不再无条件关闭）
            setOpened(false)
        } else if (mode === 'multiple') {
            if (expandOnClick) {
                const node = findTreeNode(val, data)
                if (node && Array.isArray(node.children) && node.children.length > 0) {
                    toggleExpand(val)
                    return
                }
            }
            const arr = (_value as string[]) || []
            if (arr.includes(val)) {
                setValue(arr.filter((v: string) => v !== val))
                onRemove?.(val)
            } else if (arr.length < (maxValues ?? Infinity)) {
                setValue([...arr, val])
            } else {
                return
            }
            // 多选语义：选中后下拉保持打开，无需重开补丁
            if (clearSearchOnChange) {
                setSearchValue('')
            }
        } else if (mode === 'checkbox') {
            const nodeChecked = checkStrictly
                ? internalChecked.includes(val)
                : !!checkedNodesMap?.get(val)?.checked

            let newInternalChecked: string[]
            if (checkStrictly) {
                newInternalChecked = nodeChecked
                    ? internalChecked.filter((v) => v !== val)
                    : [...internalChecked, val]
            } else {
                const childLeaves = getChildrenNodesValues(val, data)
                if (nodeChecked) {
                    newInternalChecked = internalChecked.filter((v) => !childLeaves.includes(v))
                } else {
                    newInternalChecked = [...new Set([...internalChecked, ...childLeaves])]
                }
            }

            const newValue = checkedToValue(newInternalChecked, data, checkedStrategy!)
            if (!nodeChecked && newValue.length > (maxValues ?? Infinity)) {
                return
            }
            setValue(newValue)
            // 多选语义：勾选后下拉保持打开，无需重开补丁
            if (clearSearchOnChange) {
                setSearchValue('')
            }

            if (expandOnClick) {
                const node = findTreeNode(val, data)
                if (node && Array.isArray(node.children) && node.children.length > 0) {
                    if (!_expandedState[val]) {
                        toggleExpand(val)
                    }
                }
            }
        }
    }

    const selectedValues = useMemo(() => {
        if (isMulti) {
            return Array.isArray(_value) ? _value : []
        }
        // '' 是合法节点值，不能用 falsy 判断
        return _value != null ? [_value as string] : []
    }, [isMulti, _value])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(event)

        if (event.key === ' ' && !searchable && isMulti) {
            event.preventDefault()
            setOpened(!_opened)
        }

        if (event.key === 'Backspace' && _searchValue.length === 0 && isMulti && !readOnly) {
            const arr = (_value as string[]) || []
            if (arr.length > 0) {
                const removed = arr[arr.length - 1]
                onRemove?.(removed)
                setValue(arr.slice(0, -1))
            }
        }
    }

    useEffect(() => {
        if (mode !== 'single' || !searchable) {
            return
        }
        if (value === null) {
            setSearchValue('')
        } else if (typeof value === 'string') {
            setSearchValue(getNodeLabel(value))
        }
        // 依赖 getNodeLabel（经 nodeLookup 依赖 data）：data 变化但 value 不变时重新同步 label，避免过期。
        // 不列入 setSearchValue：useUncontrolled 的 setter 每次渲染重建，列入会导致每渲染都执行同步
    }, [value, mode, searchable, getNodeLabel, setSearchValue])

    const prevDropdownOpenedRef = useRef(false)
    useEffect(() => {
        // 打开时展开选中节点的祖先（不限 searchable），确保选中项在下拉中可见
        if (_opened && !prevDropdownOpenedRef.current && _value != null) {
            const targets = Array.isArray(_value) ? _value : [_value]
            const newExpanded = { ..._expandedState }
            let changed = false
            for (const target of targets) {
                const ancestors = getAncestorsToNode(target as string, data)
                if (ancestors) {
                    for (const a of ancestors) {
                        if (!newExpanded[a]) {
                            newExpanded[a] = true
                            changed = true
                        }
                    }
                }
            }
            if (changed) {
                setExpandedState(newExpanded)
            }
        }
        prevDropdownOpenedRef.current = _opened
        // 不列入 setExpandedState：useUncontrolled 的 setter 每次渲染重建，上升沿守卫已保证只在打开瞬间执行
    }, [_opened, _value, _expandedState, data, setExpandedState])

    const clearButton = (
        <InputClearButton
            {...clearButtonProps}
            onClick={() => {
                onClear?.()
                setValue(isMulti ? [] : null)
                handleSearchChange('')
            }}
        />
    )

    // '' 是合法节点值，单选判断有无值只能用 != null（不能用 falsy 或 !== ''）
    const hasValue = isMulti ? Array.isArray(_value) && _value.length > 0 : _value != null
    const _clearable = clearable && hasValue && !disabled && !readOnly

    const singleDisplayLabel = useMemo(() => {
        if (mode !== 'single' || _value == null) {
            return ''
        }
        return getNodeLabel(_value as string)
    }, [mode, _value, nodeLookup])

    const displayValues = useMemo(() => {
        if (!isMulti || !Array.isArray(_value)) {
            return []
        }
        return _value as string[]
    }, [isMulti, _value])

    const pillsListStyle =
        _clearable && isMulti
            ? { paddingInlineEnd: clearSectionOffset[size as string] ?? clearSectionOffset.sm }
            : undefined

    const visiblePills =
        maxDisplayedValues != null ? displayValues.slice(0, maxDisplayedValues) : displayValues

    const overflowCount =
        maxDisplayedValues != null ? Math.max(0, displayValues.length - maxDisplayedValues) : 0

    const pills = visiblePills.map((item, index) => (
        <Pill
            key={`${item}-${index}`}
            withRemoveButton={!readOnly}
            onRemove={() => {
                if (isCheckbox) {
                    const childLeaves = checkStrictly ? [item] : getChildrenNodesValues(item, data)
                    const newInternal = internalChecked.filter((v) => !childLeaves.includes(v))
                    setValue(checkedToValue(newInternal, data, checkedStrategy!))
                } else {
                    setValue((_value as string[]).filter((v: string) => v !== item))
                }
                onRemove?.(item)
            }}
            unstyled={unstyled}
            disabled={disabled}
            {...getStyles('pill')}
        >
            {getNodeLabel(item)}
        </Pill>
    ))

    if (overflowCount > 0) {
        const overflowContent =
            typeof maxDisplayedValuesContent === 'function'
                ? maxDisplayedValuesContent(overflowCount)
                : maxDisplayedValuesContent || `+${overflowCount} more`
        pills.push(
            <Pill key="__overflow" unstyled={unstyled} disabled={disabled} {...getStyles('pill')}>
                {overflowContent}
            </Pill>
        )
    }

    const isEmpty = flatNodes.length === 0

    const options = flatNodes.map((flatNode) => {
        const isSelected =
            mode === 'single'
                ? _value === flatNode.node.value
                : mode === 'multiple'
                    ? ((_value as string[]) || []).includes(flatNode.node.value)
                    : false

        const checkedStatus = checkedNodesMap?.get(flatNode.node.value)
        const nodeChecked = isCheckbox
            ? checkStrictly
                ? internalChecked.includes(flatNode.node.value)
                : !!checkedStatus?.checked
            : false

        const nodeIndeterminate = checkedStatus?.indeterminate ?? false

        return (
            <TreeSelectOption
                key={flatNode.node.value}
                node={flatNode.node}
                level={flatNode.level}
                expanded={flatNode.expanded}
                hasChildren={flatNode.hasChildren}
                selected={isSelected}
                checked={nodeChecked}
                indeterminate={nodeIndeterminate}
                showCheckbox={isCheckbox}
                isLastChild={flatNode.isLastChild}
                lineGuides={flatNode.lineGuides}
                withLines={!!withLines}
                onToggleExpand={toggleExpand}
                renderNode={renderNode}
                chevronAriaLabels={chevronAriaLabels}
            />
        )
    })

    const dropdown = (
        // maxDropdownHeight 需同时作用在 Dropdown 上：其 CSS max-height 默认 300px，
        // 只传给内层 ScrollArea 时超过 300 的高度会被 Dropdown 截断
        <Combobox.Dropdown style={{ maxHeight: maxDropdownHeight ?? 220 }}>
            <Combobox.Options className={classes.optionsWrapper} aria-multiselectable={isMulti || undefined}>
                <ScrollArea
                    type="always"
                    scrollbars="y"
                    style={{ maxHeight: maxDropdownHeight ?? 220 }}
                    {...scrollAreaProps}
                >
                    {options}
                </ScrollArea>
                {isEmpty && nothingFoundMessage && <Combobox.Empty>{nothingFoundMessage}</Combobox.Empty>}
            </Combobox.Options>
        </Combobox.Dropdown>
    )

    const chevron = <AccordionChevron size={16} style={{ color: chevronColor }} />

    if (isMulti) {
        return (
            <>
                <Combobox
                    {...comboboxProps}
                    opened={_opened}
                    onChange={setOpened}
                    selectedValues={selectedValues}
                    onOptionSubmit={handleOptionSubmit}
                    disabled={disabled}
                >
                    <Combobox.Target>
                        <PillsInput
                            {...styleProps}
                            __staticSelector="TreeSelect"
                            classNames={resolvedClassNames}
                            styles={resolvedStyles}
                            unstyled={unstyled}
                            size={size}
                            className={className}
                            style={style}
                            variant={variant}
                            disabled={disabled}
                            radius={radius}
                            __defaultRightSection={chevron}
                            __clearSection={clearButton}
                            __clearable={_clearable}
                            __clearSectionMode={clearSectionMode}
                            rightSection={rightSection}
                            rightSectionPointerEvents={rightSectionPointerEvents || 'none'}
                            rightSectionWidth={rightSectionWidth}
                            rightSectionProps={rightSectionProps}
                            leftSection={leftSection}
                            leftSectionWidth={leftSectionWidth}
                            leftSectionPointerEvents={leftSectionPointerEvents}
                            leftSectionProps={leftSectionProps}
                            inputContainer={inputContainer}
                            inputWrapperOrder={inputWrapperOrder}
                            withAsterisk={withAsterisk}
                            labelProps={labelProps}
                            descriptionProps={descriptionProps}
                            errorProps={errorProps}
                            successProps={successProps}
                            wrapperProps={wrapperProps}
                            description={description}
                            label={label}
                            error={error}
                            success={success}
                            withErrorStyles={withErrorStyles}
                            withSuccessStyles={withSuccessStyles}
                            __stylesApiProps={{
                                ...props,
                                rightSectionPointerEvents: rightSectionPointerEvents || 'none',
                                multiline: true,
                            }}
                            id={_id}
                            required={required}
                            mod={mod}
                            attributes={attributes}
                        >
                            <Pill.Group
                                attributes={attributes}
                                disabled={disabled}
                                unstyled={unstyled}
                                {...getStyles('pillsList', { style: pillsListStyle })}
                            >
                                {pills}
                                <PillsInput.Field
                                    ref={_ref}
                                    {...rest}
                                    id={_id}
                                    placeholder={placeholder}
                                    type={!searchable && !placeholder ? 'hidden' : 'visible'}
                                    autoComplete={autoComplete}
                                    {...getStyles('inputField')}
                                    unstyled={unstyled}
                                    onFocus={(event) => {
                                        onFocus?.(event)
                                        if (openOnFocus && searchable) {
                                            setOpened(true)
                                        }
                                    }}
                                    onBlur={(event) => {
                                        onBlur?.(event)
                                        // 焦点移到本组件内部（胶囊移除按钮等）时不关面板：
                                        // 否则多选点 Pill 移除会误关下拉并清空搜索词
                                        const related = event.relatedTarget as Node | null
                                        if (related && event.currentTarget.parentElement?.contains(related)) {
                                            return
                                        }
                                        setOpened(false)
                                        if (clearSearchOnChange) {
                                            handleSearchChange('')
                                        }
                                    }}
                                    onKeyDown={handleKeyDown}
                                    value={_searchValue}
                                    onChange={(event) => {
                                        handleSearchChange(event.currentTarget.value)
                                        if (searchable) {
                                            setOpened(true)
                                        }
                                    }}
                                    disabled={disabled}
                                    readOnly={readOnly || !searchable}
                                    pointer={!searchable}
                                />
                            </Pill.Group>
                        </PillsInput>
                    </Combobox.Target>
                    {dropdown}
                </Combobox>
                <input
                    type="hidden"
                    name={name}
                    value={Array.isArray(_value) ? _value.join(hiddenInputValuesDivider) : (_value as string) ?? ''}
                    form={form}
                    disabled={disabled}
                    {...hiddenInputProps}
                />
            </>
        )
    }

    return (
        <>
            <Combobox
                {...comboboxProps}
                opened={_opened}
                onChange={setOpened}
                selectedValues={selectedValues}
                onOptionSubmit={handleOptionSubmit}
                disabled={disabled}
            >
                <Combobox.Target>
                    <InputBase
                        ref={_ref}
                        id={_id}
                        __defaultRightSection={chevron}
                        __clearSection={clearButton}
                        __clearable={_clearable}
                        __clearSectionMode={clearSectionMode}
                        rightSection={rightSection}
                        rightSectionPointerEvents={rightSectionPointerEvents || 'none'}
                        {...rest}
                        {...styleProps}
                        size={size}
                        type={type}
                        autoComplete={autoComplete}
                        __staticSelector="TreeSelect"
                        disabled={disabled}
                        readOnly={readOnly || !searchable}
                        value={searchable ? _searchValue : singleDisplayLabel}
                        onChange={(event) => {
                            handleSearchChange(event.currentTarget.value)
                            setOpened(true)
                        }}
                        onFocus={(event) => {
                            if (openOnFocus && searchable) {
                                setOpened(true)
                            }
                            onFocus?.(event)
                        }}
                        onBlur={(event) => {
                            if (searchable) {
                                setOpened(false)
                            }
                            handleSearchChange(_value != null ? getNodeLabel(_value as string) : '')
                            onBlur?.(event)
                        }}
                        onClick={(event) => {
                            if (searchable) {
                                setOpened(true)
                            } else {
                                setOpened(!_opened)
                            }
                            onClick?.(event)
                        }}
                        onKeyDown={handleKeyDown}
                        classNames={resolvedClassNames}
                        styles={resolvedStyles}
                        unstyled={unstyled}
                        pointer={!searchable}
                        error={error}
                        success={success}
                        attributes={attributes}
                        className={className}
                        style={style}
                        variant={variant}
                        radius={radius}
                        leftSection={leftSection}
                        leftSectionWidth={leftSectionWidth}
                        leftSectionPointerEvents={leftSectionPointerEvents}
                        leftSectionProps={leftSectionProps}
                        rightSectionWidth={rightSectionWidth}
                        rightSectionProps={rightSectionProps}
                        inputContainer={inputContainer}
                        inputWrapperOrder={inputWrapperOrder}
                        withAsterisk={withAsterisk}
                        labelProps={labelProps}
                        descriptionProps={descriptionProps}
                        errorProps={errorProps}
                        successProps={successProps}
                        wrapperProps={wrapperProps}
                        description={description}
                        label={label}
                        withErrorStyles={withErrorStyles}
                        withSuccessStyles={withSuccessStyles}
                        placeholder={placeholder}
                        required={required}
                        mod={mod}
                    />
                </Combobox.Target>
                {dropdown}
            </Combobox>
            <input
                type="hidden"
                value={(_value as string) ?? ''}
                name={name}
                form={form}
                disabled={disabled}
                {...hiddenInputProps}
            />
        </>
    )
})

TreeSelect.classes = { ...InputBase.classes, ...classes }
TreeSelect.displayName = '@xiaoye-react/ui/TreeSelect'
