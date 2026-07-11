import { createContext, useContext } from 'react'
import type { ColorPickerFactory } from './ColorPicker'
import type { GetStylesApi } from '../../core/styles-api'

interface ColorPickerContextValue {
    getStyles: GetStylesApi<ColorPickerFactory>
    unstyled: boolean | undefined
}

const ColorPickerContext = createContext<ColorPickerContextValue | null>(null)

export const ColorPickerContextProvider = ColorPickerContext.Provider

export function useColorPickerContext() {
    const ctx = useContext(ColorPickerContext)
    if (ctx === null) {
        throw new Error('ColorPicker component was not found in the tree')
    }
    return ctx
}

export function useColorPickerContextOptional() {
    return useContext(ColorPickerContext)
}

export { ColorPickerContext }
