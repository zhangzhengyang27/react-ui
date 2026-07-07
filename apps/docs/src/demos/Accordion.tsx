import React from 'react'
import { Accordion } from '@react-ui/ui'

const AccordionDemo: React.FC = () => {
    return (
        <Accordion defaultValue="item-1">
            <Accordion.Item value="item-1">
                <Accordion.Control>第一项</Accordion.Control>
                <Accordion.Panel>第一项的内容区域，展开/收起带高度过渡动画。</Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="item-2">
                <Accordion.Control>第二项</Accordion.Control>
                <Accordion.Panel>第二项的内容区域。</Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="item-3">
                <Accordion.Control>第三项</Accordion.Control>
                <Accordion.Panel>第三项的内容区域。</Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    )
}

export default AccordionDemo
