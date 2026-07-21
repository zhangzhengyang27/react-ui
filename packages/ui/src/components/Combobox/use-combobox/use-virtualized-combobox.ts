import { useCallback, useEffect, useRef } from 'react'
import { useUncontrolled } from '@react-ui/hooks'
import { getFirstIndex, getNextIndex, getPreviousIndex } from './get-index/get-virtualized-index'
import { ComboboxDropdownEventSource, ComboboxStore } from './use-combobox'

export interface UseVirtualizedComboboxOptions {
    /** Default value for `dropdownOpened`, `false` by default */
    defaultOpened?: boolean

    /** Controlled `dropdownOpened` state */
    opened?: boolean

    /** Called when `dropdownOpened` state changes */
    onOpenedChange?: (opened: boolean) => void

    /** Called when dropdown closes */
    onDropdownClose?: (eventSource: ComboboxDropdownEventSource) => void

    /** Called when dropdown opens */
    onDropdownOpen?: (eventSource: ComboboxDropdownEventSource) => void

    /** Determines whether arrow key presses should loop though items (first to last and last to first), `true` by default */
    loop?: boolean

    /** Function to determine whether the option is disabled */
    isOptionDisabled?: (optionIndex: number) => boolean

    /** Total number of options in the virtualized list. Required for proper keyboard navigation and index calculations. */
    totalOptionsCount: number

    /** Function that returns the id of the option at the given index. Required for setting aria attributes and element references. */
    getOptionId: (index: number) => string | null

    /** Current selected option index. Must be controlled by parent component. */
    selectedOptionIndex: number

    /** Callback to update the selected option index. Called when user navigates or selects options. */
    setSelectedOptionIndex: (index: number) => void

    /** Currently active/highlighted option index. Used to determine which option to select when selectActiveOption is called. */
    activeOptionIndex?: number

    /** Called when the selected option is submitted (e.g., via Enter key or clicking). Receives the selected option index. */
    onSelectedOptionSubmit: (index: number) => void
}

// 默认参数提升为模块级常量：内联箭头函数每次渲染都是新引用，
// 会使其作为依赖的 useCallback（selectOption 等）逐渲染失效
const defaultIsOptionDisabled = () => false
const defaultGetOptionId = () => null
const defaultSetSelectedOptionIndex = () => {}
const defaultOnSelectedOptionSubmit = () => {}

const defaultVirtualizedComboboxOptions: UseVirtualizedComboboxOptions = {
    totalOptionsCount: 0,
    getOptionId: defaultGetOptionId,
    selectedOptionIndex: -1,
    setSelectedOptionIndex: defaultSetSelectedOptionIndex,
    onSelectedOptionSubmit: defaultOnSelectedOptionSubmit
}

export function useVirtualizedCombobox(
    {
        defaultOpened,
        opened,
        onOpenedChange,
        onDropdownClose,
        onDropdownOpen,
        loop = true,
        totalOptionsCount,
        isOptionDisabled = defaultIsOptionDisabled,
        getOptionId,
        selectedOptionIndex,
        setSelectedOptionIndex,
        activeOptionIndex,
        onSelectedOptionSubmit
    }: UseVirtualizedComboboxOptions = defaultVirtualizedComboboxOptions
): ComboboxStore {
    const [dropdownOpened, setDropdownOpened] = useUncontrolled({
        value: opened,
        defaultValue: defaultOpened,
        finalValue: false,
        onChange: onOpenedChange
    })

    const listId = useRef<string | null>(null)
    const searchRef = useRef<HTMLInputElement | null>(null)
    const targetRef = useRef<HTMLElement | null>(null)
    const focusSearchTimeout = useRef<number>(-1)
    const focusTargetTimeout = useRef<number>(-1)

    const openDropdown: ComboboxStore['openDropdown'] = useCallback(
        (eventSource = 'unknown') => {
            if (!dropdownOpened) {
                setDropdownOpened(true)
                onDropdownOpen?.(eventSource)
            }
        },
        [setDropdownOpened, onDropdownOpen, dropdownOpened]
    )

    const closeDropdown: ComboboxStore['closeDropdown'] = useCallback(
        (eventSource = 'unknown') => {
            if (dropdownOpened) {
                setDropdownOpened(false)
                onDropdownClose?.(eventSource)
            }
        },
        [setDropdownOpened, onDropdownClose, dropdownOpened]
    )

    const toggleDropdown: ComboboxStore['toggleDropdown'] = useCallback(
        (eventSource = 'unknown') => {
            if (dropdownOpened) {
                closeDropdown(eventSource)
            } else {
                openDropdown(eventSource)
            }
        },
        [closeDropdown, openDropdown, dropdownOpened]
    )

    const selectOption = useCallback(
        (index: number) => {
            if (totalOptionsCount === 0) {
                setSelectedOptionIndex(-1)
                return null
            }

            const nextIndex = index >= totalOptionsCount ? 0 : index < 0 ? totalOptionsCount - 1 : index

            if (isOptionDisabled(nextIndex)) {
                return null
            }

            setSelectedOptionIndex(nextIndex)
            return getOptionId(nextIndex)
        },
        [totalOptionsCount, isOptionDisabled, setSelectedOptionIndex, getOptionId]
    )

    const selectActiveOption = useCallback(
        () => selectOption(activeOptionIndex ?? 0),
        [selectOption, activeOptionIndex]
    )

    const selectNextOption = useCallback(
        () =>
            selectOption(
                getNextIndex({
                    currentIndex: selectedOptionIndex,
                    isOptionDisabled,
                    totalOptionsCount,
                    loop
                })
            ),
        [selectOption, selectedOptionIndex, isOptionDisabled, totalOptionsCount, loop]
    )

    const selectPreviousOption = useCallback(
        () =>
            selectOption(
                getPreviousIndex({
                    currentIndex: selectedOptionIndex,
                    isOptionDisabled,
                    totalOptionsCount,
                    loop
                })
            ),
        [selectOption, selectedOptionIndex, isOptionDisabled, totalOptionsCount, loop]
    )

    const selectFirstOption = useCallback(
        () => selectOption(getFirstIndex({ isOptionDisabled, totalOptionsCount })),
        [selectOption, isOptionDisabled, totalOptionsCount]
    )

    const resetSelectedOption = useCallback(() => {
        setSelectedOptionIndex(-1)
    }, [setSelectedOptionIndex])

    const clickSelectedOption = useCallback(() => {
        if (
            selectedOptionIndex >= 0 &&
            selectedOptionIndex < totalOptionsCount &&
            !isOptionDisabled(selectedOptionIndex)
        ) {
            onSelectedOptionSubmit?.(selectedOptionIndex)
        }
    }, [selectedOptionIndex, totalOptionsCount, isOptionDisabled, onSelectedOptionSubmit])

    const setListId = useCallback((id: string) => {
        listId.current = id
    }, [])

    const focusSearchInput = useCallback(() => {
        // 重排前先清掉旧定时器，避免连续调用时旧回调仍然执行
        window.clearTimeout(focusSearchTimeout.current)
        focusSearchTimeout.current = window.setTimeout(() => searchRef.current?.focus(), 0)
    }, [])

    const focusTarget = useCallback(() => {
        // 重排前先清掉旧定时器，避免连续调用时旧回调仍然执行
        window.clearTimeout(focusTargetTimeout.current)
        focusTargetTimeout.current = window.setTimeout(() => targetRef.current?.focus(), 0)
    }, [])

    useEffect(
        () => () => {
            window.clearTimeout(focusSearchTimeout.current)
            window.clearTimeout(focusTargetTimeout.current)
        },
        []
    )

    const getSelectedOptionIndex = useCallback(() => selectedOptionIndex, [selectedOptionIndex])

    const updateSelectedOptionIndex: ComboboxStore['updateSelectedOptionIndex'] = useCallback(
        (index?: 'active' | 'selected' | number) => {
            if (typeof index === 'number') {
                setSelectedOptionIndex(index)
            }

            if (index === 'active' && typeof activeOptionIndex === 'number') {
                setSelectedOptionIndex(activeOptionIndex)
            }

            // 'selected' 有意不做处理：非虚拟化 store 需 setTimeout 查 DOM 找回选中项索引，
            // 而虚拟化场景 selectedOptionIndex 由父组件受控传入，本身就是权威值，无需再同步
        },
        [setSelectedOptionIndex, activeOptionIndex]
    )

    return {
        dropdownOpened,
        openDropdown,
        closeDropdown,
        toggleDropdown,

        selectedOptionIndex,
        getSelectedOptionIndex,
        selectOption,
        selectFirstOption,
        selectActiveOption,
        selectNextOption,
        selectPreviousOption,
        resetSelectedOption,
        updateSelectedOptionIndex,

        listId: listId.current,
        setListId,
        clickSelectedOption,

        searchRef,
        focusSearchInput,

        targetRef,
        focusTarget
    }
}
