import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getSpacing,
    UISpacing,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './Marquee.module.css'

export type MarqueeStylesNames = 'root' | 'content' | 'group'
export type MarqueeCssVariables = {
    root: '--marquee-duration' | '--marquee-gap' | '--marquee-repeat' | '--marquee-fade-color' | '--marquee-fade-size'
}

export interface MarqueeProps extends BoxProps, StylesApiProps<MarqueeFactory>, ElementProps<'div'> {
    reverse?: boolean
    pauseOnHover?: boolean
    children: React.ReactNode
    orientation?: 'horizontal' | 'vertical'
    repeat?: number
    duration?: number
    gap?: UISpacing
    fadeEdges?: boolean
    fadeEdgeColor?: string
    fadeEdgeSize?: string
}

export type MarqueeFactory = Factory<{
    props: MarqueeProps
    ref: HTMLDivElement
    stylesNames: MarqueeStylesNames
    vars: MarqueeCssVariables
}>

const defaultProps = {
    repeat: 4,
    duration: 40_000,
    orientation: 'horizontal',
    fadeEdges: true
} satisfies Partial<MarqueeProps>

const varsResolver = createVarsResolver<MarqueeFactory>(
    (_, { duration, gap, repeat, fadeEdgeColor, fadeEdgeSize }) => ({
        root: {
            '--marquee-duration': `${duration}ms`,
            '--marquee-gap': getSpacing(gap),
            '--marquee-repeat': (repeat ?? 4).toString(),
            '--marquee-fade-color': fadeEdgeColor,
            '--marquee-fade-size': fadeEdgeSize
        }
    })
)

export const Marquee = factory<MarqueeFactory>((_props, ref) => {
    const props = useProps('Marquee', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        children,
        reverse,
        pauseOnHover,
        orientation,
        repeat,
        duration,
        gap,
        fadeEdges,
        fadeEdgeColor,
        fadeEdgeSize,
        mod,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<MarqueeFactory>({
        name: 'Marquee',
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

    const repeatedChildren = Array(repeat)
        .fill(0)
        .map((_, index) => (
            <div key={index} {...getStyles('group')} aria-hidden={index > 0 || undefined}>
                {children}
            </div>
        ))

    return (
        <Box
            ref={ref}
            {...getStyles('root')}
            mod={[{ orientation, reverse, pauseOnHover, 'fade-edges': fadeEdges }, mod]}
            {...others}
        >
            <div {...getStyles('content')}>{repeatedChildren}</div>
        </Box>
    )
})

Marquee.classes = classes
Marquee.varsResolver = varsResolver
Marquee.displayName = '@xiaoye-react/ui/Marquee'

export namespace Marquee {
    export type Props = MarqueeProps
    export type StylesNames = MarqueeStylesNames
    export type CssVariables = MarqueeCssVariables
    export type Factory = MarqueeFactory
}
