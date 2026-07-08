'use client'

import { Slider } from '@react-ui/ui'

export default function SliderBasicDemo() {
    return <Slider defaultValue={40} label={v => `${v}%`} labelAlwaysOn />
}
