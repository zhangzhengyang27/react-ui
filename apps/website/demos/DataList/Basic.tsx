'use client'

import { DataList } from '@react-ui/ui'

export default function BasicDemo() {
    return (
        <DataList>
            <DataList.Item>
                <DataList.ItemLabel>状态</DataList.ItemLabel>
                <DataList.ItemValue>运行中</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
                <DataList.ItemLabel>创建时间</DataList.ItemLabel>
                <DataList.ItemValue>2026-07-08 10:00</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
                <DataList.ItemLabel>负责人</DataList.ItemLabel>
                <DataList.ItemValue>小叶</DataList.ItemValue>
            </DataList.Item>
        </DataList>
    )
}
