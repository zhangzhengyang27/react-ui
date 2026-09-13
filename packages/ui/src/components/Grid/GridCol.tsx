import { Box, ElementProps, Factory, factory, useProps, useStyles } from '../../core'
import { useGridContext } from './Grid.context'
import classes from './Grid.module.css'

export interface GridColProps extends ElementProps<'div'> {
    /** Number of columns that the grid column should take up @default 1 */
    span?: number

    /** Number of columns to offset the grid column */
    offset?: number

    /** Sets the order of the grid column */
    order?: React.CSSProperties['order']

    /** Inline styles */
    style?: React.CSSProperties
}

export type GridColFactory = Factory<{
    props: GridColProps
    ref: HTMLDivElement
    stylesNames: 'col'
    compound: true
}>

const defaultProps = {
    span: 1
} satisfies Partial<GridColProps>

export const GridCol = factory<GridColFactory>((_props, ref) => {
    const props = useProps('GridCol', defaultProps, _props)
    const { span, offset, order, style, ...others } = props
    const ctx = useGridContext()
    const columns = ctx?.columns ?? 12
    const getStyles = useStyles<GridColFactory>({
        name: 'Grid',
        classes,
        props,
        style,
        rootSelector: 'col'
    })

    const resolvedSpan = span ?? 1
    const resolvedStyle: React.CSSProperties = { order, ...style }

    if (ctx?.grow) {
        // grow 时根容器为 flex 布局（flex-grow 对 grid item 无效）：
        // basis 按 span 比例并扣除列间距（整行恰好铺满，不产生意外换行），
        // grow 按 span 比例分配最后一行的剩余空间；offset 用行内边距模拟
        const unit = `(100% - ${Math.max(columns - 1, 0)} * var(--grid-column-gap, 0px)) / ${columns}`
        resolvedStyle.flexGrow = resolvedSpan
        resolvedStyle.flexBasis = `calc(${unit} * ${resolvedSpan})`
        if (offset) {
            resolvedStyle.marginInlineStart = `calc(${unit} * ${offset})`
        }
    } else {
        resolvedStyle.gridColumn = offset
            ? `${offset + 1} / span ${Math.min(resolvedSpan, columns - offset)}`
            : `span ${resolvedSpan}`
    }

    return (
        <Box
            ref={ref}
            {...getStyles('col')}
            {...others}
            style={resolvedStyle}
        />
    )
})

GridCol.displayName = '@xiaoye-react/ui/GridCol'
