import { createSafeContext } from '../../core'

export interface ComboboxOptionData {
    value: string
    label: string
    disabled?: boolean
    group?: string
}

export interface ComboboxContextValue {
    opened: boolean
    setOpened: (value: boolean) => void
    x: number | undefined
    y: number | undefined
    targetRef: (node: HTMLElement | null) => void
    dropdownRef: (node: HTMLElement | null) => void
    targetId: string
    dropdownId: string
    activeIndex: number
    setActiveIndex: (index: number) => void
    selectedValues: string[]
    onOptionSelect: (value: string) => void
    registerOption: (value: string, data: ComboboxOptionData) => void
    unregisterOption: (value: string) => void
    options: ComboboxOptionData[]
    searchValue: string
    setSearchValue: (value: string) => void
    onTargetKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void
    onTargetClick: () => void
    disabled?: boolean
}

export const [ComboboxContextProvider, useComboboxContext] = createSafeContext<ComboboxContextValue>(
    'Combobox component was not found in the tree'
)
