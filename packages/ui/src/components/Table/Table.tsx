import {
    Box,
    createVarsResolver,
    factory,
    getSize,
    useProps,
    useStyles,
    type BoxProps,
    type ElementProps,
    type Factory,
    type MantineSize,
    type StylesApiProps
} from '../../core'
import classes from './Table.module.css'
import { TableProvider } from './Table.context'
import { Tbody } from './Tbody'
import { Td } from './Td'
import { Th } from './Th'
import { Thead } from './Thead'
import { Tr } from './Tr'

export type TableStylesNames = 'root' | 'thead' | 'tbody' | 'tr' | 'th' | 'td'

export type TableCssVariables = {
    root: '--table-horizontal-spacing' | '--table-vertical-spacing' | '--table-caption-side'
}

export interface TableProps extends BoxProps, ElementProps<'table'>, StylesApiProps<TableFactory> {
    /** Two-dimensional array used to auto-generate thead/tbody; first row is used as header */
    data?: React.ReactNode[][]

    /** Adds striped styles to tbody rows */
    striped?: boolean

    /** Highlights tbody rows on hover */
    highlightOnHover?: boolean

    /** Adds border around the whole table */
    withTableBorder?: boolean

    /** Adds vertical borders between columns */
    withColumnBorders?: boolean

    /** Adds horizontal borders between rows */
    withRowBorders?: boolean

    /** Horizontal cell padding, key of theme.spacing or any valid CSS value @default 'sm' */
    horizontalSpacing?: MantineSize | number | string

    /** Vertical cell padding, key of theme.spacing or any valid CSS value @default 'sm' */
    verticalSpacing?: MantineSize | number | string

    /** Position of the caption element @default 'top' */
    captionSide?: 'top' | 'bottom'
}

export type TableFactory = Factory<{
    props: TableProps
    ref: HTMLTableElement
    stylesNames: TableStylesNames
    vars: TableCssVariables
    staticComponents: {
        Thead: typeof Thead
        Tbody: typeof Tbody
        Tr: typeof Tr
        Th: typeof Th
        Td: typeof Td
    }
}>

const defaultProps = {
    horizontalSpacing: 'sm',
    verticalSpacing: 'sm',
    captionSide: 'top'
} satisfies Partial<TableProps>

const varsResolver = createVarsResolver<TableFactory>((_, { horizontalSpacing, verticalSpacing, captionSide }) => ({
    root: {
        '--table-horizontal-spacing': getSize(horizontalSpacing, 'ui-spacing'),
        '--table-vertical-spacing': getSize(verticalSpacing, 'ui-spacing'),
        '--table-caption-side': captionSide
    }
}))

export const Table = factory<TableFactory>((_props, ref) => {
    const props = useProps('Table', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        children,
        data,
        striped,
        highlightOnHover,
        withTableBorder,
        withColumnBorders,
        withRowBorders,
        horizontalSpacing,
        verticalSpacing,
        captionSide,
        mod,
        ...others
    } = props

    const getStyles = useStyles<TableFactory>({
        name: 'Table',
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

    const content = data ? buildDataContent(data) : children

    return (
        <TableProvider value={{ getStyles, unstyled }}>
            <Box
                component="table"
                ref={ref}
                {...getStyles('root')}
                mod={[
                    {
                        striped,
                        'highlight-on-hover': highlightOnHover,
                        'with-table-border': withTableBorder,
                        'with-column-borders': withColumnBorders,
                        'with-row-borders': withRowBorders
                    },
                    mod
                ]}
                {...others}
            >
                {content}
            </Box>
        </TableProvider>
    )
})

function buildDataContent(data: React.ReactNode[][]) {
    if (data.length === 0) {
        return null
    }

    const [header, ...rows] = data

    return (
        <>
            <Thead>
                <Tr>
                    {header.map((cell, index) => (
                        <Th key={index}>{cell}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {rows.map((row, rowIndex) => (
                    <Tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <Td key={cellIndex}>{cell}</Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        </>
    )
}

Table.classes = classes
;(Table as any).varsResolver = varsResolver
Table.displayName = '@react-ui/ui/Table'
Table.Thead = Thead
Table.Tbody = Tbody
Table.Tr = Tr
Table.Th = Th
Table.Td = Td

export namespace Table {
    export type Props = TableProps
    export type StylesNames = TableStylesNames
    export type CssVariables = TableCssVariables
    export type Factory = TableFactory
}
