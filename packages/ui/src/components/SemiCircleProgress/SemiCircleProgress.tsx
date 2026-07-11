import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getThemeColor,
    MantineColor,
    rem,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './SemiCircleProgress.module.css'

export type SemiCircleProgressStylesNames =
    | 'root'
    | 'svg'
    | 'emptySegment'
    | 'filledSegment'
    | 'label'

export type SemiCircleProgressCssVariables = {
    root:
        | '--semi-circle-progress-filled-segment-color'
        | '--semi-circle-progress-empty-segment-color'
        | '--semi-circle-progress-rotation'
        | '--semi-circle-progress-transition-duration'
        | '--semi-circle-progress-thickness'
}

export interface SemiCircleProgressProps
    extends BoxProps, StylesApiProps<SemiCircleProgressFactory>, ElementProps<'div'> {
    value: number
    size?: number
    thickness?: number
    orientation?: 'up' | 'down'
    fillDirection?: 'right-to-left' | 'left-to-right'
    filledSegmentColor?: MantineColor
    emptySegmentColor?: MantineColor
    transitionDuration?: number
    label?: React.ReactNode
    labelPosition?: 'center' | 'bottom'
}

export type SemiCircleProgressFactory = Factory<{
    props: SemiCircleProgressProps
    ref: HTMLDivElement
    stylesNames: SemiCircleProgressStylesNames
    vars: SemiCircleProgressCssVariables
}>

const defaultProps = {
    size: 200,
    thickness: 12,
    orientation: 'up',
    fillDirection: 'left-to-right',
    labelPosition: 'bottom'
} satisfies Partial<SemiCircleProgressProps>

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
}

function getRotation({
    orientation,
    fillDirection
}: Pick<SemiCircleProgressProps, 'orientation' | 'fillDirection'>) {
    if (orientation === 'down') {
        if (fillDirection === 'right-to-left') {
            return 'rotate(180deg) rotateY(180deg)'
        }
        return 'rotate(180deg)'
    }
    if (fillDirection === 'left-to-right') {
        return 'rotateY(180deg)'
    }

    return undefined
}

const varsResolver = createVarsResolver<SemiCircleProgressFactory>(
    (
        theme,
        {
            filledSegmentColor,
            emptySegmentColor,
            orientation,
            fillDirection,
            transitionDuration,
            thickness
        }
    ) => ({
        root: {
            '--semi-circle-progress-filled-segment-color': filledSegmentColor
                ? getThemeColor(filledSegmentColor, theme)
                : undefined,
            '--semi-circle-progress-empty-segment-color': emptySegmentColor
                ? getThemeColor(emptySegmentColor, theme)
                : undefined,
            '--semi-circle-progress-rotation': getRotation({ orientation, fillDirection }),
            '--semi-circle-progress-transition-duration': transitionDuration ? `${transitionDuration}ms` : undefined,
            '--semi-circle-progress-thickness': rem(thickness)
        }
    })
)

export const SemiCircleProgress = factory<SemiCircleProgressFactory>((_props, ref) => {
    const props = useProps('SemiCircleProgress', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        size,
        thickness,
        value,
        orientation,
        fillDirection,
        filledSegmentColor,
        emptySegmentColor,
        transitionDuration,
        label,
        labelPosition,
        mod,
        ...others
    } = props

    const getStyles = useStyles<SemiCircleProgressFactory>({
        name: 'SemiCircleProgress',
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

    const coordinateForCircle = size / 2
    const radius = (size - 2 * thickness) / 2
    const circumference = Math.PI * radius
    const semiCirclePercentage = clamp(value, 0, 100) * (circumference / 100)

    return (
        <Box ref={ref} size={size} {...getStyles('root')} mod={mod} {...others}>
            {label && (
                <div {...getStyles('label')} data-position={labelPosition} data-orientation={orientation}>
                    {label}
                </div>
            )}

            <svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`} {...getStyles('svg')}>
                <circle
                    cx={coordinateForCircle}
                    cy={coordinateForCircle}
                    r={radius}
                    fill="none"
                    stroke="var(--semi-circle-progress-empty-segment-color)"
                    strokeWidth={thickness}
                    strokeDasharray={circumference}
                    {...getStyles('emptySegment', { style: { strokeDashoffset: circumference } })}
                />

                <circle
                    cx={coordinateForCircle}
                    cy={coordinateForCircle}
                    r={radius}
                    fill="none"
                    stroke="var(--semi-circle-progress-filled-segment-color)"
                    strokeWidth={thickness}
                    strokeDasharray={circumference}
                    {...getStyles('filledSegment', {
                        style: {
                            strokeDashoffset: semiCirclePercentage,
                            ...(semiCirclePercentage === 0 ? { strokeOpacity: 0 } : null)
                        }
                    })}
                />
            </svg>
        </Box>
    )
})

SemiCircleProgress.displayName = '@react-ui/ui/SemiCircleProgress'
SemiCircleProgress.classes = classes
SemiCircleProgress.varsResolver = varsResolver

export namespace SemiCircleProgress {
    export type Props = SemiCircleProgressProps
    export type StylesNames = SemiCircleProgressStylesNames
    export type CssVariables = SemiCircleProgressCssVariables
    export type Factory = SemiCircleProgressFactory
}
