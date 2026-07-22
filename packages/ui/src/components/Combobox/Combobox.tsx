import { useCallback, useMemo, useState } from 'react'
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react'
import { useClickOutside, useId, useUncontrolled } from '@xiaoye-react/hooks'
import { Box, Factory, useProps } from '../../core'
import { FloatingPosition, FloatingStrategy } from '../../core'
import { ComboboxContextProvider, ComboboxOptionData, ComboboxContextValue } from './Combobox.context'
import { ComboboxDropdown } from './ComboboxDropdown'
import { ComboboxDropdownTarget } from './ComboboxDropdownTarget'
import { ComboboxEmpty } from './ComboboxEmpty'
import { ComboboxEventsTarget } from './ComboboxEventsTarget'
import { ComboboxFooter } from './ComboboxFooter'
import { ComboboxGroup } from './ComboboxGroup'
import { ComboboxHeader } from './ComboboxHeader'
import { ComboboxOption } from './ComboboxOption'
import { ComboboxOptions } from './ComboboxOptions'
import { ComboboxSearch } from './ComboboxSearch'
import { ComboboxTarget } from './ComboboxTarget'
import { ComboboxChevron } from './ComboboxChevron'

// 注意：该类型仍被 TreeSelect 等组件的 StylesApi 复用，故保留导出
export type ComboboxStylesNames =
    | 'dropdown'
    | 'options'
    | 'option'
    | 'optionLabel'
    | 'empty'
    | 'group'
    | 'groupLabel'
    | 'header'
    | 'footer'

export interface ComboboxProps {
    /** Combobox.Target and Combobox.Dropdown components */
    children: React.ReactNode

    /** Controlled opened state */
    opened?: boolean

    /** Initial opened state for uncontrolled component */
    defaultOpened?: boolean

    /** Called when opened state changes */
    onChange?: (opened: boolean) => void

    /** Controlled search value */
    searchValue?: string

    /** Initial search value for uncontrolled component */
    defaultSearchValue?: string

    /** Called when search value changes */
    onSearchChange?: (value: string) => void

    //** 下拉框相对于目标元素的位置 */
    position?: FloatingPosition

    /** 下拉元素的偏移量 */
    offset?: number

    /** Floating ui position strategy */
    floatingStrategy?: FloatingStrategy

    /** If set, combobox will be disabled */
    disabled?: boolean

    /** Called when dropdown option is selected */
    onOptionSubmit?: (value: string, option: ComboboxOptionData) => void

    /** Selected values, used to determine active/selected option styles */
    selectedValues?: string[]

    /** Determines whether dropdown should be closed when Escape key is pressed */
    closeOnEscape?: boolean

    /** Determines whether dropdown should be closed on outside clicks */
    closeOnClickOutside?: boolean
}

export type ComboboxFactory = Factory<{
    props: ComboboxProps
}>

const defaultProps = {
    position: 'bottom-start',
    offset: 4,
    closeOnEscape: true,
    closeOnClickOutside: true
} satisfies Partial<ComboboxProps>

export function Combobox(_props: ComboboxProps) {
    const props = useProps('Combobox', defaultProps, _props)
    const {
        children,
        opened,
        defaultOpened,
        onChange,
        searchValue,
        defaultSearchValue,
        onSearchChange,
        position,
        offset: offsetValue,
        floatingStrategy,
        disabled,
        onOptionSubmit,
        selectedValues,
        closeOnEscape,
        closeOnClickOutside,
        ...others
    } = props

    const [_opened, setOpened] = useUncontrolled({
        value: opened,
        defaultValue: defaultOpened,
        finalValue: false,
        onChange
    })

    const [_searchValue, setSearchValue] = useUncontrolled({
        value: searchValue,
        defaultValue: defaultSearchValue,
        finalValue: '',
        onChange: onSearchChange
    })

    const [options, setOptions] = useState<ComboboxOptionData[]>([])
    const [activeIndex, setActiveIndex] = useState(-1)
    const [targetNode, setTargetNode] = useState<HTMLElement | null>(null)
    const [dropdownNode, setDropdownNode] = useState<HTMLElement | null>(null)
    const uid = useId()
    const targetId = `${uid}-target`
    const dropdownId = `${uid}-dropdown`

    const values = useMemo(() => selectedValues ?? [], [selectedValues])

    const floating = useFloating({
        open: _opened,
        strategy: floatingStrategy,
        placement: position,
        middleware: [offset(offsetValue), flip({ padding: 8 }), shift({ padding: 8 })],
        whileElementsMounted: autoUpdate
    })

    const reference = useCallback(
        (node: HTMLElement | null) => {
            setTargetNode(node)
            // node 为 null（卸载）时同样转发，确保 floating-ui 能解绑 autoUpdate 等清理逻辑
            floating.refs.setReference(node)
        },
        [floating.refs.setReference]
    )

    const dropdownRef = useCallback(
        (node: HTMLElement | null) => {
            setDropdownNode(node)
            // node 为 null（卸载）时同样转发，确保 floating-ui 能解绑 autoUpdate 等清理逻辑
            floating.refs.setFloating(node)
        },
        [floating.refs.setFloating]
    )

    // useClickOutside 内部 effect 依赖 [callback, nodes]：
    // 内联 callback 与每次渲染新建的 nodes 数组会导致 document 监听被反复卸载/重订阅，
    // 因此用 useCallback/useMemo 稳定化这两个参数
    const handleOutsideClick = useCallback(() => {
        if (closeOnClickOutside && _opened) {
            setOpened(false)
        }
    }, [closeOnClickOutside, _opened, setOpened])

    const clickOutsideNodes = useMemo(() => [targetNode, dropdownNode], [targetNode, dropdownNode])

    useClickOutside(handleOutsideClick, null, clickOutsideNodes)

    // 注册条目按实例唯一键 key 区分：重复 value 的选项不再共享条目，
    // 其一卸载时不会误删同 value 兄弟实例的注册
    const registerOption = useCallback((key: string, data: ComboboxOptionData) => {
        setOptions(current => {
            if (current.some(item => item.key === key)) {
                return current
            }
            return [...current, { ...data, key }]
        })
    }, [])

    const unregisterOption = useCallback((key: string) => {
        setOptions(current => current.filter(item => item.key !== key))
    }, [])

    const onOptionSelect = useCallback(
        (value: string) => {
            const option = options.find(item => item.value === value)
            if (option) {
                onOptionSubmit?.(value, option)
            }
            // 关闭语义由消费方决定：单选组件在 onOptionSubmit 中自行关闭，多选组件保持打开，
            // 这里不再无条件 setOpened(false)
        },
        [options, onOptionSubmit]
    )

    const getNextActiveIndex = (start: number, direction: 1 | -1) => {
        let index = start
        for (let i = 0; i < options.length; i++) {
            index += direction
            if (index < 0) index = options.length - 1
            if (index >= options.length) index = 0
            if (!options[index].disabled) {
                return index
            }
        }
        return -1
    }

    const onTargetKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLElement>) => {
            if (disabled) return

            if (event.key === 'ArrowDown') {
                event.preventDefault()
                if (!_opened) {
                    setOpened(true)
                }
                setActiveIndex(prev => (prev === -1 ? getNextActiveIndex(-1, 1) : getNextActiveIndex(prev, 1)))
            } else if (event.key === 'ArrowUp') {
                event.preventDefault()
                if (!_opened) {
                    setOpened(true)
                }
                setActiveIndex(prev =>
                    prev === -1 ? getNextActiveIndex(options.length, -1) : getNextActiveIndex(prev, -1)
                )
            } else if (event.key === 'Enter') {
                if (_opened && activeIndex >= 0 && options[activeIndex] && !options[activeIndex].disabled) {
                    event.preventDefault()
                    onOptionSelect(options[activeIndex].value)
                } else if (!_opened) {
                    event.preventDefault()
                    setOpened(true)
                }
            } else if (event.key === 'Escape') {
                if (_opened && closeOnEscape) {
                    event.preventDefault()
                    setOpened(false)
                }
            } else if (event.key === 'Home' && _opened) {
                event.preventDefault()
                setActiveIndex(getNextActiveIndex(-1, 1))
            } else if (event.key === 'End' && _opened) {
                event.preventDefault()
                setActiveIndex(getNextActiveIndex(options.length, -1))
            }
        },
        [_opened, activeIndex, closeOnEscape, disabled, onOptionSelect, options, setOpened]
    )

    const onTargetClick = useCallback(() => {
        if (!disabled) {
            setOpened(!_opened)
        }
    }, [disabled, _opened, setOpened])

    // memo 化 context value，避免无关重渲染时所有选项组件跟着全量重渲染
    const contextValue = useMemo<ComboboxContextValue>(
        () => ({
            opened: _opened,
            setOpened,
            x: floating.x,
            y: floating.y,
            targetRef: reference,
            dropdownRef,
            targetId,
            dropdownId,
            activeIndex,
            setActiveIndex,
            selectedValues: values,
            onOptionSelect,
            registerOption,
            unregisterOption,
            options,
            searchValue: _searchValue,
            setSearchValue,
            onTargetKeyDown,
            onTargetClick,
            disabled
        }),
        [
            _opened,
            setOpened,
            floating.x,
            floating.y,
            reference,
            dropdownRef,
            targetId,
            dropdownId,
            activeIndex,
            setActiveIndex,
            values,
            onOptionSelect,
            registerOption,
            unregisterOption,
            options,
            _searchValue,
            setSearchValue,
            onTargetKeyDown,
            onTargetClick,
            disabled
        ]
    )

    return (
        <ComboboxContextProvider value={contextValue}>
            <Box {...others}>{children}</Box>
        </ComboboxContextProvider>
    )
}

Combobox.Target = ComboboxTarget
Combobox.Dropdown = ComboboxDropdown
Combobox.Options = ComboboxOptions
Combobox.Option = ComboboxOption
Combobox.Group = ComboboxGroup
Combobox.Empty = ComboboxEmpty
Combobox.Header = ComboboxHeader
Combobox.Footer = ComboboxFooter
Combobox.EventsTarget = ComboboxEventsTarget
Combobox.DropdownTarget = ComboboxDropdownTarget
Combobox.Search = ComboboxSearch
Combobox.Chevron = ComboboxChevron
Combobox.displayName = '@xiaoye-react/ui/Combobox'

export namespace Combobox {
    export type Props = ComboboxProps
    export type Factory = ComboboxFactory
}
