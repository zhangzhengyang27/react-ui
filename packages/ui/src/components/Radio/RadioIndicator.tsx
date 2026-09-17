import {
    Box,
    createVarsResolver,
    factory,
    getThemeColor,
    getSize,
    useProps,
    useStyles,
    type BoxProps,
    type ElementProps,
    type Factory,
    type UIColor,
    type UISize,
    type StylesApiProps
} from '../../core'
import classes from './Radio.module.css'

export type RadioIndicatorStylesNames = 'indicator'

export type RadioIndicatorCssVariables = {
    indicator: '--radio-indicator-size' | '--radio-indicator-color'
}

export interface RadioIndicatorProps
    extends BoxProps,
        StylesApiProps<RadioIndicatorFactory>,
        ElementProps<'span'> {
    /** If set, indicator is in checked state */
    checked?: boolean

    /** If set, indicator is disabled */
    disabled?: boolean

    /** 主题颜色的键或任意有效的 CSS 颜色 */
    color?: UIColor

    /** Controls indicator size */
    size?: UISize | (string & {})
}

export type RadioIndicatorFactory = Factory<{
    props: RadioIndicatorProps
    ref: HTMLSpanElement
    stylesNames: RadioIndicatorStylesNames
    vars: RadioIndicatorCssVariables
}>

const defaultProps = {} satisfies Partial<RadioIndicatorProps>

const varsResolver = createVarsResolver<RadioIndicatorFactory>((theme, { size, color }) => ({
    indicator: {
        // 复用 Radio 的尺寸/主题色解析：无消费者样式时无视觉效果，但提供可用的变量钩子
        '--radio-indicator-size': size === undefined ? undefined : getSize(size, 'radio-size'),
        '--radio-indicator-color': color === undefined ? undefined : getThemeColor(color, theme)
    }
}))

export const RadioIndicator = factory<RadioIndicatorFactory>((_props, ref) => {
    const props = useProps('RadioIndicator', defaultProps, _props)
    // size/color 在此消费（映射为 CSS 变量），不再作为未知属性泄漏到 DOM span
    const { classNames, className, style, styles, unstyled, vars, checked, disabled, size, color, mod, ...others } =
        props

    const getStyles = useStyles<RadioIndicatorFactory>({
        name: 'RadioIndicator',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver,
        rootSelector: 'indicator'
    })

    return (
        <Box
            component="span"
            ref={ref}
            {...getStyles('indicator')}
            {...others}
            mod={[{ checked, disabled }, mod]}
            data-radio-indicator
        />
    )
})

RadioIndicator.classes = classes
;(RadioIndicator as any).varsResolver = varsResolver
RadioIndicator.displayName = '@xiaoye-react/ui/RadioIndicator'

export namespace RadioIndicator {
    export type Props = RadioIndicatorProps
    export type Factory = RadioIndicatorFactory
    export type StylesNames = RadioIndicatorStylesNames
    export type CssVariables = RadioIndicatorCssVariables
}
