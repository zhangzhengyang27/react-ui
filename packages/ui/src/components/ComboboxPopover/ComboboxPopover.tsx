import { useMemo } from 'react'
import cx from 'clsx'
import { useUncontrolled } from '@react-ui/hooks'
import { Factory, genericFactory, rem, StylesApiProps, useProps } from '../../core'
import { CheckIcon } from '../Checkbox'
import { Combobox } from '../Combobox'
import type { ComboboxOptionData } from '../Combobox/Combobox.context'
import { ScrollArea, ScrollAreaProps } from '../ScrollArea'
import type { ComboboxPopoverValue } from './ComboboxPopover.types'
import { ComboboxPopoverTarget } from './ComboboxPopoverTarget'
import classes from '../Combobox/Combobox.module.css'

export interface ComboboxItem {
    value: string
    label: string
    disabled?: boolean
}

export interface ComboboxItemGroup {
    group: string
    items: ComboboxItem[]
}

export type ComboboxData = (string | ComboboxItem | ComboboxItemGroup)[]

export type ComboboxParsedItem = ComboboxItem | ComboboxItemGroup

export function isOptionsGroup(item: ComboboxParsedItem): item is ComboboxItemGroup {
    return 'group' in item && 'items' in item
}

export function getParsedComboboxData(data?: ComboboxData): ComboboxParsedItem[] {
    if (!data) return []
    return data.map((item) => {
        if (typeof item === 'string') {
            return { value: item, label: item }
        }
        if (isOptionsGroup(item)) {
            return { group: item.group, items: item.items.map((i) => ({ ...i })) }
        }
        return { ...item }
    })
}

export function getOptionsLockup(data: ComboboxParsedItem[]) {
    const lockup: Record<string, ComboboxItem> = {}
    data.forEach((item) => {
        if (isOptionsGroup(item)) {
            item.items.forEach((option) => {
                lockup[option.value] = option
            })
        } else {
            lockup[item.value] = item
        }
    })
    return lockup
}

export interface OptionsFilterInput<T extends string = string> {
    options: ComboboxParsedItem[]
    search: string
    limit: number
}

export type OptionsFilter<T extends string = string> = (input: OptionsFilterInput<T>) => ComboboxParsedItem[]

export function defaultOptionsFilter({ options, search, limit }: OptionsFilterInput): ComboboxParsedItem[] {
    const parsedSearch = search.trim().toLowerCase()
    const result: ComboboxParsedItem[] = []

    const matches = (item: ComboboxItem) =>
        (item.label ?? '').toLowerCase().includes(parsedSearch) ||
        (item.value ?? '').toLowerCase().includes(parsedSearch)

    for (const option of options) {
        if (result.length >= limit) {
            break
        }

        if (isOptionsGroup(option)) {
            const filteredItems = option.items.filter(matches)

            if (filteredItems.length > 0) {
                result.push({ group: option.group, items: filteredItems })
            }
        } else if (matches(option)) {
            result.push(option)
        }
    }

    return result
}

export interface ComboboxLikeRenderOptionInput<T extends ComboboxItem = ComboboxItem> {
    option: T
    checked: boolean
}

export type ComboboxPopoverStylesNames = 'dropdown' | 'options' | 'option' | 'optionLabel' | 'empty' | 'group' | 'groupLabel'

export interface ComboboxPopoverProps<
    Multiple extends boolean = false,
    Value extends string = string
> extends StylesApiProps<ComboboxPopoverFactory> {
    /** If set, multiple items can be selected at the same time */
    multiple?: Multiple

    /** Controlled component value */
    value?: ComboboxPopoverValue<Multiple, Value>

    /** Uncontrolled component default value */
    defaultValue?: ComboboxPopoverValue<Multiple, Value>

    //** 值变化时调用 */
    onChange?: (value: ComboboxPopoverValue<Multiple, Value>) => void

    /** Data used to generate options */
    data?: ComboboxData

    /** Controlled dropdown opened state */
    dropdownOpened?: boolean

    /** Uncontrolled dropdown initial opened state */
    defaultDropdownOpened?: boolean

    /** Called when dropdown opens */
    onDropdownOpen?: () => void

    /** Called when dropdown closes */
    onDropdownClose?: () => void

    /** Called when option is submitted from dropdown */
    onOptionSubmit?: (value: Value) => void

    /** Function based on which items are filtered and sorted */
    filter?: OptionsFilter<Value>

    /** Maximum number of options displayed at a time @default Infinity */
    limit?: number

    /** Determines whether the options should be wrapped with ScrollArea.AutoSize @default true */
    withScrollArea?: boolean

    /** max-height of the dropdown @default 250 */
    maxDropdownHeight?: number | string

    /** Displays check icon near the selected option label @default true */
    withCheckIcon?: boolean

    /** Aligns unchecked labels with the checked one @default false */
    withAlignedLabels?: boolean

    /** Position of the check icon relative to the option label @default 'left' */
    checkIconPosition?: 'left' | 'right'

    /** Message displayed when no options match the search query or when there is no data */
    nothingFoundMessage?: React.ReactNode

    /** Allows searching through options @default false */
    searchable?: boolean

    /** Controlled search value */
    searchValue?: string

    /** Default search value */
    defaultSearchValue?: string

    /** Called when search changes */
    onSearchChange?: (value: string) => void

    /** Allows deselecting the selected option by clicking it (only for single mode) @default true */
    allowDeselect?: boolean

    /** A function to render content of the option */
    renderOption?: (input: ComboboxLikeRenderOptionInput<ComboboxItem>) => React.ReactNode

    /** Props passed down to the underlying ScrollArea component in the dropdown */
    scrollAreaProps?: ScrollAreaProps

    /** Hidden input name for form submission */
    name?: string

    /** Hidden input form for form submission */
    form?: string

    /** Content of the component */
    children?: React.ReactNode

    /** Divider used to separate values in the hidden input value attribute @default ',' */
    hiddenInputValuesDivider?: string
}

export type ComboboxPopoverFactory = Factory<{
    props: ComboboxPopoverProps
    ref: HTMLDivElement
    stylesNames: ComboboxPopoverStylesNames
    signature: <Multiple extends boolean = false, Value extends string = string>(
        props: ComboboxPopoverProps<Multiple, Value>
    ) => React.JSX.Element
    staticComponents: {
        Target: typeof ComboboxPopoverTarget
    }
}>

const defaultProps = {
    withCheckIcon: true,
    allowDeselect: true,
    checkIconPosition: 'left',
    hiddenInputValuesDivider: ','
} satisfies Partial<ComboboxPopoverProps>

function isValueChecked(value: string | string[] | undefined | null, optionValue: string) {
    return Array.isArray(value) ? value.includes(optionValue) : value === optionValue
}

interface OptionProps {
    data: ComboboxItem
    withCheckIcon?: boolean
    withAlignedLabels?: boolean
    value?: string | string[] | null
    checkIconPosition?: 'left' | 'right'
    unstyled: boolean | undefined
    renderOption?: (input: ComboboxLikeRenderOptionInput<ComboboxItem>) => React.ReactNode
}

function Option({
    data,
    withCheckIcon,
    withAlignedLabels,
    value,
    checkIconPosition,
    unstyled,
    renderOption
}: OptionProps) {
    const checked = isValueChecked(value, data.value)
    const check =
        withCheckIcon &&
        (checked ? (
            <CheckIcon className={classes.optionsDropdownCheckIcon} />
        ) : withAlignedLabels ? (
            <div className={classes.optionsDropdownCheckPlaceholder} />
        ) : null)

    const defaultContent = (
        <>
            {checkIconPosition === 'left' && check}
            <span>{data.label}</span>
            {checkIconPosition === 'right' && check}
        </>
    )

    return (
        <Combobox.Option
            value={data.value}
            disabled={data.disabled}
            className={cx({ [classes.optionsDropdownOption]: !unstyled })}
            data-reverse={checkIconPosition === 'right' || undefined}
            data-checked={checked || undefined}
            aria-selected={checked}
        >
            {typeof renderOption === 'function' ? renderOption({ option: data, checked }) : defaultContent}
        </Combobox.Option>
    )
}

function renderOptions(
    data: ComboboxParsedItem[],
    value: string | string[] | null,
    withCheckIcon: boolean | undefined,
    withAlignedLabels: boolean | undefined,
    checkIconPosition: 'left' | 'right' | undefined,
    unstyled: boolean | undefined,
    renderOption: ((input: ComboboxLikeRenderOptionInput<ComboboxItem>) => React.ReactNode) | undefined
) {
    return data.map((item, index) => {
        if (isOptionsGroup(item)) {
            return (
                <Combobox.Group label={item.group} key={`group-${item.group}-${index}`}>
                    {item.items.map((option) => (
                        <Option
                            data={option}
                            key={option.value}
                            value={value}
                            withCheckIcon={withCheckIcon}
                            withAlignedLabels={withAlignedLabels}
                            checkIconPosition={checkIconPosition}
                            unstyled={unstyled}
                            renderOption={renderOption}
                        />
                    ))}
                </Combobox.Group>
            )
        }

        return (
            <Option
                data={item}
                key={item.value}
                value={value}
                withCheckIcon={withCheckIcon}
                withAlignedLabels={withAlignedLabels}
                checkIconPosition={checkIconPosition}
                unstyled={unstyled}
                renderOption={renderOption}
            />
        )
    })
}

export const ComboboxPopover = genericFactory<ComboboxPopoverFactory>((_props) => {
    const props = useProps('ComboboxPopover', defaultProps, _props)
    const {
        classNames,
        styles,
        unstyled,
        vars,
        children,
        multiple,
        value,
        defaultValue,
        onChange,
        data,
        dropdownOpened,
        defaultDropdownOpened,
        onDropdownOpen,
        onDropdownClose,
        onOptionSubmit,
        filter,
        limit,
        withScrollArea,
        maxDropdownHeight,
        withCheckIcon,
        withAlignedLabels,
        checkIconPosition,
        nothingFoundMessage,
        searchable,
        searchValue,
        defaultSearchValue,
        onSearchChange,
        allowDeselect,
        renderOption,
        scrollAreaProps,
        name,
        form,
        hiddenInputValuesDivider,
        ...others
    } = props

    const parsedData = useMemo(() => getParsedComboboxData(data), [data])
    const optionsLockup = useMemo(() => getOptionsLockup(parsedData), [parsedData])

    const [_value, setValue] = useUncontrolled<ComboboxPopoverValue<boolean, string>>({
        value,
        defaultValue,
        finalValue: multiple ? [] : null,
        onChange: onChange as any
    })

    const [_searchValue, setSearchValue] = useUncontrolled<string>({
        value: searchValue,
        defaultValue: defaultSearchValue,
        finalValue: '',
        onChange: onSearchChange
    })

    const [_opened, setOpened] = useUncontrolled<boolean>({
        value: dropdownOpened,
        defaultValue: defaultDropdownOpened,
        finalValue: false,
        onChange: (opened) => {
            if (opened) {
                onDropdownOpen?.()
            } else {
                onDropdownClose?.()
            }
        }
    })

    const filteredData = useMemo(() => {
        const filterFn = filter || defaultOptionsFilter
        return filterFn({
            options: parsedData,
            search: searchable ? _searchValue : '',
            limit: limit ?? Infinity
        })
    }, [filter, parsedData, searchable, _searchValue, limit])

    const selectedValues = Array.isArray(_value) ? _value : _value ? [_value] : []

    const handleOptionSubmit = (optionValue: string, option: ComboboxOptionData) => {
        onOptionSubmit?.(optionValue as any)

        if (multiple) {
            const currentValue = Array.isArray(_value) ? _value : []
            if (currentValue.includes(optionValue)) {
                setValue(currentValue.filter((v) => v !== optionValue))
            } else {
                setValue([...currentValue, optionValue])
            }
        } else {
            const nextValue = allowDeselect && optionValue === _value ? null : optionValue
            setValue(nextValue)
            setOpened(false)
        }

        if (searchable) {
            setSearchValue('')
        }
    }

    const dropdownContent = withScrollArea ? (
        <ScrollArea.Autosize
            mah={maxDropdownHeight ?? 250}
            type="scroll"
            scrollbarSize="var(--combobox-padding)"
            offsetScrollbars="y"
            {...scrollAreaProps}
        >
            {renderOptions(
                filteredData,
                _value,
                withCheckIcon,
                withAlignedLabels,
                checkIconPosition,
                unstyled,
                renderOption
            )}
        </ScrollArea.Autosize>
    ) : (
        renderOptions(
            filteredData,
            _value,
            withCheckIcon,
            withAlignedLabels,
            checkIconPosition,
            unstyled,
            renderOption
        )
    )

    const isEmpty = filteredData.length === 0

    return (
        <>
            <Combobox
                opened={_opened}
                onChange={setOpened}
                searchValue={searchable ? _searchValue : undefined}
                onSearchChange={searchable ? setSearchValue : undefined}
                selectedValues={selectedValues}
                onOptionSubmit={handleOptionSubmit}
                {...others}
            >
                {children}
                <Combobox.Dropdown style={{ maxHeight: maxDropdownHeight ? rem(maxDropdownHeight) : undefined }}>
                    {searchable && (
                        <input
                            type="text"
                            value={_searchValue}
                            onChange={(event) => setSearchValue(event.currentTarget.value)}
                            placeholder="Search..."
                            style={{ width: '100%', marginBottom: 8 }}
                        />
                    )}
                    <Combobox.Options>
                        {dropdownContent}
                        {isEmpty && nothingFoundMessage && <Combobox.Empty>{nothingFoundMessage}</Combobox.Empty>}
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
            {name && (
                <input
                    type="hidden"
                    name={name}
                    form={form}
                    value={Array.isArray(_value) ? _value.join(hiddenInputValuesDivider) : _value || ''}
                />
            )}
        </>
    )
})

ComboboxPopover.classes = classes
ComboboxPopover.displayName = '@react-ui/ui/ComboboxPopover'
ComboboxPopover.Target = ComboboxPopoverTarget
