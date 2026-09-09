import type { CascaderNode } from '@xiaoye-react/ui'

export const regionOptions: CascaderNode[] = [
    {
        value: 'zhejiang',
        label: '浙江',
        children: [
            { value: 'hangzhou', label: '杭州', children: [{ value: 'xihu', label: '西湖区' }] },
            { value: 'ningbo', label: '宁波', children: [{ value: 'beilun', label: '北仑区' }] },
            { value: 'wenzhou', label: '温州' }
        ]
    },
    {
        value: 'jiangsu',
        label: '江苏',
        children: [
            { value: 'nanjing', label: '南京', children: [{ value: 'xuanwu', label: '玄武区' }] },
            { value: 'suzhou', label: '苏州' }
        ]
    },
    {
        value: 'guangdong',
        label: '广东',
        children: [
            { value: 'guangzhou', label: '广州' },
            { value: 'shenzhen', label: '深圳' }
        ]
    }
]

export const asyncOrgData: CascaderNode[] = [
    { value: 'rd', label: '研发中心', hasChildren: true },
    { value: 'design', label: '设计中心', hasChildren: true },
    { value: 'market', label: '市场部' }
]

export function fetchOrgChildren(node: CascaderNode) {
    const childrenMap: Record<string, CascaderNode[]> = {
        rd: [
            { value: 'fe', label: '前端组' },
            { value: 'be', label: '后端组' }
        ],
        design: [
            { value: 'ux', label: '交互组' },
            { value: 'ui', label: '视觉组' }
        ]
    }
    return new Promise<CascaderNode[]>(resolve => {
        setTimeout(() => resolve(childrenMap[node.value] ?? []), 600)
    })
}
