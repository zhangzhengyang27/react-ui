import {
    Box,
    createVarsResolver,
    factory,
    getDefaultZIndex,
    getSpacing,
    useProps,
    useStyles,
    type BoxProps,
    type ElementProps,
    type Factory,
    type MantineSize,
    type StylesApiProps
} from '../../core'
import { Portal } from '../Portal'
import classes from './Affix.module.css'

export type AffixStylesNames = 'root'

export type AffixCssVariables = {
    root: '--affix-z-index' | '--affix-top' | '--affix-left' | '--affix-bottom' | '--affix-right'
}

export interface AffixPosition {
    top?: MantineSize | (string & {}) | number
    left?: MantineSize | (string & {}) | number
    bottom?: MantineSize | (string & {}) | number
    right?: MantineSize | (string & {}) | number
}

export interface AffixProps extends BoxProps, StylesApiProps<AffixFactory>, ElementProps<'div'> {
    /** Root element z-index */
    zIndex?: React.CSSProperties['zIndex']

    /** Determines whether the component is rendered within Portal */
    withinPortal?: boolean

    /** Affix position on screen */
    position?: AffixPosition
}

export type AffixFactory = Factory<{
    props: AffixProps
    ref: HTMLDivElement
    stylesNames: AffixStylesNames
    vars: AffixCssVariables
}>

const defaultProps = {
    position: { bottom: 0, right: 0 },
    zIndex: getDefaultZIndex('modal'),
    withinPortal: true
} satisfies Partial<AffixProps>

const varsResolver = createVarsResolver<AffixFactory>((_, { zIndex, position }) => ({
    root: {
        '--affix-z-index': zIndex?.toString(),
        '--affix-top': getSpacing(position?.top),
        '--affix-left': getSpacing(position?.left),
        '--affix-bottom': getSpacing(position?.bottom),
        '--affix-right': getSpacing(position?.right)
    }
}))

export const Affix = factory<AffixFactory>((_props, _ref) => {
    const props = useProps('Affix', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, zIndex, withinPortal, position, ...others } = props

    const getStyles = useStyles<AffixFactory>({
        name: 'Affix',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver
    })

    const content = <Box ref={_ref} {...getStyles('root')} {...others} />

    if (withinPortal) {
        return <Portal>{content}</Portal>
    }

    return content
})

Affix.classes = classes
Affix.displayName = '@mantine/core/Affix'
