import React from 'react'
import { Group, Button } from '@react-ui/ui'

const GroupDemo: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Group gap="md">
                <Button>A</Button>
                <Button variant="light">B</Button>
                <Button variant="outline">C</Button>
            </Group>
            <Group gap="lg" grow>
                <Button>grow 1</Button>
                <Button>grow 2</Button>
                <Button>grow 3</Button>
            </Group>
        </div>
    )
}

export default GroupDemo
