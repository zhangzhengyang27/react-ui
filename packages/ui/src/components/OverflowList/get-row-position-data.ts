import React from 'react'

interface NodePosition {
    elements: Set<HTMLElement>
    bottom: number
    top: number
}

function groupNodesByTopPosition(nodes: HTMLElement[]): Record<number, NodePosition> {
    if (nodes.length === 0) {
        return {}
    }

    const result: Record<number, NodePosition> = {}

    nodes.forEach((node) => {
        const rect = node.getBoundingClientRect()
        const top = Math.round(rect.top)
        const bottom = Math.round(rect.bottom)

        if (!result[top]) {
            result[top] = {
                elements: new Set<HTMLElement>(),
                bottom,
                top
            }
        } else {
            result[top].bottom = Math.max(result[top].bottom, bottom)
        }

        result[top].elements.add(node)
    })

    return result
}

export function getRowPositionsData(
    containerRef: React.RefObject<HTMLElement | null>,
    overflowRef: React.RefObject<HTMLElement | null>
): {
    itemsSizesMap: Record<number, NodePosition>
    rowPositions: number[]
    children: HTMLElement[]
} | null {
    if (!containerRef.current) {
        return null
    }

    const container = containerRef.current
    const children = Array.from(container.children).filter(
        (child) => overflowRef.current !== child
    ) as HTMLElement[]

    if (children.length === 0) {
        return null
    }

    const itemsSizesMap = groupNodesByTopPosition(children)
    // 容器部分滚出视口时 top 可能为负数,负数键不按数值序迭代(Object.keys 仅对非负整数键保证升序),
    // 显式按数值排序避免行序错乱
    const rowPositions = Object.keys(itemsSizesMap)
        .map(Number)
        .sort((a, b) => a - b)

    return { itemsSizesMap, rowPositions, children }
}
