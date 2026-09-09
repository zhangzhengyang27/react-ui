import { useCallback, useEffect, useRef, useState } from 'react'
import { assignRef } from '@xiaoye-react/hooks'
import {
    Box,
    Button,
    DataTable,
    factory,
    useProps,
    useStyles,
    type BoxProps,
    type DataTableColumn,
    type DataTableProps,
    type DataTableSortStatus,
    type ElementProps,
    type Factory,
    type StylesApiProps
} from '@xiaoye-react/ui'
import { SearchFilter, type SearchFilterProps } from '../search-filter/SearchFilter'
import classes from './ProTable.module.css'

export type ProTableStylesNames = 'root' | 'toolbar' | 'toolbarActions'

export type ProTableCssVariables = Record<string, never>

export interface ProTableRequestParams {
    /** 当前页码，从 1 开始 */
    page: number

    /** 每页条数 */
    pageSize: number

    /** 查询区当前值 */
    search?: Record<string, any>

    /** 当前排序状态 */
    sortStatus?: DataTableSortStatus | null
}

export interface ProTableRequestResult<T> {
    /** 当前页数据 */
    records: T[]

    /** 总条数 */
    total: number
}

export interface ProTableProps<T>
    extends BoxProps, StylesApiProps<ProTableFactory>, ElementProps<'div'> {
    /** 列定义，透传给 DataTable */
    columns: DataTableColumn<T>[]

    /** 数据请求函数；page/pageSize/search/sortStatus 变化时自动重新请求 */
    request: (params: ProTableRequestParams) => Promise<ProTableRequestResult<T>>

    /** 查询区配置，传 `false` 关闭 */
    search?: SearchFilterProps | false

    /** 查询区默认值，透传给 SearchFilter 的 onSearch 触发前的初始值 */
    defaultSearchValues?: Record<string, any>

    /** 工具栏左侧内容（新建、批量操作等） */
    toolbar?: React.ReactNode

    /** 行唯一 key，透传给 DataTable */
    rowKey?: (record: T, index: number) => string

    /** 每页条数初始值 @default 10 */
    defaultPageSize?: number

    /** 刷新按钮文案 @default '刷新' */
    refreshText?: string

    /** 请求失败回调；默认仅 console.error 并结束 loading */
    onRequestError?: (error: unknown, params: ProTableRequestParams) => void

    /** 接收 `{ refresh }`，用于在数据变更（如新增/编辑保存）后手动刷新列表 */
    actionsRef?: React.MutableRefObject<{ refresh: () => void } | null>

    /** 透传给 DataTable 的其余表现属性（striped、highlightOnHover、virtualized 等） */
    dataTableProps?: Omit<
        DataTableProps<T>,
        'columns' | 'records' | 'total' | 'loading' | 'page' | 'defaultPage' | 'pageSize' | 'defaultPageSize' | 'onPageChange' | 'onPageSizeChange' | 'sortStatus' | 'onSortStatusChange' | 'data'
    >
}

export type ProTableFactory = Factory<{
    props: ProTableProps<any>
    ref: HTMLDivElement
    stylesNames: ProTableStylesNames
    vars: ProTableCssVariables
}>

const defaultProps = {
    defaultPageSize: 10,
    refreshText: '刷新'
} satisfies Partial<ProTableProps<any>>

export const ProTable = factory<ProTableFactory>((_props: ProTableProps<any>, ref) => {
    const props = useProps('ProTable', defaultProps, _props)
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
        request,
        search,
        defaultSearchValues,
        toolbar,
        rowKey,
        defaultPageSize,
        refreshText,
        onRequestError,
        actionsRef,
        dataTableProps,
        ...others
    } = props

    const getStyles = useStyles<ProTableFactory>({
        name: 'ProTable',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars
    })

    const [records, setRecords] = useState<any[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(defaultPageSize ?? 10)
    const [searchValues, setSearchValues] = useState<Record<string, any>>(defaultSearchValues ?? {})
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus | null>(null)
    const [refreshKey, setRefreshKey] = useState(0)

    // 竞态保护：仅采纳最后一次请求的响应
    const requestIdRef = useRef(0)

    const fetchRecords = useCallback(
        async (params: ProTableRequestParams) => {
            const requestId = requestIdRef.current + 1
            requestIdRef.current = requestId

            setLoading(true)
            try {
                const result = await request(params)
                if (requestIdRef.current !== requestId) {
                    return
                }
                setRecords(result.records ?? [])
                setTotal(result.total ?? 0)
            } catch (error) {
                if (requestIdRef.current !== requestId) {
                    return
                }
                onRequestError?.(error, params)
                if (!onRequestError) {
                    console.error('@xiaoye-react/pro/ProTable request failed:', error)
                }
            } finally {
                if (requestIdRef.current === requestId) {
                    setLoading(false)
                }
            }
        },
        [request, onRequestError]
    )

    useEffect(() => {
        void fetchRecords({ page, pageSize, search: searchValues, sortStatus })
        // refreshKey 变化代表手动刷新
    }, [fetchRecords, page, pageSize, searchValues, sortStatus, refreshKey])

    const handleSearch = (values: Record<string, any>) => {
        setSearchValues(values)
        setPage(1)
    }

    const handleSortStatusChange = (status: DataTableSortStatus) => {
        setSortStatus(status)
        setPage(1)
    }

    const handlePageSizeChange = (next: number) => {
        setPageSize(next)
        setPage(1)
    }

    assignRef(actionsRef, {
        refresh: () => setRefreshKey(key => key + 1)
    })

    return (
        <Box ref={ref} {...getStyles('root')} mod={mod} {...others}>
            {search !== false && search != null && (
                <SearchFilter
                    {...search}
                    defaultValues={search.defaultValues ?? defaultSearchValues}
                    loading={loading || search.loading}
                    onSearch={values => {
                        search.onSearch?.(values)
                        handleSearch(values)
                    }}
                />
            )}
            <div {...getStyles('toolbar')}>
                <div {...getStyles('toolbarActions')}>{toolbar}</div>
                <Button
                    size="xs"
                    variant="default"
                    loading={loading}
                    onClick={() => setRefreshKey(key => key + 1)}
                    aria-label={refreshText}
                >
                    {refreshText}
                </Button>
            </div>
            <DataTable
                columns={columns}
                records={records}
                total={total}
                rowKey={rowKey}
                loading={loading}
                page={page}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={handlePageSizeChange}
                sortStatus={sortStatus}
                onSortStatusChange={handleSortStatusChange}
                withTableBorder
                {...dataTableProps}
            />
        </Box>
    )
})

ProTable.classes = classes
ProTable.displayName = '@xiaoye-react/pro/ProTable'

export namespace ProTable {
    export type Props<T = any> = ProTableProps<T>
    export type StylesNames = ProTableStylesNames
    export type Factory = ProTableFactory
    export type RequestParams = ProTableRequestParams
    export type RequestResult<T = any> = ProTableRequestResult<T>
}
