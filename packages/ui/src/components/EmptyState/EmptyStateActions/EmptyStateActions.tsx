import { Box, BoxProps, CompoundStylesApiProps, ElementProps, factory, Factory, useProps } from '../../../core'
import { useEmptyStateContext } from '../EmptyState.context'
import classes from '../EmptyState.module.css'

export type EmptyStateActionsStylesNames = 'actions'

export interface EmptyStateActionsProps
    extends BoxProps,
        CompoundStylesApiProps<EmptyStateActionsFactory>,
        ElementProps<'div'> {
    /** Action buttons or controls */
    children?: React.ReactNode
}

export type EmptyStateActionsFactory = Factory<{
    props: EmptyStateActionsProps
    ref: HTMLDivElement
    stylesNames: EmptyStateActionsStylesNames
    compound: true
}>

export const EmptyStateActions = factory<EmptyStateActionsFactory>((_props, ref) => {
    const props = useProps('EmptyStateActions', null, _props)
    const { classNames, className, style, styles, children, mod, ...others } = props

    const ctx = useEmptyStateContext()

    return (
        <Box ref={ref} mod={mod} {...ctx.getStyles('actions', { className, style, classNames, styles })} {...others}>
            {children}
        </Box>
    )
})

EmptyStateActions.classes = classes
EmptyStateActions.displayName = '@xiaoye-react/ui/EmptyStateActions'
