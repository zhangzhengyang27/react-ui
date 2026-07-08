'use client'

import { Autocomplete } from '@react-ui/ui'

export default function AutocompleteBasicDemo() {
    return <Autocomplete data={['React', 'Vue', 'Angular', 'Svelte', 'Solid']} placeholder="输入或选择框架" />
}
