import { usePaginationContext } from './Pagination.context'
import { type PaginationIcon } from './Pagination.icons'
import { PaginationControl } from './PaginationControl'
import { PaginationDots } from './PaginationDots'

export interface PaginationItemsProps {
    /** Dots icon component */
    dotsIcon?: PaginationIcon
}

export function PaginationItems({ dotsIcon }: PaginationItemsProps) {
    const ctx = usePaginationContext()

    const items = ctx.range.map((page, index) => {
        if (page === 'dots') {
            return <PaginationDots icon={dotsIcon} key={index} />
        }

        return (
            <PaginationControl
                key={index}
                active={page === ctx.active}
                aria-current={page === ctx.active ? 'page' : undefined}
                onClick={() => ctx.onChange(page)}
                disabled={ctx.disabled}
                {...ctx.getItemProps?.(page)}
            >
                {ctx.getItemProps?.(page)?.children ?? page}
            </PaginationControl>
        )
    })

    return <>{items}</>
}

PaginationItems.displayName = '@react-ui/ui/PaginationItems'
