'use client'

import { ColorInput } from '@react-ui/ui'

const SWATCHES = ['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5']

export default function ColorInputSwatchesDemo() {
    return <ColorInput label="带预设色板" defaultValue="#228be6" swatches={SWATCHES} />
}
