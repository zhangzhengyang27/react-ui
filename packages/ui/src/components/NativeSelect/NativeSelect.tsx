import { useId, useUncontrolled } from '@react-ui/hooks'
import {
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getSize,
    MantineSize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { InputBase } from '../InputBase'
import { InputWrapper } from '../Input'
import classes from './NativeSelect.module.css'

export type NativeSelectStylesNames = 'root' | 'input' | 'section'

export type NativeSelectCssVariables = {
    root: '--native-select-chevron-size'
}

export interface NativeSelectDataItem {
    value: string
    label?: string
    disabled?: boolean
}

export type NativeSelectData = (string | NativeSelectDataItem)[]

export interface NativeSelectProps
    extends BoxProps,
        ElementProps<'select', 'size'>,
        StylesApiProps<NativeSelectFactory> {
    /** Controls input and chevron size @default 'sm' */
    size?: MantineSize

    /** Select options data */
    data?: NativeSelectData

    /** Label rendered above the input */
    label?: React.ReactNode

    /** Description rendered below the label */
    description?: React.ReactNode

    /** Error rendered below the input */
    error?: React.ReactNode

    /** If set, disabled styles and behavior are applied */
    disabled?: boolean

    /** Controlled value */
    value?: string

    /** Initial value for uncontrolled component */
    defaultValue?: string

    /** Called when selected value changes */
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export type NativeSelectFactory = Factory<{
    props: NativeSelectProps
    ref: HTMLSelectElement
    stylesNames: NativeSelectStylesNames
    vars: NativeSelectCssVariables
}>

const defaultProps = {
    size: 'sm'
} satisfies Partial<NativeSelectProps>

const varsResolver = createVarsResolver<NativeSelectFactory>((theme, { size }) => ({
    root: {
        '--native-select-chevron-size': getSize(size, 'native-select-chevron-size')
    }
}))

function NativeSelectChevronIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    )
}

export const NativeSelect = factory<NativeSelectFactory>((_props, ref) => {
    const props = useProps('NativeSelect', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        attributes,
        size,
        data,
        label,
        description,
        error,
        disabled,
        value,
        defaultValue,
        onChange,
        id,
        ...others
    } = props

    const [selectedValue, setSelectedValue] = useUncontrolled<string | undefined>({
        value,
        defaultValue,
        finalValue: ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (disabled) {
            return
        }

        if (value === undefined) {
            setSelectedValue(event.currentTarget.value)
        }

        onChange?.(event)
    }

    const inputId = useId(id)

    const getStyles = useStyles<NativeSelectFactory>({
        name: 'NativeSelect',
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

    const options = data?.map((item, index) => {
        if (typeof item === 'string') {
            return (
                <option key={`${item}-${index}`} value={item}>
                    {item}
                </option>
            )
        }

        return (
            <option key={item.value || index} value={item.value} disabled={item.disabled}>
                {item.label || item.value}
            </option>
        )
    })

    return (
        <InputWrapper {...getStyles('root')} label={label} description={description} error={error} inputId={inputId}>
            <InputBase
                component="select"
                id={inputId}
                ref={ref as any}
                disabled={disabled}
                value={selectedValue ?? ''}
                onChange={handleChange as any}
                size={size}
                rightSection={<NativeSelectChevronIcon {...getStyles('section')} />}
                {...getStyles('input')}
                {...(others as any)}
            >
                {options}
            </InputBase>
        </InputWrapper>
    )
})

NativeSelect.classes = classes
;(NativeSelect as any).varsResolver = varsResolver
NativeSelect.displayName = '@react-ui/ui/NativeSelect'

export namespace NativeSelect {
    export type Props = NativeSelectProps
    export type StylesNames = NativeSelectStylesNames
    export type CssVariables = NativeSelectCssVariables
    export type Factory = NativeSelectFactory
}
