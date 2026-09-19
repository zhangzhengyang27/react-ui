import { forwardRef, useMemo, useRef, useState } from 'react'
import { useId, useMergedRef, useUncontrolled } from '@xiaoye-react/hooks'
import { BoxProps, factory, Factory, UISize, rem, StylesApiProps, useProps, useStyles } from '../../core'
import { Badge } from '../Badge'
import { CloseButton } from '../CloseButton'
import { Combobox } from '../Combobox'
import type { ComboboxOptionData } from '../Combobox'
import { InputBase } from '../InputBase'
import { InputWrapper, type __BaseInputProps } from '../Input'
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
        // 渲染时 others 全量透传给 InputBase，其公共 prop 必须在类型里可见
        __BaseInputProps,
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

const TagsInputTarget = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(({ children, ...others }, ref) => (
    <div ref={ref} {...others}>
        {children}
    </div>
))
TagsInputTarget.displayName = '@xiaoye-react/ui/TagsInputTarget'

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
    // 不向 useUncontrolled 传 onChange：其非受控 setter 内部会调 onChange，
    // 而下方 handler 已显式调用 onChange?.()，两处都传会导致每次变更触发两次
    const [selectedValues, setSelectedValues] = useUncontrolled<string[]>({
        value,
        defaultValue,
        finalValue: []
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

    // 按 index 删除：allowDuplicates 时存在重复 tagValue，按值 filter 会误删所有同名 tag
    const removeTag = (tagIndex: number) => {
        const nextValues = selectedValues.filter((_, index) => index !== tagIndex)
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
            removeTag(selectedValues.length - 1)
        }
    }

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = event.clipboardData.getData('text')
        if (!splitChars || splitChars.length === 0) return

        // 按全部命中的分隔符一次切分：此前只用第一个命中的分隔符，
        // splitChars={[',',';']} 时粘贴 "a,b;c" 会得到 "a" 和 "b;c" 两个 tag
        const delimiters = splitChars.filter(char => pasted.includes(char))
        if (delimiters.length > 0) {
            event.preventDefault()
            // 字符类内 '-' 处于非边缘位时是区间符号：splitChars={[',', '-', ';']} 会形成
            // [,-;] 把逗号到分号之间的全部字符（含数字）当分隔符，须一并转义
            const splitRegex = new RegExp(
                `[${delimiters.map(char => char.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&')).join('')}]`
            )
            // 不能逐段调用 addTag：其闭包中的 selectedValues 是同一渲染快照，
            // 多次调用都基于旧值计算，导致只有最后一段生效。改为单次累加后统一更新
            const nextValues = [...selectedValues]
            for (const part of pasted.split(splitRegex)) {
                const trimmed = part.trim()
                if (!trimmed) continue
                if (maxTags !== undefined && nextValues.length >= maxTags) break
                if (!allowDuplicates && nextValues.includes(trimmed)) continue
                nextValues.push(trimmed)
            }
            if (nextValues.length > selectedValues.length) {
                if (value === undefined) {
                    setSelectedValues(nextValues)
                }
                onChange?.(nextValues)
            }
        }
    }

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>, tagIndex: number) => {
        event.stopPropagation()
        if (disabled) return
        removeTag(tagIndex)
        // 胶囊卸载后焦点会丢到 body（Backspace 删 tag、继续输入全部失效），移除后回焦输入框
        inputRef.current?.focus()
    }

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        if (disabled) return

        if (value === undefined) {
            setSelectedValues([])
        }
        onChange?.([])
        // 清除按钮随值清空卸载，焦点回焦输入框
        inputRef.current?.focus()
    }

    const valuesList = selectedValues.map((tagValue, index) => (
        <Badge
            key={`${tagValue}-${index}`}
            className={classes.pill}
            size="xs"
            variant="light"
            rightSection={
                <CloseButton
                    size="xs"
                    aria-label={`移除 ${tagValue}`}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleRemove(event, index)}
                    // 阻止焦点转移到按钮：点击移除后胶囊卸载，焦点会丢到 body
                    onMouseDown={event => event.preventDefault()}
                />
            }
        >
            {tagValue}
        </Badge>
    ))

    const shouldShowClear = clearable && selectedValues.length > 0
    const rightSection = (
        <div className={classes.section}>
            {shouldShowClear ? (
                <CloseButton
                    size="xs"
                    onClick={handleClear}
                    // 阻止焦点转移到按钮：点击后按钮随值清空卸载，焦点会丢到 body
                    onMouseDown={event => event.preventDefault()}
                    aria-label="Clear all"
                />
            ) : null}
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
                    className={classes.wrapper}
                    onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                        const isButton = !!(event.target as HTMLElement).closest('button')
                        if (!isButton) {
                            inputRef.current?.focus()
                        }
                        // 点击输入框本体不触发外层 toggle（B03-2：展开态点输入框调整光标不收起建议列表），
                        // 关闭态在此兜底打开，保持"点击打开建议下拉"的既有行为
                        if (!isButton && !disabled && !isMaxTags && !opened) {
                            setOpened(true)
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
                        // 达到 maxTags 用 readOnly 而非 disabled：disabled 会吞掉 keydown，
                        // 导致 Backspace 无法再删除 tag；readOnly 下 keydown 仍会触发
                        disabled={disabled}
                        readOnly={isMaxTags}
                        role="combobox"
                        size={size}
                        rightSection={rightSection}
                        onFocus={event => {
                            // 仅键盘导航（Tab 切入）时打开；鼠标点击的开/关由 wrapper 的 click toggle 统一处理，
                            // 否则 focus 先打开、随后的 click toggle 又关闭，造成闪现即收
                            if (!disabled && !isMaxTags && event.currentTarget.matches(':focus-visible')) {
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
    // 记录每个组名的出现次数，组不连续（如 A,B,A）时为同名组生成唯一 key
    const groupOccurrences = new Map<string, number>()

    const renderOption = (item: ComboboxOptionData) => {
        const disabled = item.disabled || selectedValues.includes(item.value)

        return (
            <Combobox.Option key={item.value} value={item.value} disabled={disabled}>
                {item.label}
            </Combobox.Option>
        )
    }

    let index = 0
    while (index < data.length) {
        const item = data[index]

        if (item.group) {
            const group = item.group
            const occurrence = groupOccurrences.get(group) ?? 0
            groupOccurrences.set(group, occurrence + 1)

            // 收集同一连续段的选项，渲染进 Combobox.Group 内部（而非组外的空壳）
            const groupItems: ComboboxOptionData[] = []
            while (index < data.length && data[index].group === group) {
                groupItems.push(data[index])
                index++
            }

            result.push(
                <Combobox.Group key={`group-${group}-${occurrence}`} label={group}>
                    {groupItems.map(renderOption)}
                </Combobox.Group>
            )
        } else {
            result.push(renderOption(item))
            index++
        }
    }

    return result
}

TagsInput.classes = classes
TagsInput.displayName = '@xiaoye-react/ui/TagsInput'

export namespace TagsInput {
    export type Props = TagsInputProps
    export type StylesNames = TagsInputStylesNames
    export type Factory = TagsInputFactory
}
