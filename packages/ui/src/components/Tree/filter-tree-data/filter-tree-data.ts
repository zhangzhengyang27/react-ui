import type { TreeNodeData } from '../Tree'

export type TreeNodeFilter = (query: string, node: TreeNodeData) => boolean

export function defaultTreeNodeFilter(query: string, node: TreeNodeData): boolean {
    const label = typeof node.label === 'string' ? node.label : node.value
    return label.toLowerCase().includes(query.toLowerCase().trim())
}

export function filterTreeData(
    data: TreeNodeData[],
    query: string,
    filter: TreeNodeFilter = defaultTreeNodeFilter
): TreeNodeData[] {
    if (!query.trim()) {
        return data
    }

    const result: TreeNodeData[] = []

    for (const node of data) {
        const nodeMatches = filter(query, node)
        const filteredChildren =
            Array.isArray(node.children) && node.children.length > 0
                ? filterTreeData(node.children, query, filter)
                : []

        if (nodeMatches || filteredChildren.length > 0) {
            if (filteredChildren.length > 0) {
                // 部分子节点命中：仅保留命中的子链
                result.push({ ...node, children: filteredChildren })
            } else if (Array.isArray(node.children) && node.children.length > 0) {
                // 节点自身命中但子节点均未命中：统一为“只保留命中链”语义，
                // 丢弃未命中的子节点（此前这里保留全部原始子节点，与上一分支矛盾，
                // 搜索结果集不可预测）；不写入 children: []，避免叶子渲染出空展开箭头
                const nodeWithoutChildren = { ...node }
                delete nodeWithoutChildren.children
                result.push(nodeWithoutChildren)
            } else {
                // 无子节点的叶子（含异步 hasChildren 节点）原样保留，懒加载入口不受影响
                result.push({ ...node })
            }
        }
    }

    return result
}
