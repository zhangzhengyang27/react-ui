'use client'

import { Checkbox, Group } from '@react-ui/ui'
import { useState } from 'react'

export default function CheckboxIndeterminateDemo() {
    const [checked, setChecked] = useState(false)

    return (
        <Group>
            <Checkbox indeterminate label="半选状态" />
            <Checkbox disabled label="禁用状态" />
            <Checkbox checked={checked} onChange={e => setChecked(e.currentTarget.checked)} label="受控组件" />
        </Group>
    )
}
