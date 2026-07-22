import React from 'react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    factory,
    Factory,
    getRadius,
    getSize,
    UIColor,
    UIRadius,
    UISize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './SegmentedControl.module.css'

export type SegmentedControlStylesNames = 'root' | 'control' | 'controlActive' | 'input' | 'label'

export type SegmentedControlCssVariables = {
    root: '--sc-radius' | '--sc-size' | '--sc-color' | '--sc-transition-duration'
}

export interface SegmentedControlItem {
    value: string
    label: React.ReactNode
    disabled?: boolean
}

export interface SegmentedControlProps extends BoxProps, StylesApiProps<SegmentedControlFactory> {
    /** Current selected value */
    value?: string

    /** Default value for uncontrolled component */
    defaultValue?: string

    //** 值变化时调用 */
    onChange?: (value: string) => void

    /** Data used to render controls */
    data: (string | SegmentedControlItem)[]

    /** 主题颜色的键或任意有效的 CSS 颜色 */
    color?: UIColor

    /** Controls control height @default sm */
    size?: UISize

    /** Controls border-radius */
    radius?: UIRadius

    /** If true, the control takes full width @default false */
    fullWidth?: boolean

    /** If true, orientation is vertical @default false */
    orientation?: 'horizontal' | 'vertical'

    /** Name used for radio inputs */
    name?: string

    /** If true, the whole component is disabled @default false */
    disabled?: boolean

    /** Controls transition duration in ms @default 200 */
    transitionDuration?: number
}

export type SegmentedControlFactory = Factory<{
    props: SegmentedControlProps
    ref: HTMLDivElement
    stylesNames: SegmentedControlStylesNames
    vars: SegmentedControlCssVariables
}>

const defaultProps = {
    size: 'sm',
    fullWidth: false,
    orientation: 'horizontal',
    disabled: false
} satisfies Partial<SegmentedControlProps>

const varsResolver = createVarsResolver<SegmentedControlFactory>((_, { radius, size, color, transitionDuration }) => ({
    root: {
        '--sc-radius': radius === undefined ? undefined : getRadius(radius),
        '--sc-size': getSize(size, 'sc-size'),
        '--sc-color': color === undefined ? undefined : `var(--ui-color-${color}-filled)`,
        '--sc-transition-duration': transitionDuration === undefined ? undefined : `${transitionDuration}ms`
    }
}))

function normalizeData(data: (string | SegmentedControlItem)[]): SegmentedControlItem[] {
    return data.map(item => (typeof item === 'string' ? { value: item, label: item } : item))
}

export const SegmentedControl = factory<SegmentedControlFactory>((_props, ref) => {
    const props = useProps('SegmentedControl', defaultProps, _props)
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
        data,
        color,
        size,
        radius,
        fullWidth,
        orientation,
        name,
        disabled,
        transitionDuration,
        mod,
        ...others
    } = props

    const getStyles = useStyles<SegmentedControlFactory>({
        name: 'SegmentedControl',
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

    const normalizedData = normalizeData(data)
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? normalizedData[0]?.value)
    const currentValue = isControlled ? value : internalValue

    const handleChange = (nextValue: string) => {
        if (!isControlled) {
            setInternalValue(nextValue)
        }
        onChange?.(nextValue)
    }

    return (
        <Box
            ref={ref}
            {...getStyles('root')}
            mod={[{ 'full-width': fullWidth, vertical: orientation === 'vertical' }, mod]}
            role="radiogroup"
            {...others}
        >
            {normalizedData.map(item => {
                const active = currentValue === item.value
                const itemDisabled = disabled || item.disabled

                return (
                    <Box
                        key={item.value}
                        component="label"
                        {...getStyles('control')}
                        mod={[{ active }, mod]}
                        data-disabled={itemDisabled || undefined}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={item.value}
                            checked={active}
                            disabled={itemDisabled}
                            onChange={() => handleChange(item.value)}
                            className={classes.input}
                        />
                        <span {...getStyles('label')}>{item.label}</span>
                    </Box>
                )
            })}
        </Box>
    )
})

SegmentedControl.classes = classes
;(SegmentedControl as any).varsResolver = varsResolver
SegmentedControl.displayName = '@xiaoye-react/ui/SegmentedControl'

export namespace SegmentedControl {
    export type Props = SegmentedControlProps
    export type Factory = SegmentedControlFactory
    export type StylesNames = SegmentedControlStylesNames
    export type CssVariables = SegmentedControlCssVariables
}
