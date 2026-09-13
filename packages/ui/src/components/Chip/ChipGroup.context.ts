import { createContext, useContext } from 'react'
import type { UISize } from '../../core'

export interface ChipGroupContextValue {
    isChipSelected: (value: string) => boolean
    onChange: (value: string) => void
    multiple: boolean | undefined
    /** 全组禁用，作为组内 Chip 自身 disabled 的兜底 */
    disabled?: boolean
    /** 全组尺寸，作为组内 Chip 自身 size 的兜底 */
    size?: UISize
}

export const ChipGroupContext = createContext<ChipGroupContextValue | null>(null)

export function useChipGroupContext() {
    return useContext(ChipGroupContext)
}
