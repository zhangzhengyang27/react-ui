import {
    Box,
    factory,
    useProps,
    type BoxProps,
    type CompoundStylesApiProps,
    type ElementProps,
    type Factory
} from '../../core'
import { usePaginationContext } from './Pagination.context'
import { PaginationDotsIcon, type PaginationIconProps } from './Pagination.icons'
import classes from './Pagination.module.css'

export type PaginationDotsStylesNames = 'dots'

export interface PaginationDotsProps
    extends BoxProps, CompoundStylesApiProps<PaginationDotsFactory>, ElementProps<'div'> {
    /** Custom dots icon component, must accept svg element props and size prop */
    icon?: React.FC<PaginationIconProps>
}

export type PaginationDotsFactory = Factory<{
    props: PaginationDotsProps
    ref: HTMLDivElement
    stylesNames: PaginationDotsStylesNames
    compound: true
}>

const defaultProps = {
    icon: PaginationDotsIcon
} satisfies Partial<PaginationDotsProps>

export const PaginationDots = factory<PaginationDotsFactory>((_props, ref) => {
    const props = useProps('PaginationDots', defaultProps, _props)
    const { classNames, className, style, styles, vars, icon: Icon, ...others } = props
    const ctx = usePaginationContext()

    return (
        <Box
            ref={ref}
            aria-label="..."
            {...ctx.getStyles('dots', { className, style, styles, classNames })}
            {...others}
        >
            <Icon
                style={{
                    width: 'calc(var(--pagination-control-size) / 1.8)',
                    height: 'calc(var(--pagination-control-size) / 1.8)'
                }}
            />
        </Box>
    )
})

PaginationDots.classes = classes
PaginationDots.displayName = '@react-ui/ui/PaginationDots'
