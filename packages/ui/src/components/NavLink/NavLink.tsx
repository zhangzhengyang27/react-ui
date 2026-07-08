import { useUncontrolled } from '@react-ui/hooks'

import {
    Box,
    BoxProps,
    createVarsResolver,
    MantineColor,
    polymorphicFactory,
    PolymorphicFactory,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { UnstyledButton } from '../UnstyledButton'
import classes from './NavLink.module.css'

export type NavLinkStylesNames =
    | 'root'
    | 'inner'
    | 'body'
    | 'label'
    | 'description'
    | 'section'
    | 'chevron'
    | 'children'
export type NavLinkVariant = 'light' | 'subtle' | 'filled' | 'transparent'

export type NavLinkCssVariables = {
    root: '--navlink-color' | '--navlink-bg' | '--navlink-hover'
}

export interface NavLinkProps extends BoxProps, StylesApiProps<NavLinkFactory> {
    /** Determines whether the link is active */
    active?: boolean

    /** Link label */
    label?: React.ReactNode

    /** Link description */
    description?: React.ReactNode

    /** Content displayed on the left side of the label */
    leftSection?: React.ReactNode

    /** Content displayed on the right side of the label */
    rightSection?: React.ReactNode

    /** Nested links */
    children?: React.ReactNode

    /** Controlled opened state of nested links */
    opened?: boolean

    /** Uncontrolled opened state of nested links */
    defaultOpened?: boolean

    /** Called when opened state changes */
    onChange?: (opened: boolean) => void

    /** Determines whether the link is disabled */
    disabled?: boolean

    /** Key of theme.colors or any valid CSS color */
    color?: MantineColor

    /** Click event handler */
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export type NavLinkFactory = PolymorphicFactory<{
    props: NavLinkProps
    defaultRef: HTMLButtonElement
    defaultComponent: 'button'
    stylesNames: NavLinkStylesNames
    vars: NavLinkCssVariables
    variant: NavLinkVariant
}>

const defaultProps = {} satisfies Partial<NavLinkProps>

const varsResolver = createVarsResolver<NavLinkFactory>((theme, { color }) => {
    const colors = theme.variantColorResolver({
        color: color || theme.primaryColor,
        theme,
        variant: 'light'
    })

    return {
        root: {
            '--navlink-color': colors.color,
            '--navlink-bg': colors.background,
            '--navlink-hover': colors.hover
        }
    }
})

export const NavLink = polymorphicFactory<NavLinkFactory>((_props, ref) => {
    const props = useProps('NavLink', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        active,
        label,
        description,
        leftSection,
        rightSection,
        children,
        opened,
        defaultOpened,
        onChange,
        disabled,
        onClick,
        mod,
        attributes,
        ...others
    } = props

    const hasChildren = !!children

    const [_opened, setOpened] = useUncontrolled({
        value: opened,
        defaultValue: defaultOpened,
        finalValue: false,
        onChange
    })

    const getStyles = useStyles<NavLinkFactory>({
        name: 'NavLink',
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver
    })

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (hasChildren) {
            setOpened(!_opened)
        }

        onClick?.(event)
    }

    return (
        <>
            <UnstyledButton
                {...getStyles('root')}
                ref={ref}
                disabled={disabled}
                mod={[
                    {
                        active,
                        disabled,
                        opened: _opened,
                        'with-children': hasChildren
                    },
                    mod
                ]}
                data-active={active || undefined}
                data-disabled={disabled || undefined}
                data-opened={_opened || undefined}
                onClick={handleClick}
                {...others}
            >
                <span {...getStyles('inner')}>
                    {leftSection && (
                        <Box component="span" {...getStyles('section')} mod={{ position: 'left' }}>
                            {leftSection}
                        </Box>
                    )}

                    <span {...getStyles('body')}>
                        {label && <span {...getStyles('label')}>{label}</span>}
                        {description && (
                            <Box component="span" {...getStyles('description')} mod={{ active }}>
                                {description}
                            </Box>
                        )}
                    </span>

                    {!hasChildren && rightSection && (
                        <Box component="span" {...getStyles('section')} mod={{ position: 'right' }}>
                            {rightSection}
                        </Box>
                    )}

                    {hasChildren && (
                        <Box component="span" {...getStyles('chevron')} mod={{ opened: _opened }}>
                            {rightSection}
                            <svg viewBox="0 0 15 15" fill="none" width={16} height={16}>
                                <path
                                    d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Box>
                    )}
                </span>
            </UnstyledButton>

            {hasChildren && _opened && <div {...getStyles('children')}>{children}</div>}
        </>
    )
})

NavLink.classes = classes
;(NavLink as any).varsResolver = varsResolver
NavLink.displayName = '@react-ui/ui/NavLink'

export namespace NavLink {
    export type Props = NavLinkProps
    export type StylesNames = NavLinkStylesNames
    export type CssVariables = NavLinkCssVariables
    export type Factory = NavLinkFactory
    export type Variant = NavLinkVariant
}
