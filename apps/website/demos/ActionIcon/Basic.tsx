'use client'

import { ActionIcon } from '@react-ui/ui'
import { Settings } from 'lucide-react'

export default function ActionIconBasicDemo() {
    return (
        <ActionIcon variant="filled" color="blue" size="lg">
            <Settings size={20} />
        </ActionIcon>
    )
}
