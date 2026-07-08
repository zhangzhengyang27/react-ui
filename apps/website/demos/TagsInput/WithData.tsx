'use client'

import { TagsInput } from '@react-ui/ui'

export default function TagsInputWithDataDemo() {
    return (
        <TagsInput
            data={['React', 'Vue', 'Angular', 'Svelte', 'Solid']}
            placeholder="输入或选择标签"
            maxTags={5}
            clearable
        />
    )
}
