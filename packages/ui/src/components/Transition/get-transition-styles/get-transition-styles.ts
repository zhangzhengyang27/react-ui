import { MantineTransition, transitions } from '../transitions'

const transitionStatuses = {
    entering: 'in',
    entered: 'in',
    exiting: 'out',
    exited: 'out',
    'pre-exiting': 'out',
    'pre-entering': 'out'
} as const

/**
 * 根据过渡状态计算内联样式。对齐 mantine getTransitionStyles。
 * 引擎无关（纯内联样式，不依赖 emotion/styled-components）。
 */
export function getTransitionStyles({
    transition,
    state,
    duration,
    timingFunction
}: {
    transition: MantineTransition
    state: keyof typeof transitionStatuses
    duration: number
    timingFunction: React.CSSProperties['transitionTimingFunction']
}): React.CSSProperties {
    const shared: React.CSSProperties = {
        WebkitBackfaceVisibility: 'hidden',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: timingFunction
    }

    if (typeof transition === 'string') {
        if (!(transition in transitions)) {
            return {}
        }

        return {
            transitionProperty: transitions[transition].transitionProperty,
            ...shared,
            ...transitions[transition].common,
            ...transitions[transition][transitionStatuses[state]]
        }
    }

    return {
        transitionProperty: transition.transitionProperty,
        ...shared,
        ...transition.common,
        ...transition[transitionStatuses[state]]
    }
}
