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
    const { columns } = useGridContext()
    const getStyles = useStyles<GridColFactory>({
        name: 'Grid',
        classes,
        props,
        style,
        rootSelector: 'col'
    })

    const gridColumn = offset ? `${offset + 1} / span ${Math.min(span ?? 1, columns - offset)}` : `span ${span}`

    return (
        <Box
            ref={ref}
            {...getStyles('col')}
            {...others}
            style={{
                gridColumn,
                order,
                ...style
            }}
        />
    )
})

GridCol.displayName = '@xiaoye-react/ui/GridCol'
