import { Ref } from 'react'
import { useScroller } from '@xiaoye-react/hooks'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getThemeColor,
    rem,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { AccordionChevron } from '../Accordion/AccordionChevron'
import { UnstyledButton } from '../UnstyledButton'
import classes from './Scroller.module.css'

export type ScrollerStylesNames = 'root' | 'container' | 'content' | 'control' | 'chevron'
export type ScrollerCssVariables = {
    root: '--scroller-control-size' | '--scroller-background-color'
}

export interface ScrollerProps extends BoxProps, StylesApiProps<ScrollerFactory>, ElementProps<'div'> {
    /** Content to display */
    children: React.ReactNode

    /** Amount of pixels to scroll when clicking the control buttons, `200` by default */
    scrollAmount?: number

    /** Size of the control buttons, @default 60px */
    controlSize?: string | number

    /** Background color for the gradient fade on controls, `'var(--ui-color-body)'` by default */
    edgeGradientColor?: string

    /** Props passed to the start control button */
    startControlProps?: Omit<React.ComponentProps<'button'>, 'ref'>

    /** Props passed to the end control button */
    endControlProps?: Omit<React.ComponentProps<'button'>, 'ref'>

    /** Icon component for the start control, AccordionChevron by default */
    startControlIcon?: React.ReactNode

    /** Icon component for the end control, AccordionChevron by default */
    endControlIcon?: React.ReactNode

    /** Determines whether start control should always be visible regardless of scroll position, `false` by default */
    showStartControl?: boolean

    /** Determines whether end control should always be visible regardless of scroll position, `false` by default */
    showEndControl?: boolean

    /** Determines whether content can be scrolled by dragging with mouse, `true` by default */
    draggable?: boolean

    /** Ref for the scroll container element */
    ref?: Ref<HTMLDivElement>
}

export type ScrollerFactory = Factory<{
    props: ScrollerProps
    ref: HTMLDivElement
    stylesNames: ScrollerStylesNames
    vars: ScrollerCssVariables
}>

const defaultProps: Partial<ScrollerProps> = {
    scrollAmount: 200,
    draggable: true
}

const varsResolver = createVarsResolver<ScrollerFactory>((theme, { controlSize, edgeGradientColor }) => ({
    root: {
        '--scroller-control-size': rem(controlSize),
        '--scroller-background-color': edgeGradientColor ? getThemeColor(edgeGradientColor, theme) : undefined
    }
}))

export const Scroller = factory<ScrollerFactory>((_props, ref) => {
    const props = useProps('Scroller', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        children,
        scrollAmount,
        controlSize,
        edgeGradientColor,
        startControlProps,
        endControlProps,
        startControlIcon,
        endControlIcon,
        showStartControl,
        showEndControl,
        draggable,
        mod,
        attributes,
        ref: _ref,
        ...others
    } = props

    const getStyles = useStyles<ScrollerFactory>({
        name: 'Scroller',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver,
        attributes
    })

    const scroller = useScroller({
        scrollAmount,
        draggable
    })

    const showStart = showStartControl || scroller.canScrollStart
    const showEnd = showEndControl || scroller.canScrollEnd

    return (
        <Box ref={ref} {...getStyles('root')} mod={mod} {...others}>
            <UnstyledButton
                {...getStyles('control')}
                onClick={scroller.scrollStart}
                data-position="start"
                data-hidden={!showStart || undefined}
                aria-label="Scroll start"
                tabIndex={showStart ? 0 : -1}
                {...startControlProps}
            >
                {startControlIcon || <AccordionChevron {...getStyles('chevron')} />}
            </UnstyledButton>

            <div
                {...getStyles('container')}
                ref={scroller.ref}
                role="presentation"
                data-draggable={draggable || undefined}
                {...scroller.dragHandlers}
            >
                <div {...getStyles('content')}>{children}</div>
            </div>

            <UnstyledButton
                {...getStyles('control')}
                onClick={scroller.scrollEnd}
                data-position="end"
                data-hidden={!showEnd || undefined}
                aria-label="Scroll end"
                tabIndex={showEnd ? 0 : -1}
                {...endControlProps}
            >
                {endControlIcon || <AccordionChevron {...getStyles('chevron')} />}
            </UnstyledButton>
        </Box>
    )
})

Scroller.classes = classes
Scroller.varsResolver = varsResolver
Scroller.displayName = '@xiaoye-react/ui/Scroller'

export namespace Scroller {
    export type Props = ScrollerProps
    export type StylesNames = ScrollerStylesNames
    export type CssVariables = ScrollerCssVariables
    export type Factory = ScrollerFactory
}
