import type { TreeNodeData } from '../Tree'
import type { TreeExpandedState } from '../use-tree'

export type FlatTreeLineState = 'continuing' | 'closing' | 'none'

export interface FlattenedTreeNodeData {
    node: TreeNodeData
    level: number
    parent: string | null
    hasChildren: boolean
    expanded: boolean
    linesPath: FlatTreeLineState[]
}

function flattenTreeDataTo(
    acc: FlattenedTreeNodeData[],
    data: TreeNodeData[],
    expandedState: TreeExpandedState,
    parent: string | null,
    level: number,
    ancestorIsLast: boolean[]
): void {
    for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const isLast = i === data.length - 1
        const hasLoadedChildren = Array.isArray(node.children)
        const hasAsyncChildren = !!node.hasChildren && !hasLoadedChildren
        const hasChildren = hasLoadedChildren || hasAsyncChildren
        const expanded = expandedState[node.value] || false

        const linesPath: FlatTreeLineState[] = []
        for (let l = 2; l <= level; l++) {
            if (l === level) {
                linesPath.push(isLast ? 'closing' : 'continuing')
            } else {
                linesPath.push(ancestorIsLast[l - 1] ? 'none' : 'continuing')
            }
        }

        acc.push({ node, level, parent, hasChildren, expanded, linesPath })

        if (expanded && hasLoadedChildren) {
            flattenTreeDataTo(acc, node.children!, expandedState, node.value, level + 1, [
                ...ancestorIsLast,
                isLast,
            ])
        }
    }
}

export function flattenTreeData(
    data: TreeNodeData[],
    expandedState: TreeExpandedState
): FlattenedTreeNodeData[] {
    const result: FlattenedTreeNodeData[] = []
    flattenTreeDataTo(result, data, expandedState, null, 1, [])
    return result
}
