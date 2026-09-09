import { DataTableSortDirection, DataTableSortStatus } from './types'

/**
 * 比较两个单元格排序值。
 * null/undefined 恒排在最后；数字按大小、布尔按真假、其余按本地化字符串比较（数字感知）。
 */
export function compareSortValues(a: any, b: any): number {
    if (a == null && b == null) return 0
    if (a == null) return 1
    if (b == null) return -1

    const av = a instanceof Date ? a.getTime() : a
    const bv = b instanceof Date ? b.getTime() : b

    if (typeof av === 'number' && typeof bv === 'number') return av - bv
    if (typeof av === 'boolean' && typeof bv === 'boolean') return Number(av) - Number(bv)

    return String(av).localeCompare(String(bv), 'zh-Hans-CN', { numeric: true, sensitivity: 'base' })
}

/** 点击表头后的方向循环：无 → asc → desc → asc */
export function getNextSortDirection(current: DataTableSortDirection | undefined): DataTableSortDirection {
    if (current === 'asc') return 'desc'
    return 'asc'
}

/** 读取记录在指定列上的排序值 */
export function getSortValue<T>(record: T, accessor: string): any {
    return (record as any)?.[accessor]
}

/** 按当前排序状态对 records 做稳定本地排序 */
export function sortRecords<T>(records: T[], sortStatus: DataTableSortStatus): T[] {
    const direction = sortStatus.direction === 'desc' ? -1 : 1
    return [...records].sort(
        (a, b) => compareSortValues(getSortValue(a, sortStatus.accessor), getSortValue(b, sortStatus.accessor)) * direction
    )
}
