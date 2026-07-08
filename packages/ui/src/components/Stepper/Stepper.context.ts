import { createSafeContext, GetStylesApi, MantineColor, MantineRadius, MantineSize } from '../../core'
import type { StepperFactory } from './Stepper'

export interface StepperContextValue {
    active: number
    orientation: 'horizontal' | 'vertical'
    size: MantineSize | undefined
    color: MantineColor | undefined
    radius: MantineRadius | undefined
    icon: React.ReactNode
    completedIcon: React.ReactNode
    allowSelectStep: boolean | undefined
    onStepClick: ((index: number) => void) | undefined
    getStyles: GetStylesApi<StepperFactory>
}

export const [StepperProvider, useStepperContext] = createSafeContext<StepperContextValue>(
    'Stepper component was not found in the tree'
)
