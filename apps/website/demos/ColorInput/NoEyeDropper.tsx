'use client'

import { ColorInput } from '@react-ui/ui'

export default function ColorInputNoEyeDropperDemo() {
    return <ColorInput label="无取色器" defaultValue="#40c057" withEyeDropper={false} />
}
