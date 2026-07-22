import { useProps, type BoxProps } from '../../core'
import { usePaginationContext } from './Pagination.context'
import {
    PaginationFirstIcon,
    PaginationLastIcon,
    PaginationNextIcon,
    PaginationPreviousIcon,
    type PaginationIconProps
} from './Pagination.icons'
import { PaginationControl } from './PaginationControl'

export interface PaginationEdgeProps extends BoxProps {
    /** An icon component to replace the default icon */
    icon?: React.FC<PaginationIconProps>

    /** Polymorphic component prop */
    component?: any

    /** href when rendered as link */
    href?: string

    [key: string]: any
}

interface CreateEdgeComponent {
    icon: React.FC<PaginationIconProps>
    name: string
    action: 'onNext' | 'onPrevious' | 'onFirst' | 'onLast'
    type: 'next' | 'previous'
    /** 无障碍标签 */
    ariaLabel: string
}

function createEdgeComponent({ icon, name, action, type, ariaLabel }: CreateEdgeComponent) {
    const defaultProps = { icon } satisfies Partial<PaginationEdgeProps>

    const Component = (props: PaginationEdgeProps) => {
        const { icon: Icon, ...others } = useProps(name, defaultProps, props)
        const ctx = usePaginationContext()
        const disabled = type === 'next' ? ctx.active === ctx.total : ctx.active === 1

        return (
            <PaginationControl
                disabled={ctx.disabled || disabled}
                onClick={ctx[action]}
                withPadding={false}
                aria-label={ariaLabel}
                {...others}
            >
                {Icon && (
                    <Icon
                        style={{
                            width: 'calc(var(--pagination-control-size) / 1.8)',
                            height: 'calc(var(--pagination-control-size) / 1.8)'
                        }}
                    />
                )}
            </PaginationControl>
        )
    }

    Component.displayName = `@xiaoye-react/ui/${name}`
    return Component
}

export const PaginationNext = createEdgeComponent({
    icon: PaginationNextIcon,
    name: 'PaginationNext',
    action: 'onNext',
    type: 'next',
    ariaLabel: 'Next page'
})

export const PaginationPrevious = createEdgeComponent({
    icon: PaginationPreviousIcon,
    name: 'PaginationPrevious',
    action: 'onPrevious',
    type: 'previous',
    ariaLabel: 'Previous page'
})

export const PaginationFirst = createEdgeComponent({
    icon: PaginationFirstIcon,
    name: 'PaginationFirst',
    action: 'onFirst',
    type: 'previous',
    ariaLabel: 'First page'
})

export const PaginationLast = createEdgeComponent({
    icon: PaginationLastIcon,
    name: 'PaginationLast',
    action: 'onLast',
    type: 'next',
    ariaLabel: 'Last page'
})
