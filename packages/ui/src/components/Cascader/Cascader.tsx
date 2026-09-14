import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useId, useUncontrolled } from '@xiaoye-react/hooks'
import {
    ElementProps,
    Factory,
    factory,
    StylesApiProps,
    useProps,
    useResolvedStylesApi,
    useStyles,
    type BoxProps
} from '../../core'
import { AccordionChevron } from '../Accordion'
import { Combobox, type ComboboxProps, type ComboboxStylesNames } from '../Combobox'
import { __BaseInputProps, __InputStylesNames, InputClearButton } from '../Input'
import { InputBase } from '../InputBase'
import { Loader } from '../Loader'
import { Pill } from '../Pill'
import { PillsInput } from '../PillsInput'
import type { TreeNodeData } from '../Tree'
import { mergeAsyncChildren } from '../Tree/merge-async-children/merge-async-children'
import {
    collectLeafMatches,
    findTreeNodePath,
    getCascaderNodeLabel,
    isCascaderLeaf,
    type CascaderNode,
    type CascaderSearchResult
} from './cascader-utils'
import classes from './Cascader.module.css'

export type CascaderStylesNames =
    | __InputStylesNames
    | ComboboxStylesNames
    | 'pill'
    | 'pillsList'
    | 'inputField'
    | 'columns'
    | 'column'
    | 'columnItem'
    | 'searchList'
    | 'searchItem'
    | 'searchPath'

export type CascaderMode = 'single' | 'multiple'

export type CascaderValue<Mode extends CascaderMode> = Mode extends 'single' ? string | null : string[]

export interface CascaderProps<Mode extends CascaderMode = 'single'>
    extends BoxProps,
        __BaseInputProps,
        StylesApiProps<CascaderFactory>,
        ElementProps<'input', 'size' | 'value' | 'defaultValue' | 'onChange' | 'type'> {
    /** 级联数据 */
    data: CascaderNode[]

    /** 选择模式 @default 'single' */
    mode?: Mode

    /** 选中值（受控）：单选为叶子节点 value，多选为叶子 value 数组 */
    value?: CascaderValue<Mode>

    /** 初始值（非受控） */
    defaultValue?: CascaderValue<Mode>

    /** 选中值变化回调 */
    onChange?: (value: CascaderValue<Mode>) => void

    /** 异步加载子节点，节点需标记 hasChildren */
    loadData?: (node: CascaderNode) => Promise<CascaderNode[]>

    /** 是否可搜索叶子节点 @default false */
    searchable?: boolean

    /** 显示清除按钮 @default false */
    clearable?: boolean

    /** 搜索无结果时的提示 */
    nothingFoundMessage?: React.ReactNode

    /** 下拉面板最大高度 @default 240 */
    maxDropdownHeight?: number | string

    /** 每级面板宽度（px） @default 180 */
    columnWidth?: number

    /** 路径展示分隔符 @default ' / ' */
    pathSeparator?: string

    /** 下拉展开状态（受控） */
    dropdownOpened?: boolean

    /** 下拉初始展开状态（非受控） */
    defaultDropdownOpened?: boolean

    /** 下拉展开回调 */
    onDropdownOpen?: () => void

    /** 下拉收起回调 */
    onDropdownClose?: () => void

    comboboxProps?: Omit<
        Partial<ComboboxProps>,
        'opened' | 'onChange' | 'selectedValues' | 'onOptionSubmit' | 'disabled' | 'children'
    >
}

export type CascaderBaseProps = CascaderProps<CascaderMode>

export type CascaderFactory = Factory<{
    props: CascaderBaseProps
    ref: HTMLInputElement
    stylesNames: CascaderStylesNames
    compound: true
}>

const defaultProps = {
    mode: 'single',
    searchable: false,
    clearable: false,
    maxDropdownHeight: 240,
    columnWidth: 180,
    pathSeparator: ' / ',
    size: 'sm'
} satisfies Partial<CascaderBaseProps>

export const Cascader = factory<CascaderFactory>((_props: CascaderBaseProps, _ref) => {
    const props = useProps('Cascader', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        attributes,
        mod,
        data,
        mode,
        value,
        defaultValue,
        onChange,
        loadData,
        searchable,
        clearable,
        nothingFoundMessage,
        maxDropdownHeight,
        columnWidth,
        pathSeparator,
        dropdownOpened,
        defaultDropdownOpened,
        onDropdownOpen,
        onDropdownClose,
        comboboxProps,
        size,
        variant,
        radius,
        disabled,
        readOnly,
        id,
        placeholder,
        name,
        form,
        onFocus,
        onBlur,
        onClick,
        label,
        description,
        error,
        withAsterisk,
        required,
        labelProps,
        descriptionProps,
        errorProps,
        wrapperProps,
        leftSection,
        leftSectionWidth,
        leftSectionPointerEvents,
        leftSectionProps,
        rightSection,
        rightSectionWidth,
        rightSectionPointerEvents,
        rightSectionProps,
        ...others
    } = props

    const isMulti = mode === 'multiple'
    const _id = useId(id)

    const getStyles = useStyles<CascaderFactory>({
        name: 'Cascader',
        classes,
        props,
        classNames,
        styles,
        unstyled,
        attributes
    })

    const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<CascaderFactory>({
        props,
        styles,
        classNames
    })

    const [_opened, setOpened] = useUncontrolled<boolean>({
        value: dropdownOpened,
        defaultValue: defaultDropdownOpened,
        finalValue: false,
        onChange: opened => (opened ? onDropdownOpen?.() : onDropdownClose?.())
    })

    const [_value, setValue] = useUncontrolled({
        value: value as any,
        defaultValue: defaultValue as any,
        finalValue: isMulti ? [] : null,
        onChange
    })

    const [_searchValue, setSearchValue] = useUncontrolled<string>({
        value: undefined,
        defaultValue: '',
        finalValue: ''
    })

    // 懒加载：已加载的子节点按父节点 value 合并进渲染树
    const [asyncChildren, setAsyncChildren] = useState<Record<string, CascaderNode[]>>({})
    const [loadingValues, setLoadingValues] = useState<string[]>([])

    const effectiveData = useMemo(() => {
        let result = data
        for (const [parentValue, children] of Object.entries(asyncChildren)) {
            result = mergeAsyncChildren(result, parentValue, children)
        }
        return result
    }, [data, asyncChildren])

    const nodeLookup = useMemo(() => {
        const lookup = new Map<string, CascaderNode>()
        const walk = (nodes: CascaderNode[]) => {
            for (const node of nodes) {
                lookup.set(node.value, node)
                if (Array.isArray(node.children)) {
                    walk(node.children)
                }
            }
        }
        walk(effectiveData)
        return lookup
    }, [effectiveData])

    const selectedLeafValues = useMemo(
        () => (isMulti ? ((Array.isArray(_value) ? _value : []) as string[]) : []),
        [isMulti, _value]
    )

    // 面板导航路径：activePath 中每个 value 是已展开的父节点，最后一段是当前停留列
    const [activePath, setActivePath] = useState<string[]>([])

    const prevOpenedRef = useRef(false)
    useEffect(() => {
        // 打开面板时回显当前选中值所在的路径
        if (_opened && !prevOpenedRef.current) {
            const target = isMulti
                ? selectedLeafValues[selectedLeafValues.length - 1]
                : (_value as string | null)
            const path = target != null ? findTreeNodePath(target, effectiveData) : null
            setActivePath(path ? path.slice(0, -1).map(node => node.value) : [])
        }
        prevOpenedRef.current = _opened
    }, [_opened, isMulti, _value, selectedLeafValues, effectiveData])

    const getNodeLabel = useCallback(
        (nodeValue: string): string => {
            const node = nodeLookup.get(nodeValue)
            return node ? getCascaderNodeLabel(node) : nodeValue
        },
        [nodeLookup]
    )

    const getPathLabel = useCallback(
        (nodeValue: string): string => {
            const path = findTreeNodePath(nodeValue, effectiveData)
            return path ? path.map(getCascaderNodeLabel).join(pathSeparator) : nodeValue
        },
        [effectiveData, pathSeparator]
    )

    const loadChildren = async (node: CascaderNode) => {
        if (!loadData || asyncChildren[node.value] || loadingValues.includes(node.value)) {
            return
        }
        setLoadingValues(prev => [...prev, node.value])
        try {
            const children = await loadData(node)
            setAsyncChildren(prev => ({ ...prev, [node.value]: children ?? [] }))
        } catch (error) {
            // 未处理的 rejection 会污染全局错误上报，且 UI 无任何错误反馈
            if (process.env.NODE_ENV !== 'production') {
                console.error(`[@xiaoye-react/ui] Cascader: loadData failed for node "${node.value}"`, error)
            }
        } finally {
            setLoadingValues(prev => prev.filter(item => item !== node.value))
        }
    }

    const handleSelect = (node: CascaderNode, path: string[]) => {
        if (node.disabled) {
            return
        }

        if (isMulti) {
            const current = selectedLeafValues
            setValue(
                current.includes(node.value)
                    ? current.filter(item => item !== node.value)
                    : [...current, node.value]
            )
            return
        }

        setValue(node.value)
        setActivePath(path.slice(0, -1))
        if (searchable) {
            setSearchValue(getPathLabel(node.value))
        }
        setOpened(false)
    }

    const handleColumnItemClick = (node: CascaderNode, parentPath: string[]) => {
        if (node.disabled || disabled || readOnly) {
            return
        }

        const nextPath = [...parentPath, node.value]

        if (isCascaderLeaf(node, !!loadData)) {
            handleSelect(node, nextPath)
            return
        }

        setActivePath(nextPath)

        // 标记 hasChildren 但暂无 children：触发懒加载
        if (!Array.isArray(node.children) || node.children.length === 0) {
            void loadChildren(node)
        }
    }

    // 面板列数据：按 activePath 逐级取 children，形成逐级面板
    const columns = useMemo(() => {
        const result: { nodes: CascaderNode[]; parentPath: string[] }[] = []
        let currentNodes = effectiveData
        let parentPath: string[] = []
        result.push({ nodes: currentNodes, parentPath })

        for (const nodeValue of activePath) {
            const node = nodeLookup.get(nodeValue)
            if (!node || !Array.isArray(node.children) || node.children.length === 0) {
                break
            }
            parentPath = [...parentPath, nodeValue]
            currentNodes = node.children
            result.push({ nodes: currentNodes, parentPath })
        }
        return result
    }, [effectiveData, activePath, nodeLookup])

    const searchResults = useMemo<CascaderSearchResult[] | null>(() => {
        if (!searchable || !_searchValue.trim()) {
            return null
        }
        return collectLeafMatches(effectiveData, _searchValue, !!loadData)
    }, [searchable, _searchValue, effectiveData, loadData])

    const hasValue = isMulti ? selectedLeafValues.length > 0 : _value != null
    const _clearable = clearable && hasValue && !disabled && !readOnly

    const handleClear = () => {
        setValue(isMulti ? [] : null)
        setSearchValue('')
        setActivePath([])
    }

    const clearButton = _clearable ? <InputClearButton onClick={handleClear} disabled={disabled} /> : null

    const chevron = <AccordionChevron size={16} />

    const singleDisplayLabel = !isMulti && _value != null ? getPathLabel(_value as string) : ''

    const pills = selectedLeafValues.map(item => (
        <Pill
            key={item}
            withRemoveButton={!readOnly && !disabled}
            onRemove={() => {
                setValue(selectedLeafValues.filter(selected => selected !== item))
            }}
            unstyled={unstyled}
            disabled={disabled}
            {...getStyles('pill')}
        >
            {getNodeLabel(item)}
        </Pill>
    ))

    /** 面板键盘导航：上下在列内移动，左右在级层级间移动 */
    const columnsRef = useRef<HTMLDivElement | null>(null)
    // ArrowRight 展开是异步渲染，展开后需聚焦的新列由 effect 补聚焦
    const pendingFocusRef = useRef<{ levelIndex: number; itemIndex: number } | null>(null)

    useEffect(() => {
        const pending = pendingFocusRef.current
        if (!pending || !columnsRef.current) {
            return
        }
        const column = columnsRef.current.children[pending.levelIndex] as HTMLElement | undefined
        const item = column?.querySelectorAll<HTMLButtonElement>(':scope > button')[pending.itemIndex]
        item?.focus()
        pendingFocusRef.current = null
    })

    const handlePanelKeyDown = (
        event: React.KeyboardEvent<HTMLButtonElement>,
        node: CascaderNode,
        parentPath: string[],
        levelIndex: number,
        itemIndex: number
    ) => {
        const columnEl = event.currentTarget.parentElement as HTMLElement | null
        const columnsEl = columnEl?.parentElement as HTMLElement | null
        if (!columnEl || !columnsEl) {
            return
        }

        const columnItems = Array.from(columnEl.querySelectorAll<HTMLButtonElement>(':scope > button'))
        const focusInColumn = (target: HTMLElement) => {
            event.preventDefault()
            target.focus()
        }

        if (event.key === 'ArrowDown') {
            const next = columnItems[itemIndex + 1]
            if (next) focusInColumn(next)
        } else if (event.key === 'ArrowUp') {
            const prev = columnItems[itemIndex - 1]
            if (prev) focusInColumn(prev)
        } else if (event.key === 'ArrowRight') {
            if (!isCascaderLeaf(node, !!loadData)) {
                event.preventDefault()
                pendingFocusRef.current = { levelIndex: levelIndex + 1, itemIndex: 0 }
                handleColumnItemClick(node, parentPath)
            }
        } else if (event.key === 'ArrowLeft') {
            if (levelIndex > 0) {
                const prevColumn = columnsEl.children[levelIndex - 1] as HTMLElement | undefined
                const prevItems = prevColumn?.querySelectorAll<HTMLButtonElement>(':scope > button')
                const target = prevItems?.[Math.min(itemIndex, (prevItems?.length ?? 1) - 1)]
                if (target) focusInColumn(target)
            }
        }
    }

    const renderColumnItem = (node: CascaderNode, parentPath: string[], levelIndex: number, itemIndex: number) => {
        const itemPath = [...parentPath, node.value]
        const isActive = activePath[levelIndex] === node.value
        const isSelected = isCascaderLeaf(node, !!loadData)
            ? isMulti
                ? selectedLeafValues.includes(node.value)
                : _value === node.value
            : false
        const isLoading = loadingValues.includes(node.value)
        const hasChildren = Array.isArray(node.children) && node.children.length > 0

        return (
            <button
                key={node.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                {...getStyles('columnItem')}
                data-active={isActive ? 'true' : undefined}
                data-selected={isSelected ? 'true' : undefined}
                data-disabled={node.disabled ? 'true' : undefined}
                // 阻止焦点转移：点击面板项期间输入框不失焦，
                // 多选模式下 closeOnBlur 不会在选中前误关面板
                onMouseDown={event => event.preventDefault()}
                onClick={() => handleColumnItemClick(node, parentPath)}
                onKeyDown={event => handlePanelKeyDown(event, node, parentPath, levelIndex, itemIndex)}
            >
                <span className={classes.itemLabel}>{node.label}</span>
                {isLoading ? (
                    <Loader size="xs" className={classes.itemLoader} />
                ) : (
                    hasChildren && <AccordionChevron size={14} className={classes.itemChevron} />
                )}
            </button>
        )
    }

    const renderPanel = () => {
        if (searchResults) {
            if (searchResults.length === 0) {
                return <Combobox.Empty>{nothingFoundMessage ?? '无匹配结果'}</Combobox.Empty>
            }
            return (
                <div {...getStyles('searchList')}>
                    {searchResults.map(({ node, path }) => {
                        const isSelected = isCascaderLeaf(node, !!loadData)
                            ? isMulti
                                ? selectedLeafValues.includes(node.value)
                                : _value === node.value
                            : false
                        return (
                            <button
                                key={node.value}
                                type="button"
                                role="option"
                                // 此前恒为 false，已选项对读屏器不可感知
                                aria-selected={isSelected}
                                {...getStyles('searchItem')}
                                data-selected={isSelected ? 'true' : undefined}
                                data-disabled={node.disabled ? 'true' : undefined}
                                onMouseDown={event => event.preventDefault()}
                                onClick={() => handleSelect(node, path.map(item => item.value))}
                            >
                                <span className={classes.itemLabel}>{node.label}</span>
                                <span {...getStyles('searchPath')}>
                                    {path.slice(0, -1).map(getCascaderNodeLabel).join(pathSeparator)}
                                </span>
                            </button>
                        )
                    })}
                </div>
            )
        }

        if (columns.every(column => column.nodes.length === 0)) {
            return <Combobox.Empty>{nothingFoundMessage ?? '暂无数据'}</Combobox.Empty>
        }

        return (
            <div {...getStyles('columns')} ref={columnsRef}>
                {columns.map((column, levelIndex) => (
                    <div key={levelIndex} {...getStyles('column')}>
                        {column.nodes.map((node, itemIndex) => renderColumnItem(node, column.parentPath, levelIndex, itemIndex))}
                    </div>
                ))}
            </div>
        )
    }

    const panelStyle = {
        '--cascader-column-width': `${columnWidth}px`,
        '--cascader-dropdown-height':
            typeof maxDropdownHeight === 'number' ? `${maxDropdownHeight}px` : maxDropdownHeight,
        maxHeight: typeof maxDropdownHeight === 'number' ? `${maxDropdownHeight}px` : maxDropdownHeight
    } as React.CSSProperties

    const dropdown = <Combobox.Dropdown style={panelStyle}>{renderPanel()}</Combobox.Dropdown>

    if (isMulti) {
        return (
            <>
                <Combobox
                    {...comboboxProps}
                    opened={_opened}
                    onChange={setOpened}
                    selectedValues={selectedLeafValues}
                    disabled={disabled}
                >
                    <Combobox.Target>
                        <PillsInput
                            __staticSelector="Cascader"
                            classNames={resolvedClassNames}
                            styles={resolvedStyles}
                            unstyled={unstyled}
                            size={size}
                            className={className}
                            style={style}
                            variant={variant}
                            radius={radius}
                            disabled={disabled}
                            __defaultRightSection={chevron}
                            __clearSection={clearButton}
                            __clearable={_clearable}
                            rightSection={rightSection}
                            rightSectionPointerEvents={rightSectionPointerEvents || 'none'}
                            rightSectionWidth={rightSectionWidth}
                            rightSectionProps={rightSectionProps}
                            leftSection={leftSection}
                            leftSectionWidth={leftSectionWidth}
                            leftSectionPointerEvents={leftSectionPointerEvents}
                            leftSectionProps={leftSectionProps}
                            withAsterisk={withAsterisk}
                            labelProps={labelProps}
                            descriptionProps={descriptionProps}
                            errorProps={errorProps}
                            wrapperProps={wrapperProps}
                            description={description}
                            label={label}
                            error={error}
                            id={_id}
                            required={required}
                            mod={mod}
                            attributes={attributes}
                            onClick={event => {
                                if (!disabled && !readOnly) {
                                    setOpened(true)
                                }
                                onClick?.(event as unknown as React.MouseEvent<HTMLInputElement>)
                            }}
                        >
                            <Pill.Group disabled={disabled} unstyled={unstyled} {...getStyles('pillsList')}>
                                {pills}
                                <PillsInput.Field
                                    ref={_ref}
                                    id={_id}
                                    placeholder={placeholder}
                                    {...others}
                                    {...getStyles('inputField')}
                                    unstyled={unstyled}
                                    value={searchable ? _searchValue : ''}
                                    readOnly={readOnly || !searchable}
                                    onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
                                        if (searchable) {
                                            setOpened(true)
                                        }
                                        onFocus?.(event)
                                    }}
                                    onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                                        setOpened(false)
                                        if (searchable) {
                                            setSearchValue('')
                                        }
                                        onBlur?.(event)
                                    }}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        if (searchable) {
                                            setSearchValue(event.currentTarget.value)
                                            setOpened(true)
                                        }
                                    }}
                                    disabled={disabled}
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
                    form={form}
                    value={selectedLeafValues.join(',')}
                    disabled={disabled}
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
                selectedValues={_value != null ? [_value as string] : []}
                disabled={disabled}
            >
                <Combobox.Target>
                    <InputBase
                        ref={_ref}
                        id={_id}
                        size={size}
                        variant={variant}
                        radius={radius}
                        __staticSelector="Cascader"
                        classNames={resolvedClassNames}
                        styles={resolvedStyles}
                        unstyled={unstyled}
                        disabled={disabled}
                        readOnly={readOnly || !searchable}
                        pointer={!searchable}
                        value={searchable ? _searchValue : singleDisplayLabel}
                        placeholder={placeholder}
                        __defaultRightSection={chevron}
                        __clearSection={clearButton}
                        __clearable={_clearable}
                        rightSection={rightSection}
                        rightSectionPointerEvents={rightSectionPointerEvents || 'none'}
                        rightSectionWidth={rightSectionWidth}
                        rightSectionProps={rightSectionProps}
                        leftSection={leftSection}
                        leftSectionWidth={leftSectionWidth}
                        leftSectionPointerEvents={leftSectionPointerEvents}
                        leftSectionProps={leftSectionProps}
                        withAsterisk={withAsterisk}
                        labelProps={labelProps}
                        descriptionProps={descriptionProps}
                        errorProps={errorProps}
                        wrapperProps={wrapperProps}
                        description={description}
                        label={label}
                        error={error}
                        required={required}
                        mod={mod}
                        {...others}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            if (searchable) {
                                setSearchValue(event.currentTarget.value)
                                setOpened(true)
                            }
                        }}
                        onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
                            if (searchable) {
                                setOpened(true)
                            }
                            onFocus?.(event)
                        }}
                        onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                            if (searchable) {
                                setOpened(false)
                                setSearchValue(_value != null ? getPathLabel(_value as string) : '')
                            }
                            onBlur?.(event)
                        }}
                        onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                            if (!disabled && !readOnly) {
                                setOpened(!_opened)
                            }
                            onClick?.(event)
                        }}
                    />
                </Combobox.Target>
                {dropdown}
            </Combobox>
            <input type="hidden" name={name} form={form} value={(_value as string) ?? ''} disabled={disabled} />
        </>
    )
})

Cascader.classes = { ...InputBase.classes, ...classes }
Cascader.displayName = '@xiaoye-react/ui/Cascader'

export namespace Cascader {
    export type Props<Mode extends CascaderMode = 'single'> = CascaderProps<Mode>
    export type StylesNames = CascaderStylesNames
    export type Factory = CascaderFactory
    export type Node = TreeNodeData
}
