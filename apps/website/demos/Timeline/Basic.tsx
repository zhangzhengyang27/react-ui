'use client'

import { Timeline, Text } from '@react-ui/ui'

export default function TimelineBasicDemo() {
    return (
        <Timeline>
            <Timeline.Item title="订单已提交">
                <Text size="sm">2024-01-01 10:00</Text>
            </Timeline.Item>
            <Timeline.Item title="商家已接单">
                <Text size="sm">2024-01-01 10:30</Text>
            </Timeline.Item>
            <Timeline.Item title="配送中">
                <Text size="sm">2024-01-01 11:00</Text>
            </Timeline.Item>
            <Timeline.Item title="已签收">
                <Text size="sm">2024-01-01 12:00</Text>
            </Timeline.Item>
        </Timeline>
    )
}
