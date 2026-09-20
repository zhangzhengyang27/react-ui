import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
    arrow as arrowMiddleware,
    autoUpdate,
    flip,
    offset,
    shift,
    size as sizeMiddleware,
    useFloating
} from '@floating-ui/react'
import { useClickOutside, useId, useUncontrolled } from '@xiaoye-react/hooks'
import { Box, Factory, useProps } from '../../core'
import { FloatingPosition, FloatingStrategy } from '../../core'
import type { PopoverTransitionProps } from '../Popover/Popover'
import { ComboboxContextProvider, ComboboxOptionData, ComboboxContextValue } from './Combobox.context'
import type { ComboboxStore } from './use-combobox/use-combobox'
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
    | 'arrow'
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

    /** Determines whether dropdown should be closed when target loses focus @default true */
    closeOnBlur?: boolean

    /** useCombobox 返回的 store：提供后 store 的 DOM 查询（键盘导航/选项选择）才能找到选项列表 */
    store?: ComboboxStore

    /** 传递给下拉层 Transition 的属性（transition/duration/timingFunction/onEntered/onExited）；
     *  未传时下拉层固定为 fade / 150ms（与改动前一致） */
    transitionProps?: PopoverTransitionProps

    /** 下拉关闭后是否保留在 DOM 中（隐藏而非卸载）@default false */
    keepMounted?: boolean

    /** 下拉层是否渲染指向触发元素的箭头 @default false */
    withArrow?: boolean

    /** 箭头尺寸（px）：withArrow 为 true 时同时按半个尺寸加宽偏移，避免箭头压住目标 @default 7 */
    arrowSize?: number

    /** 箭头与下拉层边缘的间距（px），同时作为 floating-ui arrow 中间件的 padding @default 5 */
    arrowOffset?: number

    /** 下拉层高度上限：'viewport' 取 floating-ui 实测的可视区域可用高度，数字为 px 上限；
     *  生效后面板套用 max-height，并把同一值写入 CSS 变量
     *  `--combobox-floating-options-max-height`，供内部 ScrollArea/Autosize 取用；
     *  不传则不限制、不注入任何变量 @default undefined */
    floatingHeight?: 'viewport' | number
}

export type ComboboxFactory = Factory<{
    props: ComboboxProps
}>

const defaultProps = {
    position: 'bottom-start',
    offset: 4,
    closeOnEscape: true,
    closeOnClickOutside: true,
    closeOnBlur: true,
    keepMounted: false,
    withArrow: false,
    // 与 Popover 的箭头默认尺寸对齐
    arrowSize: 7,
    arrowOffset: 5
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
        closeOnBlur,
        store,
        transitionProps,
        keepMounted,
        withArrow,
        arrowSize,
        arrowOffset,
        floatingHeight,
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
    // 选项用 key O(1) 查自身 index：逐实例 findIndex 会让 n 个选项的渲染变成 O(n²)，
    // 大列表（limit 优化场景）下每次键入的全量重渲染明显卡顿。
    // 注册表条目总是带 key（registerOption 写入），key 为空的理论态直接跳过
    const optionIndexMap = useMemo(() => {
        const map = new Map<string, number>()
        options.forEach((option, i) => {
            if (option.key !== undefined) {
                map.set(option.key, i)
            }
        })
        return map
    }, [options])
    const [targetNode, setTargetNode] = useState<HTMLElement | null>(null)
    const [dropdownNode, setDropdownNode] = useState<HTMLElement | null>(null)
    // 箭头元素 ref：Combobox.Dropdown 渲染 FloatingArrow 时写入，
    // floating-ui arrow 中间件按元素存在与否参与定位（未启用 withArrow 时元素不存在，坐标不受影响）
    const arrowRef = useRef<HTMLDivElement | null>(null)
    const uid = useId()
    const targetId = `${uid}-target`
    const dropdownId = `${uid}-dropdown`

    const values = useMemo(() => selectedValues ?? [], [selectedValues])
    // 选中值的 Set 视图：ComboboxOption 与消费方（MultiSelect renderOptions 等）的
    // 选中态判定 O(1)；逐选项 includes 是 O(m)，n 个选项渲染放大为 O(n×m)
    const selectedValuesSet = useMemo(() => new Set(values), [values])

    // store 对象每次渲染都是新引用，取其 listId 原始值作为 memo 依赖
    const storeListId = store?.listId ?? null

    // floatingHeight='viewport' 需要的可视区域可用高度：floating-ui 的 size 中间件
    // 不把数据写进 middlewareData（v1.7 起只回传空对象），只能通过 apply 回调取，
    // 值不变时返回 prev 以跳过重渲染；面板被限高后 overflow 归零，下一次测量收敛不再变化
    const [availableFloatingHeight, setAvailableFloatingHeight] = useState<number | undefined>(undefined)

    const floating = useFloating({
        open: _opened,
        strategy: floatingStrategy,
        placement: position,
        // 中间件顺序与数量按开关拼接：
        // - 未开启 withArrow 时既不追加 arrow 中间件也不加宽 offset，面板坐标与改动前逐帧一致；
        // - size 只在启用 floatingHeight 时挂载，apply 里只记录测量值、不改写任何样式
        middleware: [
            offset(offsetValue + (withArrow ? arrowSize / 2 : 0)),
            flip({ padding: 8 }),
            shift({ padding: 8 }),
            ...(floatingHeight === undefined
                ? []
                : [
                      sizeMiddleware({
                          apply: ({ availableHeight }) => {
                              setAvailableFloatingHeight(prev => (prev === availableHeight ? prev : availableHeight))
                          }
                      })
                  ]),
            ...(withArrow ? [arrowMiddleware({ element: arrowRef, padding: arrowOffset })] : [])
        ]
    })

    const arrowData = floating.middlewareData?.arrow as { x?: number; y?: number } | undefined
    // floatingHeight 解析：'viewport' 用 floating-ui 实测可用高度（首帧尚未测量到时先不限高，
    // 测量结果回来后自动套用）；数字直接采用为 px 上限；<=0 视为不可用（jsdom / 隐藏容器）
    const resolvedFloatingHeight =
        floatingHeight === 'viewport'
            ? availableFloatingHeight && availableFloatingHeight > 0
                ? availableFloatingHeight
                : undefined
            : typeof floatingHeight === 'number' && floatingHeight > 0
              ? floatingHeight
              : undefined

    // floating-ui 0.27 没有 whileElementsMounted 选项，autoUpdate 需手动挂载：
    // 打开期间滚动/缩放/目标尺寸变化时自动重定位，关闭时解绑
    useEffect(() => {
        if (_opened && floating.refs.reference.current && floating.refs.floating.current) {
            const target = floating.refs.reference.current
            const floatingEl = floating.refs.floating.current
            // 下拉 min-width 跟随目标宽度（.dropdown 的 --combobox-target-width），
            // 需在打开与目标尺寸变化时同步，否则下拉宽度与触发器脱节
            const syncTargetWidth = () => {
                const width = target.getBoundingClientRect().width
                if (width > 0) {
                    floatingEl.style.setProperty('--combobox-target-width', `${width}px`)
                }
            }
            syncTargetWidth()
            return autoUpdate(target, floatingEl, () => {
                syncTargetWidth()
                floating.update()
            })
        }
    }, [_opened, floating.update])

    const reference = useCallback(
        (node: HTMLElement | null) => {
            setTargetNode(node)
            // node 为 null（卸载）时同样转发，确保 floating-ui 引用及时释放
            floating.refs.setReference(node)
        },
        [floating.refs.setReference]
    )

    const dropdownRef = useCallback(
        (node: HTMLElement | null) => {
            setDropdownNode(node)
            // node 为 null（卸载）时同样转发，确保 floating-ui 引用及时释放
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

    // 把注册表顺序对齐到 DOM 顺序：搜索过滤后清空时，重新挂载的选项会追加到注册表末尾，
    // 导致键盘导航顺序与视觉顺序不一致。挂载全部就绪后按 compareDocumentPosition 排序。
    useLayoutEffect(() => {
        if (options.length < 2 || !options.every(option => option.node?.isConnected)) {
            return
        }
        const sorted = [...options].sort((a, b) => {
            if (a.node === b.node) return 0
            return a.node!.compareDocumentPosition(b.node!) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
        })
        if (sorted.some((option, i) => option.key !== options[i].key)) {
            setOptions(sorted)
        }
    }, [options])

    // 选项集合变化（搜索过滤/数据更新）或下拉重新打开时重置键盘激活态：
    // 残留的 activeIndex 可能越界（Enter 静默失效）或指向错误选项（Enter 误选）。
    // 打开时若已选中首值仍在注册表中，则定位到该项并对齐可视区域（aria-activedescendant
    // 指向当前值、长列表中选中项可见），否则回落到首个可用选项，保证"输入后回车"总能
    // 选中第一条命中结果；关闭时保持 -1，保证下次 ArrowDown 仍从第一项开始
    const optionKeysSignature = options.map(option => option.key).join('|')
    useEffect(() => {
        if (!_opened) {
            setActiveIndex(-1)
            return
        }
        const firstSelected =
            values.length > 0 ? options.findIndex(option => option.value === values[0]) : -1
        const targetIndex =
            firstSelected >= 0 ? firstSelected : options.findIndex(option => !option.disabled)
        setActiveIndex(targetIndex)
        // scrollIntoView 在 jsdom 中不存在，可选调用兜底
        if (targetIndex >= 0) {
            options[targetIndex]?.node?.scrollIntoView?.({ block: 'nearest' })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionKeysSignature, _opened])

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

    // 目标失焦时关闭下拉：Tab 切走后下拉不再悬浮残留。
    // event.currentTarget 是 Combobox.Target 挂载的根元素（可能是 wrapper 而非 input 本身），
    // 焦点仍在根元素内部（清除按钮、下拉内搜索框等）时不关闭；
    // 点击下拉选项由 ComboboxOption 的 mousedown preventDefault 保证不产生 blur
    const onTargetBlur = useCallback(
        (event: React.FocusEvent<HTMLElement>) => {
            if (!_opened || !closeOnBlur || disabled) {
                return
            }
            const nextTarget = event.relatedTarget as HTMLElement | null
            const targetRoot = event.currentTarget
            if (nextTarget && (targetRoot?.contains(nextTarget) || dropdownNode?.contains(nextTarget))) {
                return
            }
            setOpened(false)
        },
        [_opened, closeOnBlur, disabled, dropdownNode, setOpened]
    )

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
            listId: store?.listId ?? null,
            activeIndex,
            setActiveIndex,
            selectedValues: values,
            selectedValuesSet,
            onOptionSelect,
            registerOption,
            unregisterOption,
            options,
            optionIndexMap,
            searchValue: _searchValue,
            setSearchValue,
            onTargetKeyDown,
            onTargetClick,
            onTargetBlur,
            disabled,
            transitionProps,
            keepMounted,
            withArrow,
            arrowSize,
            arrowOffset,
            arrowRef,
            arrowX: arrowData?.x,
            arrowY: arrowData?.y,
            // floating-ui 的 Placement 与库内 FloatingPosition 语义一致，仅做类型归一化（同 usePopover）
            placement: floating.placement as FloatingPosition,
            floatingHeight: resolvedFloatingHeight
        }),
        [
            _opened,
            setOpened,
            floating.x,
            floating.y,
            floating.placement,
            reference,
            dropdownRef,
            targetId,
            dropdownId,
            storeListId,
            activeIndex,
            setActiveIndex,
            values,
            selectedValuesSet,
            onOptionSelect,
            registerOption,
            unregisterOption,
            options,
            optionIndexMap,
            _searchValue,
            setSearchValue,
            onTargetKeyDown,
            onTargetClick,
            onTargetBlur,
            disabled,
            transitionProps,
            keepMounted,
            withArrow,
            arrowSize,
            arrowOffset,
            arrowData?.x,
            arrowData?.y,
            resolvedFloatingHeight
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
