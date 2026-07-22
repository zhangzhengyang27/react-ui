import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { assignRef, useIsomorphicEffect } from '@xiaoye-react/hooks'
import { factory, Factory, useProps } from '../../core'

// 仅包含 Portal 会写到容器节点上的属性,供创建节点与后续增量同步复用
type PortalNodeAttrs = Pick<React.ComponentProps<'div'>, 'className' | 'style' | 'id'>

// 将 className/style/id 同步到 Portal 容器节点。
// 节点的 class/内联样式均由 Portal 写入,可安全整体重置,避免旧值残留
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
}

function createPortalNode(props: React.ComponentProps<'div'>) {
    const node = document.createElement('div')
    node.setAttribute('data-portal', 'true')
    syncPortalNodeAttrs(node, props)
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
    const { className, style, id } = others

    const [mounted, setMounted] = useState(false)
    const nodeRef = useRef<HTMLElement | null>(null)

    // 节点创建仅依赖结构性 props(target/reuseTargetNode);
    // className/style/id 的变化交给下方同步 effect 增量更新,避免重建节点导致子树重挂载
    useIsomorphicEffect(() => {
        setMounted(true)
        nodeRef.current = getTargetNode({ target, reuseTargetNode, ...others })
        assignRef(ref, nodeRef.current)

        if (!target && !reuseTargetNode && nodeRef.current) {
            document.body.appendChild(nodeRef.current)
        }

        return () => {
            if (!target && !reuseTargetNode && nodeRef.current) {
                document.body.removeChild(nodeRef.current)
            }
        }
    }, [target, reuseTargetNode])

    // className/style/id 变化时同步到 Portal 自建节点(自持节点或共享节点),
    // 而非重建节点(重建会重挂载子树,且内联 style 对象每次渲染都是新引用,重建将导致每渲染都重建);
    // target 指定的节点由用户自行维护,这里不处理
    useIsomorphicEffect(() => {
        if (target || !nodeRef.current) {
            return
        }
        syncPortalNodeAttrs(nodeRef.current, { className, style, id })
    }, [className, style, id, target])

    if (!mounted || !nodeRef.current) {
        return null
    }

    return createPortal(<>{children}</>, nodeRef.current)
})

Portal.displayName = '@xiaoye-react/ui/Portal'

export namespace Portal {
    export type Props = PortalProps
}
