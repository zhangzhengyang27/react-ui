'use client'

import { Timeline, Text } from '@react-ui/ui'

export default function TimelineActiveDemo() {
    return (
        <Timeline active={1} color="blue">
            <Timeline.Item title="提交申请">
                <Text size="sm">申请已提交，等待审核</Text>
            </Timeline.Item>
            <Timeline.Item title="审核中">
                <Text size="sm">工作人员正在处理</Text>
            </Timeline.Item>
            <Timeline.Item title="审核通过">
                <Text size="sm">预计 1-3 个工作日内完成</Text>
            </Timeline.Item>
        </Timeline>
    )
}
