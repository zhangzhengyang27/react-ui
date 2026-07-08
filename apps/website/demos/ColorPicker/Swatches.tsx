'use client'

import { ColorPicker } from '@react-ui/ui'

const SWATCHES = ['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5']

export default function ColorPickerSwatchesDemo() {
    return <ColorPicker format="hex" swatches={SWATCHES} swatchesPerRow={7} />
}
