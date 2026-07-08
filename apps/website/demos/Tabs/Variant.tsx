'use client'

import { Tabs } from '@react-ui/ui'

export default function TabsVariantDemo() {
    return (
        <Tabs defaultValue="first" variant="pills" color="blue">
            <Tabs.List>
                <Tabs.Tab value="first">Pills 1</Tabs.Tab>
                <Tabs.Tab value="second">Pills 2</Tabs.Tab>
                <Tabs.Tab value="third">Pills 3</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="first">第一个面板</Tabs.Panel>
            <Tabs.Panel value="second">第二个面板</Tabs.Panel>
            <Tabs.Panel value="third">第三个面板</Tabs.Panel>
        </Tabs>
    )
}
