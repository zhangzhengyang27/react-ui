import { Box, BoxProps, CompoundStylesApiProps, ElementProps, factory, Factory, useProps } from '../../../core'
import { useEmptyStateContext } from '../EmptyState.context'
import classes from '../EmptyState.module.css'

export type EmptyStateTitleStylesNames = 'title'

export interface EmptyStateTitleProps
    extends BoxProps,
        CompoundStylesApiProps<EmptyStateTitleFactory>,
        ElementProps<'div'> {
    /** Title content */
    children?: React.ReactNode

    /** Heading order, renders the title as `h1`–`h6` element */
    order?: 1 | 2 | 3 | 4 | 5 | 6
}

export type EmptyStateTitleFactory = Factory<{
    props: EmptyStateTitleProps
    ref: HTMLDivElement
    stylesNames: EmptyStateTitleStylesNames
    compound: true
}>

export const EmptyStateTitle = factory<EmptyStateTitleFactory>((_props, ref) => {
    const props = useProps('EmptyStateTitle', null, _props)
    const { classNames, className, style, styles, children, order, mod, ...others } = props

    const ctx = useEmptyStateContext()

    return (
        <Box<any>
            ref={ref}
            component={order ? `h${order}` : 'div'}
            mod={mod}
            {...ctx.getStyles('title', { className, style, classNames, styles })}
            {...others}
        >
            {children}
        </Box>
    )
})

EmptyStateTitle.classes = classes
EmptyStateTitle.displayName = '@react-ui/ui/EmptyStateTitle'
