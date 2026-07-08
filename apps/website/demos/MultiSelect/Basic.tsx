'use client'

import { MultiSelect } from '@react-ui/ui'

export default function MultiSelectBasicDemo() {
    return <MultiSelect data={['React', 'Vue', 'Angular', 'Svelte']} placeholder="选择框架" defaultValue={['React']} />
}
