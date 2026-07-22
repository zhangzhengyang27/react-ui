import {
    Box,
    BoxProps,
    createVarsResolver,
    factory,
    Factory,
    getRadius,
    getSize,
    getThemeColor,
    UIColor,
    UIRadius,
    UISize,
    StylesApiProps,
    useUITheme,
    useProps,
    useStyles
} from '../../core'
import { ProgressRoot, type ProgressRootProps, type ProgressRootFactory } from './ProgressRoot'
import { ProgressSection, type ProgressSectionProps, type ProgressSectionFactory } from './ProgressSection'
import { ProgressLabel, type ProgressLabelProps, type ProgressLabelFactory } from './ProgressLabel'
import classes from './Progress.module.css'

export type ProgressStylesNames = 'root' | 'section' | 'label'

export type ProgressCssVariables = {
    root: '--progress-radius' | '--progress-height'
}

export interface ProgressSection {
    value: number
    color?: UIColor
    label?: React.ReactNode
    tooltip?: React.ReactNode
}

export interface ProgressProps extends BoxProps, StylesApiProps<ProgressFactory> {
    /** Current progress value, 0-100 */
    value?: number

    /** Progress color, key of theme.colors or any valid CSS color */
    color?: UIColor

    /** 主题圆角的键或任意有效的 CSS 值 @default theme.defaultRadius */
    radius?: UIRadius

    /** Controls progress height */
    size?: UISize

    /** If true, the progress bar will have striped background @default false */
    striped?: boolean

    /** If true, the stripes will be animated @default false */
    animated?: boolean

    /** If true, the progress bar will be transitions-enabled @default true */
    transitionDuration?: number

    /** Replaces value/color with multiple sections */
    sections?: ProgressSection[]

    /** 内部显示的标签 the progress bar */
    label?: React.ReactNode
}

export type ProgressFactory = Factory<{
    props: ProgressProps
    ref: HTMLDivElement
    stylesNames: ProgressStylesNames
    vars: ProgressCssVariables
    staticComponents: {
        Root: typeof ProgressRoot
        Section: typeof ProgressSection
        Label: typeof ProgressLabel
    }
}>

const defaultProps = {
    transitionDuration: 100
} satisfies Partial<ProgressProps>

const varsResolver = createVarsResolver<ProgressFactory>((_, { radius, size }) => ({
    root: {
        '--progress-radius': radius === undefined ? undefined : getRadius(radius),
        '--progress-height': getSize(size, 'progress-height')
    }
}))

function clamp(value: number) {
    return Math.min(Math.max(value, 0), 100)
}

export const Progress = factory<ProgressFactory>((_props, ref) => {
    const props = useProps('Progress', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        value,
        color,
        radius,
        size,
        striped,
        animated,
        transitionDuration,
        sections,
        label,
        mod,
        ...others
    } = props

    const theme = useUITheme()
    const getStyles = useStyles<ProgressFactory>({
        name: 'Progress',
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

    const normalizedSections: ProgressSection[] = sections?.length
        ? sections.map(section => ({ ...section, value: clamp(section.value) }))
        : [{ value: clamp(value || 0), color, label }]

    return (
        <Box
            ref={ref}
            {...getStyles('root')}
            mod={[{ striped, animated }, mod]}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
            {...others}
        >
            {normalizedSections.map((section, index) => {
                const sectionColor = section.color || color || theme.primaryColor
                const bg = sectionColor ? getThemeColor(sectionColor, theme) : undefined

                return (
                    <Box
                        key={index}
                        {...getStyles('section')}
                        mod={[{ striped, animated }, mod]}
                        style={{
                            width: `${section.value}%`,
                            backgroundColor: bg,
                            transition: `width ${transitionDuration}ms linear`
                        }}
                    >
                        {(section.label || (normalizedSections.length === 1 && label)) && (
                            <span {...getStyles('label')}>{section.label || label}</span>
                        )}
                    </Box>
                )
            })}
        </Box>
    )
})

Progress.classes = classes
;(Progress as any).varsResolver = varsResolver
Progress.displayName = '@xiaoye-react/ui/Progress'
Progress.Root = ProgressRoot
Progress.Section = ProgressSection
Progress.Label = ProgressLabel

export namespace Progress {
    export type Props = ProgressProps
    export type Factory = ProgressFactory
    export type StylesNames = ProgressStylesNames
    export type CssVariables = ProgressCssVariables

    export namespace Root {
        export type Props = ProgressRootProps
        export type Factory = ProgressRootFactory
    }

    export namespace Section {
        export type Props = ProgressSectionProps
        export type Factory = ProgressSectionFactory
    }

    export namespace Label {
        export type Props = ProgressLabelProps
        export type Factory = ProgressLabelFactory
    }
}
