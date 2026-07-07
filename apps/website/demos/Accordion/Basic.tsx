'use client'

import { Accordion } from '@react-ui/ui'

export default function AccordionBasicDemo() {
    return (
        <Accordion defaultValue="item-1">
            <Accordion.Item value="item-1">
                <Accordion.Control>什么是 @react-ui/ui？</Accordion.Control>
                <Accordion.Panel>一个受 Mantine 启发的 React UI 组件库，用于学习与参考。</Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="item-2">
                <Accordion.Control>是否开源？</Accordion.Control>
                <Accordion.Panel>是的，采用 MIT 协议开源。</Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    )
}
