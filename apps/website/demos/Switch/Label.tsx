'use client'

import { Group, Switch } from '@react-ui/ui'

export default function SwitchLabelDemo() {
    return (
        <Group>
            <Switch label="默认" defaultChecked />
            <Switch label="蓝色" color="blue" defaultChecked />
            <Switch label="红色" color="red" defaultChecked />
        </Group>
    )
}
