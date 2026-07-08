'use client'

import { Radio, Group } from '@react-ui/ui'
import { useState } from 'react'

export default function RadioGroupDemo() {
    const [value, setValue] = useState('react')

    return (
        <Group>
            <Radio
                name="framework"
                value="react"
                checked={value === 'react'}
                onChange={e => e.currentTarget.checked && setValue('react')}
                label="React"
            />
            <Radio
                name="framework"
                value="vue"
                checked={value === 'vue'}
                onChange={e => e.currentTarget.checked && setValue('vue')}
                label="Vue"
            />
            <Radio
                name="framework"
                value="svelte"
                checked={value === 'svelte'}
                onChange={e => e.currentTarget.checked && setValue('svelte')}
                label="Svelte"
            />
        </Group>
    )
}
