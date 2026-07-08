'use client'

import { Indicator, Avatar } from '@react-ui/ui'

export default function IndicatorBasicDemo() {
    return (
        <Indicator inline label="New" size={16} offset={-2}>
            <Avatar src="" radius="xl" alt="avatar">
                U
            </Avatar>
        </Indicator>
    )
}
