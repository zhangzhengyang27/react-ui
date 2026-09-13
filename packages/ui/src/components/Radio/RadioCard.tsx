import { useState } from 'react'
import { UnstyledButton } from '../UnstyledButton'
import {
    factory,
    useProps,
    type BoxProps,
    type Factory,
    type UIRadius,
    type StylesApiProps
} from '../../core'
import { useRadioGroupContext } from './RadioGroup.context'
import classes from './Radio.module.css'

export type RadioCardStylesNames = 'card'

export interface RadioCardProps extends BoxProps, StylesApiProps<RadioCardFactory> {
    /** Card content */
    children?: React.ReactNode

    /** If set, card is in checked state */
    checked?: boolean

    /** 非受控组件的默认选中状态 */
    defaultChecked?: boolean

    /** 选中状态变化时调用 */
    onChange?: (checked: boolean) => void

    /** Called when card is clicked */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void

    /** If set, card is disabled */
    disabled?: boolean

    /** 主题圆角的键或任意有效的 CSS 值 */
    radius?: UIRadius

    /** Card value, used when inside Radio.Group */
    value?: string
}

export type RadioCardFactory = Factory<{
    props: RadioCardProps
    ref: HTMLButtonElement
    stylesNames: RadioCardStylesNames
}>

const defaultProps = {} satisfies Partial<RadioCardProps>

export const RadioCard = factory<RadioCardFactory>((_props, ref) => {
    const props = useProps('RadioCard', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        attributes,
        children,
        checked,
        defaultChecked,
        onChange,
        onClick,
        disabled,
        value,
        mod,
        ...others
    } = props

    const groupCtx = useRadioGroupContext()
    // 组内未传 value 时无法从 group 状态推导 checked，点击忽略并 warn（与 CheckboxCard 行为一致）
    const missingGroupValue = groupCtx !== null && value === undefined && checked === undefined
    const groupChecked = groupCtx !== null && value !== undefined ? groupCtx.value === value : undefined

    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false)
    const isChecked =
        checked !== undefined ? checked : groupChecked !== undefined ? groupChecked : internalChecked

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return

        if (missingGroupValue) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn(
                    '[@xiaoye-react/ui] RadioCard is used within Radio.Group without a `value` prop, the click is ignored. Provide a `value` to make it selectable.'
                )
            }
            onClick?.(event)
            return
        }

        if (groupCtx && value !== undefined) {
            groupCtx.onChange(value)
            if (!isChecked) {
                onChange?.(true)
            }
            onClick?.(event)
            return
        }

        const next = !isChecked
        if (checked === undefined) {
            setInternalChecked(next)
        }
        onChange?.(next)
        onClick?.(event)
    }

    return (
        <UnstyledButton
            ref={ref}
            type="button"
            disabled={disabled}
            onClick={handleClick}
            aria-checked={isChecked}
            role="radio"
            data-checked={isChecked || undefined}
            data-radio-card
            className={className}
            style={style}
            mod={mod}
            {...others}
        >
            {children}
        </UnstyledButton>
    )
})

RadioCard.classes = classes
RadioCard.displayName = '@xiaoye-react/ui/RadioCard'

export namespace RadioCard {
    export type Props = RadioCardProps
    export type Factory = RadioCardFactory
}
