import { Box, BoxProps, CompoundStylesApiProps, ElementProps, factory, Factory, useProps } from '../../../core'
import { useEmptyStateContext } from '../EmptyState.context'
import classes from '../EmptyState.module.css'

export type EmptyStateIndicatorStylesNames = 'indicator'

export interface EmptyStateIndicatorProps
    extends BoxProps,
        CompoundStylesApiProps<EmptyStateIndicatorFactory>,
        ElementProps<'div'> {
    /** Icon or illustration displayed inside the indicator */
    children?: React.ReactNode
}

export type EmptyStateIndicatorFactory = Factory<{
    props: EmptyStateIndicatorProps
    ref: HTMLDivElement
    stylesNames: EmptyStateIndicatorStylesNames
    compound: true
}>

export const EmptyStateIndicator = factory<EmptyStateIndicatorFactory>((_props, ref) => {
    const props = useProps('EmptyStateIndicator', null, _props)
    const { classNames, className, style, styles, children, mod, ...others } = props

    const ctx = useEmptyStateContext()

    return (
        <Box
            ref={ref}
            mod={[{ 'with-background': ctx.withIndicatorBackground }, mod]}
            {...ctx.getStyles('indicator', { className, style, classNames, styles })}
            {...others}
        >
            {children}
        </Box>
    )
})

EmptyStateIndicator.classes = classes
EmptyStateIndicator.displayName = '@xiaoye-react/ui/EmptyStateIndicator'
