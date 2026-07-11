import { useMemo, useState } from 'react'
import { useId, useUncontrolled } from '@react-ui/hooks'
import { BoxProps, factory, Factory, MantineSize, rem, StylesApiProps, useProps, useStyles } from '../../core'
import { CloseButton } from '../CloseButton'
import { Combobox } from '../Combobox'
import type { ComboboxOptionData } from '../Combobox'
import { InputBase } from '../InputBase'
import { InputWrapper } from '../Input'
import classes from './Autocomplete.module.css'

export type AutocompleteStylesNames = 'root' | 'dropdown' | 'options' | 'option' | 'empty' | 'group' | 'groupLabel'

export interface AutocompleteItem {
    value: string
    label: string
    disabled?: boolean
    group?: string
}

export type AutocompleteData = (string | AutocompleteItem)[]

export interface AutocompleteProps
    extends BoxProps,
        StylesApiProps<AutocompleteFactory>,
        Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'style' | 'value' | 'defaultValue' | 'onChange'> {
    /** Autocomplete options data */
    data?: AutocompleteData

    /** Controlled value */
    value?: string

    /** Initial value for uncontrolled component */
    defaultValue?: string

    /** Called when value changes */
    onChange?: (value: string) => void

    /** Placeholder displayed when no value is selected */
    placeholder?: string

    /** Label rendered above the input */
    label?: React.ReactNode

    /** Description rendered below the label */
    description?: React.ReactNode

    /** Error rendered below the input */
    error?: React.ReactNode

    /** If set, required asterisk is added to the label */
    required?: boolean

    /** Controls input size @default 'sm' */
    size?: MantineSize

    /** Determines whether value can be cleared */
    clearable?: boolean

    /** If set, input is disabled */
    disabled?: boolean

    /** Message displayed when no options match search value */
    nothingFoundMessage?: React.ReactNode

    /** Maximum height of the dropdown */
    maxDropdownHeight?: React.CSSProperties['maxHeight']

    /** Dropdown position relative to the target element */
    position?: import('../../core').FloatingPosition
}

export type AutocompleteFactory = Factory<{
    props: AutocompleteProps
    ref: HTMLInputElement
    stylesNames: AutocompleteStylesNames
}>

const defaultProps = {
    size: 'sm'
} satisfies Partial<AutocompleteProps>

function AutocompleteChevronIcon(props: React.ComponentProps<'svg'>) {
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

function parseAutocompleteData(data?: AutocompleteData): ComboboxOptionData[] {
    if (!data) return []
    return data.map(item => {
        if (typeof item === 'string') {
            return { value: item, label: item }
        }
        return { value: item.value, label: item.label ?? item.value, disabled: item.disabled, group: item.group }
    })
}

export const Autocomplete = factory<AutocompleteFactory>((_props, ref) => {
    const props = useProps('Autocomplete', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        data,
        value,
        defaultValue,
        onChange,
        placeholder,
        label,
        description,
        error,
        required,
        size,
        clearable,
        disabled,
        nothingFoundMessage,
        maxDropdownHeight,
        position,
        id,
        ...others
    } = props

    const parsedData = useMemo(() => parseAutocompleteData(data), [data])
    const [selectedValue, setSelectedValue] = useUncontrolled<string>({
        value,
        defaultValue,
        finalValue: '',
        onChange
    })

    const [opened, setOpened] = useState(false)
    const inputId = useId(id)

    const filteredData = useMemo(() => {
        if (!selectedValue) return parsedData
        const query = selectedValue.toLowerCase()
        return parsedData.filter(item => item.label.toLowerCase().includes(query))
    }, [parsedData, selectedValue])

    const handleOptionSubmit = (optionValue: string) => {
        if (disabled) return

        if (value === undefined) {
            setSelectedValue(optionValue)
        }
        onChange?.(optionValue)
        setOpened(false)
    }

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        if (disabled) return

        if (value === undefined) {
            setSelectedValue('')
        }
        onChange?.('')
    }

    const rightSection = (
        <div className={classes.section}>
            {clearable && selectedValue ? (
                <CloseButton size="xs" onClick={handleClear} aria-label="清除输入" />
            ) : (
                <AutocompleteChevronIcon className={classes.chevron} />
            )}
        </div>
    )

    const getStyles = useStyles<AutocompleteFactory>({
        name: 'Autocomplete',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        rootSelector: 'root'
    })

    const input = (
        <Combobox
            opened={opened}
            onChange={setOpened}
            selectedValues={selectedValue ? [selectedValue] : []}
            onOptionSubmit={handleOptionSubmit}
            position={position}
            disabled={disabled}
        >
            <Combobox.Target>
                <InputBase
                    {...others}
                    id={inputId}
                    ref={ref}
                    component="input"
                    type="text"
                    value={selectedValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    role="combobox"
                    size={size}
                    rightSection={rightSection}
                    onClick={() => {
                        if (!disabled) {
                            setOpened(true)
                        }
                    }}
                    onFocus={() => {
                        if (!disabled) {
                            setOpened(true)
                        }
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const nextValue = event.currentTarget.value
                        if (value === undefined) {
                            setSelectedValue(nextValue)
                        }
                        onChange?.(nextValue)
                        if (!opened) {
                            setOpened(true)
                        }
                    }}
                />
            </Combobox.Target>

            <Combobox.Dropdown style={{ maxHeight: maxDropdownHeight ? rem(maxDropdownHeight) : undefined }}>
                <Combobox.Options>
                    {filteredData.length === 0 && nothingFoundMessage ? (
                        <Combobox.Empty>{nothingFoundMessage}</Combobox.Empty>
                    ) : (
                        renderOptions(filteredData)
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    )

    const hasWrapper = label || description || error

    if (!hasWrapper) {
        return input
    }

    return (
        <InputWrapper
            {...getStyles('root')}
            label={label}
            description={description}
            error={error}
            required={required}
            inputId={inputId}
        >
            {input}
        </InputWrapper>
    )
})

function renderOptions(data: ComboboxOptionData[]) {
    const result: React.ReactNode[] = []
    let lastGroup: string | undefined

    data.forEach(item => {
        if (item.group && item.group !== lastGroup) {
            result.push(<Combobox.Group key={`group-${item.group}`} label={item.group} />)
            lastGroup = item.group
        }

        result.push(
            <Combobox.Option key={item.value} value={item.value} disabled={item.disabled}>
                {item.label}
            </Combobox.Option>
        )
    })

    return result
}

Autocomplete.classes = classes
Autocomplete.displayName = '@react-ui/ui/Autocomplete'

export namespace Autocomplete {
    export type Props = AutocompleteProps
    export type StylesNames = AutocompleteStylesNames
    export type Factory = AutocompleteFactory
}
