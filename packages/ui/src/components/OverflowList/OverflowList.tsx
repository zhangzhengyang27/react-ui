// Originally based on https://github.com/Eliav2/react-responsive-overflow-list (MIT License)
// Contains the modified version adapted for UI
import { cloneElement, isValidElement, useMemo, useRef, useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { useIsomorphicEffect, useMergedRef } from '@xiaoye-react/hooks'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getSpacing,
    UISpacing,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { getRowPositionsData } from './get-row-position-data'
import { useDimensions } from './use-dimensions'
import classes from './OverflowList.module.css'

export type OverflowListStylesNames = 'root'
export type OverflowListCssVariables = {
    root: '--overflow-list-gap'
}

export interface OverflowListProps<T = any>
    extends BoxProps,
        StylesApiProps<OverflowListFactory>,
        ElementProps<'div', 'children'> {
    /** Array of items to display */
    data: T[]

    /** Function to render item */
    renderItem: (item: T, index: number) => React.ReactNode

    /** Function to render hidden items */
    renderOverflow: (items: T[]) => React.ReactNode

    /** Number of rows to display @default 1 */
    maxRows?: number

    /** Maximum number of visible items @default Infinity */
    maxVisibleItems?: number

    /** Key of `theme.spacing` or any valid CSS value for `gap`, numbers are converted to rem @default 'xs' */
    gap?: UISpacing

    /** Direction from which items are collapsed when they overflow, `'end'` collapses last items, `'start'` collapses first items @default 'end' */
    collapseFrom?: 'start' | 'end'

    /** A function to resolve a unique key for each item. Used to detect when the contents of `data`
     * change (for example when items are reordered while the length stays the same) so the
     * visible/overflow split can be recomputed. Required to detect reordering when `data` contains
     * objects; for primitive items (strings, numbers) the item value is used by default. */
    getItemKey?: (item: T, index: number) => React.Key
}

export type OverflowListFactory = Factory<{
    props: OverflowListProps<any>
    ref: HTMLDivElement
    stylesNames: OverflowListStylesNames
    vars: OverflowListCssVariables
}>

const defaultProps = {
    maxRows: 1,
    maxVisibleItems: Infinity
} satisfies Partial<OverflowListProps<any>>

const varsResolver = createVarsResolver<OverflowListFactory>((_, { gap }) => ({
    root: {
        '--overflow-list-gap': getSpacing(gap)
    }
}))

function getDataSignature<T>(data: T[], getItemKey: ((item: T, index: number) => React.Key) | undefined): string {
    return data
        .map((item, index) => {
            if (getItemKey) {
                return getItemKey(item, index)
            }
            return item !== null && (typeof item === 'object' || typeof item === 'function') ? index : String(item)
        })
        .join('\u0000')
}

export const OverflowList = factory<OverflowListFactory>((_props, _ref) => {
    const props = useProps('OverflowList', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        attributes,
        data,
        renderOverflow,
        renderItem,
        maxRows,
        maxVisibleItems,
        collapseFrom,
        getItemKey,
        mod,
        ...others
    } = props

    const getStyles = useStyles<OverflowListFactory>({
        name: 'OverflowList',
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

    const [visibleCount, setVisibleCount] = useState(data.length)
    const [subtractCount, setSubtractCount] = useState(0)
    const [phase, setPhase] = useState<'normal' | 'measuring' | 'measuring-overflow-indicator'>('normal')

    const containerRef = useRef<HTMLDivElement>(null)
    const rootRef = useMergedRef(containerRef, _ref)
    // 溢出指示器自身放不下时 subtractCount 可能超过 visibleCount,
    // clamp 到 >= 0,避免 slice(负数) 反而取到末尾元素
    const finalVisibleCount = Math.max(0, visibleCount - subtractCount)
    const overflowCount = data.length - finalVisibleCount
    const showOverflow = overflowCount > 0 && phase !== 'measuring'
    const isCollapseStart = collapseFrom === 'start'
    const overflowItems = isCollapseStart
        ? data.slice(0, data.length - finalVisibleCount)
        : data.slice(finalVisibleCount)
    const overflowElement = showOverflow ? renderOverflow?.(overflowItems) : null

    const _overflowRef = useRef<HTMLElement>(null)
    const overflowRef = useMergedRef(_overflowRef, (overflowElement as any)?.ref)
    const dimensions = useDimensions(containerRef)
    const dataKey = useMemo(() => getDataSignature(data, getItemKey), [data, getItemKey])

    useIsomorphicEffect(() => {
        setPhase('measuring')
        setVisibleCount(data.length)
        setSubtractCount(0)
    }, [dataKey, maxRows, collapseFrom])

    useIsomorphicEffect(() => {
        if (phase === 'measuring') {
            countVisibleItems()
            setPhase('measuring-overflow-indicator')
        }
    }, [phase])

    useIsomorphicEffect(() => {
        if (phase === 'measuring-overflow-indicator') {
            const updateWasNeeded = updateOverflowIndicator()
            if (!updateWasNeeded) {
                setPhase('normal')
            }
        }
    }, [phase, subtractCount])

    useIsomorphicEffect(() => {
        if (phase === 'normal') {
            setPhase('measuring')
            setSubtractCount(0)
        }
        // 依赖 dimensions 的实际数值而非对象身份，避免 ResizeObserver 每次回调产生
        // 新对象引用导致 phase 处于 normal 时被反复重置（多余测量往返）。
    }, [dimensions?.width, dimensions?.height])

    const fitsInRows = (itemWidths: number[], containerWidth: number, columnGap: number, startIndex = 0) => {
        let rows = 1
        let rowWidth = 0

        for (let i = startIndex; i < itemWidths.length; i += 1) {
            const width = itemWidths[i]
            const needed = rowWidth > 0 ? width + columnGap : width

            if (rowWidth + needed > containerWidth && rowWidth > 0) {
                rows++
                if (rows > maxRows!) {
                    return false
                }
                rowWidth = width
            } else {
                rowWidth += needed
            }
        }

        return true
    }

    const countVisibleItems = () => {
        const rowData = getRowPositionsData(containerRef, _overflowRef)
        if (!rowData) {
            return
        }

        const container = containerRef.current
        if (!container) {
            return
        }

        if (isCollapseStart) {
            const containerWidth = container.getBoundingClientRect().width
            const columnGap = parseFloat(getComputedStyle(container).columnGap) || 0
            const children = rowData.children
            const widths = children.map(child => child.getBoundingClientRect().width)

            let count = 0
            for (let i = widths.length - 1; i >= 0; i--) {
                if (!fitsInRows(widths, containerWidth, columnGap, i)) {
                    break
                }
                count = widths.length - i
            }

            count = Math.min(count, maxVisibleItems!)
            setVisibleCount(count)
            return
        }

        if (data.length === 1) {
            const itemRef = rowData.itemsSizesMap[rowData.rowPositions[0]].elements.values().next().value
            const containerWidth = container.getBoundingClientRect().width
            const itemWidth = itemRef?.getBoundingClientRect().width ?? 0

            if (itemWidth > containerWidth) {
                setVisibleCount(0)
            } else {
                setVisibleCount(1)
            }

            return
        }

        const visibleRowPositions = rowData.rowPositions.slice(0, maxRows)

        let fittingCount = visibleRowPositions.reduce((acc, position) => {
            return acc + rowData.itemsSizesMap[position].elements.size
        }, 0)

        fittingCount = Math.min(fittingCount, maxVisibleItems)
        setVisibleCount(fittingCount)
    }

    const updateOverflowIndicator = () => {
        if (!_overflowRef.current) {
            return false
        }
        const rowData = getRowPositionsData(containerRef, _overflowRef)
        if (!rowData) {
            return false
        }

        const { rowPositions, itemsSizesMap } = rowData

        if (isCollapseStart) {
            const container = containerRef.current
            if (!container) {
                return false
            }
            const containerWidth = container.getBoundingClientRect().width
            const columnGap = parseFloat(getComputedStyle(container).columnGap) || 0
            const overflowWidth = _overflowRef.current.getBoundingClientRect().width
            const children = rowData.children
            const itemWidths = [overflowWidth, ...children.map(child => child.getBoundingClientRect().width)]

            if (!fitsInRows(itemWidths, containerWidth, columnGap)) {
                setSubtractCount(c => c + 1)
                return true
            }

            return false
        }

        const overflowRect = _overflowRef.current.getBoundingClientRect()
        const overflowMiddleY = overflowRect.top + overflowRect.height / 2
        const lastRowTop = rowPositions[rowPositions.length - 1]
        const lastRow = itemsSizesMap[lastRowTop]

        if (overflowMiddleY > lastRow.bottom) {
            setSubtractCount(c => c + 1)
            return true
        }

        return false
    }

    const clonedOverflowElement =
        overflowElement && isValidElement(overflowElement)
            ? cloneElement(overflowElement as React.ReactElement<any>, { ref: overflowRef })
            : overflowElement

    let finalItems = data
    // 与测量逻辑 Math.min(count, maxVisibleItems) 的语义保持一致:
    // 0 表示隐藏全部,仅 Infinity 表示不限;原 if (maxVisibleItems) 把 0 当作不限
    // (且 slice(-0) 会返回整个数组,无法表达"取 0 个")
    if (maxVisibleItems !== Infinity) {
        finalItems = isCollapseStart
            ? finalItems.slice(finalItems.length - maxVisibleItems!)
            : finalItems.slice(0, maxVisibleItems)
    }

    const indexOffset = isCollapseStart ? data.length - finalItems.length : 0

    return (
        <Box ref={rootRef} mod={mod} {...getStyles('root')} {...others}>
            {isCollapseStart && clonedOverflowElement}

            {finalItems.map((item, index) => {
                const isVisible =
                    phase === 'measuring' ||
                    (isCollapseStart ? index >= finalItems.length - finalVisibleCount : index < finalVisibleCount)
                if (!isVisible) {
                    return null
                }
                const dataIndex = indexOffset + index
                const itemComponent = renderItem(item, dataIndex)

                // collapseFrom="start" + 动态 data 时，索引 key 会让 React 复用错误的 item 实例，
                // 提供getItemKey 时优先使用业务 key
                const itemKey = getItemKey?.(item, dataIndex) ?? dataIndex

                return <Fragment key={itemKey}>{itemComponent}</Fragment>
            })}

            {!isCollapseStart && clonedOverflowElement}
        </Box>
    )
})

OverflowList.displayName = '@xiaoye-react/ui/OverflowList'
OverflowList.classes = classes
OverflowList.varsResolver = varsResolver

export namespace OverflowList {
    export type Props = OverflowListProps
    export type Factory = OverflowListFactory
    export type StylesNames = OverflowListStylesNames
    export type CssVariables = OverflowListCssVariables
}
