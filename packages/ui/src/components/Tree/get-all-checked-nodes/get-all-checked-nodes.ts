import type { TreeNodeData } from '../Tree'

export interface CheckedNodeStatus {
    checked: boolean
    indeterminate: boolean
    hasChildren: boolean
    value: string
}

export function getAllCheckedNodes(
    data: TreeNodeData[],
    checkedState: string[],
    acc: CheckedNodeStatus[] = [],
    // 顶层调用一次性转 Set，递归层复用：此前每个叶子 checkedState.includes 是 O(m)，
    // m 个勾选值 × n 个节点放大为 O(n×m)
    checkedSet: Set<string> = new Set(checkedState)
) {
    const currentTreeChecked: CheckedNodeStatus[] = []

    for (const node of data) {
        if (Array.isArray(node.children) && node.children.length > 0) {
            const innerChecked = getAllCheckedNodes(node.children, checkedState, acc, checkedSet)
            if (innerChecked.currentTreeChecked.length === node.children.length) {
                const isChecked = innerChecked.currentTreeChecked.every((item) => item.checked)
                const item = {
                    checked: isChecked,
                    indeterminate: !isChecked,
                    value: node.value,
                    hasChildren: true,
                }
                currentTreeChecked.push(item)
                acc.push(item)
            } else if (innerChecked.currentTreeChecked.length > 0) {
                const item = {
                    checked: false,
                    indeterminate: true,
                    value: node.value,
                    hasChildren: true,
                }
                currentTreeChecked.push(item)
                acc.push(item)
            }
        } else if (checkedSet.has(node.value)) {
            const item: CheckedNodeStatus = {
                checked: true,
                indeterminate: false,
                value: node.value,
                hasChildren: false,
            }
            currentTreeChecked.push(item)
            acc.push(item)
        }
    }

    return { result: acc, currentTreeChecked }
}
