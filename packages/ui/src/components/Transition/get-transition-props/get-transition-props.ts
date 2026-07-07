import type { SetRequired } from 'type-fest'
import type { TransitionOverride } from '../Transition'

type MinimalTransitionOverride = SetRequired<TransitionOverride, 'duration' | 'transition'>

const defaultTransition: MinimalTransitionOverride = {
    duration: 100,
    transition: 'fade'
}

/**
 * 合并组件级 transition 默认值与传入的 transition props。
 * 对齐 mantine getTransitionProps。
 */
export function getTransitionProps(
    transitionProps: TransitionOverride | undefined,
    componentTransition: TransitionOverride | undefined
): MinimalTransitionOverride {
    return { ...defaultTransition, ...componentTransition, ...transitionProps }
}
