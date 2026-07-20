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
    UIColor,
    UIRadius,
    UISize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { StepperProvider } from './Stepper.context'
import { StepperCompleted, type StepperCompletedProps } from './StepperCompleted'
import { StepperStep, type StepperStepProps } from './StepperStep'
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
    /** 当前活动步骤的索引 @default 0 */
    active?: number

    /** 步骤条的方向 @default 'horizontal' */
    orientation?: 'horizontal' | 'vertical'

    /** 主题颜色的键或任意有效的 CSS 颜色 @default theme.primaryColor */
    color?: UIColor

    /** 主题圆角的键或任意有效的 CSS 值 @default theme.defaultRadius */
    radius?: UIRadius

    /** 控制图标大小和字号 @default 'md' */
    size?: UISize

    /** 步骤图标内显示的默认图标 */
    icon?: React.ReactNode

    /** Icon displayed inside completed steps, overrides icon */
    completedIcon?: React.ReactNode

    /** 决定步骤是否可以通过点击选择 @default false */
    allowSelectStep?: boolean

    /** 点击步骤时调用 */
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
        Completed: typeof StepperCompleted
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

    const convertedChildren = Children.toArray(children) as React.ReactElement[]
    const stepChildren = convertedChildren.filter(
        (child) => child.type !== StepperCompleted
    ) as React.ReactElement<StepperStepProps>[]
    const completedStep = convertedChildren.find(
        (item) => item.type === StepperCompleted
    ) as React.ReactElement<StepperCompletedProps> | undefined

    const items = stepChildren
    const totalItems = items.length

    const clonedChildren = items.map((child, index) => {
        if (!isElement(child)) {
            return child
        }

        return cloneElement(child, {
            key: index,
            index,
            totalItems,
            active: index === active,
            completed: index < active!
        } as Partial<StepperStepProps> & { key?: React.Key })
    })

    const stepContent = stepChildren[active!]?.props?.children
    const completedContent = completedStep?.props?.children
    const content = active! > totalItems - 1 ? completedContent : stepContent

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
                {content && <div {...getStyles('stepBody')}>{content}</div>}
            </Box>
        </StepperProvider>
    )
})

Stepper.classes = classes
;(Stepper as any).varsResolver = varsResolver
Stepper.displayName = '@react-ui/ui/Stepper'
Stepper.Step = StepperStep
Stepper.Completed = StepperCompleted

export namespace Stepper {
    export type Props = StepperProps
    export type StylesNames = StepperStylesNames
    export type CssVariables = StepperCssVariables
    export type Factory = StepperFactory
    export type Step = StepperStepProps

    export namespace Completed {
        export type Props = StepperCompletedProps
    }
}
