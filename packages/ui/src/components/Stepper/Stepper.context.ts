import { createSafeContext, GetStylesApi, UIColor, UIRadius, UISize } from '../../core'
import type { StepperFactory } from './Stepper'

export interface StepperContextValue {
    active: number
    orientation: 'horizontal' | 'vertical'
    size: UISize | undefined
    color: UIColor | undefined
    radius: UIRadius | undefined
    icon: React.ReactNode
    completedIcon: React.ReactNode
    allowSelectStep: boolean | undefined
    onStepClick: ((index: number) => void) | undefined
    getStyles: GetStylesApi<StepperFactory>
}

export const [StepperProvider, useStepperContext] = createSafeContext<StepperContextValue>(
    'Stepper component was not found in the tree'
)
