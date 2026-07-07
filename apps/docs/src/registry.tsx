import React from 'react'
import ButtonDemo from './demos/Button'
import UnstyledButtonDemo from './demos/UnstyledButton'
import AccordionDemo from './demos/Accordion'
import LoaderDemo from './demos/Loader'
import TransitionDemo from './demos/Transition'
import CollapseDemo from './demos/Collapse'
import ActionIconDemo from './demos/ActionIcon'
import TextDemo from './demos/Text'
import TitleDemo from './demos/Title'
import AnchorDemo from './demos/Anchor'
import StackDemo from './demos/Stack'
import GroupDemo from './demos/Group'
import ContainerDemo from './demos/Container'
import ScrollAreaDemo from './demos/ScrollArea'

export interface DemoItem {
    title: string
    component: React.ComponentType
}

export interface ComponentEntry {
    name: string
    demos: DemoItem[]
}

// 每移植一个组件，在此追加一条记录并新建 src/demos/<Name>.tsx 即可在文档站展示。
export const registry: ComponentEntry[] = [
    { name: 'Button', demos: [{ title: '示例', component: ButtonDemo }] },
    { name: 'UnstyledButton', demos: [{ title: '示例', component: UnstyledButtonDemo }] },
    { name: 'Accordion', demos: [{ title: '示例', component: AccordionDemo }] },
    { name: 'Loader', demos: [{ title: '示例', component: LoaderDemo }] },
    { name: 'Transition', demos: [{ title: '示例', component: TransitionDemo }] },
    { name: 'Collapse', demos: [{ title: '示例', component: CollapseDemo }] },
    { name: 'ActionIcon', demos: [{ title: '示例', component: ActionIconDemo }] },
    { name: 'Text', demos: [{ title: '示例', component: TextDemo }] },
    { name: 'Title', demos: [{ title: '示例', component: TitleDemo }] },
    { name: 'Anchor', demos: [{ title: '示例', component: AnchorDemo }] },
    { name: 'Stack', demos: [{ title: '示例', component: StackDemo }] },
    { name: 'Group', demos: [{ title: '示例', component: GroupDemo }] },
    { name: 'Container', demos: [{ title: '示例', component: ContainerDemo }] },
    { name: 'ScrollArea', demos: [{ title: '示例', component: ScrollAreaDemo }] }
]
