import { useRef } from 'react'
import { useDidUpdate } from '@react-ui/hooks'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    StylesApiProps,
    useProps,
    useStyles,
} from '../../core'
import { buildValue } from './build-value'
import { DigitColumn } from './DigitColumn'
import { getDigitParts } from './get-digit-parts'
import { getRenderSlots } from './get-render-slots'
import classes from './RollingNumber.module.css'

export type RollingNumberStylesNames = 'root' | 'digit' | 'digitColumn' | 'char'
export type RollingNumberCssVariables = {
    root: '--rolling-number-duration' | '--rolling-number-timing-function'
}

export interface RollingNumberProps
    extends BoxProps, StylesApiProps<RollingNumberFactory>, ElementProps<'div'> {
    value: number
    prefix?: string
    suffix?: string
    decimalSeparator?: string
    thousandSeparator?: string | boolean
    decimalScale?: number
    fixedDecimalScale?: boolean
    animationDuration?: number
    timingFunction?: string
    tabularNumbers?: boolean
    withLiveRegion?: boolean
}

export type RollingNumberFactory = Factory<{
    props: RollingNumberProps
    ref: HTMLDivElement
    stylesNames: RollingNumberStylesNames
    vars: RollingNumberCssVariables
}>

const defaultProps = {
    animationDuration: 600,
    timingFunction: 'ease',
    decimalSeparator: '.',
    tabularNumbers: true,
} satisfies Partial<RollingNumberProps>

const varsResolver = createVarsResolver<RollingNumberFactory>(
    (_, { animationDuration, timingFunction }) => ({
        root: {
            '--rolling-number-duration': `${animationDuration}ms`,
            '--rolling-number-timing-function': timingFunction,
        },
    })
)

export const RollingNumber = factory<RollingNumberFactory>((_props, ref) => {
    const props = useProps('RollingNumber', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        value,
        prefix,
        suffix,
        decimalSeparator,
        thousandSeparator,
        decimalScale,
        fixedDecimalScale,
        animationDuration,
        timingFunction,
        tabularNumbers,
        withLiveRegion,
        mod,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<RollingNumberFactory>({
        name: 'RollingNumber',
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
    })

    const previousValueRef = useRef(value)
    const previousValue = previousValueRef.current

    useDidUpdate(() => {
        previousValueRef.current = value
    }, [value])

    const valueDirection: 'up' | 'down' = value >= previousValue ? 'up' : 'down'

    const current = getDigitParts({ value, decimalScale, fixedDecimalScale })
    const prev = getDigitParts({ value: previousValue, decimalScale, fixedDecimalScale })

    const slots = getRenderSlots({
        current,
        previous: prev,
        prefix,
        suffix,
        decimalSeparator,
        thousandSeparator,
    })

    const accessibleValue = buildValue({
        value,
        prefix,
        suffix,
        decimalSeparator,
        thousandSeparator,
        decimalScale,
        fixedDecimalScale,
    })

    return (
        <Box
            ref={ref}
            {...getStyles('root')}
            mod={[{ 'tabular-numbers': tabularNumbers }, mod]}
            role={withLiveRegion ? 'status' : 'img'}
            aria-label={accessibleValue}
            {...others}
        >
            {slots.map((slot) => {
                if (slot.type === 'digit') {
                    return (
                        <DigitColumn
                            key={slot.key}
                            digit={slot.digit}
                            previousDigit={slot.previousDigit}
                            getStyles={getStyles}
                            empty={slot.empty}
                            valueDirection={valueDirection}
                        />
                    )
                }

                return (
                    <span
                        key={slot.key}
                        {...getStyles('char')}
                        data-empty={slot.empty || undefined}
                        aria-hidden="true"
                    >
                        {slot.char}
                    </span>
                )
            })}
        </Box>
    )
})

RollingNumber.classes = classes
RollingNumber.varsResolver = varsResolver
RollingNumber.displayName = '@react-ui/ui/RollingNumber'

export namespace RollingNumber {
    export type Props = RollingNumberProps
    export type Factory = RollingNumberFactory
    export type StylesNames = RollingNumberStylesNames
    export type CssVariables = RollingNumberCssVariables
}
