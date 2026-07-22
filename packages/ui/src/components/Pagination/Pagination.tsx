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

    if (total <= 0 || (hideWithOnePage && total === 1)) {
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

export function getPaginationItems(
    total: number,
    activePage: number,
    siblings: number,
    boundaries: number
): PaginationItem[] {
    const totalValueNumbers = siblings * 2 + 3 + boundaries * 2

    if (total <= totalValueNumbers) {
        return range(1, total)
    }

    const leftSiblingIndex = Math.max(activePage - siblings, boundaries + 2)
    const rightSiblingIndex = Math.min(activePage + siblings, total - boundaries - 1)

    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2
    const shouldShowRightDots = rightSiblingIndex < total - boundaries - 1

    if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = siblings * 2 + boundaries + 3
        return [...range(1, leftItemCount), 'dots', ...range(total - boundaries + 1, total)]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = siblings * 2 + boundaries + 3
        return [...range(1, boundaries), 'dots', ...range(total - rightItemCount + 1, total)]
    }

    return [
        ...range(1, boundaries),
        'dots',
        ...range(leftSiblingIndex, rightSiblingIndex),
        'dots',
        ...range(total - boundaries + 1, total)
    ]
}
