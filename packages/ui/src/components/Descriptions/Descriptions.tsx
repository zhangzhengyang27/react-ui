import { Children, Fragment, isValidElement, useMemo } from 'react'
import {
    Box,
    createVarsResolver,
    factory,
    getSize,
    useProps,
    useStyles,
    type BoxProps,
    type CompoundStylesApiProps,
    type ElementProps,
    type Factory,
    type StylesApiProps,
    type UISpacing
} from '../../core'
import classes from './Descriptions.module.css'

export type DescriptionsStylesNames = 'root' | 'label' | 'value'

export type DescriptionsCssVariables = {
    root: '--descriptions-horizontal-spacing' | '--descriptions-vertical-spacing'
}

export interface DescriptionsItemProps
    extends BoxProps, CompoundStylesApiProps<DescriptionsItemFactory>, ElementProps<'div'> {
    /** 描述项标签 */
    label: React.ReactNode

    /** 占据的列数 @default 1 */
    span?: number

    /** 描述项内容 */
    children?: React.ReactNode
}

export type DescriptionsItemFactory = Factory<{
    props: DescriptionsItemProps
    ref: HTMLDivElement
    stylesNames: DescriptionsStylesNames
    compound: true
}>

/** 描述项。自身不渲染内容，props 由父级 Descriptions 收集 */
export const DescriptionsItem = factory<DescriptionsItemFactory>(() => null)

DescriptionsItem.displayName = '@xiaoye-react/ui/DescriptionsItem'

export interface DescriptionsProps
    extends BoxProps, StylesApiProps<DescriptionsFactory>, ElementProps<'div'> {
    /** 描述项，使用 Descriptions.Item */
    children?: React.ReactNode

    /** 每行容纳的列数（一个「列」= 一组 label + value） @default 3 */
    columns?: number

    /** 显示单元格边框 @default false */
    bordered?: boolean

    /** 布局方向：horizontal 为标签与内容同行，vertical 为上下堆叠 @default 'horizontal' */
    layout?: 'horizontal' | 'vertical'

    /** 标签列宽度 */
    labelWidth?: React.CSSProperties['width']

    /** 单元格水平内边距 @default 'sm' */
    horizontalSpacing?: UISpacing | number | string

    /** 单元格垂直内边距 @default 'sm' */
    verticalSpacing?: UISpacing | number | string
}

export type DescriptionsFactory = Factory<{
    props: DescriptionsProps
    ref: HTMLTableElement
    stylesNames: DescriptionsStylesNames
    vars: DescriptionsCssVariables
    staticComponents: {
        Item: typeof DescriptionsItem
    }
}>

const defaultProps = {
    columns: 3,
    bordered: false,
    layout: 'horizontal',
    horizontalSpacing: 'sm',
    verticalSpacing: 'sm'
} satisfies Partial<DescriptionsProps>

const varsResolver = createVarsResolver<DescriptionsFactory>((_, { horizontalSpacing, verticalSpacing }) => ({
    root: {
        '--descriptions-horizontal-spacing': getSize(horizontalSpacing, 'ui-spacing'),
        '--descriptions-vertical-spacing': getSize(verticalSpacing, 'ui-spacing')
    }
}))

interface DescriptionsPlacement {
    item: DescriptionsItemProps
    span: number
}

/** 把描述项按 span 分配到各行：放不下时整项换行，超出列数的 span 截断 */
function buildRows(items: DescriptionsItemProps[], columns: number): DescriptionsPlacement[][] {
    const rows: DescriptionsPlacement[][] = []
    let current: DescriptionsPlacement[] = []
    let used = 0

    items.forEach(item => {
        const span = Math.min(Math.max(item.span ?? 1, 1), columns)
        if (used + span > columns && current.length > 0) {
            rows.push(current)
            current = []
            used = 0
        }
        current.push({ item, span })
        used += span
        if (used === columns) {
            rows.push(current)
            current = []
            used = 0
        }
    })

    if (current.length > 0) {
        rows.push(current)
    }
    return rows
}

export const Descriptions = factory<DescriptionsFactory>((_props, ref) => {
    const props = useProps('Descriptions', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        attributes,
        mod,
        children,
        columns,
        bordered,
        layout,
        labelWidth,
        horizontalSpacing,
        verticalSpacing,
        ...others
    } = props

    const getStyles = useStyles<DescriptionsFactory>({
        name: 'Descriptions',
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

    const items = useMemo(() => {
        const result: DescriptionsItemProps[] = []
        Children.forEach(children, child => {
            if (isValidElement(child) && (child.type === DescriptionsItem || (child.type as any)?.displayName === DescriptionsItem.displayName)) {
                result.push(child.props as DescriptionsItemProps)
            }
        })
        return result
    }, [children])

    const rows = useMemo(() => buildRows(items, columns), [items, columns])

    const renderLabel = (label: React.ReactNode) =>
        layout === 'horizontal' ? (
            <th scope="row" {...getStyles('label')} style={{ width: labelWidth }}>
                {label}
            </th>
        ) : (
            <div {...getStyles('label')}>{label}</div>
        )

    const renderValue = (item: DescriptionsItemProps, span: number, key: React.Key) =>
        layout === 'horizontal' ? (
            <td key={key} {...getStyles('value')} colSpan={span * 2 - 1}>
                {item.children}
            </td>
        ) : (
            <td key={key} {...getStyles('value')} colSpan={span}>
                {renderLabel(item.label)}
                <div>{item.children}</div>
            </td>
        )

    return (
        <Box
            component="table"
            ref={ref}
            {...getStyles('root')}
            mod={[{ bordered, layout }, mod]}
            {...others}
        >
            <colgroup>
                {layout === 'horizontal'
                    ? Array.from({ length: columns }, (_, index) => (
                        <Fragment key={index}>
                            <col style={labelWidth != null ? { width: labelWidth } : undefined} />
                            <col />
                        </Fragment>
                    ))
                    : Array.from({ length: columns }, (_, index) => <col key={index} />)}
            </colgroup>
            <tbody>
                {rows.map((row, rowIndex) => {
                    const used = row.reduce((acc, placement) => acc + placement.span, 0)
                    return (
                        <tr key={rowIndex}>
                            {layout === 'horizontal'
                                ? row.map((placement, index) => (
                                    <Fragment key={index}>
                                        {renderLabel(placement.item.label)}
                                        {renderValue(placement.item, placement.span, index)}
                                    </Fragment>
                                ))
                                : row.map((placement, index) => renderValue(placement.item, placement.span, index))}
                            {used < columns && (
                                <td {...getStyles('value')} colSpan={layout === 'horizontal' ? (columns - used) * 2 : columns - used} aria-hidden />
                            )}
                        </tr>
                    )
                })}
            </tbody>
        </Box>
    )
})

Descriptions.classes = classes
;(Descriptions as any).varsResolver = varsResolver
Descriptions.displayName = '@xiaoye-react/ui/Descriptions'
Descriptions.Item = DescriptionsItem

export namespace Descriptions {
    export type Props = DescriptionsProps
    export type StylesNames = DescriptionsStylesNames
    export type Factory = DescriptionsFactory
    export type ItemProps = DescriptionsItemProps
}
