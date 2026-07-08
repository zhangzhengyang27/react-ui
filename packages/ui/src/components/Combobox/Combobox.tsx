import { useCallback, useMemo, useState } from 'react'
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react'
import { useClickOutside, useId, useUncontrolled } from '@react-ui/hooks'
import {
    Box,
    createVarsResolver,
    Factory,
    getRadius,
    getShadow,
    MantineRadius,
    MantineShadow,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { FloatingPosition, FloatingStrategy } from '../../core'
import { ComboboxContextProvider, ComboboxOptionData } from './Combobox.context'
import { ComboboxDropdown } from './ComboboxDropdown'
import { ComboboxEmpty } from './ComboboxEmpty'
import { ComboboxGroup } from './ComboboxGroup'
import { ComboboxOption } from './ComboboxOption'
import { ComboboxOptions } from './ComboboxOptions'
import { ComboboxTarget } from './ComboboxTarget'
import classes from './Combobox.module.css'

export type ComboboxStylesNames = 'dropdown' | 'options' | 'option' | 'optionLabel' | 'empty' | 'group' | 'groupLabel'

export type ComboboxCssVariables = {
    dropdown: '--combobox-radius' | '--combobox-shadow'
}

export interface ComboboxProps extends StylesApiProps<ComboboxFactory> {
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

    /** Dropdown position relative to the target element */
    position?: FloatingPosition

    /** Offset of the dropdown element */
    offset?: number

    /** Dropdown radius */
    radius?: MantineRadius

    /** Dropdown shadow */
    shadow?: MantineShadow

    /** Dropdown z-index */
    zIndex?: string | number

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
    stylesNames: ComboboxStylesNames
    vars: ComboboxCssVariables
}>

const defaultProps = {
    position: 'bottom-start',
    offset: 4,
    closeOnEscape: true,
    closeOnClickOutside: true,
    zIndex: 300
} satisfies Partial<ComboboxProps>

const varsResolver = createVarsResolver<ComboboxFactory>((_, { radius, shadow }) => ({
    dropdown: {
        '--combobox-radius': radius === undefined ? undefined : getRadius(radius),
        '--combobox-shadow': getShadow(shadow)
    }
}))

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
        radius,
        shadow,
        zIndex,
        floatingStrategy,
        disabled,
        onOptionSubmit,
        selectedValues,
        closeOnEscape,
        closeOnClickOutside,
        classNames,
        styles,
        unstyled,
        vars,
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
            if (node) {
                floating.refs.setReference(node)
            }
        },
        [floating.refs.setReference]
    )

    const dropdownRef = useCallback(
        (node: HTMLElement | null) => {
            setDropdownNode(node)
            if (node) {
                floating.refs.setFloating(node)
            }
        },
        [floating.refs.setFloating]
    )

    useClickOutside(
        () => {
            if (closeOnClickOutside && _opened) {
                setOpened(false)
            }
        },
        null,
        [targetNode, dropdownNode]
    )

    const registerOption = useCallback((value: string, data: ComboboxOptionData) => {
        setOptions(current => {
            if (current.some(item => item.value === value)) {
                return current
            }
            return [...current, data]
        })
    }, [])

    const unregisterOption = useCallback((value: string) => {
        setOptions(current => current.filter(item => item.value !== value))
    }, [])

    const onOptionSelect = useCallback(
        (value: string) => {
            const option = options.find(item => item.value === value)
            if (option) {
                onOptionSubmit?.(value, option)
            }
            setOpened(false)
            setSearchValue('')
        },
        [options, onOptionSubmit, setOpened, setSearchValue]
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

    useStyles<ComboboxFactory>({
        name: 'Combobox',
        props,
        classes,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver,
        rootSelector: 'dropdown'
    })

    return (
        <ComboboxContextProvider
            value={{
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
            }}
        >
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
Combobox.displayName = '@mantine/core/Combobox'

export namespace Combobox {
    export type Props = ComboboxProps
    export type Factory = ComboboxFactory
}
