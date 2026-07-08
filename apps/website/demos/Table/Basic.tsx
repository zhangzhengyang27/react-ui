'use client'

import { Table } from '@react-ui/ui'

export default function TableBasicDemo() {
    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>项目</Table.Th>
                    <Table.Th>价格</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                <Table.Tr>
                    <Table.Td>苹果</Table.Td>
                    <Table.Td>¥5</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>香蕉</Table.Td>
                    <Table.Td>¥3</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>橙子</Table.Td>
                    <Table.Td>¥4</Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    )
}
