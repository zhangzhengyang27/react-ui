'use client'

import { Table } from '@react-ui/ui'

const DATA = [
    ['姓名', '角色', '部门'],
    ['Alice', '前端工程师', '平台部'],
    ['Bob', '产品经理', '业务部'],
    ['Charlie', '设计师', '设计部'],
    ['Dave', '后端工程师', '平台部']
]

export default function TableDataDemo() {
    return <Table data={DATA} striped highlightOnHover withTableBorder withRowBorders />
}
