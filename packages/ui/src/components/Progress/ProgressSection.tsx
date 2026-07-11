import {
    Box,
    factory,
    useProps,
    useMantineTheme,
    getThemeColor,
    type BoxProps,
    type ElementProps,
    type Factory,
    type MantineColor,
    type StylesApiProps
} from '../../core'
import { useProgressContext } from './Progress.context'
import classes from './Progress.module.css'

export type ProgressSectionStylesNames = 'section'

export interface ProgressSectionProps
    extends BoxProps,
        StylesApiProps<ProgressSectionFactory>,
        ElementProps<'div'> {
    /** Section value, 0-100 */
    value: number

    /** Section color */
    color?: MantineColor

    /** If set, section has striped background */
    striped?: boolean

    /** If set, stripes are animated */
    animated?: boolean
}

export type ProgressSectionFactory = Factory<{
    props: ProgressSectionProps
    ref: HTMLDivElement
    stylesNames: ProgressSectionStylesNames
}>

function clamp(value: number) {
    return Math.min(Math.max(value, 0), 100)
}

const defaultProps = {} satisfies Partial<ProgressSectionProps>

export const ProgressSection = factory<ProgressSectionFactory>((_props, ref) => {
    const props = useProps('ProgressSection', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        value,
        color,
        striped,
        animated,
        mod,
        children,
        ...others
    } = props

    const ctx = useProgressContext()
    const theme = useMantineTheme()
    const getStyles = ctx?.getStyles

    const sectionColor = color || theme.primaryColor
    const bg = sectionColor ? getThemeColor(sectionColor, theme) : undefined

    const sectionStyle = getStyles
        ? getStyles('section', { className, classNames, style, styles })
        : { className, style }

    return (
        <Box
            ref={ref}
            {...sectionStyle}
            mod={[{ striped, animated }, mod]}
            style={{
                ...(sectionStyle as any).style,
                width: `${clamp(value)}%`,
                backgroundColor: bg
            }}
            {...others}
        >
            {children}
        </Box>
    )
})

ProgressSection.classes = classes
ProgressSection.displayName = '@react-ui/ui/ProgressSection'

export namespace ProgressSection {
    export type Props = ProgressSectionProps
    export type Factory = ProgressSectionFactory
}
