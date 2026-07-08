'use client'

import { MultiSelect } from '@react-ui/ui'

export default function MultiSelectLimitDemo() {
    return (
        <MultiSelect
            data={['React', 'Vue', 'Angular', 'Svelte', 'Solid']}
            placeholder="最多选择 2 项"
            maxSelectedValues={2}
            searchable
            clearable
        />
    )
}
