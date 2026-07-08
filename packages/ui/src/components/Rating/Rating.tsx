import React from 'react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    factory,
    Factory,
    getSize,
    MantineColor,
    MantineSize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './Rating.module.css'

export type RatingStylesNames = 'root' | 'star' | 'starSymbol' | 'input'

export type RatingCssVariables = {
    root: '--rating-size' | '--rating-color'
}

export interface RatingProps extends BoxProps, StylesApiProps<RatingFactory> {
    /** Current rating value */
    value?: number

    /** Default value for uncontrolled rating */
    defaultValue?: number

    /** Called when value changes */
    onChange?: (value: number) => void

    /** Called when hover value changes */
    onHover?: (value: number) => void

    /** Number of stars @default 5 */
    count?: number

    /** Controls star size */
    size?: MantineSize | number | string

    /** Star color, key of theme.colors or any valid CSS color @default yellow */
    color?: MantineColor

    /** If true, the rating is read-only @default false */
    readOnly?: boolean

    /** If true, clicking the current value clears it @default false */
    clearable?: boolean

    /** Number of fractions per star, e.g. 2 for half-stars @default 1 */
    fractions?: number
}

export type RatingFactory = Factory<{
    props: RatingProps
    ref: HTMLDivElement
    stylesNames: RatingStylesNames
    vars: RatingCssVariables
}>

const defaultProps = {
    count: 5,
    fractions: 1,
    readOnly: false,
    clearable: false
} satisfies Partial<RatingProps>

const StarSymbol = (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block' }}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
)

const varsResolver = createVarsResolver<RatingFactory>((_, { size, color }) => ({
    root: {
        '--rating-size': size === undefined ? undefined : getSize(size, 'rating-size'),
        '--rating-color': color === undefined ? undefined : `var(--ui-color-${color}-filled)`
    }
}))

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
}

function roundToFraction(value: number, fractions: number) {
    const fraction = 1 / fractions
    return Math.round(value / fraction) * fraction
}

export const Rating = factory<RatingFactory>((_props, ref) => {
    const props = useProps('Rating', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        value,
        defaultValue,
        onChange,
        onHover,
        count,
        size,
        color,
        readOnly,
        clearable,
        fractions,
        mod,
        ...others
    } = props

    const getStyles = useStyles<RatingFactory>({
        name: 'Rating',
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver
    })

    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? 0)
    const [hoverValue, setHoverValue] = React.useState<number | null>(null)
    const currentValue = clamp(hoverValue ?? (isControlled ? value! : internalValue), 0, count)
    const roundedValue = roundToFraction(currentValue, fractions)

    const handleClick = (index: number) => {
        if (readOnly) return

        const nextValue = index + 1
        const finalValue = clearable && nextValue === roundedValue ? 0 : nextValue

        if (!isControlled) {
            setInternalValue(finalValue)
        }
        onChange?.(finalValue)
    }

    const handleMouseEnter = (index: number) => {
        if (readOnly) return
        const next = index + 1
        setHoverValue(next)
        onHover?.(next)
    }

    const handleMouseLeave = () => {
        setHoverValue(null)
        onHover?.(0)
    }

    return (
        <Box
            ref={ref}
            {...getStyles('root')}
            mod={[{ readonly: readOnly }, mod]}
            onMouseLeave={handleMouseLeave}
            {...others}
        >
            {Array.from({ length: count }).map((_, index) => {
                const starValue = index + 1
                const filled = roundedValue >= starValue
                const partial = roundedValue > index && roundedValue < starValue
                const fillPercent = partial ? (roundedValue - index) * 100 : 0

                return (
                    <button
                        key={index}
                        type="button"
                        {...getStyles('star')}
                        onClick={() => handleClick(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        disabled={readOnly}
                        aria-label={`${starValue} star`}
                    >
                        <span {...getStyles('starSymbol')} style={{ color: 'var(--ui-color-default-border)' }}>
                            {StarSymbol}
                        </span>
                        <span
                            {...getStyles('starSymbol')}
                            className={`${classes.starSymbol} ${classes.starFilled}`}
                            style={{
                                clipPath: partial ? `inset(0 ${100 - fillPercent}% 0 0)` : undefined,
                                opacity: filled || partial ? 1 : 0
                            }}
                        >
                            {StarSymbol}
                        </span>
                    </button>
                )
            })}
        </Box>
    )
})

Rating.classes = classes
;(Rating as any).varsResolver = varsResolver
Rating.displayName = '@react-ui/ui/Rating'

export namespace Rating {
    export type Props = RatingProps
    export type Factory = RatingFactory
    export type StylesNames = RatingStylesNames
    export type CssVariables = RatingCssVariables
}
