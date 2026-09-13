import { createContext, useContext } from 'react'
import type { UISize } from '../../core'

export interface RadioGroupContextValue {
    value: string
    onChange: (value: string) => void
    name?: string
    /** 全组禁用，作为组内 Radio 自身 disabled 的兜底 */
    disabled?: boolean
    /** 全组尺寸，作为组内 Radio 自身 size 的兜底 */
    size?: UISize
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export function useRadioGroupContext() {
    return useContext(RadioGroupContext)
}
