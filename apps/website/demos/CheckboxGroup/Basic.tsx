'use client'

import { Checkbox } from '@react-ui/ui'

export default function CheckboxGroupBasicDemo() {
    return (
        <Checkbox.Group label="选择框架" defaultValue={['react']}>
            <Checkbox value="react" label="React" />
            <Checkbox value="vue" label="Vue" />
            <Checkbox value="angular" label="Angular" />
        </Checkbox.Group>
    )
}
