import { useId, useUncontrolled } from '@xiaoye-react/hooks'
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
    UIColor,
    UISize,
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
    /** Switch 的值，在 Switch.Group 内部时使用 */
    value?: string

    /** 控制 Switch 的大小 @default 'sm' */
    size?: UISize

    /** 主题颜色的键或任意有效的 CSS 颜色 @default theme.primaryColor */
    color?: UIColor

    /** 受控的选中状态 */
    checked?: boolean

    /** 非受控组件的初始选中状态 */
    defaultChecked?: boolean

    /** 选中状态变化时调用 */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void

    /** Switch 旁边渲染的标签 */
    label?: React.ReactNode

    /** 如果设置，则应用禁用样式和行为 */
    disabled?: boolean

    /** 选中时在轨道内渲染的标签 */
    onLabel?: React.ReactNode

    /** 未选中时在轨道内渲染的标签 */
    offLabel?: React.ReactNode
}

export type SwitchFactory = Factory<{
    props: SwitchProps
    ref: HTMLInputElement
    stylesNames: SwitchStylesNames
    vars: SwitchCssVariables
    staticComponents: {
        Group: typeof SwitchGroup
    }
}>

const defaultProps = {} satisfies Partial<SwitchProps>

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
    // group 的 size/disabled 作为兜底（自身 prop 优先）；size 默认值 'sm' 在此解析
    const resolvedSize = size ?? groupCtx?.size ?? 'sm'
    const resolvedDisabled = disabled ?? groupCtx?.disabled

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
        if (resolvedDisabled) {
            return
        }

        if (isInGroup) {
            const nextValue = event.currentTarget.checked
                ? [...groupCtx!.value, value!]
                : groupCtx!.value.filter((v) => v !== value!)
            groupCtx!.onChange(nextValue)
            // 组路径同样通知自身 onChange（对齐 Checkbox，此前提前 return 丢事件）
            onChange?.(event)
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
        props: { ...props, size: resolvedSize },
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
            mod={[{ disabled: resolvedDisabled, checked: resolvedChecked, 'with-labels': hasLabels }, mod]}
        >
            <Box
                component="input"
                ref={ref}
                id={resolvedId}
                type="checkbox"
                disabled={resolvedDisabled}
                checked={resolvedChecked}
                name={groupCtx?.name}
                value={value}
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
Switch.displayName = '@xiaoye-react/ui/Switch'
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
