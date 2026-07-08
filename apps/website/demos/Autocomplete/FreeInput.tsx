'use client'

import { Autocomplete } from '@react-ui/ui'

export default function AutocompleteFreeInputDemo() {
    return (
        <Autocomplete
            data={['React', 'Vue', 'Angular', 'Svelte', 'Solid']}
            placeholder="输入自定义值或选择"
            clearable
            nothingFoundMessage="未找到匹配项"
        />
    )
}
