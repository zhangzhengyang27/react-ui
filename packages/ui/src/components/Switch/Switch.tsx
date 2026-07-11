import { useId, useUncontrolled } from '@react-ui/hooks'
import { useContext } from 'react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getFontSize,
    getSize,
    getThemeColor,
    MantineColor,
    MantineSize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { SwitchGroup, type SwitchGroupProps, type SwitchGroupFactory } from './SwitchGroup'
import { SwitchGroupContext } from './SwitchGroup.context'
import classes from './Switch.module.css'

export type SwitchStylesNames = 'root' | 'input' | 'track' | 'thumb' | 'label' | 'onLabel' | 'offLabel'

export type SwitchCssVariables = {
    root:
        | '--switch-width'
        | '--switch-height'
        | '--switch-thumb-size'
        | '--switch-thumb-offset'
        | '--switch-label-font-size'
        | '--switch-color'
        | '--switch-on-label-offset'
        | '--switch-off-label-offset'
}

export interface SwitchProps extends BoxProps, ElementProps<'input', 'size'>, StylesApiProps<SwitchFactory> {
    /** Switch value, used when inside Switch.Group */
    value?: string

    /** Controls switch size @default 'sm' */
    size?: MantineSize

    /** Key of theme.colors or any valid CSS color @default theme.primaryColor */
    color?: MantineColor

    /** Controlled checked state */
    checked?: boolean

    /** Initial checked state for uncontrolled component */
    defaultChecked?: boolean

    /** Called when checked state changes */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void

    /** Label rendered next to the switch */
    label?: React.ReactNode

    /** If set, disabled styles and behavior are applied */
    disabled?: boolean

    /** Label rendered inside the track when checked */
    onLabel?: React.ReactNode

    /** Label rendered inside the track when unchecked */
    offLabel?: React.ReactNode
}

export type SwitchFactory = Factory<{
    props: SwitchProps
    ref: HTMLInputElement
    stylesNames: SwitchStylesNames
    vars: SwitchCssVariables
    static_components: {
        Group: typeof SwitchGroup
    }
}>

const defaultProps = {
    size: 'sm'
} satisfies Partial<SwitchProps>

const varsResolver = createVarsResolver<SwitchFactory>((theme, { size, color }) => ({
    root: {
        '--switch-width': getSize(size, 'switch-width'),
        '--switch-height': getSize(size, 'switch-height'),
        '--switch-thumb-size': getSize(size, 'switch-thumb-size'),
        '--switch-thumb-offset': getSize(size, 'switch-thumb-offset'),
        '--switch-label-font-size': getFontSize(size),
        '--switch-color': getThemeColor(color, theme),
        '--switch-on-label-offset': getSize(size, 'switch-on-label-offset'),
        '--switch-off-label-offset': getSize(size, 'switch-off-label-offset')
    }
}))

export const Switch = factory<SwitchFactory>((_props, ref) => {
    const props = useProps('Switch', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        attributes,
        value,
        size,
        color,
        checked,
        defaultChecked,
        onChange,
        label,
        disabled,
        onLabel,
        offLabel,
        id,
        mod,
        ...others
    } = props

    const groupCtx = useContext(SwitchGroupContext)

    const [checkedState, setCheckedState] = useUncontrolled<boolean>({
        value: checked,
        defaultValue: defaultChecked,
        finalValue: false
    })

    const isInGroup = !!groupCtx && value !== undefined
    const resolvedChecked = isInGroup
        ? groupCtx!.value.includes(value!)
        : checkedState
    const resolvedId = useId(id)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) {
            return
        }

        if (isInGroup) {
            const nextValue = event.currentTarget.checked
                ? [...groupCtx!.value, value!]
                : groupCtx!.value.filter((v) => v !== value!)
            groupCtx!.onChange(nextValue)
            return
        }

        if (checked === undefined) {
            setCheckedState(event.currentTarget.checked)
        }

        onChange?.(event)
    }

    const getStyles = useStyles<SwitchFactory>({
        name: 'Switch',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver,
        attributes,
        rootSelector: 'root'
    })

    const hasLabels = !!onLabel || !!offLabel

    return (
        <Box
            component="label"
            htmlFor={resolvedId}
            {...getStyles('root')}
            mod={[{ disabled, checked: resolvedChecked, 'with-labels': hasLabels }, mod]}
        >
            <Box
                component="input"
                ref={ref}
                id={resolvedId}
                type="checkbox"
                disabled={disabled}
                checked={resolvedChecked}
                onChange={handleChange}
                {...getStyles('input')}
                {...others}
            />

            <span {...getStyles('track')} data-checked={resolvedChecked || undefined}>
                {onLabel && <span {...getStyles('onLabel')}>{onLabel}</span>}
                {offLabel && <span {...getStyles('offLabel')}>{offLabel}</span>}
                <span {...getStyles('thumb')} />
            </span>

            {label && <span {...getStyles('label')}>{label}</span>}
        </Box>
    )
})

Switch.classes = classes
;(Switch as any).varsResolver = varsResolver
Switch.displayName = '@react-ui/ui/Switch'
Switch.Group = SwitchGroup

export namespace Switch {
    export type Props = SwitchProps
    export type StylesNames = SwitchStylesNames
    export type CssVariables = SwitchCssVariables
    export type Factory = SwitchFactory

    export namespace Group {
        export type Props = SwitchGroupProps
        export type Factory = SwitchGroupFactory
    }
}
