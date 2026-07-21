import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useDidUpdate, useReducedMotion } from '@react-ui/hooks'
import { useUITheme } from '../../core'

export type TransitionStatus = 'entered' | 'exited' | 'entering' | 'exiting' | 'pre-exiting' | 'pre-entering'

interface UseTransition {
    duration: number
    exitDuration: number
    timingFunction: string
    mounted: boolean
    onEnter?: () => void
    onExit?: () => void
    onEntered?: () => void
    onExited?: () => void
    enterDelay?: number
    exitDelay?: number
}

/**
 * 管理 enter/exit 过渡状态机。对齐 ui useTransition。
 * 引擎无关（纯状态 + 定时器）。
 */
export function useTransition({
    duration,
    exitDuration,
    timingFunction,
    mounted,
    onEnter,
    onExit,
    onEntered,
    onExited,
    enterDelay,
    exitDelay
}: UseTransition) {
    const theme = useUITheme()
    const shouldReduceMotion = useReducedMotion()
    const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false
    const [transitionDuration, setTransitionDuration] = useState(reduceMotion ? 0 : duration)
    const [transitionStatus, setStatus] = useState<TransitionStatus>(mounted ? 'entered' : 'exited')
    const transitionTimeoutRef = useRef<number>(-1)
    const delayTimeoutRef = useRef<number>(-1)
    const rafRef = useRef(-1)

    function clearAllTimeouts() {
        window.clearTimeout(transitionTimeoutRef.current)
        window.clearTimeout(delayTimeoutRef.current)
        cancelAnimationFrame(rafRef.current)
    }

    const handleStateChange = (shouldMount: boolean) => {
        clearAllTimeouts()
        const preHandler = shouldMount ? onEnter : onExit
        const handler = shouldMount ? onEntered : onExited
        const newTransitionDuration = reduceMotion ? 0 : shouldMount ? duration : exitDuration
        setTransitionDuration(newTransitionDuration)

        if (newTransitionDuration === 0) {
            typeof preHandler === 'function' && preHandler()
            typeof handler === 'function' && handler()
            setStatus(shouldMount ? 'entered' : 'exited')
        } else {
            rafRef.current = requestAnimationFrame(() => {
                ReactDOM.flushSync(() => {
                    setStatus(shouldMount ? 'pre-entering' : 'pre-exiting')
                })
                rafRef.current = requestAnimationFrame(() => {
                    typeof preHandler === 'function' && preHandler()
                    setStatus(shouldMount ? 'entering' : 'exiting')
                    transitionTimeoutRef.current = window.setTimeout(() => {
                        typeof handler === 'function' && handler()
                        setStatus(shouldMount ? 'entered' : 'exited')
                    }, newTransitionDuration)
                })
            })
        }
    }

    const handleTransitionWithDelay = (shouldMount: boolean) => {
        clearAllTimeouts()
        const delay = shouldMount ? enterDelay : exitDelay
        if (typeof delay !== 'number') {
            handleStateChange(shouldMount)
            return
        }
        delayTimeoutRef.current = window.setTimeout(
            () => {
                handleStateChange(shouldMount)
            },
            shouldMount ? enterDelay : exitDelay
        )
    }

    useDidUpdate(() => {
        handleTransitionWithDelay(mounted)
    }, [mounted])

    // 空闲期(entered/exited)把最新的 duration/exitDuration 同步到内部状态:
    // 此前 transitionDuration 仅在 mounted 切换时经 handleStateChange 更新,
    // 空闲时修改 duration prop 不会生效;过渡进行中(entering/exiting)不覆盖,
    // 避免样式时长与正在运行的定时器不一致
    useDidUpdate(() => {
        if (transitionStatus === 'entered') {
            setTransitionDuration(reduceMotion ? 0 : duration)
        } else if (transitionStatus === 'exited') {
            setTransitionDuration(reduceMotion ? 0 : exitDuration)
        }
    }, [duration, exitDuration, reduceMotion, transitionStatus])

    useEffect(
        () => () => {
            clearAllTimeouts()
        },
        []
    )

    return {
        transitionDuration,
        transitionStatus,
        transitionTimingFunction: timingFunction || 'ease'
    }
}
