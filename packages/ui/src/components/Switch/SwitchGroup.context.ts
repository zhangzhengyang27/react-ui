import { createContext, useContext } from 'react'
import type { UISize } from '../../core'

export interface SwitchGroupContextValue {
    value: string[]
    onChange: (value: string[]) => void
    name?: string
    /** 全组禁用，作为组内 Switch 自身 disabled 的兜底 */
    disabled?: boolean
    /** 全组尺寸，作为组内 Switch 自身 size 的兜底 */
    size?: UISize
}

export const SwitchGroupContext = createContext<SwitchGroupContextValue | null>(null)

export function useSwitchGroupContext() {
    return useContext(SwitchGroupContext)
}
