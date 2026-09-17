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

    // offset 钳位到 [0, columns-1]：负值会使 grid-column 起始行非法被浏览器丢弃、
    // 或从尾部倒数（语义反转）；≥columns 时即使 span 已收敛仍会创建隐式列横向溢出。
    // grow 分支的 marginInlineStart 同样使用钳位结果，负外边距/超界偏移一并收敛
    const resolvedOffset = offset === undefined ? 0 : Math.max(0, Math.min(offset, columns - 1))

    if (ctx?.grow) {
        // grow 时根容器为 flex 布局（flex-grow 对 grid item 无效）：
        // basis 按 span 比例并扣除列间距（整行恰好铺满，不产生意外换行），
        // grow 按 span 比例分配最后一行的剩余空间；offset 用行内边距模拟。
        // 列数走 --grid-cols 变量：响应式 cols（如 { base: 12, sm: 6 }）在断点
        // 变化时同步生效，与 grid 布局行为一致（此前只取 JS 侧 base 值，静默失效）
        const unit =
            `(100% - (var(--grid-cols, ${columns}) - 1) * var(--grid-column-gap, 0px)) / var(--grid-cols, ${columns})`
        resolvedStyle.flexGrow = resolvedSpan
        resolvedStyle.flexBasis = `calc(${unit} * ${resolvedSpan})`
        if (resolvedOffset > 0) {
            resolvedStyle.marginInlineStart = `calc(${unit} * ${resolvedOffset})`
        }
    } else {
        // span 收敛到 [1, columns]：超出会创建隐式列导致横向溢出；
        // offset+span 超界时裁掉 span（span 0 会让整条 grid-column 声明非法被丢弃）
        const clampedSpan = Math.max(1, Math.min(resolvedSpan, columns - resolvedOffset))
        resolvedStyle.gridColumn = resolvedOffset > 0
            ? `${resolvedOffset + 1} / span ${clampedSpan}`
            : `span ${clampedSpan}`
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
