import cx from 'clsx'
import { polymorphicFactory, PolymorphicFactory, useProps } from '../../core'
import { Text, TextCssVariables, TextProps, TextStylesNames, TextVariant } from '../Text'
import classes from './Anchor.module.css'

export type AnchorStylesNames = TextStylesNames
export type AnchorVariant = TextVariant
export type AnchorCssVariables = TextCssVariables

export interface AnchorProps extends Omit<TextProps, 'span'> {
    /** Defines when text-decoration: underline styles are applied. @default hover */
    underline?: 'always' | 'hover' | 'not-hover' | 'never'
}

export type AnchorFactory = PolymorphicFactory<{
    props: AnchorProps
    defaultComponent: 'a'
    defaultRef: HTMLAnchorElement
    stylesNames: AnchorStylesNames
    vars: AnchorCssVariables
    variant: AnchorVariant
}>

const defaultProps = {
    underline: 'hover'
} satisfies Partial<AnchorProps>

/**
 * 锚点链接组件。对齐 mantine Anchor（基于 Text，polymorphicFactory + CSS module）。
 */
export const Anchor = polymorphicFactory<AnchorFactory>((props, _ref) => {
    const { underline, className, unstyled, mod, ...others } = useProps('Anchor', defaultProps, props)

    return (
        <Text
            component="a"
            ref={_ref}
            className={cx({ [classes.root]: !unstyled }, className)}
            {...others}
            mod={[{ underline }, mod]}
            __staticSelector="Anchor"
            unstyled={unstyled}
        />
    )
})

Anchor.classes = classes
Anchor.displayName = '@react-ui/ui/Anchor'

export namespace Anchor {
    export type Props = AnchorProps
    export type StylesNames = AnchorStylesNames
    export type CssVariables = AnchorCssVariables
    export type Factory = AnchorFactory
    export type Variant = AnchorVariant
}
