import { Fragment, useMemo, useRef } from 'react'
import { useUncontrolled, useReactId } from '@xiaoye-react/hooks'
import { useVirtualizer } from '@tanstack/react-virtual'
import { AccordionChevron } from '../Accordion'
import {
    Box,
    createVarsResolver,
    factory,
    getSize,
    useProps,
    useStyles,
    type BoxProps,
    type ElementProps,
    type Factory,
    type StylesApiProps,
    type UISize
} from '../../core'
import { Checkbox } from '../Checkbox'
import { EmptyState } from '../EmptyState'
import { LoadingOverlay } from '../LoadingOverlay'
import { NativeSelect } from '../NativeSelect'
import { Pagination } from '../Pagination'
import { Popover } from '../Popover'
import { Radio } from '../Radio'
import { TableScrollContainer } from '../Table'
import classes from './DataTable.module.css'
import { getNextSortDirection, sortRecords } from './sort'
import type { DataTableColumn, DataTableSelectionMode, DataTableSortStatus } from './types'

export type { DataTableColumn, DataTableSelectionMode, DataTableSortDirection, DataTableSortStatus } from './types'
export { getNextSortDirection, sortRecords } from './sort'

export type DataTableStylesNames =
    | 'root'
    | 'table'
    | 'thead'
    | 'tbody'
    | 'tr'
    | 'th'
    | 'td'
    | 'footer'
    | 'footerTotal'
    | 'selectionCell'
    | 'emptyCell'
    | 'columnSettingsBar'
    | 'columnSettingsPanel'

export type DataTableCssVariables = {
    root: '--datatable-horizontal-spacing' | '--datatable-vertical-spacing'
}

export interface DataTableProps<T = any>
    extends BoxProps, StylesApiProps<DataTableFactory>, ElementProps<'div'> {
    /** 列定义 */
    columns: DataTableColumn<T>[]

    /** 行数据。远端分页时传入当前页数据即可 */
    records?: T[]

    /** 返回行唯一 key，未提供时使用行索引 */
    rowKey?: (record: T, index: number) => string

    /** 加载中状态，表格区域显示遮罩 */
    loading?: boolean

    /** 无数据时展示的内容，默认为内置 EmptyState */
    empty?: React.ReactNode

    /** 为 tbody 行添加条纹样式 */
    striped?: boolean

    /** 悬停时高亮 tbody 行 */
    highlightOnHover?: boolean

    /** 为整个表格添加边框 @default true */
    withTableBorder?: boolean

    /** 在行之间添加水平边框 @default true */
    withRowBorders?: boolean

    /** Horizontal cell padding, key of theme.spacing or any valid CSS value @default 'sm' */
    horizontalSpacing?: UISize | number | string

    /** Vertical cell padding, key of theme.spacing or any valid CSS value @default 'sm' */
    verticalSpacing?: UISize | number | string

    /** 行点击回调 */
    onRowClick?: (record: T, index: number) => void

    /** 表格最小宽度，设置后横向滚动 */
    minWidth?: React.CSSProperties['minWidth']

    /** 表格最大高度，设置后纵向滚动 */
    maxHeight?: React.CSSProperties['maxHeight']

    /** 固定表头，建议配合 maxHeight 使用 */
    stickyHeader?: boolean

    /** 开启行虚拟滚动，适合大数据量（万级以上）。建议同时设置 maxHeight */
    virtualized?: boolean

    /** 虚拟滚动的行高估计值（px），行高一致时越准确越好 @default 42 */
    estimatedRowHeight?: number

    /** 展开行内容渲染函数，提供后表格首列出现展开控件 */
    renderExpanded?: (record: T, index: number) => React.ReactNode

    /** 已展开行的 key 集合（受控） */
    expandedRows?: string[]

    /** 已展开行 key 集合初始值（非受控） */
    defaultExpandedRows?: string[]

    /** 已展开行变化回调 */
    onExpandedRowsChange?: (keys: string[]) => void

    /** 显示列设置面板，可控制列的显示/隐藏 @default false */
    withColumnSettings?: boolean

    /** 被隐藏列的 key 集合（受控），key 为列 accessor（函数型 accessor 使用列索引） */
    hiddenColumnKeys?: string[]

    /** 被隐藏列 key 集合初始值（非受控） */
    defaultHiddenColumnKeys?: string[]

    /** 隐藏列变化回调 */
    onHiddenColumnKeysChange?: (keys: string[]) => void

    /** 排序状态（受控）。受控时不自动排序数据，由使用方处理 */
    sortStatus?: DataTableSortStatus | null

    /** 排序状态初始值（非受控，组件对 records 做本地稳定排序） */
    defaultSortStatus?: DataTableSortStatus

    /** 排序状态变化回调 */
    onSortStatusChange?: (status: DataTableSortStatus) => void

    /** 行选择模式，不传则不启用行选择 */
    selectionMode?: DataTableSelectionMode

    /** 已选行 key 集合（受控） */
    selectedKeys?: string[]

    /** 已选行 key 集合初始值（非受控） */
    defaultSelectedKeys?: string[]

    /** 已选行 key 集合变化回调 */
    onSelectedKeysChange?: (keys: string[]) => void

    /** 总条数，提供后渲染分页底栏 */
    total?: number

    /** 当前页码（受控，从 1 开始） */
    page?: number

    /** 初始页码（非受控） */
    defaultPage?: number

    /** 每页条数（受控） */
    pageSize?: number

    /** 每页条数初始值（非受控） @default 10 */
    defaultPageSize?: number

    /** 页码变化回调 */
    onPageChange?: (page: number) => void

    /** 每页条数变化回调 */
    onPageSizeChange?: (pageSize: number) => void

    /** 每页条数选项 @default [10, 20, 50, 100] */
    pageSizeOptions?: number[]

    /** 分页底栏左侧文案 @default (total) => `共 ${total} 条` */
    totalText?: (total: number) => React.ReactNode
}

export type DataTableFactory = Factory<{
    props: DataTableProps
    ref: HTMLDivElement
    stylesNames: DataTableStylesNames
    vars: DataTableCssVariables
}>

const defaultProps = {
    horizontalSpacing: 'sm',
    verticalSpacing: 'sm',
    withTableBorder: true,
    withRowBorders: true,
    pageSizeOptions: [10, 20, 50, 100],
    estimatedRowHeight: 42
} satisfies Partial<DataTableProps>

const SELECTION_COLUMN_WIDTH = 40
const EXPAND_COLUMN_WIDTH = 40

const varsResolver = createVarsResolver<DataTableFactory>((_, { horizontalSpacing, verticalSpacing }) => ({
    root: {
        '--datatable-horizontal-spacing': getSize(horizontalSpacing, 'ui-spacing'),
        '--datatable-vertical-spacing': getSize(verticalSpacing, 'ui-spacing')
    }
}))

/** 参与固定列偏移计算的数值宽度，仅支持 number 与 px 字符串 */
function resolveStickyWidth(width: number | string | undefined): number {
    if (typeof width === 'number') return width
    if (typeof width === 'string' && /^\d+(\.\d+)?px$/.test(width)) return parseFloat(width)
    return 0
}

function SortIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
            <path
                d="M8 13V3M8 3L4.5 6.5M8 3l3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function ColumnsIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
            <rect x="2.5" y="2.5" width="3" height="11" rx="1" stroke="currentColor" />
            <rect x="6.5" y="2.5" width="3" height="11" rx="1" stroke="currentColor" opacity="0.35" />
            <rect x="10.5" y="2.5" width="3" height="11" rx="1" stroke="currentColor" />
        </svg>
    )
}

function formatCellValue(value: any): React.ReactNode {
    if (value == null || value === '') return null
    if (typeof value === 'boolean') return String(value)
    if (typeof value === 'object') return null
    return value as React.ReactNode
}

/** 列标题回退：函数型 accessor 不能直接作为标题渲染 */
function getColumnTitle<T>(column: DataTableColumn<T>): React.ReactNode {
    if (column.title != null) return column.title
    return typeof column.accessor === 'string' ? column.accessor : null
}

export const DataTable = factory<DataTableFactory>((_props, ref) => {
    const props = useProps('DataTable', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        attributes,
        mod,
        columns,
        records,
        rowKey,
        loading,
        empty,
        striped,
        highlightOnHover,
        withTableBorder,
        withRowBorders,
        horizontalSpacing,
        verticalSpacing,
        onRowClick,
        minWidth,
        maxHeight,
        stickyHeader,
        virtualized,
        estimatedRowHeight,
        renderExpanded,
        expandedRows,
        defaultExpandedRows,
        onExpandedRowsChange,
        withColumnSettings,
        hiddenColumnKeys,
        defaultHiddenColumnKeys,
        onHiddenColumnKeysChange,
        sortStatus,
        defaultSortStatus,
        onSortStatusChange,
        selectionMode,
        selectedKeys,
        defaultSelectedKeys,
        onSelectedKeysChange,
        total,
        page,
        defaultPage,
        pageSize,
        defaultPageSize,
        onPageChange,
        onPageSizeChange,
        pageSizeOptions,
        totalText,
        ...others
    } = props

    const getStyles = useStyles<DataTableFactory>({
        name: 'DataTable',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver
    })

    const withSelection = selectionMode === 'checkbox' || selectionMode === 'radio'
    const withExpand = typeof renderExpanded === 'function'

    // 列 key：字符串 accessor 直接使用，函数型 accessor 回退为列索引
    const columnKeys = useMemo(
        () => columns.map((column, index) => (typeof column.accessor === 'string' ? column.accessor : `__col_${index}`)),
        [columns]
    )

    // 列显示/隐藏（列设置面板）
    const [hiddenColumnKeysState, setHiddenColumnKeys] = useUncontrolled<string[]>({
        value: hiddenColumnKeys,
        defaultValue: defaultHiddenColumnKeys,
        finalValue: [],
        onChange: onHiddenColumnKeysChange
    })

    const visibleColumns = useMemo(
        () =>
            columns
                .map((column, index) => ({ column, key: columnKeys[index] }))
                .filter(({ column, key }) => column.hidden !== true && !hiddenColumnKeysState.includes(key)),
        [columns, columnKeys, hiddenColumnKeysState]
    )

    const totalColumnCount = visibleColumns.length + (withSelection ? 1 : 0) + (withExpand ? 1 : 0)

    // 行展开
    const [expandedRowsState, setExpandedRows] = useUncontrolled<string[]>({
        value: expandedRows,
        defaultValue: defaultExpandedRows,
        finalValue: [],
        onChange: onExpandedRowsChange
    })

    const handleToggleExpanded = (key: string) => {
        setExpandedRows(
            expandedRowsState.includes(key)
                ? expandedRowsState.filter(item => item !== key)
                : [...expandedRowsState, key]
        )
    }

    const getRowKey = (record: any, index: number) => (rowKey ? rowKey(record, index) : String(index))

    // 排序：受控时不排数据（由使用方处理），非受控时对 records 做本地稳定排序
    const [sortStatusState, setSortStatus, isSortControlled] = useUncontrolled<DataTableSortStatus | null>({
        value: sortStatus,
        defaultValue: defaultSortStatus ?? null,
        // setter 只会产出非 null 状态，收窄回传
        onChange: (status: DataTableSortStatus | null) => onSortStatusChange?.(status as DataTableSortStatus)
    })

    const displayRecords = useMemo(() => {
        if (!isSortControlled && sortStatusState) return sortRecords(records ?? [], sortStatusState)
        return records ?? []
    }, [records, isSortControlled, sortStatusState])

    const handleSortClick = (column: DataTableColumn) => {
        const accessor = column.accessor as string
        const direction = getNextSortDirection(
            sortStatusState && sortStatusState.accessor === accessor ? sortStatusState.direction : undefined
        )
        setSortStatus({ accessor, direction })
    }

    // 行选择
    const [selectedKeysState, setSelectedKeys] = useUncontrolled<string[]>({
        value: selectedKeys,
        defaultValue: defaultSelectedKeys,
        finalValue: [],
        onChange: onSelectedKeysChange
    })

    const rowKeys = useMemo(
        () => displayRecords.map((record, index) => getRowKey(record, index)),
        [displayRecords, rowKey]
    )

    // 行虚拟滚动：始终调用 hook（getScrollElement 为 null 时不生效），保证 hooks 顺序稳定
    const virtualScrollRef = useRef<HTMLDivElement | null>(null)
    const virtualScrollHeight = typeof maxHeight === 'number' ? maxHeight : 400
    const rowVirtualizer = useVirtualizer({
        count: displayRecords.length,
        getScrollElement: () => (virtualized ? virtualScrollRef.current : null),
        estimateSize: () => estimatedRowHeight ?? 42,
        overscan: 8,
        initialRect: { width: 0, height: virtualScrollHeight },
        getItemKey: index => rowKeys[index]
    })

    const allChecked = rowKeys.length > 0 && rowKeys.every(key => selectedKeysState.includes(key))
    const someChecked = rowKeys.some(key => selectedKeysState.includes(key))
    const headerIndeterminate = someChecked && !allChecked

    const handleToggleAll = () => {
        setSelectedKeys(
            allChecked
                ? selectedKeysState.filter(key => !rowKeys.includes(key))
                : Array.from(new Set([...selectedKeysState, ...rowKeys]))
        )
    }

    const handleToggleRow = (key: string) => {
        if (selectionMode === 'radio') {
            setSelectedKeys([key])
            return
        }
        setSelectedKeys(
            selectedKeysState.includes(key)
                ? selectedKeysState.filter(selected => selected !== key)
                : [...selectedKeysState, key]
        )
    }

    // 分页
    const [pageSizeState, setPageSizeState] = useUncontrolled<number>({
        value: pageSize,
        defaultValue: defaultPageSize,
        finalValue: 10,
        onChange: onPageSizeChange
    })
    const [pageState, setPageState] = useUncontrolled<number>({
        value: page,
        defaultValue: defaultPage,
        finalValue: 1,
        onChange: onPageChange
    })

    const totalPages = total != null ? Math.max(1, Math.ceil(total / pageSizeState)) : 0

    const handlePageSizeChange = (value: string) => {
        const next = Number(value)
        if (!Number.isFinite(next)) return
        setPageSizeState(next)
        if (page == null && pageState !== 1) setPageState(1)
    }

    // 固定列偏移：按可见列顺序累计 px 宽度
    const stickyState = useMemo(() => {
        const leftOffsets = new Map<number, number>()
        const rightOffsets = new Map<number, number>()
        let left = (withSelection ? SELECTION_COLUMN_WIDTH : 0) + (withExpand ? EXPAND_COLUMN_WIDTH : 0)
        const leftStickyIndexes: number[] = []
        visibleColumns.forEach(({ column }, index) => {
            if (column.sticky === 'left') {
                leftOffsets.set(index, left)
                left += resolveStickyWidth(column.width)
                leftStickyIndexes.push(index)
            }
        })
        let right = 0
        const rightStickyIndexes: number[] = []
        for (let index = visibleColumns.length - 1; index >= 0; index -= 1) {
            const { column } = visibleColumns[index]
            if (column.sticky === 'right') {
                right += resolveStickyWidth(column.width)
                rightOffsets.set(index, right)
                rightStickyIndexes.push(index)
            }
        }
        return {
            leftOffsets,
            rightOffsets,
            lastLeft: leftStickyIndexes.length > 0 ? leftStickyIndexes[leftStickyIndexes.length - 1] : -1,
            lastRight: rightStickyIndexes.length > 0 ? rightStickyIndexes[0] : -1
        }
    }, [visibleColumns, withSelection, withExpand])

    const hasLeftStickyColumns = stickyState.lastLeft !== -1
    const radioGroupName = useReactId()

    const renderSortIcon = (column: DataTableColumn, index: number) => {
        const direction =
            sortStatusState && sortStatusState.accessor === column.accessor ? sortStatusState.direction : null
        return (
            <SortIcon
                className={classes.sortIcon}
                data-direction={direction ?? undefined}
                key={`${index}-icon`}
            />
        )
    }

    const renderHeader = () => (
        <thead {...getStyles('thead')}>
            <tr {...getStyles('tr')}>
                {withExpand && <th {...getStyles('th', { className: classes.expandCell })} aria-label="展开" />}
                {withSelection && (
                    <th
                        {...getStyles('th', {
                            className: classes.selectionCell,
                            style: { left: withExpand ? EXPAND_COLUMN_WIDTH : undefined }
                        })}
                        data-sticky="left"
                        data-sticky-last={hasLeftStickyColumns ? undefined : 'left'}
                    >
                        {selectionMode === 'checkbox' && (
                            <Checkbox
                                checked={allChecked}
                                indeterminate={headerIndeterminate}
                                onChange={handleToggleAll}
                                aria-label="全选"
                            />
                        )}
                    </th>
                )}
                {visibleColumns.map(({ column }, index) => {
                    const ariaSort =
                        sortStatusState && sortStatusState.accessor === column.accessor
                            ? sortStatusState.direction === 'asc'
                                ? 'ascending'
                                : 'descending'
                            : undefined
                    return (
                        <th
                            key={index}
                            {...getStyles('th', {
                                style: {
                                    textAlign: column.textAlign,
                                    minWidth: column.minWidth,
                                    left: stickyState.leftOffsets.get(index),
                                    right: stickyState.rightOffsets.get(index)
                                }
                            })}
                            data-sticky={column.sticky ?? undefined}
                            data-sticky-last={
                                column.sticky === 'left' && stickyState.lastLeft === index
                                    ? 'left'
                                    : column.sticky === 'right' && stickyState.lastRight === index
                                        ? 'right'
                                        : undefined
                            }
                            aria-sort={ariaSort}
                            {...column.thProps}
                        >
                            {column.sortable ? (
                                <button
                                    type="button"
                                    className={classes.thButton}
                                    style={{ justifyContent: column.textAlign === 'right' ? 'flex-end' : undefined }}
                                    onClick={() => handleSortClick(column)}
                                >
                                    <span>{getColumnTitle(column)}</span>
                                    {renderSortIcon(column, index)}
                                </button>
                            ) : (
                                getColumnTitle(column)
                            )}
                        </th>
                    )
                })}
            </tr>
        </thead>
    )

    const renderBody = () => {
        if (displayRecords.length === 0 && !loading) {
            return (
                <tbody {...getStyles('tbody')}>
                    <tr {...getStyles('tr')}>
                        <td colSpan={totalColumnCount} {...getStyles('td')}>
                            <div {...getStyles('emptyCell')}>{empty ?? <EmptyState title="暂无数据" />}</div>
                        </td>
                    </tr>
                </tbody>
            )
        }

        const renderRow = (
            record: any,
            rowIndex: number,
            measureRef?: (node: HTMLTableRowElement | null) => void
        ) => {
            const key = rowKeys[rowIndex]
            const selected = withSelection && selectedKeysState.includes(key)
            const expanded = withExpand && expandedRowsState.includes(key)
            return (
                <Fragment key={key}>
                    <tr
                        ref={measureRef}
                        data-index={measureRef ? rowIndex : undefined}
                        {...getStyles('tr')}
                    data-clickable={onRowClick ? true : undefined}
                    data-odd={striped && rowIndex % 2 === 1 ? true : undefined}
                    data-selected={selected ? true : undefined}
                    aria-selected={withSelection ? selected : undefined}
                    tabIndex={onRowClick ? 0 : undefined}
                    onClick={onRowClick ? () => onRowClick(record, rowIndex) : undefined}
                    onKeyDown={
                        onRowClick
                            ? event => {
                                // 方向键在数据行之间移动焦点
                                if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                                    const tbody = event.currentTarget.closest('tbody')
                                    if (!tbody) return
                                    const rows = Array.from(
                                        tbody.querySelectorAll<HTMLTableRowElement>('tr[tabindex="0"]')
                                    )
                                    const currentIndex = rows.indexOf(event.currentTarget)
                                    const nextIndex =
                                        event.key === 'ArrowDown'
                                            ? Math.min(currentIndex + 1, rows.length - 1)
                                            : Math.max(currentIndex - 1, 0)
                                    const nextRow = rows[nextIndex]
                                    if (nextRow) {
                                        event.preventDefault()
                                        nextRow.focus()
                                    }
                                    return
                                }
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault()
                                    onRowClick(record, rowIndex)
                                }
                            }
                            : undefined
                    }
                >
                    {withExpand && (
                        <td
                            {...getStyles('td', { className: classes.expandCell })}
                            data-sticky="left"
                            data-sticky-last={hasLeftStickyColumns ? undefined : 'left'}
                            onClick={event => event.stopPropagation()}
                        >
                            <button
                                type="button"
                                className={classes.expandButton}
                                data-expanded={expandedRowsState.includes(key) ? true : undefined}
                                aria-expanded={expandedRowsState.includes(key)}
                                aria-label={expandedRowsState.includes(key) ? '收起行' : '展开行'}
                                onClick={() => handleToggleExpanded(key)}
                            >
                                <AccordionChevron size={14} className={classes.expandIcon} />
                            </button>
                        </td>
                    )}
                    {withSelection && (
                        <td
                            {...getStyles('td', {
                                className: classes.selectionCell,
                                style: { left: withExpand ? EXPAND_COLUMN_WIDTH : undefined }
                            })}
                            data-sticky="left"
                            data-sticky-last={hasLeftStickyColumns ? undefined : 'left'}
                            onClick={event => event.stopPropagation()}
                        >
                            {selectionMode === 'checkbox' ? (
                                <Checkbox
                                    checked={selected}
                                    onChange={() => handleToggleRow(key)}
                                    aria-label="选择此行"
                                />
                            ) : (
                                <Radio
                                    checked={selected}
                                    onChange={() => handleToggleRow(key)}
                                    name={radioGroupName}
                                    aria-label="选择此行"
                                />
                            )}
                        </td>
                    )}
                    {visibleColumns.map(({ column }, columnIndex) => {
                        const value =
                            typeof column.accessor === 'function'
                                ? (column.accessor as (item: any) => any)(record)
                                : (record as any)?.[column.accessor as string]
                        const content = column.render ? column.render(record, rowIndex) : formatCellValue(value)
                        return (
                            <td
                                key={columnIndex}
                                {...getStyles('td', {
                                    style: {
                                        textAlign: column.textAlign,
                                        minWidth: column.minWidth,
                                        left: stickyState.leftOffsets.get(columnIndex),
                                        right: stickyState.rightOffsets.get(columnIndex)
                                    }
                                })}
                                data-ellipsis={column.ellipsis ? true : undefined}
                                data-sticky={column.sticky ?? undefined}
                                data-sticky-last={
                                    column.sticky === 'left' && stickyState.lastLeft === columnIndex
                                        ? 'left'
                                        : column.sticky === 'right' && stickyState.lastRight === columnIndex
                                            ? 'right'
                                            : undefined
                                }
                                title={column.ellipsis && typeof value === 'string' ? value : undefined}
                                {...column.tdProps}
                            >
                                {content}
                            </td>
                        )
                    })}
                    </tr>
                    {expanded && (
                        <tr {...getStyles('tr')} data-expanded-row>
                            <td colSpan={totalColumnCount} {...getStyles('td', { className: classes.expandedCell })}>
                                {renderExpanded?.(record, rowIndex)}
                            </td>
                        </tr>
                    )}
                </Fragment>
            )
        }

        if (virtualized) {
            const virtualItems = rowVirtualizer.getVirtualItems()
            const padTop = virtualItems.length > 0 ? virtualItems[0].start : 0
            const padBottom =
                virtualItems.length > 0
                    ? rowVirtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end
                    : 0

            return (
                <tbody {...getStyles('tbody')}>
                    {padTop > 0 && (
                        <tr aria-hidden style={{ height: padTop }}>
                            <td colSpan={totalColumnCount} style={{ border: 0, padding: 0 }} />
                        </tr>
                    )}
                    {virtualItems.map(virtualRow =>
                        renderRow(displayRecords[virtualRow.index], virtualRow.index, node =>
                            rowVirtualizer.measureElement(node)
                        )
                    )}
                    {padBottom > 0 && (
                        <tr aria-hidden style={{ height: padBottom }}>
                            <td colSpan={totalColumnCount} style={{ border: 0, padding: 0 }} />
                        </tr>
                    )}
                </tbody>
            )
        }

        return <tbody {...getStyles('tbody')}>{displayRecords.map((record, rowIndex) => renderRow(record, rowIndex))}</tbody>
    }

    const table = (
        <Box component="table" {...getStyles('table', { style: minWidth != null ? { minWidth } : undefined })}>
            <colgroup>
                {withExpand && <col style={{ width: EXPAND_COLUMN_WIDTH }} />}
                {withSelection && <col style={{ width: SELECTION_COLUMN_WIDTH }} />}
                {visibleColumns.map(({ column }, index) => (
                    <col key={index} style={{ width: column.width }} />
                ))}
            </colgroup>
            {renderHeader()}
            {renderBody()}
        </Box>
    )

    const tableArea = virtualized ? (
        <div
            ref={virtualScrollRef}
            className={classes.virtualScroller}
            style={{
                maxHeight:
                    typeof maxHeight === 'number' ? `${maxHeight}px` : (maxHeight as string | undefined) ?? undefined
            }}
        >
            {table}
        </div>
    ) : minWidth != null || maxHeight != null ? (
        <TableScrollContainer minWidth={minWidth ?? 0} maxHeight={maxHeight}>
            {table}
        </TableScrollContainer>
    ) : (
        table
    )

    return (
        <Box
            ref={ref}
            {...getStyles('root')}
            mod={[
                {
                    striped,
                    'highlight-on-hover': highlightOnHover,
                    'with-table-border': withTableBorder,
                    'with-row-borders': withRowBorders,
                    'sticky-header': stickyHeader
                },
                mod
            ]}
            aria-busy={loading || undefined}
            {...others}
        >
            {withColumnSettings && (
                <div {...getStyles('columnSettingsBar')}>
                    <Popover position="bottom-end">
                        <Popover.Target>
                            <button
                                type="button"
                                className={classes.columnSettingsButton}
                                aria-label="列设置"
                            >
                                <ColumnsIcon />
                            </button>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <div {...getStyles('columnSettingsPanel')}>
                                {columns.map((column, index) => (
                                    <Checkbox
                                        key={columnKeys[index]}
                                        size="xs"
                                        label={getColumnTitle(column) ?? columnKeys[index]}
                                        checked={column.hidden !== true && !hiddenColumnKeysState.includes(columnKeys[index])}
                                        disabled={column.hidden === true}
                                        onChange={event => {
                                            const key = columnKeys[index]
                                            setHiddenColumnKeys(
                                                event.currentTarget.checked
                                                    ? hiddenColumnKeysState.filter(item => item !== key)
                                                    : [...hiddenColumnKeysState, key]
                                            )
                                        }}
                                    />
                                ))}
                            </div>
                        </Popover.Dropdown>
                    </Popover>
                </div>
            )}
            <LoadingOverlay visible={!!loading}>{tableArea}</LoadingOverlay>
            {total != null && (
                <div {...getStyles('footer')}>
                    <div {...getStyles('footerTotal')}>{totalText ? totalText(total) : `共 ${total} 条`}</div>
                    <div className={classes.footerControls}>
                        <NativeSelect
                            size="xs"
                            className={classes.pageSizeSelect}
                            aria-label="每页条数"
                            data={(pageSizeOptions ?? [10, 20, 50, 100]).map(option => ({
                                value: String(option),
                                label: `${option} 条/页`
                            }))}
                            value={String(pageSizeState)}
                            onChange={event => handlePageSizeChange(event.currentTarget.value)}
                        />
                        <Pagination
                            size="sm"
                            total={totalPages}
                            value={pageState}
                            onChange={setPageState}
                            hideWithOnePage
                        />
                    </div>
                </div>
            )}
        </Box>
    )
})

DataTable.classes = classes
;(DataTable as any).varsResolver = varsResolver
DataTable.displayName = '@xiaoye-react/ui/DataTable'

export namespace DataTable {
    export type Props<T = any> = DataTableProps<T>
    export type StylesNames = DataTableStylesNames
    export type CssVariables = DataTableCssVariables
    export type Factory = DataTableFactory
    export type Column<T = any> = DataTableColumn<T>
}
