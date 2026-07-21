import { createSafeContext } from '../../core'

export interface ComboboxOptionData {
    value: string
    label: string
    disabled?: boolean
    group?: string
    /** 选项实例唯一键，注册时由 Combobox 写入；重复 value 的选项靠它区分注册条目 */
    key?: string
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
    registerOption: (key: string, data: ComboboxOptionData) => void
    unregisterOption: (key: string) => void
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
