import { useCallback, useMemo } from 'react'
import { usePagination } from '@xiaoye-react/hooks'
import {
    Box,
    createVarsResolver,
    factory,
    getAutoContrastValue,
    getContrastColor,
    getFontSize,
    getRadius,
    getSize,
    getThemeColor,
    useProps,
    useStyles,
    type BoxProps,
    type ElementProps,
    type Factory,
    type UIColor,
    type UIRadius,
    type UISize,
    type StylesApiProps
} from '../../core'
import { PaginationProvider } from './Pagination.context'
import classes from './Pagination.module.css'

export type PaginationRootStylesNames = 'root' | 'control' | 'dots' | 'items' | 'label'

export type PaginationRootCssVariables = {
    root:
        | '--pagination-control-size'
        | '--pagination-control-radius'
        | '--pagination-control-fz'
        | '--pagination-control-bg'
        | '--pagination-control-color'
}

export interface PaginationRootProps
    extends
        BoxProps,
        StylesApiProps<PaginationRootFactory>,
        ElementProps<'div', 'value' | 'onChange'> {
    /** `height` and `min-width` of controls @default 'md' */
    size?: UISize | `input-${UISize}` | (string & {}) | number

    /** Total number of pages, must be an integer */
    total: number

    /** Active page for controlled component, must be an integer in [1, total] interval */
    value?: number

    /** Active page for uncontrolled component, must be an integer in [1, total] interval */
    defaultValue?: number

    /** Called when page changes */
    onChange?: (value: number) => void

    /** Disables all controls, applies disabled styles */
    disabled?: boolean

    /** Number of siblings displayed on the left/right side of the selected page @default 1 */
    siblings?: number

    /** Number of elements visible on the left/right edges @default 1 */
    boundaries?: number

    /** Key of `theme.colors`, active item color @default theme.primaryColor */
    color?: UIColor

    /** Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem @default theme.defaultRadius */
    radius?: UIRadius

    /** Called when next page control is clicked */
    onNextPage?: () => void

    /** Called when previous page control is clicked */
    onPreviousPage?: () => void

    /** Called when first page control is clicked */
    onFirstPage?: () => void

    /** Called when last page control is clicked */
    onLastPage?: () => void

    /** Additional props passed down to controls */
    getItemProps?: (page: number) => Record<string, any>

    /** If set, adjusts text color based on the active page background color to ensure sufficient contrast */
    autoContrast?: boolean

    /** Starting page number, defaults to 1 */
    startValue?: number

    /** Determines how the pagination is displayed, `'responsive'` uses CSS container queries to switch between pages and a compact label @default 'default' */
    layout?: 'default' | 'responsive'
}

export type PaginationRootFactory = Factory<{
    props: PaginationRootProps
    ref: HTMLDivElement
    stylesNames: PaginationRootStylesNames
    vars: PaginationRootCssVariables
}>

const defaultProps = {
    siblings: 1,
    boundaries: 1
} satisfies Partial<PaginationRootProps>

// siblings/boundaries 归一化：NaN/非有限数会让 usePagination 的 range 计算退化为
// [startValue,'dots',endValue] 碎片（Math.max(NaN,x)=NaN 一路污染），对齐 total/startValue 的
// 防御策略在传入前钳为非负整数，非法值回落默认 1
function normalizeCount(value: number | undefined, fallback: number): number {
    if (value === undefined) {
        return fallback
    }
    return Number.isFinite(value) ? Math.max(Math.trunc(value), 0) : fallback
}

const varsResolver = createVarsResolver<PaginationRootFactory>(
    (theme, { size, radius, color, autoContrast }) => ({
        root: {
            '--pagination-control-radius': radius === undefined ? undefined : getRadius(radius),
            '--pagination-control-size': getSize(size, 'pagination-control-size'),
            '--pagination-control-fz': getFontSize(size),
            // 变量名与 Pagination.module.css 的 .control[data-active] 读取端对齐：
            // 此前写 --pagination-active-* 而 CSS 读 --pagination-control-*，color/autoContrast 完全失效
            '--pagination-control-bg': color ? getThemeColor(color, theme) : undefined,
            '--pagination-control-color': getAutoContrastValue(autoContrast, theme)
                ? getContrastColor({ color, theme, autoContrast })
                : undefined
        }
    })
)

export const PaginationRoot = factory<PaginationRootFactory>((_props, ref) => {
    const props = useProps('PaginationRoot', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        total,
        value,
        defaultValue,
        onChange,
        disabled,
        siblings,
        boundaries,
        color,
        radius,
        onNextPage,
        onPreviousPage,
        onFirstPage,
        onLastPage,
        getItemProps,
        autoContrast,
        startValue,
        layout,
        mod,
        ...others
    } = props

    const getStyles = useStyles<PaginationRootFactory>({
        name: 'Pagination',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver
    })

    const { range, setPage, next, previous, active, first, last, startValue: resolvedStart, endValue: resolvedEnd } =
        usePagination({
            page: value,
            initialPage: defaultValue,
            onChange,
            total,
            siblings: normalizeCount(siblings, defaultProps.siblings),
            boundaries: normalizeCount(boundaries, defaultProps.boundaries),
            startValue
        })

    const handleNext = useCallback(() => {
        onNextPage?.()
        next()
    }, [onNextPage, next])
    const handlePrevious = useCallback(() => {
        onPreviousPage?.()
        previous()
    }, [onPreviousPage, previous])
    const handleFirst = useCallback(() => {
        onFirstPage?.()
        first()
    }, [onFirstPage, first])
    const handleLast = useCallback(() => {
        onLastPage?.()
        last()
    }, [onLastPage, last])

    // context value 身份稳定化：内联对象每渲染新身份会使 React.memo 包裹的子组件全量失效
    // （getStyles 每次 render 新函数，value 仍随之变化，待 useStyles 层稳定后完全生效）
    const ctxValue = useMemo(
        () => ({
            total,
            range,
            active,
            startValue: resolvedStart,
            endValue: resolvedEnd,
            disabled,
            layout,
            getItemProps,
            onChange: setPage,
            onNext: handleNext,
            onPrevious: handlePrevious,
            onFirst: handleFirst,
            onLast: handleLast,
            getStyles
        }),
        [
            total,
            range,
            active,
            resolvedStart,
            resolvedEnd,
            disabled,
            layout,
            getItemProps,
            setPage,
            handleNext,
            handlePrevious,
            handleFirst,
            handleLast,
            getStyles
        ]
    )

    return (
        <PaginationProvider value={ctxValue}>
            <Box ref={ref} {...getStyles('root')} mod={[{ layout }, mod]} {...others} />
        </PaginationProvider>
    )
})

PaginationRoot.classes = classes
;(PaginationRoot as any).varsResolver = varsResolver
PaginationRoot.displayName = '@xiaoye-react/ui/PaginationRoot'
