import { createSafeContext, type GetStylesApi } from '../../core'
import type { PaginationRootFactory } from './PaginationRoot'

export interface PaginationContextValue {
    total: number
    range: (number | 'dots')[]
    active: number
    /** 归一化后的起始/结束页码（startValue 场景下 First/Previous 的禁用判断依赖它） */
    startValue: number
    endValue: number
    disabled: boolean | undefined
    layout?: 'default' | 'responsive'
    getItemProps?: (page: number) => Record<string, any>
    onChange: (page: number) => void
    onNext: () => void
    onPrevious: () => void
    onFirst: () => void
    onLast: () => void
    getStyles: GetStylesApi<PaginationRootFactory>
}

export const [PaginationProvider, usePaginationContext] = createSafeContext<PaginationContextValue>(
    'Pagination.Root component was not found in tree'
)
