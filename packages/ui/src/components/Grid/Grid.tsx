import {
    Box,
    BoxProps,
    ElementProps,
    Factory,
    factory,
    UISpacing,
    StyleProp,
    StylesApiProps,
    useProps,
    useRandomClassName,
    useStyles
} from '../../core'
import { GridCol } from './GridCol'
import { GridContextProvider } from './Grid.context'
import { GridVariables } from './GridVariables'
import classes from './Grid.module.css'

export type GridStylesNames = 'root' | 'col'

export interface GridProps extends BoxProps, StylesApiProps<GridFactory>, ElementProps<'div'> {
    /** Number of columns in the grid @default 12 */
    cols?: StyleProp<number>

    /** Spacing between columns and rows @default 'md' */
    gutter?: StyleProp<UISpacing>

    /** Spacing between rows, overrides `gutter` for row spacing */
    rowGap?: StyleProp<UISpacing>

    /** Spacing between columns, overrides `gutter` for column spacing */
    columnGap?: StyleProp<UISpacing>

    /** Determines whether columns in the last row should grow to fill the remaining space */
    grow?: boolean
}

export type GridFactory = Factory<{
    props: GridProps
    ref: HTMLDivElement
    stylesNames: GridStylesNames
    staticComponents: {
        Col: typeof GridCol
    }
}>

const defaultProps = {
    cols: 12,
    gutter: 'md'
} satisfies Partial<GridProps>

export const Grid = factory<GridFactory>((_props, _ref) => {
    const props = useProps('Grid', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, cols, gutter, rowGap, columnGap, grow, children, ...others } = props

    const getStyles = useStyles<GridFactory>({
        name: 'Grid',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        rootSelector: 'root'
    })

    const responsiveClassName = useRandomClassName()
    const columns = typeof cols === 'number' ? cols : (cols as any)?.base ?? 12

    return (
        <>
            <GridVariables {...props} selector={`.${responsiveClassName}`} />
            <GridContextProvider value={{ columns, grow: !!grow }}>
                <Box
                    ref={_ref}
                    {...getStyles('root', { className: responsiveClassName })}
                    {...others}
                    data-grow={grow || undefined}
                >
                    {children}
                </Box>
            </GridContextProvider>
        </>
    )
})

Grid.Col = GridCol
Grid.classes = classes
Grid.displayName = '@xiaoye-react/ui/Grid'

export namespace Grid {
    export type Props = GridProps
    export type StylesNames = GridStylesNames
    export type Factory = GridFactory
}
