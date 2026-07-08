'use client'

import { Select } from '@react-ui/ui'

export default function SelectSearchableDemo() {
    return (
        <Select
            data={['React', 'Vue', 'Angular', 'Svelte', 'Solid']}
            searchable
            clearable
            placeholder="搜索框架"
            nothingFoundMessage="未找到匹配项"
        />
    )
}
