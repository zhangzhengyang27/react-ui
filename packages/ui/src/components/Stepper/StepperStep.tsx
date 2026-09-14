import {
    Box,
    BoxProps,
    CompoundStylesApiProps,
    CssVariables,
    ElementProps,
    factory,
    Factory,
    getRadius,
    getThemeColor,
    UIColor,
    UIRadius,
    useUITheme,
    useProps
} from '../../core'
import { useStepperContext } from './Stepper.context'
import classes from './Stepper.module.css'

export type StepperStepStylesNames =
    | 'step'
    | 'stepBody'
    | 'stepText'
    | 'stepIcon'
    | 'stepLabel'
    | 'stepDescription'
    | 'stepSeparator'

export interface StepperStepProps extends BoxProps, CompoundStylesApiProps<StepperStepFactory>, ElementProps<'button'> {
    /** Step label */
    label?: React.ReactNode

    /** Step description */
    description?: React.ReactNode

    /** Icon displayed inside the step icon, overrides the step number */
    icon?: React.ReactNode

    /** Icon displayed inside completed steps, overrides icon and root completedIcon */
    completedIcon?: React.ReactNode

    /** Determines whether this step can be selected by click, overrides allowSelectStep */
    allowStepSelect?: boolean

    /** 主题颜色的键或任意有效的 CSS 颜色, overrides Stepper color */
    color?: UIColor

    /** 主题圆角的键或任意有效的 CSS 值, overrides Stepper radius */
    radius?: UIRadius

    /** Step content */
    children?: React.ReactNode
}

export type StepperStepFactory = Factory<{
    props: StepperStepProps
    ref: HTMLButtonElement
    stylesNames: StepperStepStylesNames
    compound: true
}>

interface StepperStepInternalProps extends StepperStepProps {
    index?: number
    totalItems?: number
    active?: boolean
    completed?: boolean
}

export const StepperStep = factory<StepperStepFactory>((props, ref) => {
    const {
        classNames,
        className,
        style,
        styles,
        label,
        description,
        icon,
        completedIcon,
        allowStepSelect,
        color,
        radius,
        children,
        mod,
        index,
        totalItems,
        active,
        completed,
        ...others
    } = useProps('StepperStep', null, props as StepperStepInternalProps)

    const ctx = useStepperContext()
    const theme = useUITheme()
    const getStyles = ctx.getStyles

    const isActive = !!active
    const isCompleted = !!completed
    const isLast = index === (totalItems ?? 0) - 1
    const isSelectable = allowStepSelect ?? ctx.allowSelectStep

    const stepColor = color || ctx.color
    const stepRadius = radius !== undefined ? radius : ctx.radius

    const stepVars: CssVariables = {}

    if (stepColor) {
        stepVars['--stepper-step-color'] = getThemeColor(stepColor, theme)
    }

    if (stepRadius !== undefined) {
        stepVars['--stepper-step-radius'] = getRadius(stepRadius)
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        others.onClick?.(event)
        if (isSelectable && typeof index === 'number') {
            ctx.onStepClick?.(index)
        }
    }

    const renderIcon = () => {
        if (isCompleted && (completedIcon ?? ctx.completedIcon)) {
            return completedIcon ?? ctx.completedIcon
        }

        if (icon ?? ctx.icon) {
            return icon ?? ctx.icon
        }

        return (index ?? 0) + 1
    }

    return (
        <Box
            component="button"
            type="button"
            ref={ref}
            {...getStyles('step', { className, style, classNames, styles })}
            __vars={stepVars}
            mod={[
                {
                    active: isActive,
                    completed: isCompleted,
                    selectable: isSelectable,
                    last: isLast,
                    orientation: ctx.orientation
                },
                mod
            ]}
            {...others}
            onClick={handleClick}
            disabled={!isSelectable}
        >
            <div {...getStyles('stepBody', { classNames, styles })}>
                <div {...getStyles('stepIcon', { classNames, styles })}>{renderIcon()}</div>

                <div {...getStyles('stepText', { classNames, styles })}>
                    {label && <div {...getStyles('stepLabel', { classNames, styles })}>{label}</div>}
                    {description && <div {...getStyles('stepDescription', { classNames, styles })}>{description}</div>}
                </div>
            </div>

            {!isLast && <div {...getStyles('stepSeparator', { classNames, styles })} aria-hidden />}
        </Box>
    )
})

StepperStep.classes = classes
StepperStep.displayName = '@xiaoye-react/ui/StepperStep'

export namespace StepperStep {
    export type Props = StepperStepProps
    export type StylesNames = StepperStepStylesNames
    export type Factory = StepperStepFactory
}
