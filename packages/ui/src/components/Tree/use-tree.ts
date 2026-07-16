import { useCallback, useMemo, useRef, useState } from 'react'
import { useUncontrolled } from '@react-ui/hooks'
import { CheckedNodeStatus, getAllCheckedNodes } from './get-all-checked-nodes/get-all-checked-nodes'
import {
    findTreeNode,
    getAllChildrenNodes,
    getChildrenNodesValues,
} from './get-children-nodes-values/get-children-nodes-values'
import { memoizedIsNodeChecked } from './is-node-checked/is-node-checked'
import { memoizedIsNodeIndeterminate } from './is-node-indeterminate/is-node-indeterminate'
import type { TreeNodeData } from './Tree'

export type TreeExpandedState = Record<string, boolean>

function getInitialTreeExpandedState(
    initialState: TreeExpandedState,
    data: TreeNodeData[],
    value: string | string[] | undefined,
    acc: TreeExpandedState = {}
) {
    data.forEach((node) => {
        acc[node.value] = node.value in initialState ? initialState[node.value] : node.value === value

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

    expandedNodesValues.forEach((node) => {
        state[node] = true
    })

    return state
}

function getInitialCheckedState(initialState: string[], data: TreeNodeData[], checkStrictly: boolean) {
    if (checkStrictly) {
        return initialState
    }

    const acc: string[] = []

    initialState.forEach((node) => acc.push(...getChildrenNodesValues(node, data)))

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
    checkStrictly = false,
}: UseTreeInput = {}): UseTreeReturnType {
    const [data, setData] = useState<TreeNodeData[]>([])
    const [_expandedState, setExpandedState] = useUncontrolled({
        value: expandedState,
        defaultValue: initialExpandedState,
        finalValue: {},
        onChange: onExpandedStateChange,
    })

    const [_selectedState, setSelectedState] = useUncontrolled({
        value: selectedState,
        defaultValue: initialSelectedState,
        finalValue: [],
        onChange: onSelectedStateChange,
    })

    const [_checkedState, setCheckedState] = useUncontrolled({
        value: checkedState,
        defaultValue: initialCheckedState,
        finalValue: [],
        onChange: onCheckedStateChange,
    })

    const [anchorNode, setAnchorNode] = useState<string | null>(null)

    const loadingNodesRef = useRef(new Set<string>())
    const loadedNodesRef = useRef(new Set<string>())
    const [loadingNodes, setLoadingNodes] = useState<string[]>([])
    const [loadErrors, setLoadErrors] = useState<Record<string, Error>>({})

    const initialize = useCallback(
        (_data: TreeNodeData[]) => {
            setExpandedState(getInitialTreeExpandedState(_expandedState, _data, _selectedState))
            setCheckedState(getInitialCheckedState(_checkedState, _data, checkStrictly))
            setData(_data)
        },
        [_selectedState, _checkedState, _expandedState, checkStrictly]
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
            setLoadErrors((prev) => {
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
                setLoadErrors((prev) => ({ ...prev, [value]: err }))
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
        const nextState = { ..._expandedState }
        Object.keys(nextState).forEach((key) => {
            nextState[key] = true
            tryLoadAsync(key)
        })

        setExpandedState(nextState)
    }, [_expandedState, tryLoadAsync])

    const collapseAllNodes = useCallback(() => {
        const nextState = { ..._expandedState }
        Object.keys(nextState).forEach((key) => {
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
                const next = _selectedState.filter((item) => item !== value)
                setSelectedState(next)
                return next
            }

            setAnchorNode(value)
            setSelectedState([..._selectedState, value])
        },
        [_selectedState]
    )

    const select = useCallback(
        (value: string) => {
            setAnchorNode(value)
            setSelectedState(
                multiple
                    ? _selectedState.includes(value)
                        ? _selectedState
                        : [..._selectedState, value]
                    : [value]
            )
        },
        [_selectedState]
    )

    const deselect = useCallback(
        (value: string) => {
            anchorNode === value && setAnchorNode(null)
            setSelectedState(_selectedState.filter((item) => item !== value))
        },
        [_selectedState]
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
                setCheckedState(_checkedState.filter((item) => item !== value))
            } else {
                const checkedNodes = getChildrenNodesValues(value, data)
                setCheckedState(_checkedState.filter((item) => !checkedNodes.includes(item)))
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

    const getCheckedNodes = useCallback((): CheckedNodeStatus[] => {
        if (checkStrictly) {
            return _checkedState.map((value) => {
                const node = findTreeNode(value, data)
                return {
                    checked: true,
                    indeterminate: false,
                    value,
                    hasChildren: node
                        ? (Array.isArray(node.children) && node.children.length > 0) || !!node.hasChildren
                        : false,
                }
            })
        }
        return getAllCheckedNodes(data, _checkedState).result
    }, [checkStrictly, _checkedState, data])

    const isNodeChecked = useCallback(
        (value: string) => {
            if (checkStrictly) {
                return _checkedState.includes(value)
            }
            return memoizedIsNodeChecked(value, data, _checkedState)
        },
        [checkStrictly, _checkedState, data]
    )

    const isNodeIndeterminate = useCallback(
        (value: string) => {
            if (checkStrictly) {
                return false
            }
            return memoizedIsNodeIndeterminate(value, data, _checkedState)
        },
        [checkStrictly, _checkedState, data]
    )

    const isNodeLoading = useCallback(
        (value: string) => loadingNodes.includes(value),
        [loadingNodes]
    )

    const getNodeLoadError = useCallback((value: string) => loadErrors[value] || null, [loadErrors])

    const invalidateNode = useCallback((value: string) => {
        loadedNodesRef.current.delete(value)
        setLoadErrors((prev) => {
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
            invalidateNode,
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
            invalidateNode,
        ]
    )
}

export type TreeController = ReturnType<typeof useTree>
