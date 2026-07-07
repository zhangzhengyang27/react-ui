import React from 'react'
import { ActionIcon } from '@react-ui/ui'

const ActionIconDemo: React.FC = () => {
    return (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <ActionIcon variant="filled" color="blue">
                A
            </ActionIcon>
            <ActionIcon variant="light" color="red">
                B
            </ActionIcon>
            <ActionIcon variant="outline">C</ActionIcon>
            <ActionIcon variant="subtle" color="green">
                D
            </ActionIcon>
            <ActionIcon variant="default" loading>
                E
            </ActionIcon>
        </div>
    )
}

export default ActionIconDemo
