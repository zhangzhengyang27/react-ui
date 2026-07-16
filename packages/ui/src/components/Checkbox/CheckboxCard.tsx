import { createContext, useContext } from 'react'
import { useUncontrolled } from '@react-ui/hooks'
import {
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getRadius,
    UIRadius,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { UnstyledButton } from '../UnstyledButton'
import { useCheckboxGroupContext } from './CheckboxGroup.context'
import classes from './CheckboxCard.module.css'

export interface CheckboxCardContextValue {
    checked: boolean
}

export const CheckboxCardContext = createContext<CheckboxCardContextValue | null>(null)

export type CheckboxCardStylesNames = 'card'
export type CheckboxCardCssVariables = {
    card: '--card-radius'
}

export interface CheckboxCardProps
    extends BoxProps, StylesApiProps<CheckboxCardFactory>, ElementProps<'button', 'onChange'> {
    /** Controlled component value */
    checked?: boolean

    /** Uncontrolled component default value */
    defaultChecked?: boolean

    //** 值变化时调用 */
    onChange?: (checked: boolean) => void

    /** Adds border to the root element */
    withBorder?: boolean

    /** 主题圆角的键或任意有效的 CSS 值 to set border-radius @default theme.defaultRadius */
    radius?: UIRadius

    /** Value of the checkbox, used with Checkbox.Group */
    value?: string
}

export type CheckboxCardFactory = Factory<{
    props: CheckboxCardProps
    ref: HTMLButtonElement
    stylesNames: CheckboxCardStylesNames
    vars: CheckboxCardCssVariables
}>

const defaultProps = {
    withBorder: true
} satisfies Partial<CheckboxCardProps>

const varsResolver = createVarsResolver<CheckboxCardFactory>((_, { radius }) => ({
    card: {
        '--card-radius': getRadius(radius)
    }
}))

export const CheckboxCard = factory<CheckboxCardFactory>((_props, ref) => {
    const props = useProps('CheckboxCard', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        checked,
        mod,
        withBorder,
        value,
        onClick,
        defaultChecked,
        onChange,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<CheckboxCardFactory>({
        name: 'CheckboxCard',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver,
        rootSelector: 'card'
    })

    const ctx = useCheckboxGroupContext()
    const _checked =
        typeof checked === 'boolean' ? checked : ctx ? ctx.value.includes(value || '') : undefined

    const [_value, setValue] = useUncontrolled({
        value: _checked,
        defaultValue: defaultChecked,
        finalValue: false,
        onChange
    })

    return (
        <CheckboxCardContext.Provider value={{ checked: _value }}>
            <UnstyledButton
                ref={ref}
                mod={[{ 'with-border': withBorder, checked: _value }, mod]}
                {...getStyles('card')}
                {...others}
                role="checkbox"
                aria-checked={_value}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    onClick?.(event)
                    if (ctx && value !== undefined) {
                        const nextValue = !_value
                            ? [...ctx.value, value]
                            : ctx.value.filter((v) => v !== value)
                        ctx.onChange(nextValue)
                    }
                    setValue(!_value)
                }}
            />
        </CheckboxCardContext.Provider>
    )
})

CheckboxCard.classes = classes
;(CheckboxCard as any).varsResolver = varsResolver
CheckboxCard.displayName = '@react-ui/ui/CheckboxCard'

export namespace CheckboxCard {
    export type Props = CheckboxCardProps
    export type StylesNames = CheckboxCardStylesNames
    export type CssVariables = CheckboxCardCssVariables
    export type Factory = CheckboxCardFactory
}
