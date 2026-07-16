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
import { SimpleGridVariables } from './SimpleGridVariables'
import classes from './SimpleGrid.module.css'

export type SimpleGridStylesNames = 'root'

export interface SimpleGridProps extends BoxProps, StylesApiProps<SimpleGridFactory>, ElementProps<'div'> {
    /** Number of columns @default 1 */
    cols?: StyleProp<number>

    /** Spacing between columns @default 'md' */
    spacing?: StyleProp<UISpacing>

    /** Spacing between rows. When not set, falls back to spacing value @default undefined */
    verticalSpacing?: StyleProp<UISpacing>

    /** Minimum column width when using auto-fit/auto-fill. When set, cols prop is ignored */
    minColWidth?: string | number

    /** Grid repeat type when minColWidth is set @default 'auto-fill' */
    autoFlow?: 'auto-fit' | 'auto-fill'

    /** Sets the size of implicitly created grid rows */
    autoRows?: string
}

export type SimpleGridFactory = Factory<{
    props: SimpleGridProps
    ref: HTMLDivElement
    stylesNames: SimpleGridStylesNames
}>

const defaultProps = {
    cols: 1,
    spacing: 'md'
} satisfies Partial<SimpleGridProps>

export const SimpleGrid = factory<SimpleGridFactory>((_props, _ref) => {
    const props = useProps('SimpleGrid', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        cols,
        verticalSpacing,
        spacing,
        minColWidth,
        autoFlow,
        autoRows,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<SimpleGridFactory>({
        name: 'SimpleGrid',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars
    })

    const responsiveClassName = useRandomClassName()
    const autoColsAttr = minColWidth !== undefined ? autoFlow || 'auto-fill' : undefined

    return (
        <>
            <SimpleGridVariables {...props} selector={`.${responsiveClassName}`} />
            <Box ref={_ref} {...getStyles('root', { className: responsiveClassName })} {...others} data-auto-cols={autoColsAttr} />
        </>
    )
})

SimpleGrid.classes = classes
SimpleGrid.displayName = '@react-ui/ui/SimpleGrid'

export namespace SimpleGrid {
    export type Props = SimpleGridProps
    export type StylesNames = SimpleGridStylesNames
    export type Factory = SimpleGridFactory
}
