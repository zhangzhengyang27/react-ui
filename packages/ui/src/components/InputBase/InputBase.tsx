import { forwardRef } from 'react'
import {
    Box,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getFontSize,
    getSize,
    MantineSize,
    rem,
    StylesApiProps,
    useProps,
    useStyles,
    type BoxProps
} from '../../core'
import classes from './InputBase.module.css'

export type InputBaseStylesNames = 'wrapper' | 'input' | 'section' | 'placeholder' | 'root'

export interface InputBaseProps extends BoxProps, StylesApiProps<InputBaseFactory>, ElementProps<'input', 'size'> {
    /** Controls disabled state */
    disabled?: boolean

    /** Adds `pointer-events: none` to the section  */
    sectionPointerEvents?: 'none' | 'auto'

    /** Replaces default right section */
    rightSection?: React.ReactNode

    /** Sets width of the right section */
    rightSectionWidth?: React.CSSProperties['width']

    /** Replaces default left section */
    leftSection?: React.ReactNode

    /** Sets width of the left section */
    leftSectionWidth?: React.CSSProperties['width']

    /** Props passed to the root element */
    wrapperProps?: Record<string, any>

    /** Controls size of the input */
    size?: MantineSize

    /** If set, variant of the input is controlled */
    variant?: string

    /** If set, input will have invalid styles */
    invalid?: boolean

    /** If set, multiline styles will be applied (for Textarea) */
    multiline?: boolean

    /** Static selectors base */
    __staticSelector?: string

    /** Component used as the input element */
    component?: any
}

export type InputBaseFactory = Factory<{
    props: InputBaseProps
    ref: HTMLInputElement
    stylesNames: InputBaseStylesNames
}>

const defaultProps = {
    size: 'sm'
} satisfies Partial<InputBaseProps>

const varsResolver = createVarsResolver<InputBaseFactory>((theme, { size, rightSectionWidth, leftSectionWidth }) => ({
    wrapper: {
        '--input-height': getSize(size, 'input-height'),
        '--input-fz': getFontSize(size),
        '--input-right-section-width': rightSectionWidth !== undefined ? rem(rightSectionWidth) : undefined,
        '--input-left-section-width': leftSectionWidth !== undefined ? rem(leftSectionWidth) : undefined
    }
}))

export const InputBase = factory<InputBaseFactory>((_props, ref) => {
    const props = useProps('InputBase', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        disabled,
        sectionPointerEvents,
        rightSection,
        rightSectionWidth,
        leftSection,
        leftSectionWidth,
        wrapperProps,
        size,
        variant,
        invalid,
        multiline,
        __staticSelector,
        component,
        children,
        ...others
    } = props

    const getStyles = useStyles<InputBaseFactory>({
        name: 'InputBase',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver,
        rootSelector: 'wrapper'
    })

    const sectionProps = {
        'data-position': undefined as 'left' | 'right' | undefined,
        'data-pointer-events': sectionPointerEvents || undefined
    }

    return (
        <Box
            {...getStyles('wrapper')}
            {...wrapperProps}
            mod={[{ invalid, disabled, multiline }, wrapperProps?.mod]}
            data-variant={variant}
            data-size={size}
        >
            {leftSection && (
                <div {...getStyles('section')} {...sectionProps} data-position="left">
                    {leftSection}
                </div>
            )}
            <Box component={component || 'input'} disabled={disabled} {...others} ref={ref} {...getStyles('input')}>
                {children}
            </Box>
            {rightSection && (
                <div {...getStyles('section')} {...sectionProps} data-position="right">
                    {rightSection}
                </div>
            )}
        </Box>
    )
})

InputBase.classes = classes
;(InputBase as any).varsResolver = varsResolver
InputBase.displayName = '@react-ui/ui/InputBase'

export namespace InputBase {
    export type Props = InputBaseProps
    export type StylesNames = InputBaseStylesNames
    export type Factory = InputBaseFactory
}
