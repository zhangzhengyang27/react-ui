import type { TreeNodeData } from '../Tree'
import { filterTreeData } from '../Tree/filter-tree-data/filter-tree-data'

/** Cascader 数据节点：在 TreeNodeData 基础上补充禁用态 */
export interface CascaderNode extends TreeNodeData {
    disabled?: boolean
}

/** 在树中查找节点路径（含自身），未找到返回 null */
export function findTreeNodePath(value: string, nodes: CascaderNode[]): CascaderNode[] | null {
    for (const node of nodes) {
        if (node.value === value) {
            return [node]
        }
        if (Array.isArray(node.children)) {
            const path = findTreeNodePath(value, node.children)
            if (path) {
                return [node, ...path]
            }
        }
    }
    return null
}

/** 节点标签的字符串形式，非字符串 label 回退为 value */
export function getCascaderNodeLabel(node: TreeNodeData): string {
    return typeof node.label === 'string' ? node.label : node.value
}

/** 是否为叶子节点。标记 hasChildren 且提供 loadData 的节点视为可异步展开，不算叶子 */
export function isCascaderLeaf(node: TreeNodeData, hasLoadData: boolean): boolean {
    if (Array.isArray(node.children) && node.children.length > 0) {
        return false
    }
    return !node.hasChildren || !hasLoadData
}

export interface CascaderSearchResult {
    node: CascaderNode

    /** 从根到该节点的完整路径（含自身） */
    path: CascaderNode[]
}

/** 收集搜索命中的叶子节点及其路径。walk 携带父链构造 path，不再逐叶全树 findTreeNodePath（O(n²)→O(n)） */
export function collectLeafMatches(nodes: CascaderNode[], query: string, hasLoadData: boolean): CascaderSearchResult[] {
    const results: CascaderSearchResult[] = []
    const walk = (current: CascaderNode[], trail: CascaderNode[]) => {
        for (const node of current) {
            const path = [...trail, node]
            if (isCascaderLeaf(node, hasLoadData)) {
                results.push({ node, path })
            } else if (Array.isArray(node.children) && node.children.length > 0) {
                walk(node.children, path)
            }
        }
    }

    walk(filterTreeData(nodes, query) as CascaderNode[], [])
    return results
}
