import { createContext } from 'react'
import { UISize } from '../../core'
import { InputVariant } from '../Input'

export interface PillsInputContextValue {
    fieldRef: React.RefObject<HTMLInputElement | null>
    size: UISize | (string & {})
    disabled: boolean | undefined
    hasError: boolean | undefined
    variant: InputVariant | (string & {}) | undefined
}

export const PillsInputContext = createContext<PillsInputContextValue | null>(null)
