'use client'

import { Radio } from '@react-ui/ui'

export default function RadioGroupBasicDemo() {
    return (
        <Radio.Group label="选择框架" defaultValue="react">
            <Radio value="react" label="React" />
            <Radio value="vue" label="Vue" />
            <Radio value="angular" label="Angular" />
        </Radio.Group>
    )
}
