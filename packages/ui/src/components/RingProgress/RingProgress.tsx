import {
    Box,
    BoxProps,
    createVarsResolver,
    factory,
    Factory,
    getSize,
    getThemeColor,
    UIColor,
    StylesApiProps,
    useUITheme,
    useProps,
    useStyles
} from '../../core'
import classes from './RingProgress.module.css'

export type RingProgressStylesNames = 'root' | 'svg' | 'curve' | 'label'

export type RingProgressCssVariables = {
    root: '--rp-size'
}

export interface RingProgressSection {
    value: number
    color?: UIColor
}

export interface RingProgressProps extends BoxProps, StylesApiProps<RingProgressFactory> {
    /** Ring diameter */
    size?: number | string

    /** Stroke width */
    thickness?: number

    /** If true, the ends of each arc will be rounded @default false */
    roundCaps?: boolean

    /** Sections with value and color */
    sections: RingProgressSection[]

    /** Label displayed in the center of the ring */
    label?: React.ReactNode

    /** Default color for sections without color */
    color?: UIColor
}

export type RingProgressFactory = Factory<{
    props: RingProgressProps
    ref: HTMLDivElement
    stylesNames: RingProgressStylesNames
    vars: RingProgressCssVariables
}>

const varsResolver = createVarsResolver<RingProgressFactory>((_, { size }) => ({
    root: {
        '--rp-size': size === undefined ? undefined : getSize(size, 'rp-size')
    }
}))

function getCoordinatesForPercent(percent: number) {
    const x = Math.cos(2 * Math.PI * percent)
    const y = Math.sin(2 * Math.PI * percent)
    return [x, y]
}

function describeArc(startAngle: number, endAngle: number, radius: number) {
    const start = getCoordinatesForPercent(startAngle)
    const end = getCoordinatesForPercent(endAngle)
    const largeArcFlag = endAngle - startAngle <= 0.5 ? 0 : 1

    return [
        `M ${start[0] * radius} ${start[1] * radius}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end[0] * radius} ${end[1] * radius}`
    ].join(' ')
}

export const RingProgress = factory<RingProgressFactory>((_props, ref) => {
    const props = useProps('RingProgress', null, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        size,
        thickness = 12,
        roundCaps = false,
        sections,
        label,
        color,
        mod,
        ...others
    } = props

    const theme = useUITheme()
    const getStyles = useStyles<RingProgressFactory>({
        name: 'RingProgress',
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

    const normalizedSize = typeof size === 'number' ? size : 120
    const radius = (normalizedSize - thickness) / 2
    const viewBoxSize = normalizedSize
    const center = viewBoxSize / 2

    // NaN/Infinity 输入归一为 0：Math.max(0, NaN) === NaN 会产出 "M NaN NaN" 的
    // path（SVG 静默不渲染、显示空环），与 Progress 的 clamp 防御保持一致
    const normalizeSectionValue = (value: number) => (Number.isFinite(value) ? Math.max(0, value) : 0)
    const total = sections.reduce((acc, section) => acc + normalizeSectionValue(section.value), 0)
    const normalizedTotal = Math.max(total, 100)

    let currentAngle = -0.25
    const arcs = sections.map((section, index) => {
        const sectionValue = normalizeSectionValue(section.value)
        const sweep = sectionValue / normalizedTotal
        const endAngle = currentAngle + sweep
        const d = describeArc(currentAngle, endAngle, radius)
        currentAngle = endAngle

        const sectionColor = section.color || color || theme.primaryColor
        const stroke = sectionColor ? getThemeColor(sectionColor, theme) : undefined

        return { d, stroke, key: index }
    })

    // progressbar 语义：读屏可获知进度值，aria-valuenow 钳制到 [0, 100]
    const ariaValueNow = Math.min(Math.max(total, 0), 100)

    return (
        <Box
            ref={ref}
            {...getStyles('root')}
            mod={mod}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(ariaValueNow)}
            {...others}
        >
            <svg
                {...getStyles('svg')}
                width={normalizedSize}
                height={normalizedSize}
                viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
            >
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="var(--ui-color-default-border)"
                    strokeWidth={thickness}
                />
                <g
                    transform={`translate(${center}, ${center})`}
                    fill="none"
                    strokeWidth={thickness}
                    strokeLinecap={roundCaps ? 'round' : 'butt'}
                >
                    {arcs.map(arc => (
                        <path key={arc.key} {...getStyles('curve')} d={arc.d} stroke={arc.stroke} />
                    ))}
                </g>
            </svg>
            {label && <div {...getStyles('label')}>{label}</div>}
        </Box>
    )
})

RingProgress.classes = classes
;(RingProgress as any).varsResolver = varsResolver
RingProgress.displayName = '@xiaoye-react/ui/RingProgress'

export namespace RingProgress {
    export type Props = RingProgressProps
    export type Factory = RingProgressFactory
    export type StylesNames = RingProgressStylesNames
    export type CssVariables = RingProgressCssVariables
}
