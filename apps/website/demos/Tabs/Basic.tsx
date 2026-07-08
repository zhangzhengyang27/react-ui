'use client'

import { Tabs } from '@react-ui/ui'

export default function TabsBasicDemo() {
    return (
        <Tabs defaultValue="gallery">
            <Tabs.List>
                <Tabs.Tab value="gallery">图库</Tabs.Tab>
                <Tabs.Tab value="messages">消息</Tabs.Tab>
                <Tabs.Tab value="settings">设置</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="gallery">图库内容</Tabs.Panel>
            <Tabs.Panel value="messages">消息内容</Tabs.Panel>
            <Tabs.Panel value="settings">设置内容</Tabs.Panel>
        </Tabs>
    )
}
