'use client'

import { NumberInput, Stack } from '@react-ui/ui'

export default function NumberInputStepperDemo() {
    return (
        <Stack>
            <NumberInput label="带步进器" defaultValue={5} min={0} max={10} step={1} />
            <NumberInput label="隐藏步进器" defaultValue={5} min={0} max={10} step={0.5} hideControls />
        </Stack>
    )
}
