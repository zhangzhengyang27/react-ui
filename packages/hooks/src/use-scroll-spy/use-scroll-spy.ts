import { useCallback, useEffect, useRef, useState } from 'react'
import { randomId } from '../utils'

function getHeadingsData(
    headings: HTMLElement[],
    getDepth: (element: HTMLElement) => number,
    getValue: (element: HTMLElement) => string
): UseScrollSpyHeadingData[] {
    const result: UseScrollSpyHeadingData[] = []

    for (let i = 0; i < headings.length; i += 1) {
        const heading = headings[i]
        result.push({
            depth: getDepth(heading),
            value: getValue(heading),
            id: heading.id || randomId(),
            getNode: () => (heading.id ? document.getElementById(heading.id)! : heading)
        })
    }

    return result
}

function getActiveElement(rects: DOMRect[], offset: number = 0) {
    if (rects.length === 0) {
        return -1
    }

    const closest = rects.reduce(
        (acc, item, index) => {
            if (Math.abs(acc.position - offset) < Math.abs(item.y - offset)) {
                return acc
            }

            return {
                index,
                position: item.y
            }
        },
        { index: 0, position: rects[0].y }
    )

    return closest.index
}

function getDefaultDepth(element: HTMLElement) {
    return Number(element.tagName[1])
}

function getDefaultValue(element: HTMLElement) {
    return element.textContent || ''
}

// 内容级比较:initialize 每次都产出新数组引用,逐项相等时复用旧引用,
// 避免无条件 setState 与不稳定依赖叠加形成渲染循环
function isSameHeadings(a: UseScrollSpyHeadingData[], b: UseScrollSpyHeadingData[]) {
    if (a.length !== b.length) {
        return false
    }
    return a.every((item, index) =>
        item.id === b[index].id && item.depth === b[index].depth && item.value === b[index].value
    )
}

export interface UseScrollSpyHeadingData {
    /** Heading depth, 1-6 */
    depth: number

    /** Heading text content value */
    value: string

    /** Heading id */
    id: string

    /** Function to get heading node */
    getNode: () => HTMLElement
}

export interface UseScrollSpyOptions {
    /** Selector to get headings, `'h1, h2, h3, h4, h5, h6'` by default */
    selector?: string

    /** A function to retrieve depth of heading, by default depth is calculated based on tag name */
    getDepth?: (element: HTMLElement) => number

    /** A function to retrieve heading value, by default `element.textContent` is used */
    getValue?: (element: HTMLElement) => string

    /** Host element to attach scroll event listener, if not provided, `window` is used */
    scrollHost?: HTMLElement

    /** Offset from the top of the viewport to use when determining the active heading, `0` by default */
    offset?: number
}

export interface UseScrollSpyReturnValue {
    /** Index of the active heading in the `data` array */
    active: number

    /** Headings data. If not initialize, data is represented by an empty array. */
    data: UseScrollSpyHeadingData[]

    /** True if headings value have been retrieved from the DOM. */
    initialized: boolean

    /** Function to update headings values after the parent component has mounted. */
    reinitialize: () => void
}

export function useScrollSpy({
    selector = 'h1, h2, h3, h4, h5, h6',
    getDepth = getDefaultDepth,
    getValue = getDefaultValue,
    offset = 0,
    scrollHost
}: UseScrollSpyOptions = {}): UseScrollSpyReturnValue {
    const [active, setActive] = useState(-1)
    const [initialized, setInitialized] = useState(false)
    const [data, setData] = useState<UseScrollSpyHeadingData[]>([])
    const headingsRef = useRef<UseScrollSpyHeadingData[]>([])

    // getDepth/getValue 经 ref 转发:消费方传内联回调(每渲染新引用)时
    // initialize 身份保持稳定,否则 effect 每渲染重跑 → setData(新数组) →
    // 再渲染 → 循环,React 报 Maximum update depth exceeded
    const getDepthRef = useRef(getDepth)
    getDepthRef.current = getDepth
    const getValueRef = useRef(getValue)
    getValueRef.current = getValue

    const handleScroll = useCallback(() => {
        setActive(
            getActiveElement(
                headingsRef.current.map(d => d.getNode().getBoundingClientRect()),
                offset
            )
        )
    }, [offset])

    const initialize = useCallback(() => {
        const headings = getHeadingsData(
            Array.from(document.querySelectorAll(selector)),
            getDepthRef.current,
            getValueRef.current
        )
        headingsRef.current = headings
        setInitialized(true)
        setData(currentData => (isSameHeadings(currentData, headings) ? currentData : headings))
        setActive(
            getActiveElement(
                headings.map(d => d.getNode().getBoundingClientRect()),
                offset
            )
        )
    }, [selector, offset])

    useEffect(() => {
        initialize()
        const _scrollHost = scrollHost || window
        _scrollHost.addEventListener('scroll', handleScroll)
        return () => _scrollHost.removeEventListener('scroll', handleScroll)
    }, [scrollHost, selector, offset, initialize, handleScroll])

    return {
        reinitialize: initialize,
        active,
        initialized,
        data
    }
}

export namespace useScrollSpy {
    export type Options = UseScrollSpyOptions
    export type ReturnValue = UseScrollSpyReturnValue
    export type HeadingData = UseScrollSpyHeadingData
}
