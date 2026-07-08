'use client'

import { Indicator, Avatar, Group } from '@react-ui/ui'

export default function IndicatorProcessingDemo() {
    return (
        <Group justify="center">
            <Indicator processing>
                <Avatar radius="xl" alt="avatar">
                    U
                </Avatar>
            </Indicator>
            <Indicator processing color="red" position="bottom-start">
                <Avatar radius="xl" alt="avatar">
                    U
                </Avatar>
            </Indicator>
        </Group>
    )
}
