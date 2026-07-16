import { useId } from '@react-ui/hooks'
import { useState } from 'react'
import {
    BoxProps,
    createVarsResolver,
    factory,
    Factory,
    getFontSize,
    getSize,
    UISize,
    rem,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { ActionIcon, ActionIconProps } from '../ActionIcon'
import { InputBase, InputBaseProps, InputBaseStylesNames } from '../InputBase'
import { InputWrapper } from '../Input'
import classes from './PasswordInput.module.css'

export type PasswordInputStylesNames = InputBaseStylesNames | 'visibilityToggle'

export interface PasswordInputProps
    extends BoxProps,
        StylesApiProps<PasswordInputFactory>,
        Omit<
            InputBaseProps,
            | 'classNames'
            | 'styles'
            | 'vars'
            | 'unstyled'
            | 'attributes'
            | 'rightSection'
            | 'rightSectionWidth'
            | 'type'
            | 'wrapperProps'
        > {
    //** 渲染在输入框上方的标签 */
    label?: React.ReactNode

    //** 渲染在标签下方的描述 */
    description?: React.ReactNode

    //** 渲染在输入框下方的错误 */
    error?: React.ReactNode

    //** 如果设置，则会在标签上添加必填星号 */
    withAsterisk?: boolean

    /** Determines whether visibility toggle button should be displayed @default true */
    visibilityToggle?: boolean

    /** Replaces default visibility toggle icon */
    visibilityToggleIcon?: ({ reveal }: { reveal: boolean }) => React.ReactNode

    /** Props passed to the visibility toggle ActionIcon */
    visibilityToggleButtonProps?: ActionIconProps

    /** Props passed to the root InputWrapper */
    wrapperProps?: React.ComponentProps<'div'>
}

export type PasswordInputFactory = Factory<{
    props: PasswordInputProps
    ref: HTMLInputElement
    stylesNames: PasswordInputStylesNames
}>

const defaultProps = {
    size: 'sm',
    visibilityToggle: true
} satisfies Partial<PasswordInputProps>

const varsResolver = createVarsResolver<PasswordInputFactory>((_, { size, leftSectionWidth }) => ({
    root: {
        '--input-height': getSize(size, 'input-height'),
        '--input-fz': getFontSize(size),
        '--input-left-section-width': leftSectionWidth !== undefined ? rem(leftSectionWidth) : undefined
    }
}))

function EyeIcon({ style, ...others }: React.ComponentProps<'svg'>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ ...style, width: 'var(--ai-icon-size, 70%)', height: 'var(--ai-icon-size, 70%)' }}
            {...others}
        >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}

function EyeOffIcon({ style, ...others }: React.ComponentProps<'svg'>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ ...style, width: 'var(--ai-icon-size, 70%)', height: 'var(--ai-icon-size, 70%)' }}
            {...others}
        >
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <line x1="2" x2="22" y1="2" y2="22" />
        </svg>
    )
}

export const PasswordInput = factory<PasswordInputFactory>((_props, ref) => {
    const props = useProps('PasswordInput', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        attributes,
        label,
        description,
        error,
        withAsterisk,
        visibilityToggle,
        visibilityToggleIcon,
        visibilityToggleButtonProps,
        wrapperProps,
        disabled,
        invalid,
        size,
        variant,
        ...others
    } = props

    const getStyles = useStyles<PasswordInputFactory>({
        name: 'PasswordInput',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver,
        attributes,
        rootSelector: 'root'
    })

    const [reveal, setReveal] = useState(false)
    const inputId = useId()

    const toggleButton = visibilityToggle ? (
        <ActionIcon
            {...getStyles('visibilityToggle')}
            variant="transparent"
            size={`input-${size}` as UISize | `input-${UISize}`}
            disabled={disabled}
            onClick={() => setReveal(r => !r)}
            aria-label={reveal ? 'Hide password' : 'Show password'}
            tabIndex={-1}
            {...visibilityToggleButtonProps}
        >
            {visibilityToggleIcon ? visibilityToggleIcon({ reveal }) : reveal ? <EyeOffIcon /> : <EyeIcon />}
        </ActionIcon>
    ) : undefined

    return (
        <InputWrapper
            {...getStyles('root')}
            {...wrapperProps}
            label={label}
            description={description}
            error={error}
            required={withAsterisk}
            inputId={inputId}
        >
            <InputBase
                {...others}
                id={inputId}
                ref={ref}
                type={reveal ? 'text' : 'password'}
                disabled={disabled}
                invalid={invalid}
                size={size}
                variant={variant}
                rightSection={toggleButton}
                unstyled={unstyled}
                classNames={classNames as any}
                styles={styles as any}
            />
        </InputWrapper>
    )
})

PasswordInput.classes = classes
;(PasswordInput as any).varsResolver = varsResolver
PasswordInput.displayName = '@react-ui/ui/PasswordInput'

export namespace PasswordInput {
    export type Props = PasswordInputProps
    export type StylesNames = PasswordInputStylesNames
    export type Factory = PasswordInputFactory
}
