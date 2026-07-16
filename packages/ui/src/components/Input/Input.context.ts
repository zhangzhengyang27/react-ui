import { createContext } from 'react'
import { UISize } from '../../core'

interface InputContextValue {
    size: UISize | (string & {})
}

export const InputContext = createContext<InputContextValue>({ size: 'sm' })
