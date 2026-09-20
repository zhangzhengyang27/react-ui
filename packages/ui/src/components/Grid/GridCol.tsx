import {
    Box,
    ElementProps,
    Factory,
    factory,
    InlineStyles,
    parseStyleProps,
    StyleProp,
    useProps,
    useRandomClassName,
    useStyles,
    useUITheme
} from '../../core'
import { useGridContext } from './Grid.context'
import {
    getBaseValue,
    getResponsiveColStyleProps,
    GRID_COL_STYLE_PROPS_DATA,
    hasResponsiveValue
} from './grid-responsive'
import classes from './Grid.module.css'

export interface GridColProps extends ElementProps<'div'> {
    /**
     * Number of columns that the grid column should take up.
     * 支持响应式对象（如 `{ base: 12, md: 6 }`），键为 theme.breakpoints，语法与 style props 相同
     * @default 1
     */
    span?: StyleProp<number>

    /**
     * Number of columns to offset the grid column
     * 支持响应式对象，语法与 `span` 相同
     */
    offset?: StyleProp<number>

    /**
     * Sets the order of the grid column
     * 支持响应式对象，语法与 `span` 相同
     */
    order?: StyleProp<number>

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

/**
 * 响应式 span/offset/order 的实现方式：按断点生成声明（复用 core 的
 * parseStyleProps + InlineStyles），而不是生成 `col-span-*` 工具类，
 * 也不是给 GridVariables 那类 CSS 变量续命。原因：
 *
 * 1. 生成工具类这条路在本仓库不存在：Grid.module.css 里没有任何 col-span-* 类，
 *    要加就得扩 core/Box 的样式表生成器（越界且影响全库产物）。
 * 2. CSS 变量路线（GridVariables 的 --grid-cols）之所以成立，是因为 cols 被
 *    根容器的 grid-template-columns 和每一列的 calc() 共同消费——是个共享输入。
 *    span/offset/order 是「某一列自己的声明」，没有第二个消费者，做成变量纯属冗余；
 *    并且变量方案要求 grid-column: var(--x)，变量未定义时整条声明在 computed-value
 *    阶段失效（列会退化成 auto 静默错乱），而内联/类规则路线没有这个失败模式。
 * 3. 更关键的是钳位结果没法用「值」变量表达：某断点下 span 的上界取决于同一断点的
 *    列数，必须在 JS 里逐断点算完再落地，见 grid-responsive.ts。
 * 4. Box 处理所有响应式 style prop 用的就是这套（每个实例一个随机类 + 一段
 *    <style>），这里复用它而不是再造一层，断点排序（sortMediaQueries）、base 退化、
 *    nonce/CSP 等细节都与 Box 保持一致。
 */
export const GridCol = factory<GridColFactory>((_props, ref) => {
    const props = useProps('GridCol', defaultProps, _props)
    const { span, offset, order, style, ...others } = props
    const ctx = useGridContext()
    const columns = ctx?.columns ?? 12
    const theme = useUITheme()
    const responsiveClassName = useRandomClassName()
    const getStyles = useStyles<GridColFactory>({
        name: 'Grid',
        classes,
        props,
        style,
        rootSelector: 'col'
    })

    const resolvedSpan = getBaseValue(span) ?? 1
    // 内联 order 只服务于非响应式写法：响应式时 base 值属于类规则，
    // 若同时写进 style 属性，内联优先级会压掉所有断点的 order 媒体查询
    const resolvedStyle: React.CSSProperties = {
        order: hasResponsiveValue(order) ? undefined : getBaseValue(order),
        ...style
    }

    // 只有真正跨断点变化的值才走断点通道；纯数字（或只写 base 键）保持与既有实现
    // 完全一致的内联样式输出，不额外产生 class/<style>，文档的类名表与快照才稳
    const isResponsive = hasResponsiveValue(span) || hasResponsiveValue(offset) || hasResponsiveValue(order)

    const responsiveStyleProps = isResponsive
        ? parseStyleProps({
            theme,
            data: GRID_COL_STYLE_PROPS_DATA,
            styleProps: getResponsiveColStyleProps(
                { span, offset, order, cols: ctx?.cols, grow: !!ctx?.grow, columns },
                theme
            )
        })
        : undefined

    // 响应式通道：base 值与各断点差异由 parseStyleProps 拆分——
    // 若所有断点算下来其实一致（如 span={{ base: 6, md: 6 }}），它整份退回 inlineStyles，
    // 于是既不渲染 <style>、DOM 也与非响应式写法一致；否则 base 进类规则、其余进媒体查询
    if (responsiveStyleProps) {
        Object.assign(resolvedStyle, responsiveStyleProps.inlineStyles)
    } else {
        // 非响应式：以下与既有实现逐字节一致（不新增 class/<style>）
        // offset 钳位到 [0, columns-1]：负值会使 grid-column 起始行非法被浏览器丢弃、
        // 或从尾部倒数（语义反转）；≥columns 时即使 span 已收敛仍会创建隐式列横向溢出。
        // grow 分支的 marginInlineStart 同样使用钳位结果，负外边距/超界偏移一并收敛
        const clampedOffset = Math.max(0, Math.min(getBaseValue(offset) ?? 0, columns - 1))

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
            if (clampedOffset > 0) {
                resolvedStyle.marginInlineStart = `calc(${unit} * ${clampedOffset})`
            }
        } else {
            // span 收敛到 [1, columns]：超出会创建隐式列导致横向溢出；
            // offset+span 超界时裁掉 span（span 0 会让整条 grid-column 声明非法被丢弃）
            const clampedSpan = Math.max(1, Math.min(resolvedSpan, columns - clampedOffset))
            resolvedStyle.gridColumn = clampedOffset > 0
                ? `${clampedOffset + 1} / span ${clampedSpan}`
                : `span ${clampedSpan}`
        }
    }

    return (
        <>
            {responsiveStyleProps?.hasResponsiveStyles && (
                <InlineStyles
                    selector={`.${responsiveClassName}`}
                    styles={responsiveStyleProps.styles}
                    media={responsiveStyleProps.media}
                />
            )}
            <Box
                ref={ref}
                {...getStyles(
                    'col',
                    responsiveStyleProps?.hasResponsiveStyles ? { className: responsiveClassName } : undefined
                )}
                {...others}
                style={resolvedStyle}
            />
        </>
    )
})

GridCol.displayName = '@xiaoye-react/ui/GridCol'
