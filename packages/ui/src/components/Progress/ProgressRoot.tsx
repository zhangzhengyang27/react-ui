import {
    Box,
    createVarsResolver,
    factory,
    getRadius,
    getSize,
    type BoxProps,
    type ElementProps,
    type Factory,
    type MantineRadius,
    type MantineSize,
    type StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { ProgressContext } from './Progress.context'
import classes from './Progress.module.css'

export type ProgressRootCssVariables = {
    root: '--progress-radius' | '--progress-height'
}

export interface ProgressRootProps
    extends BoxProps,
        StylesApiProps<ProgressRootFactory>,
        ElementProps<'div'> {
    /** Key of theme.radius or any valid CSS value */
    radius?: MantineRadius

    /** Controls progress height */
    size?: MantineSize

    /** If true, the progress bar will have striped background */
    striped?: boolean

    /** If true, the stripes will be animated */
    animated?: boolean
}

export type ProgressRootFactory = Factory<{
    props: ProgressRootProps
    ref: HTMLDivElement
    stylesNames: 'root'
    vars: ProgressRootCssVariables
}>

const defaultProps = {} satisfies Partial<ProgressRootProps>

const varsResolver = createVarsResolver<ProgressRootFactory>((_, { radius, size }) => ({
    root: {
        '--progress-radius': radius === undefined ? undefined : getRadius(radius),
        '--progress-height': getSize(size, 'progress-height')
    }
}))

export const ProgressRoot = factory<ProgressRootFactory>((_props, ref) => {
    const props = useProps('ProgressRoot', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        radius,
        size,
        striped,
        animated,
        mod,
        children,
        ...others
    } = props

    const getStyles = useStyles<ProgressRootFactory>({
        name: 'Progress',
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

    return (
        <ProgressContext.Provider value={{ getStyles: getStyles as any }}>
            <Box
                ref={ref}
                {...getStyles('root')}
                mod={[{ striped, animated }, mod]}
                role="progressbar"
                {...others}
            >
                {children}
            </Box>
        </ProgressContext.Provider>
    )
})

ProgressRoot.classes = classes
ProgressRoot.displayName = '@react-ui/ui/ProgressRoot'

export namespace ProgressRoot {
    export type Props = ProgressRootProps
    export type Factory = ProgressRootFactory
}
