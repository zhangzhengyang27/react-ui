import { useRef } from 'react'
import { useMergedRef, useReducedMotion } from '@react-ui/hooks'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { useFloatingIndicator } from './use-floating-indicator'
import classes from './FloatingIndicator.module.css'

export type FloatingIndicatorStylesNames = 'root'
export type FloatingIndicatorCssVariables = {
    root: '--floating-indicator-transition-duration'
}

export interface FloatingIndicatorProps
    extends BoxProps,
        StylesApiProps<FloatingIndicatorFactory>,
        ElementProps<'div'> {
    target: HTMLElement | null | undefined
    parent: HTMLElement | null | undefined
    transitionDuration?: number | string
    displayAfterTransitionEnd?: boolean
    onTransitionStart?: () => void
    onTransitionEnd?: () => void
}

export type FloatingIndicatorFactory = Factory<{
    props: FloatingIndicatorProps
    ref: HTMLDivElement
    stylesNames: FloatingIndicatorStylesNames
    vars: FloatingIndicatorCssVariables
    ctx: { shouldReduceMotion: boolean }
}>

const defaultProps = {
    transitionDuration: 150,
    displayAfterTransitionEnd: false
} satisfies Partial<FloatingIndicatorProps>

const varsResolver = createVarsResolver<FloatingIndicatorFactory>(
    (theme, { transitionDuration }, { shouldReduceMotion }) => {
        const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false
        const duration = reduceMotion
            ? '0ms'
            : typeof transitionDuration === 'number'
              ? `${transitionDuration}ms`
              : transitionDuration || '150ms'

        return {
            root: {
                '--floating-indicator-transition-duration': duration
            }
        }
    }
)

export const FloatingIndicator = factory<FloatingIndicatorFactory>((_props, ref) => {
    const props = useProps('FloatingIndicator', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        target,
        parent,
        transitionDuration,
        mod,
        displayAfterTransitionEnd,
        onTransitionStart,
        onTransitionEnd,
        attributes,
        ...others
    } = props

    const shouldReduceMotion = useReducedMotion()

    const getStyles = useStyles<FloatingIndicatorFactory>({
        name: 'FloatingIndicator',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver,
        stylesCtx: { shouldReduceMotion }
    })

    const innerRef = useRef<HTMLDivElement>(null)
    const { initialized, hidden } = useFloatingIndicator({
        target,
        parent,
        ref: innerRef,
        displayAfterTransitionEnd,
        onTransitionStart,
        onTransitionEnd
    })

    const mergedRef = useMergedRef(ref, innerRef)

    if (!target || !parent) {
        return null
    }

    return (
        <Box ref={mergedRef} mod={[{ initialized, hidden }, mod]} {...getStyles('root')} {...others} />
    )
})

FloatingIndicator.displayName = '@react-ui/ui/FloatingIndicator'
FloatingIndicator.classes = classes
FloatingIndicator.varsResolver = varsResolver

export namespace FloatingIndicator {
    export type Props = FloatingIndicatorProps
    export type StylesNames = FloatingIndicatorStylesNames
    export type CssVariables = FloatingIndicatorCssVariables
    export type Factory = FloatingIndicatorFactory
}
