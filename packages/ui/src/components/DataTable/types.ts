import React from 'react'

/** 列数据取值方式：记录属性名或取值函数 */
export type DataTableAccessor<T> = Extract<keyof T, string> | ((record: T) => any)

/** 单元格文本对齐方式 */
export type DataTableTextAlign = 'left' | 'center' | 'right'

export interface DataTableColumn<T = any> {
    /** 列数据取值字段。可排序的列必须使用字符串字段名 */
    accessor: DataTableAccessor<T>

    /** 表头标题，未提供时回退为 accessor 字段名 */
    title?: React.ReactNode

    /** 自定义单元格渲染 */
    render?: (record: T, index: number) => React.ReactNode

    /** 列宽，参与 `table-layout: fixed` 列宽分配 */
    width?: number | string

    /** 列最小宽度 */
    minWidth?: number | string

    /** 单元格与表头文本对齐方式 @default 'left' */
    textAlign?: DataTableTextAlign

    /** 溢出时显示省略号，并通过 title 提示完整内容 @default false */
    ellipsis?: boolean

    /** 固定列方向。要获得正确偏移，固定列及其前面的固定列需设置数值（px）宽度 */
    sticky?: 'left' | 'right'

    /** 是否可通过点击表头排序 @default false */
    sortable?: boolean

    /** 是否隐藏该列 @default false */
    hidden?: boolean

    /** 传递给 th 的额外属性 */
    thProps?: React.ThHTMLAttributes<HTMLTableCellElement>

    /** 传递给 td 的额外属性 */
    tdProps?: React.TdHTMLAttributes<HTMLTableCellElement>
}

export type DataTableSortDirection = 'asc' | 'desc'

export interface DataTableSortStatus {
    /** 排序列的 accessor 字段名 */
    accessor: string

    /** 排序方向 */
    direction: DataTableSortDirection
}

/** 行选择模式，不传则不启用行选择 */
export type DataTableSelectionMode = 'checkbox' | 'radio'
