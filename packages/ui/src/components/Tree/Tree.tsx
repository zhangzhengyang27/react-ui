import { useEffect, useMemo, useRef } from 'react'
import { useClickOutside, useMergedRef } from '@xiaoye-react/hooks'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getSpacing,
    UISpacing,
    StylesApiProps,
    useProps,
    useStyles,
} from '../../core'
import type { TreeDragDropPayload } from './move-tree-node/move-tree-node'
import { TreeNode } from './TreeNode'
import type { TreeAllowDrop, TreeDragHandleProps } from './use-tree-node-drag-drop'
import { TreeController, useTree } from './use-tree'
import classes from './Tree.module.css'

export interface TreeNodeData {
    label: React.ReactNode
    value: string
    nodeProps?: Record<string, any>
    children?: TreeNodeData[]
    hasChildren?: boolean
}

export interface RenderTreeNodePayload {
    level: number
    expanded: boolean
    hasChildren: boolean
    selected: boolean
    isRoot: boolean
    isLoading: boolean
    loadError: Error | null
    node: TreeNodeData
    tree: TreeController
    elementProps: {
        className: string
        style: React.CSSProperties
        onClick: (event: React.MouseEvent) => void
        'data-selected': boolean | undefined
        'data-value': string
        draggable?: boolean
        onDragStart?: (event: React.DragEvent) => void
        onDragOver?: (event: React.DragEvent) => void
        onDragLeave?: (event: React.DragEvent) => void
        onDrop?: (event: React.DragEvent) => void
        onDragEnd?: (event: React.DragEvent) => void
    }
    dragHandleProps: TreeDragHandleProps | undefined
}

export type RenderNode = (payload: RenderTreeNodePayload) => React.ReactNode

export type TreeStylesNames = 'root' | 'node' | 'subtree' | 'label'
export type TreeCssVariables = {
    root: '--level-offset'
}

export interface TreeDragState {
    draggedValue: string | null
    currentDropTarget: HTMLElement | null
}

export interface TreeProps extends BoxProps, StylesApiProps<TreeFactory>, ElementProps<'ul'> {
    data: TreeNodeData[]
    levelOffset?: UISpacing
    expandOnClick?: boolean
    expandOnSpace?: boolean
    checkOnSpace?: boolean
    selectOnClick?: boolean
    tree?: TreeController
    renderNode?: RenderNode
    clearSelectionOnOutsideClick?: boolean
    allowRangeSelection?: boolean
    keepMounted?: boolean
    onDragDrop?: (payload: TreeDragDropPayload) => void
    allowDrop?: TreeAllowDrop
    withDragHandle?: boolean
    withLines?: boolean
}

function getFlatValues(data: TreeNodeData[]): string[] {
    return data.reduce<string[]>((acc, item) => {
        acc.push(item.value)
        if (item.children) {
            acc.push(...getFlatValues(item.children))
        }
        return acc
    }, [])
}

export type TreeFactory = Factory<{
    props: TreeProps
    ref: HTMLUListElement
    stylesNames: TreeStylesNames
    vars: TreeCssVariables
}>

const defaultProps = {
    expandOnClick: true,
    allowRangeSelection: true,
    expandOnSpace: true,
} satisfies Partial<TreeProps>

const varsResolver = createVarsResolver<TreeFactory>((_theme, { levelOffset }) => ({
    root: {
        '--level-offset': getSpacing(levelOffset),
    },
}))

export const Tree = factory<TreeFactory>((_props, ref) => {
    const props = useProps('Tree', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        data,
        expandOnClick,
        tree,
        renderNode,
        selectOnClick,
        clearSelectionOnOutsideClick,
        allowRangeSelection,
        expandOnSpace,
        levelOffset,
        checkOnSpace,
        keepMounted,
        onDragDrop,
        allowDrop,
        withDragHandle,
        withLines,
        attributes,
        ...others
    } = props

    const defaultController = useTree()
    const controller = tree || defaultController

    const dragStateRef = useRef<TreeDragState>({ draggedValue: null, currentDropTarget: null })

    const getStyles = useStyles<TreeFactory>({
        name: 'Tree',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver,
    })

    const clickOutsideRef = useClickOutside(
        () => clearSelectionOnOutsideClick && controller.clearSelected()
    )

    const mergedRef = useMergedRef(ref, clickOutsideRef)

    const flatValues = useMemo(() => getFlatValues(data), [data])

    useEffect(() => {
        controller.initialize(data)
        // 依赖用户传入的 tree 而非解析后的 controller:用户更换 controller 实例时需重新初始化;
        // tree/controller 的对象身份会随内部状态变化,之所以可安全放入依赖,
        // 是因为 use-tree 的 initialize 已按 data 引用判重,身份变化不会触发重复初始化死循环
    }, [data, tree])

    const nodes = data.map((node, index) => (
        <TreeNode
            key={node.value}
            node={node}
            getStyles={getStyles}
            rootIndex={index}
            expandOnClick={expandOnClick}
            selectOnClick={selectOnClick}
            controller={controller}
            renderNode={renderNode}
            flatValues={flatValues}
            allowRangeSelection={allowRangeSelection}
            expandOnSpace={expandOnSpace}
            checkOnSpace={checkOnSpace}
            keepMounted={keepMounted}
            onDragDrop={onDragDrop}
            allowDrop={allowDrop}
            withDragHandle={withDragHandle}
            dragStateRef={dragStateRef}
            data={data}
        />
    ))

    return (
        <Box
            component="ul"
            ref={mergedRef}
            {...getStyles('root')}
            {...others}
            role="tree"
            aria-multiselectable={controller.multiple}
            data-tree-root
            data-with-lines={withLines || undefined}
        >
            {nodes}
        </Box>
    )
})

Tree.displayName = '@xiaoye-react/ui/Tree'
Tree.classes = classes
Tree.varsResolver = varsResolver

export namespace Tree {
    export type Props = TreeProps
    export type StylesNames = TreeStylesNames
    export type Factory = TreeFactory
    export type NodeData = TreeNodeData
    export type RenderNodePayload = RenderTreeNodePayload
}
