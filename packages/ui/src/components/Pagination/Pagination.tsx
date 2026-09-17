import {
    Box,
    factory,
    useProps,
    type Factory,
    type UISpacing
} from '../../core'
import { Group } from '../Group/Group'
import { usePaginationContext } from './Pagination.context'
import {
    PaginationFirst,
    PaginationLast,
    PaginationNext,
    PaginationPrevious,
    type PaginationEdgeProps
} from './PaginationEdges'
import { type PaginationIcon } from './Pagination.icons'
import { PaginationItems, type PaginationItemsProps } from './PaginationItems'
import {
    PaginationLabel,
    type PaginationFormatLabel,
    type PaginationLabelProps
} from './PaginationLabel'
import {
    PaginationRoot,
    type PaginationRootCssVariables,
    type PaginationRootProps,
    type PaginationRootStylesNames
} from './PaginationRoot'
import { PaginationControl, type PaginationControlProps } from './PaginationControl'
import { PaginationDots, type PaginationDotsProps } from './PaginationDots'
import classes from './Pagination.module.css'

export type PaginationStylesNames = PaginationRootStylesNames
export type PaginationCssVariables = PaginationRootCssVariables

export interface PaginationProps extends PaginationRootProps {
    /** If set, first/last controls are displayed @default false */
    withEdges?: boolean

    /** If set, next/previous controls are displayed @default true */
    withControls?: boolean

    /** 传递给下一页/上一页/首页/末页控件的属性 */
    getControlProps?: (control: 'first' | 'previous' | 'last' | 'next') => Record<string, any>

    /** 下一页控件图标组件 */
    nextIcon?: PaginationIcon

    /** 上一页控件图标组件 */
    previousIcon?: PaginationIcon

    /** 末页控件图标组件 */
    lastIcon?: PaginationIcon

    /** 首页控件图标组件 */
    firstIcon?: PaginationIcon

    /** 省略号图标组件 */
    dotsIcon?: PaginationIcon

    /** Key of `theme.spacing`, gap between controls @default 8 */
    gap?: UISpacing

    /** If set, the pagination is hidden when only one page is available (`total={1}`) @default false */
    hideWithOnePage?: boolean

    /** If set to `false`, page number buttons are hidden, only next/previous controls remain @default `true` */
    withPages?: boolean

    /** 格式化响应模式下显示的标签文本的函数 */
    formatLabel?: PaginationFormatLabel
}

export type PaginationFactory = Factory<{
    props: PaginationProps
    ref: HTMLDivElement
    stylesNames: PaginationStylesNames
    vars: PaginationCssVariables
    staticComponents: {
        Root: typeof PaginationRoot
        Control: typeof PaginationControl
        Dots: typeof PaginationDots
        First: typeof PaginationFirst
        Last: typeof PaginationLast
        Next: typeof PaginationNext
        Previous: typeof PaginationPrevious
        Items: typeof PaginationItems
        Label: typeof PaginationLabel
    }
}>

const defaultProps = {
    withControls: true,
    withPages: true,
    siblings: 1,
    boundaries: 1,
    gap: 8
} satisfies Partial<PaginationProps>

interface PaginationItemsGroupProps {
    children: React.ReactNode
}

function PaginationItemsGroup({ children }: PaginationItemsGroupProps) {
    const ctx = usePaginationContext()
    return <Box {...ctx.getStyles('items')}>{children}</Box>
}

export const Pagination = factory<PaginationFactory>((_props, ref) => {
    const props = useProps('Pagination', defaultProps, _props)
    const {
        withEdges,
        withControls,
        getControlProps,
        nextIcon,
        previousIcon,
        lastIcon,
        firstIcon,
        dotsIcon,
        total,
        gap,
        hideWithOnePage,
        withPages,
        layout,
        formatLabel,
        ...others
    } = props

    // !(total > 0) 同时拦住 0、负数与 NaN（NaN <= 0 为 false 会漏过）
    if (!(total > 0) || (hideWithOnePage && total === 1)) {
        return null
    }

    const isResponsive = layout === 'responsive'

    const pagesContent = withPages ? (
        isResponsive ? (
            <>
                <PaginationItemsGroup>
                    <PaginationItems dotsIcon={dotsIcon} />
                </PaginationItemsGroup>
                <PaginationLabel formatLabel={formatLabel} />
            </>
        ) : (
            <PaginationItems dotsIcon={dotsIcon} />
        )
    ) : null

    return (
        <PaginationRoot ref={ref} total={total} layout={layout} {...others}>
            <Group gap={gap}>
                {withEdges && <PaginationFirst icon={firstIcon} {...getControlProps?.('first')} />}
                {withControls && (
                    <PaginationPrevious icon={previousIcon} {...getControlProps?.('previous')} />
                )}
                {pagesContent}
                {withControls && <PaginationNext icon={nextIcon} {...getControlProps?.('next')} />}
                {withEdges && <PaginationLast icon={lastIcon} {...getControlProps?.('last')} />}
            </Group>
        </PaginationRoot>
    )
})

Pagination.classes = classes
Pagination.displayName = '@xiaoye-react/ui/Pagination'
Pagination.Root = PaginationRoot
Pagination.Control = PaginationControl
Pagination.Dots = PaginationDots
Pagination.First = PaginationFirst
Pagination.Last = PaginationLast
Pagination.Next = PaginationNext
Pagination.Previous = PaginationPrevious
Pagination.Items = PaginationItems
Pagination.Label = PaginationLabel

export namespace Pagination {
    export type Props = PaginationProps
    export type StylesNames = PaginationStylesNames
    export type CssVariables = PaginationCssVariables
    export type Factory = PaginationFactory

    export namespace Root {
        export type Props = PaginationRootProps
    }

    export namespace Control {
        export type Props = PaginationControlProps
    }

    export namespace Dots {
        export type Props = PaginationDotsProps
    }

    export namespace Edge {
        export type Props = PaginationEdgeProps
    }

    export namespace Items {
        export type Props = PaginationItemsProps
    }

    export namespace Label {
        export type Props = PaginationLabelProps
    }
}

// Backward-compatible utility function
function range(start: number, end: number) {
    const length = end - start + 1
    return Array.from({ length }, (_, index) => start + index)
}

type PaginationItem = number | 'dots'

// siblings/boundaries 归一化：与 PaginationRoot 传参前的防御一致，
// NaN/非有限数会让区间计算一路污染出 NaN（Math.max(NaN,x)=NaN）退化为 [start,'dots',end] 碎片
function normalizeCount(value: number, fallback: number): number {
    return Number.isFinite(value) ? Math.max(Math.trunc(value), 0) : fallback
}

/**
 * 与 usePagination（组件实际渲染算法）保持同一套区间计算：
 * 此前的复制品在 totalValueNumbers 边界、leftSiblingIndex 下限与溢出 item 数上均与组件分叉，
 * 同输入会产出与渲染不同的区间；startValue 可选参数对齐组件的起始页码支持
 */
export function getPaginationItems(
    total: number,
    activePage: number,
    siblings: number,
    boundaries: number,
    startValue = 1
): PaginationItem[] {
    const _siblings = normalizeCount(siblings, 1)
    const _boundaries = normalizeCount(boundaries, 1)
    const _startValue = Math.max(Number.isFinite(startValue) ? Math.trunc(startValue) : 1, 1)
    const _endValue = Number.isFinite(total) ? Math.max(Math.trunc(total), _startValue) : _startValue
    const _total = _endValue - _startValue + 1
    const _activePage = Math.min(Math.max(activePage, _startValue), _endValue)

    const totalPageNumbers = _siblings * 2 + 3 + _boundaries * 2
    if (totalPageNumbers >= _total) {
        return range(_startValue, _endValue)
    }

    const leftSiblingIndex = Math.max(_activePage - _siblings, _startValue + _boundaries - 1)
    const rightSiblingIndex = Math.min(_activePage + _siblings, _endValue - _boundaries)

    const shouldShowLeftDots = leftSiblingIndex > _startValue + _boundaries + 1
    const shouldShowRightDots = rightSiblingIndex < _endValue - _boundaries

    if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = _siblings * 2 + _boundaries + 2
        return [
            ...range(_startValue, _startValue + leftItemCount - 1),
            'dots',
            ...range(_endValue - (_boundaries - 1), _endValue)
        ]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = _boundaries + 1 + 2 * _siblings
        return [
            ...range(_startValue, _startValue + _boundaries - 1),
            'dots',
            ...range(_endValue - rightItemCount, _endValue)
        ]
    }

    return [
        ...range(_startValue, _startValue + _boundaries - 1),
        'dots',
        ...range(leftSiblingIndex, rightSiblingIndex),
        'dots',
        ...range(_endValue - _boundaries + 1, _endValue)
    ]
}
