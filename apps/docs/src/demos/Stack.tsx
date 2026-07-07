import React from 'react'
import { Stack, Button } from '@react-ui/ui'

const StackDemo: React.FC = () => {
    return (
        <Stack gap="md" align="stretch">
            <Button>第一项</Button>
            <Button variant="light">第二项</Button>
            <Button variant="outline">第三项</Button>
        </Stack>
    )
}

export default StackDemo
