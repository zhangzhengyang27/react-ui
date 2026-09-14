import { useCallback, useMemo, useRef, useState } from 'react'
import { useUncontrolled } from '@xiaoye-react/hooks'
import { CheckedNodeStatus, getAllCheckedNodes } from './get-all-checked-nodes/get-all-checked-nodes'
import {
    findTreeNode,
    getAllChildrenNodes,
    getChildrenNodesValues
} from './get-children-nodes-values/get-children-nodes-values'
import type { TreeNodeData } from './Tree'

export type TreeExpandedState = Record<string, boolean>

function getInitialTreeExpandedState(
    initialState: TreeExpandedState,
    data: TreeNodeData[],
    value: string | string[] | undefined,
    acc: TreeExpandedState = {}
) {
    data.forEach(node => {
        acc[node.value] = node.value in initialState ? initialState[node.value] : Array.isArray(value) ? value.includes(node.value) : node.value === value

        if (Array.isArray(node.children)) {
            getInitialTreeExpandedState(initialState, node.children, value, acc)
        }
    })

    return acc
}

export function getTreeExpandedState(
    data: TreeNodeData[],
    expandedNodesValues: string[] | '*'
): Record<string, boolean> {
    const state = getInitialTreeExpandedState({}, data, [])

    if (expandedNodesValues === '*') {
        const result: Record<string, boolean> = {}
        const keys = Object.keys(state)
        for (let i = 0; i < keys.length; i++) {
            result[keys[i]] = true
        }
        return result
    }

    expandedNodesValues.forEach(node => {
        state[node] = true
    })

    return state
}

function getInitialCheckedState(initialState: string[], data: TreeNodeData[], checkStrictly: boolean) {
    if (checkStrictly) {
        return initialState
    }

    const acc: string[] = []

    initialState.forEach(node => {
        // data 变化(如搜索过滤)时,保留不存在于 data 中的已勾选值(取并集),
        // 避免勾选状态永久丢失,仅在显式取消勾选时移除
        if (findTreeNode(node, data)) {
            acc.push(...getChildrenNodesValues(node, data))
        } else {
            acc.push(node)
        }
    })

    return Array.from(new Set(acc))
}

function getAllNodeValues(data: TreeNodeData[]): string[] {
    const acc: string[] = []
    for (const node of data) {
        acc.push(node.value)
        if (Array.isArray(node.children) && node.children.length > 0) {
            acc.push(...getAllNodeValues(node.children))
        }
    }
    return acc
}

export interface UseTreeInput {
    initialExpandedState?: TreeExpandedState
    expandedState?: TreeExpandedState
    onExpandedStateChange?: (expandedState: TreeExpandedState) => void
    initialSelectedState?: string[]
    selectedState?: string[]
    onSelectedStateChange?: (selectedState: string[]) => void
    initialCheckedState?: string[]
    checkedState?: string[]
    onCheckedStateChange?: (checkedState: string[]) => void
    multiple?: boolean
    onNodeExpand?: (value: string) => void
    onNodeCollapse?: (value: string) => void
    onLoadChildren?: (nodeValue: string) => Promise<void>
    checkStrictly?: boolean
}

export interface UseTreeReturnType {
    checkStrictly: boolean
    multiple: boolean
    expandedState: TreeExpandedState
    selectedState: string[]
    checkedState: string[]
    anchorNode: string | null
    initialize: (data: TreeNodeData[]) => void
    toggleExpanded: (value: string) => void
    collapse: (value: string) => void
    expand: (value: string) => void
    expandAllNodes: () => void
    collapseAllNodes: () => void
    setExpandedState: (value: TreeExpandedState) => void
    toggleSelected: (value: string) => void
    select: (value: string) => void
    deselect: (value: string) => void
    clearSelected: () => void
    setSelectedState: (value: string[]) => void
    checkNode: (value: string) => void
    uncheckNode: (value: string) => void
    checkAllNodes: () => void
    uncheckAllNodes: () => void
    setCheckedState: (value: string[]) => void
    getCheckedNodes: () => CheckedNodeStatus[]
    isNodeChecked: (value: string) => boolean
    isNodeIndeterminate: (value: string) => boolean
    isNodeLoading: (value: string) => boolean
    getNodeLoadError: (value: string) => Error | null
    loadNode: (value: string) => Promise<void>
    invalidateNode: (value: string) => void
}

export function useTree({
    initialSelectedState = [],
    expandedState,
    initialCheckedState = [],
    checkedState,
    initialExpandedState = {},
    selectedState,
    multiple = false,
    onNodeCollapse,
    onNodeExpand,
    onCheckedStateChange,
    onSelectedStateChange,
    onExpandedStateChange,
    onLoadChildren,
    checkStrictly = false
}: UseTreeInput = {}): UseTreeReturnType {
    const [data, setData] = useState<TreeNodeData[]>([])
    const [_expandedState, setExpandedState] = useUncontrolled({
        value: expandedState,
        defaultValue: initialExpandedState,
        finalValue: {},
        onChange: onExpandedStateChange
    })

    const [_selectedState, setSelectedState] = useUncontrolled({
        value: selectedState,
        defaultValue: initialSelectedState,
        finalValue: [],
        onChange: onSelectedStateChange
    })

    const [_checkedState, setCheckedState] = useUncontrolled({
        value: checkedState,
        defaultValue: initialCheckedState,
        finalValue: [],
        onChange: onCheckedStateChange
    })

    const [anchorNode, setAnchorNode] = useState<string | null>(null)

    const loadingNodesRef = useRef(new Set<string>())
    const loadedNodesRef = useRef(new Set<string>())
    const [loadingNodes, setLoadingNodes] = useState<string[]>([])
    const [loadErrors, setLoadErrors] = useState<Record<string, Error>>({})

    // 记录最近一次 initialize 使用的 data 引用。Tree 的 effect 依赖 [data, tree],
    // 而 controller 对象身份随内部状态变化,若不判重,身份变化会反复触发 initialize→
    // 生成新 expanded/checked 对象→状态变化→身份再变化的死循环;
    // 更换 controller 实例时(用户替换 tree prop)此 ref 为全新,仍可正常初始化
    const initializedDataRef = useRef<TreeNodeData[] | null>(null)

    // 用 ref 持有最新状态，避免 initialize 依赖 _selectedState/_checkedState/_expandedState
    // 导致身份随内部状态变化而 churn，进而反复触发 Tree 的 [data, tree] effect。
    const selectedStateRef = useRef(_selectedState)
    selectedStateRef.current = _selectedState
    const checkedStateRef = useRef(_checkedState)
    checkedStateRef.current = _checkedState
    const expandedStateRef = useRef(_expandedState)
    expandedStateRef.current = _expandedState

    const initialize = useCallback(
        (_data: TreeNodeData[]) => {
            if (initializedDataRef.current === _data) {
                return
            }
            initializedDataRef.current = _data
            setExpandedState(getInitialTreeExpandedState(expandedStateRef.current, _data, selectedStateRef.current))
            setCheckedState(getInitialCheckedState(checkedStateRef.current, _data, checkStrictly))
            setData(_data)
        },
        [checkStrictly]
    )

    const loadNodeImpl = useCallback(
        async (value: string) => {
            if (!onLoadChildren) {
                return
            }

            if (loadingNodesRef.current.has(value) || loadedNodesRef.current.has(value)) {
                return
            }

            loadingNodesRef.current.add(value)
            setLoadingNodes(Array.from(loadingNodesRef.current))
            setLoadErrors(prev => {
                if (!(value in prev)) {
                    return prev
                }

                const next = { ...prev }
                delete next[value]
                return next
            })

            try {
                await onLoadChildren(value)
                loadedNodesRef.current.add(value)
            } catch (error) {
                const err = error instanceof Error ? error : new Error(String(error))
                setLoadErrors(prev => ({ ...prev, [value]: err }))
            } finally {
                loadingNodesRef.current.delete(value)
                setLoadingNodes(Array.from(loadingNodesRef.current))
            }
        },
        [onLoadChildren]
    )

    const tryLoadAsync = useCallback(
        (value: string) => {
            if (!onLoadChildren) {
                return
            }

            const node = findTreeNode(value, data)
            if (node && node.hasChildren && !Array.isArray(node.children)) {
                loadNodeImpl(value)
            }
        },
        [onLoadChildren, data, loadNodeImpl]
    )

    const toggleExpanded = useCallback(
        (value: string) => {
            const nextState = { ..._expandedState, [value]: !_expandedState[value] }
            nextState[value] ? onNodeExpand?.(value) : onNodeCollapse?.(value)
            if (nextState[value]) {
                tryLoadAsync(value)
            }
            setExpandedState(nextState)
        },
        [onNodeCollapse, onNodeExpand, _expandedState, tryLoadAsync]
    )

    const collapse = useCallback(
        (value: string) => {
            if (_expandedState[value] !== false) {
                onNodeCollapse?.(value)
            }

            setExpandedState({ ..._expandedState, [value]: false })
        },
        [onNodeCollapse, _expandedState]
    )

    const expand = useCallback(
        (value: string) => {
            if (_expandedState[value] !== true) {
                onNodeExpand?.(value)
            }

            tryLoadAsync(value)
            setExpandedState({ ..._expandedState, [value]: true })
        },
        [onNodeExpand, _expandedState, tryLoadAsync]
    )

    const expandAllNodes = useCallback(() => {
        // 一次性遍历树收集全部可展开节点：旧的逐 key findTreeNode 全树查找是 O(n²)，
        // 数千节点的大树调用一次会冻结主线程数百毫秒
        const nextState: Record<string, boolean> = { ..._expandedState }
        const walk = (nodes: TreeNodeData[]) => {
            nodes.forEach(node => {
                nextState[node.value] = true
                if (node.hasChildren && !Array.isArray(node.children)) {
                    loadNodeImpl(node.value)
                }
                if (Array.isArray(node.children)) {
                    walk(node.children)
                }
            })
        }
        walk(data)

        setExpandedState(nextState)
    }, [_expandedState, data, loadNodeImpl])

    const collapseAllNodes = useCallback(() => {
        const nextState = { ..._expandedState }
        Object.keys(nextState).forEach(key => {
            nextState[key] = false
        })

        setExpandedState(nextState)
    }, [_expandedState])

    const toggleSelected = useCallback(
        (value: string) => {
            if (!multiple) {
                if (_selectedState.includes(value)) {
                    setAnchorNode(null)
                    setSelectedState([])
                    return []
                }

                setAnchorNode(value)
                setSelectedState([value])
                return [value]
            }

            if (_selectedState.includes(value)) {
                setAnchorNode(null)
                const next = _selectedState.filter(item => item !== value)
                setSelectedState(next)
                return next
            }

            setAnchorNode(value)
            const next = [..._selectedState, value]
            setSelectedState(next)
            // 补齐遗漏的 return,与其它分支保持一致(均返回最新选中态)
            return next
        },
        [_selectedState]
    )

    const select = useCallback(
        (value: string) => {
            setAnchorNode(value)
            setSelectedState(
                multiple ? (_selectedState.includes(value) ? _selectedState : [..._selectedState, value]) : [value]
            )
        },
        [_selectedState]
    )

    const deselect = useCallback(
        (value: string) => {
            anchorNode === value && setAnchorNode(null)
            setSelectedState(_selectedState.filter(item => item !== value))
        },
        // anchorNode 必须进 deps：否则同批次先 toggleSelected 再 deselect 时读到旧值，anchor 不被清除
        [_selectedState, anchorNode]
    )

    const clearSelected = useCallback(() => {
        setSelectedState([])
        setAnchorNode(null)
    }, [])

    const checkNode = useCallback(
        (value: string) => {
            if (checkStrictly) {
                if (!_checkedState.includes(value)) {
                    setCheckedState([..._checkedState, value])
                }
            } else {
                const checkedNodes = getChildrenNodesValues(value, data)
                setCheckedState(Array.from(new Set([..._checkedState, ...checkedNodes])))
            }
        },
        [data, _checkedState, checkStrictly]
    )

    const uncheckNode = useCallback(
        (value: string) => {
            if (checkStrictly) {
                setCheckedState(_checkedState.filter(item => item !== value))
            } else {
                const checkedNodes = getChildrenNodesValues(value, data)
                setCheckedState(_checkedState.filter(item => !checkedNodes.includes(item)))
            }
        },
        [data, _checkedState, checkStrictly]
    )

    const checkAllNodes = useCallback(() => {
        if (checkStrictly) {
            setCheckedState(getAllNodeValues(data))
        } else {
            setCheckedState(getAllChildrenNodes(data))
        }
    }, [data, checkStrictly])

    const uncheckAllNodes = useCallback(() => {
        setCheckedState([])
    }, [])

    // 每次 data/checkedState 变化时一次性计算全部节点的勾选状态,供
    // isNodeChecked/isNodeIndeterminate/getCheckedNodes 共享,替代旧的逐节点
    // JSON.stringify memoize(每节点 O(n) 序列化整树导致 O(n²)、模块级缓存无界增长、
    // label 含循环引用时崩溃)
    const checkedNodes = useMemo(() => getAllCheckedNodes(data, _checkedState).result, [data, _checkedState])

    const checkedNodesMap = useMemo(() => {
        const map = new Map<string, CheckedNodeStatus>()
        for (const node of checkedNodes) {
            const existing = map.get(node.value)
            if (existing) {
                // value 重复时合并标记,保持与旧实现 some() 等价的语义
                existing.checked = existing.checked || node.checked
                existing.indeterminate = existing.indeterminate || node.indeterminate
            } else {
                map.set(node.value, { ...node })
            }
        }
        return map
    }, [checkedNodes])

    const getCheckedNodes = useCallback((): CheckedNodeStatus[] => {
        if (checkStrictly) {
            return _checkedState.map(value => {
                const node = findTreeNode(value, data)
                return {
                    checked: true,
                    indeterminate: false,
                    value,
                    hasChildren: node
                        ? (Array.isArray(node.children) && node.children.length > 0) || !!node.hasChildren
                        : false
                }
            })
        }
        return checkedNodes
    }, [checkStrictly, _checkedState, data, checkedNodes])

    const isNodeChecked = useCallback(
        (value: string) => {
            if (checkStrictly) {
                return _checkedState.includes(value)
            }
            if (_checkedState.includes(value)) {
                return true
            }
            return checkedNodesMap.get(value)?.checked === true
        },
        [checkStrictly, _checkedState, checkedNodesMap]
    )

    const isNodeIndeterminate = useCallback(
        (value: string) => {
            if (checkStrictly) {
                return false
            }
            return checkedNodesMap.get(value)?.indeterminate === true
        },
        [checkStrictly, checkedNodesMap]
    )

    const isNodeLoading = useCallback((value: string) => loadingNodes.includes(value), [loadingNodes])

    const getNodeLoadError = useCallback((value: string) => loadErrors[value] || null, [loadErrors])

    const invalidateNode = useCallback((value: string) => {
        loadedNodesRef.current.delete(value)
        setLoadErrors(prev => {
            if (!(value in prev)) {
                return prev
            }

            const next = { ...prev }
            delete next[value]
            return next
        })
    }, [])

    return useMemo(
        () => ({
            checkStrictly,
            multiple,
            expandedState: _expandedState,
            selectedState: _selectedState,
            checkedState: _checkedState,
            anchorNode,
            initialize,

            toggleExpanded,
            collapse,
            expand,
            expandAllNodes,
            collapseAllNodes,
            setExpandedState,

            checkNode,
            uncheckNode,
            checkAllNodes,
            uncheckAllNodes,
            setCheckedState,

            toggleSelected,
            select,
            deselect,
            clearSelected,
            setSelectedState,

            getCheckedNodes,
            isNodeChecked,
            isNodeIndeterminate,

            isNodeLoading,
            getNodeLoadError,
            loadNode: loadNodeImpl,
            invalidateNode
        }),
        [
            checkStrictly,
            multiple,
            _expandedState,
            _selectedState,
            _checkedState,
            anchorNode,
            initialize,
            toggleExpanded,
            collapse,
            expand,
            expandAllNodes,
            collapseAllNodes,
            setExpandedState,
            checkNode,
            uncheckNode,
            checkAllNodes,
            uncheckAllNodes,
            setCheckedState,
            toggleSelected,
            select,
            deselect,
            clearSelected,
            setSelectedState,
            getCheckedNodes,
            isNodeChecked,
            isNodeIndeterminate,
            isNodeLoading,
            getNodeLoadError,
            loadNodeImpl,
            invalidateNode
        ]
    )
}

export type TreeController = ReturnType<typeof useTree>
