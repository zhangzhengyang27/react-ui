import { useEffect, useState } from 'react'
import { useId } from '@react-ui/hooks'
import type { TransitionOverride } from '../Transition'

interface UseModalInput {
    opened: boolean
    onClose: () => void
    id: string | undefined
    transitionProps: TransitionOverride | undefined
    trapFocus: boolean | undefined
    closeOnEscape: boolean | undefined
    returnFocus: boolean | undefined
}

export function useModal({ id, transitionProps, opened, closeOnEscape, onClose }: UseModalInput) {
    const _id = useId(id)
    const [titleMounted, setTitleMounted] = useState(false)
    const [bodyMounted, setBodyMounted] = useState(false)

    const transitionDuration = typeof transitionProps?.duration === 'number' ? transitionProps.duration : 200

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && closeOnEscape && !event.isComposing && opened) {
                const shouldTrigger =
                    (event.target as HTMLElement)?.getAttribute('data-ui-stop-propagation') !== 'true'
                if (shouldTrigger) {
                    onClose()
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown, true)
        return () => window.removeEventListener('keydown', handleKeyDown, true)
    }, [closeOnEscape, opened, onClose])

    return {
        _id,
        titleMounted,
        bodyMounted,
        transitionDuration,
        setTitleMounted,
        setBodyMounted
    }
}
