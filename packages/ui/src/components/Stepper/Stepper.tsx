import { Children, cloneElement } from 'react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getRadius,
    getSize,
    getThemeColor,
    isElement,
    MantineColor,
    MantineRadius,
    MantineSize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { StepperProvider } from './Stepper.context'
import { StepperStep } from './StepperStep'
import classes from './Stepper.module.css'

export type StepperStylesNames =
    | 'root'
    | 'step'
    | 'stepBody'
    | 'stepText'
    | 'stepIcon'
    | 'stepLabel'
    | 'stepDescription'
    | 'stepSeparator'

export type StepperCssVariables = {
    root: '--stepper-color' | '--stepper-radius' | '--stepper-icon-size' | '--stepper-separator-color'
}

export interface StepperProps extends BoxProps, StylesApiProps<StepperFactory>, ElementProps<'div'> {
    /** Index of the current active step @default 0 */
    active?: number

    /** Orientation of the stepper @default 'horizontal' */
    orientation?: 'horizontal' | 'vertical'

    /** Key of theme.colors or any valid CSS color @default theme.primaryColor */
    color?: MantineColor

    /** Key of theme.radius or any valid CSS value @default theme.defaultRadius */
    radius?: MantineRadius

    /** Controls icon size and font-size @default 'md' */
    size?: MantineSize

    /** Default icon displayed inside the step icon */
    icon?: React.ReactNode

    /** Icon displayed inside completed steps, overrides icon */
    completedIcon?: React.ReactNode

    /** Determines whether steps can be selected by click @default false */
    allowSelectStep?: boolean

    /** Called when a step is clicked */
    onStepClick?: (index: number) => void

    /** Stepper steps */
    children: React.ReactNode
}

export type StepperFactory = Factory<{
    props: StepperProps
    ref: HTMLDivElement
    stylesNames: StepperStylesNames
    vars: StepperCssVariables
    staticComponents: {
        Step: typeof StepperStep
    }
}>

const defaultProps = {
    active: 0,
    orientation: 'horizontal',
    size: 'md',
    allowSelectStep: false
} satisfies Partial<StepperProps>

const varsResolver = createVarsResolver<StepperFactory>((theme, { color, radius, size }) => ({
    root: {
        '--stepper-color': color ? getThemeColor(color, theme) : undefined,
        '--stepper-radius': radius === undefined ? undefined : getRadius(radius),
        '--stepper-icon-size': getSize(size, 'stepper-icon-size'),
        '--stepper-separator-color': 'var(--ui-color-gray-3)'
    }
}))

export const Stepper = factory<StepperFactory>((_props, ref) => {
    const props = useProps('Stepper', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        children,
        active,
        orientation,
        color,
        radius,
        size,
        icon,
        completedIcon,
        allowSelectStep,
        onStepClick,
        attributes,
        mod,
        ...others
    } = props

    const getStyles = useStyles<StepperFactory>({
        name: 'Stepper',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver
    })

    const items = Children.toArray(children)
    const totalItems = items.length

    const clonedChildren = Children.map(items, (child, index) => {
        if (!isElement(child)) {
            return child
        }

        return cloneElement(child, {
            key: index,
            index,
            totalItems,
            active: index === active,
            completed: index < active!
        })
    })

    return (
        <StepperProvider
            value={{
                active: active!,
                orientation: orientation!,
                size,
                color,
                radius,
                icon,
                completedIcon,
                allowSelectStep,
                onStepClick,
                getStyles
            }}
        >
            <Box
                ref={ref}
                {...getStyles('root')}
                mod={[{ orientation }, mod]}
                {...others}
                role="tablist"
                aria-orientation={orientation}
            >
                {clonedChildren}
            </Box>
        </StepperProvider>
    )
})

Stepper.classes = classes
;(Stepper as any).varsResolver = varsResolver
Stepper.displayName = '@react-ui/ui/Stepper'
Stepper.Step = StepperStep

export namespace Stepper {
    export type Props = StepperProps
    export type StylesNames = StepperStylesNames
    export type CssVariables = StepperCssVariables
    export type Factory = StepperFactory
}
