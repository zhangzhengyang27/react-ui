import type { TreeNodeData } from '../Tree'

export function findTreeNode(value: string, data: TreeNodeData[]): TreeNodeData | null {
    for (const node of data) {
        if (node.value === value) {
            return node
        }

        if (Array.isArray(node.children)) {
            const childNode = findTreeNode(value, node.children)
            if (childNode) {
                return childNode
            }
        }
    }

    return null
}

export function getChildrenNodesValues(
    value: string,
    data: TreeNodeData[],
    acc: string[] = []
): string[] {
    const node = findTreeNode(value, data)
    if (!node) {
        return acc
    }

    if (!Array.isArray(node.children) || node.children.length === 0) {
        return [node.value]
    }

    // 从已找到的 node 直接递归收集叶子：此前对每个带子节点的 child 再次 findTreeNode
    // 全树扫描，链式树（每层单节点）退化为 O(n²)
    const collectLeaves = (nodes: TreeNodeData[]) => {
        for (const child of nodes) {
            if (Array.isArray(child.children) && child.children.length > 0) {
                collectLeaves(child.children)
            } else {
                acc.push(child.value)
            }
        }
    }
    collectLeaves(node.children)

    return acc
}

export function getAllChildrenNodes(data: TreeNodeData[]) {
    return data.reduce((acc, node) => {
        if (Array.isArray(node.children) && node.children.length > 0) {
            acc.push(...getAllChildrenNodes(node.children))
        } else {
            acc.push(node.value)
        }

        return acc
    }, [] as string[])
}
