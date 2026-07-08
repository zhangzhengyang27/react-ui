import { createSafeContext } from '../../core'
import type { ColorPickerFactory } from './ColorPicker'
import type { GetStylesApi } from '../../core/styles-api'

interface ColorPickerContextValue {
    getStyles: GetStylesApi<ColorPickerFactory>
    unstyled: boolean | undefined
}

export const [ColorPickerContextProvider, useColorPickerContext] = createSafeContext<ColorPickerContextValue>(
    'ColorPicker component was not found in the tree'
)
