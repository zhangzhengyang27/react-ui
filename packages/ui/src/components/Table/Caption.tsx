import {
    Box,
    factory,
    useProps,
    type BoxProps,
    type CompoundStylesApiProps,
    type ElementProps,
    type Factory
} from '../../core'
import { useTableContext } from './Table.context'
import classes from './Table.module.css'

export type CaptionStylesNames = 'caption'

export interface CaptionProps extends BoxProps, CompoundStylesApiProps<CaptionFactory>, ElementProps<'caption'> {
    children?: React.ReactNode
}

export type CaptionFactory = Factory<{
    props: CaptionProps
    ref: HTMLTableCaptionElement
    stylesNames: CaptionStylesNames
    compound: true
}>

export const Caption = factory<CaptionFactory>((props, ref) => {
    const { classNames, className, style, styles, children, ...others } = useProps('Caption', null, props)
    const ctx = useTableContext()

    return (
        <Box
            component="caption"
            ref={ref}
            {...others}
            {...ctx.getStyles('caption', { className, classNames, style, styles })}
        >
            {children}
        </Box>
    )
})

Caption.displayName = '@xiaoye-react/ui/Caption'
Caption.classes = classes
