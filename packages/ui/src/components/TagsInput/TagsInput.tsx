import { forwardRef, useMemo, useRef, useState } from 'react'
import { useId, useMergedRef, useUncontrolled } from '@react-ui/hooks'
import { BoxProps, factory, Factory, UISize, rem, StylesApiProps, useProps, useStyles } from '../../core'
import { Badge } from '../Badge'
import { CloseButton } from '../CloseButton'
import { Combobox } from '../Combobox'
import type { ComboboxOptionData } from '../Combobox'
import { InputBase } from '../InputBase'
import { InputWrapper } from '../Input'
import classes from './TagsInput.module.css'

export type TagsInputStylesNames =
    | 'root'
    | 'dropdown'
    | 'options'
    | 'option'
    | 'empty'
    | 'group'
    | 'groupLabel'
    | 'pill'
    | 'input'
    | 'valuesList'

export interface TagsInputItem {
    value: string
    label: string
    disabled?: boolean
    group?: string
}

export type TagsInputData = (string | TagsInputItem)[]

export interface TagsInputProps
    extends BoxProps,
        StylesApiProps<TagsInputFactory>,
        Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'style' | 'value' | 'defaultValue' | 'onChange'> {
    /** TagsInput options data */
    data?: TagsInputData

    //** 受控值 */
    value?: string[]

    //** 非受控组件的初始值 */
    defaultValue?: string[]

    /** Called when selected values change */
    onChange?: (value: string[]) => void

    //** 未选择值时显示的占位符 */
    placeholder?: string

    //** 渲染在输入框上方的标签 */
    label?: React.ReactNode

    //** 渲染在标签下方的描述 */
    description?: React.ReactNode

    //** 渲染在输入框下方的错误 */
    error?: React.ReactNode

    //** 如果设置，则会在标签上添加必填星号 */
    required?: boolean

    //** 控制输入框大小 @default 'sm' */
    size?: UISize

    //** 决定是否可以清除值 */
    clearable?: boolean

    //** 如果设置，则禁用输入框 */
    disabled?: boolean

    /** Maximum number of tags */
    maxTags?: number

    /** Characters used to split pasted text into tags */
    splitChars?: string[]

    /** Determines whether duplicate tags are allowed @default false */
    allowDuplicates?: boolean

    //** 没有选项匹配搜索值时显示的消息 */
    nothingFoundMessage?: React.ReactNode

    //** 下拉框的最大高度 */
    maxDropdownHeight?: React.CSSProperties['maxHeight']

    //** 下拉框相对于目标元素的位置 */
    position?: import('../../core').FloatingPosition
}

export type TagsInputFactory = Factory<{
    props: TagsInputProps
    ref: HTMLInputElement
    stylesNames: TagsInputStylesNames
}>

const defaultProps = {
    size: 'sm',
    allowDuplicates: false,
    splitChars: [',']
} satisfies Partial<TagsInputProps>

function parseTagsInputData(data?: TagsInputData): ComboboxOptionData[] {
    if (!data) return []
    return data.map(item => {
        if (typeof item === 'string') {
            return { value: item, label: item }
        }
        return { value: item.value, label: item.label ?? item.value, disabled: item.disabled, group: item.group }
    })
}

interface TagsInputTargetProps extends React.ComponentPropsWithoutRef<'div'> {
    component?: 'input'
}

const TagsInputTarget = forwardRef<HTMLDivElement, TagsInputTargetProps>(({ component, children, ...others }, ref) => (
    <div ref={ref} {...others}>
        {children}
    </div>
))
TagsInputTarget.displayName = '@react-ui/ui/TagsInputTarget'

export const TagsInput = factory<TagsInputFactory>((_props, ref) => {
    const props = useProps('TagsInput', defaultProps, _props)
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
        maxTags,
        splitChars,
        allowDuplicates,
        nothingFoundMessage,
        maxDropdownHeight,
        position,
        id,
        ...others
    } = props

    const parsedData = useMemo(() => parseTagsInputData(data), [data])
    const [selectedValues, setSelectedValues] = useUncontrolled<string[]>({
        value,
        defaultValue,
        finalValue: [],
        onChange
    })

    const [searchValue, setSearchValue] = useState('')
    const [opened, setOpened] = useState(false)
    const inputId = useId(id)
    const inputRef = useRef<HTMLInputElement>(null)
    const mergedInputRef = useMergedRef(ref, inputRef)

    const filteredData = useMemo(() => {
        if (!searchValue) return parsedData
        const query = searchValue.toLowerCase()
        return parsedData.filter(item => item.label.toLowerCase().includes(query))
    }, [parsedData, searchValue])

    const addTag = (tagValue: string) => {
        const trimmed = tagValue.trim()
        if (!trimmed) return
        if (maxTags !== undefined && selectedValues.length >= maxTags) return
        if (!allowDuplicates && selectedValues.includes(trimmed)) return

        const nextValues = [...selectedValues, trimmed]
        if (value === undefined) {
            setSelectedValues(nextValues)
        }
        onChange?.(nextValues)
    }

    const removeTag = (tagValue: string) => {
        const nextValues = selectedValues.filter(v => v !== tagValue)
        if (value === undefined) {
            setSelectedValues(nextValues)
        }
        onChange?.(nextValues)
    }

    const handleOptionSubmit = (optionValue: string) => {
        if (disabled) return
        addTag(optionValue)
        setSearchValue('')
        inputRef.current?.focus()
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.defaultPrevented) {
            return
        }

        if (event.key === 'Enter') {
            event.preventDefault()
            addTag(searchValue)
            setSearchValue('')
        } else if (event.key === 'Backspace' && searchValue === '' && selectedValues.length > 0) {
            removeTag(selectedValues[selectedValues.length - 1])
        }
    }

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = event.clipboardData.getData('text')
        if (!splitChars || splitChars.length === 0) return

        const delimiter = splitChars.find(char => pasted.includes(char))
        if (delimiter) {
            event.preventDefault()
            pasted.split(delimiter).forEach(part => addTag(part))
        }
    }

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>, tagValue: string) => {
        event.stopPropagation()
        if (disabled) return
        removeTag(tagValue)
    }

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        if (disabled) return

        if (value === undefined) {
            setSelectedValues([])
        }
        onChange?.([])
    }

    const valuesList = selectedValues.map(tagValue => (
        <Badge
            key={tagValue}
            className={classes.pill}
            size="xs"
            variant="light"
            rightSection={
                <CloseButton
                    size="xs"
                    aria-label={`移除 ${tagValue}`}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleRemove(event, tagValue)}
                />
            }
        >
            {tagValue}
        </Badge>
    ))

    const shouldShowClear = clearable && selectedValues.length > 0
    const rightSection = (
        <div className={classes.section}>
            {shouldShowClear ? <CloseButton size="xs" onClick={handleClear} aria-label="清除全部" /> : null}
        </div>
    )

    const isMaxTags = maxTags !== undefined && selectedValues.length >= maxTags

    const getStyles = useStyles<TagsInputFactory>({
        name: 'TagsInput',
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
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            selectedValues={selectedValues}
            onOptionSubmit={handleOptionSubmit}
            position={position}
            disabled={disabled}
        >
            <Combobox.Target>
                <TagsInputTarget
                    component="input"
                    className={classes.wrapper}
                    onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                        if (!(event.target as HTMLElement).closest('button')) {
                            inputRef.current?.focus()
                        }
                    }}
                >
                    {valuesList.length > 0 && <div className={classes.valuesList}>{valuesList}</div>}
                    <InputBase
                        {...others}
                        id={inputId}
                        ref={mergedInputRef}
                        component="input"
                        type="text"
                        value={searchValue}
                        placeholder={selectedValues.length === 0 ? placeholder : undefined}
                        disabled={disabled || isMaxTags}
                        role="combobox"
                        size={size}
                        rightSection={rightSection}
                        onClick={() => {
                            if (!disabled && !isMaxTags) {
                                setOpened(true)
                            }
                        }}
                        onFocus={() => {
                            if (!disabled && !isMaxTags) {
                                setOpened(true)
                            }
                        }}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const nextValue = event.currentTarget.value
                            setSearchValue(nextValue)
                            if (!opened) {
                                setOpened(true)
                            }
                        }}
                        onKeyDown={handleKeyDown}
                        onPaste={handlePaste}
                        wrapperProps={{ className: classes.inputWrapper }}
                    />
                </TagsInputTarget>
            </Combobox.Target>

            <Combobox.Dropdown style={{ maxHeight: maxDropdownHeight ? rem(maxDropdownHeight) : undefined }}>
                <Combobox.Options>
                    {filteredData.length === 0 && nothingFoundMessage ? (
                        <Combobox.Empty>{nothingFoundMessage}</Combobox.Empty>
                    ) : (
                        renderOptions(filteredData, selectedValues)
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

function renderOptions(data: ComboboxOptionData[], selectedValues: string[]) {
    const result: React.ReactNode[] = []
    let lastGroup: string | undefined

    data.forEach(item => {
        if (item.group && item.group !== lastGroup) {
            result.push(<Combobox.Group key={`group-${item.group}`} label={item.group} />)
            lastGroup = item.group
        }

        const disabled = item.disabled || selectedValues.includes(item.value)

        result.push(
            <Combobox.Option key={item.value} value={item.value} disabled={disabled}>
                {item.label}
            </Combobox.Option>
        )
    })

    return result
}

TagsInput.classes = classes
TagsInput.displayName = '@react-ui/ui/TagsInput'

export namespace TagsInput {
    export type Props = TagsInputProps
    export type StylesNames = TagsInputStylesNames
    export type Factory = TagsInputFactory
}
