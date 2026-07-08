import React from 'react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    factory,
    Factory,
    getRadius,
    getSize,
    MantineColor,
    MantineRadius,
    MantineSize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './Chip.module.css'

export type ChipStylesNames = 'root' | 'checkIcon' | 'label'

export type ChipCssVariables = {
    root: '--chip-size' | '--chip-radius' | '--chip-color'
}

export interface ChipProps extends BoxProps, StylesApiProps<ChipFactory> {
    /** Chip label */
    children?: React.ReactNode

    /** If true, the chip is checked */
    checked?: boolean

    /** Default checked state for uncontrolled chip */
    defaultChecked?: boolean

    /** Called when checked state changes */
    onChange?: (checked: boolean) => void

    /** Key of theme.colors or any valid CSS color */
    color?: MantineColor

    /** Controls chip size */
    size?: MantineSize

    /** Controls chip border-radius */
    radius?: MantineRadius

    /** Chip variant @default filled */
    variant?: 'filled' | 'light' | 'outline'

    /** If true, the chip is disabled @default false */
    disabled?: boolean
}

export type ChipFactory = Factory<{
    props: ChipProps
    ref: HTMLButtonElement
    stylesNames: ChipStylesNames
    vars: ChipCssVariables
}>

const defaultProps = {
    variant: 'filled',
    disabled: false
} satisfies Partial<ChipProps>

const varsResolver = createVarsResolver<ChipFactory>((_, { size, radius, color }) => ({
    root: {
        '--chip-size': getSize(size, 'chip-size'),
        '--chip-radius': radius === undefined ? undefined : getRadius(radius),
        '--chip-color': color === undefined ? undefined : `var(--ui-color-${color}-filled)`
    }
}))

export const Chip = factory<ChipFactory>((_props, ref) => {
    const props = useProps('Chip', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        children,
        checked,
        defaultChecked,
        onChange,
        color,
        size,
        radius,
        variant,
        disabled,
        mod,
        ...others
    } = props

    const getStyles = useStyles<ChipFactory>({
        name: 'Chip',
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

    const isControlled = checked !== undefined
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false)
    const isChecked = isControlled ? checked : internalChecked

    // 使用 ref 跟踪最新状态，避免在连续快速点击（测试环境）时读到过期闭包值
    const isCheckedRef = React.useRef(isChecked)
    isCheckedRef.current = isChecked

    const handleClick = () => {
        if (disabled) return
        const next = !isCheckedRef.current
        if (!isControlled) {
            setInternalChecked(next)
        }
        onChange?.(next)
    }

    return (
        <Box
            component="button"
            ref={ref}
            type="button"
            {...getStyles('root')}
            mod={[{ checked: isChecked, variant }, mod]}
            disabled={disabled}
            onClick={handleClick}
            aria-pressed={isChecked}
            {...others}
        >
            <span {...getStyles('checkIcon')}>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    style={{ display: 'block', width: '100%', height: '100%' }}
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </span>
            <span {...getStyles('label')}>{children}</span>
        </Box>
    )
})

Chip.classes = classes
;(Chip as any).varsResolver = varsResolver
Chip.displayName = '@react-ui/ui/Chip'

export namespace Chip {
    export type Props = ChipProps
    export type Factory = ChipFactory
    export type StylesNames = ChipStylesNames
    export type CssVariables = ChipCssVariables
}
