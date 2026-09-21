import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { assignRef, useIsomorphicEffect } from '@xiaoye-react/hooks'
import { factory, Factory, useProps } from '../../core'

// Portal 会写到自建容器节点上的属性:className/style/id + data-*/aria-*(其余 div props 不支持透传)
type PortalNodeAttrs = Record<string, unknown>

function isPortalNodeAttrKey(key: string) {
    return (
        key === 'className' || key === 'style' || key === 'id' || key.startsWith('data-') || key.startsWith('aria-')
    )
}

// 从组件 props 中挑出会同步到容器节点的属性(className/style/id/data-*/aria-*)
function pickPortalNodeAttrs(props: React.ComponentProps<'div'>): PortalNodeAttrs {
    const attrs: PortalNodeAttrs = {}
    for (const [key, value] of Object.entries(props)) {
        if (isPortalNodeAttrKey(key) && value !== undefined) {
            attrs[key] = value
        }
    }
    return attrs
}

// 共享节点自带的标记属性,同步时不可清除
const reservedDataAttrs = new Set(['data-portal', 'data-react-ui-shared-portal-node'])

// 将 className/style/id/data-*/aria-* 同步到 Portal 容器节点。
// className/style/id 整体重置可安全清除旧值,data-*/aria-* 先清后写避免残留
function syncPortalNodeAttrs(node: HTMLElement, attrs: PortalNodeAttrs) {
    node.className = typeof attrs.className === 'string' ? attrs.className : ''
    node.style.cssText = ''
    if (typeof attrs.style === 'object' && attrs.style !== null) {
        Object.assign(node.style, attrs.style)
    }
    if (typeof attrs.id === 'string') {
        node.setAttribute('id', attrs.id)
    } else {
        node.removeAttribute('id')
    }

    for (const attr of Array.from(node.attributes)) {
        if (!reservedDataAttrs.has(attr.name) && (attr.name.startsWith('data-') || attr.name.startsWith('aria-'))) {
            node.removeAttribute(attr.name)
        }
    }
    for (const [key, value] of Object.entries(attrs)) {
        if ((key.startsWith('data-') || key.startsWith('aria-')) && value !== undefined) {
            node.setAttribute(key, String(value))
        }
    }
}

function createPortalNode(props: React.ComponentProps<'div'>) {
    const node = document.createElement('div')
    node.setAttribute('data-portal', 'true')
    syncPortalNodeAttrs(node, props as PortalNodeAttrs)
    return node
}

export interface BasePortalProps extends React.ComponentProps<'div'> {
    /**
     * Target element where portal should be rendered. Accepts:
     * - HTMLElement: Renders portal inside this element
     * - string: CSS selector - renders inside first matching element
     * - undefined: Uses shared portal node or creates new one based on `reuseTargetNode`
     *
     * Note: If selector doesn't match any element, portal will not render
     */
    target?: HTMLElement | string

    /**
     * When true and target is not specified, all Portal instances share a single
     * container node appended to document.body. When false, each Portal creates
     * its own container node.
     *
     * Has no effect when target is specified.
     *
     * Note: 带容器属性(className/style/id/data-*、aria-*)的实例始终使用独立节点,
     * 避免共享节点上多实例属性互相覆盖且卸载后无法恢复。
     *
     * @default true
     */
    reuseTargetNode?: boolean
}

export interface PortalProps extends BasePortalProps {
    /** Content to render inside the portal */
    children: React.ReactNode
}

function getTargetNode({ target, reuseTargetNode, ...others }: BasePortalProps): HTMLElement | null {
    if (target) {
        if (typeof target === 'string') {
            // 选择器未命中时返回 null(不渲染),与文档 "portal will not render" 承诺一致;
            // 不再创建游离于 DOM 之外的节点(内容虽被渲染但不可见,行为与文档矛盾)
            return document.querySelector<HTMLElement>(target)
        }

        return target
    }

    if (reuseTargetNode) {
        const existingNode = document.querySelector<HTMLElement>('[data-react-ui-shared-portal-node]')

        if (existingNode) {
            return existingNode
        }

        const node = createPortalNode(others)
        node.setAttribute('data-react-ui-shared-portal-node', 'true')
        document.body.appendChild(node)
        return node
    }

    return createPortalNode(others)
}

export type PortalFactory = Factory<{
    props: PortalProps
    ref: HTMLDivElement
}>

const defaultProps = {
    reuseTargetNode: true
} satisfies Partial<PortalProps>

export const Portal = factory<PortalFactory>((props, ref) => {
    const { children, target, reuseTargetNode, ...others } = useProps('Portal', defaultProps, props)

    const [mounted, setMounted] = useState(false)
    const nodeRef = useRef<HTMLElement | null>(null)

    const nodeAttrs = pickPortalNodeAttrs(others)
    const hasNodeAttrs = Object.keys(nodeAttrs).length > 0
    // 带属性实例强制独立节点:共享节点上多实例属性互相整体覆盖,且先卸载实例写入的属性无法恢复;
    // 无属性实例继续共享,避免节点堆积
    const shouldReuseNode = reuseTargetNode && !hasNodeAttrs

    // 节点创建仅依赖结构性 props(target/reuseTargetNode/是否带属性);
    // 属性变化交给下方同步 effect 增量更新,避免重建节点导致子树重挂载
    useIsomorphicEffect(() => {
        setMounted(true)
        nodeRef.current = getTargetNode({ target, reuseTargetNode: shouldReuseNode, ...others })
        assignRef(ref, nodeRef.current)

        if (!target && !shouldReuseNode && nodeRef.current) {
            document.body.appendChild(nodeRef.current)
        }

        return () => {
            if (!target && !shouldReuseNode && nodeRef.current) {
                // 节点可能已被外部（动画库/用户代码）从 body 摘除，直接 removeChild 会抛 NotFoundError 打断卸载流程
                nodeRef.current.parentNode?.removeChild(nodeRef.current)
            }
        }
    }, [target, shouldReuseNode])

    // className/style/id/data-*/aria-* 变化时同步到 Portal 自建节点(独立节点),
    // 而非重建节点(重建会重挂载子树,且内联 style 对象每次渲染都是新引用,重建将导致每渲染都重建);
    // target 指定的节点由用户自行维护,这里不处理;共享节点只由无属性实例使用,无需同步。
    // 依赖用序列化 key,避免 nodeAttrs 每渲染新引用导致同步 effect 逐渲染重跑
    const nodeAttrsKey = JSON.stringify(nodeAttrs)
    useIsomorphicEffect(() => {
        if (target || !nodeRef.current || shouldReuseNode) {
            return
        }
        syncPortalNodeAttrs(nodeRef.current, nodeAttrs)
    }, [nodeAttrsKey, target, shouldReuseNode])

    if (!mounted || !nodeRef.current) {
        return null
    }

    return createPortal(<>{children}</>, nodeRef.current)
})

Portal.displayName = '@xiaoye-react/ui/Portal'

export namespace Portal {
    export type Props = PortalProps
}
