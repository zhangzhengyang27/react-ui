import { useMemo, useState } from 'react'
import { useUncontrolled } from '@xiaoye-react/hooks'
import {
    Box,
    factory,
    useProps,
    useStyles,
    type BoxProps,
    type ElementProps,
    type Factory,
    type StylesApiProps,
    type UISize
} from '../../core'
import { Checkbox } from '../Checkbox'
import { Button } from '../Button'
import { TextInput } from '../TextInput'
import classes from './Transfer.module.css'

export type TransferStylesNames = 'root' | 'panel' | 'panelHeader' | 'panelTitle' | 'panelCount' | 'panelList' | 'item' | 'searchInput' | 'empty'

export interface TransferItem {
    /** 唯一标识 */
    value: string

    /** 展示文案 */
    label: React.ReactNode

    /** 是否禁用该项的迁移 */
    disabled?: boolean
}

export interface TransferProps
    extends BoxProps, StylesApiProps<TransferFactory>, ElementProps<'div', 'onChange'> {
    /** 可选项数据 */
    data: TransferItem[]

    /** 右侧（已选）值集合（受控） */
    value?: string[]

    /** 右侧值集合初始值（非受控） */
    defaultValue?: string[]

    /** 值变化回调，按 data 原始顺序返回 */
    onChange?: (value: string[]) => void

    /** 两个面板的标题 @default ['未选择', '已选择'] */
    titles?: [React.ReactNode, React.ReactNode]

    /** 面板是否可搜索 @default false */
    searchable?: boolean

    /** 搜索输入占位符 @default '搜索' */
    searchPlaceholder?: string

    /** 列表最大高度 @default 280 */
    listHeight?: number | string

    /** 是否显示面板头部全选 @default true */
    withSelectAll?: boolean

    /** 搜索无结果提示 @default '无匹配结果' */
    nothingFoundMessage?: React.ReactNode

    /** 控制面板尺寸 */
    size?: UISize

    /** 禁用整个组件 */
    disabled?: boolean
}

export type TransferFactory = Factory<{
    props: TransferProps
    ref: HTMLDivElement
    stylesNames: TransferStylesNames
}>

const defaultProps = {
    titles: ['未选择', '已选择'],
    searchable: false,
    searchPlaceholder: '搜索',
    listHeight: 280,
    withSelectAll: true,
    nothingFoundMessage: '无匹配结果',
    size: 'sm'
} satisfies Partial<TransferProps>

export const Transfer = factory<TransferFactory>((_props, ref) => {
    const props = useProps('Transfer', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        attributes,
        mod,
        data,
        value,
        defaultValue,
        onChange,
        titles,
        searchable,
        searchPlaceholder,
        listHeight,
        withSelectAll,
        nothingFoundMessage,
        size,
        disabled,
        ...others
    } = props

    const getStyles = useStyles<TransferFactory>({
        name: 'Transfer',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars
    })

    const [selectedValues, setSelectedValues] = useUncontrolled<string[]>({
        value,
        defaultValue,
        finalValue: [],
        onChange
    })

    const [sourceSearch, setSourceSearch] = useState('')
    const [targetSearch, setTargetSearch] = useState('')

    /** 已选值集合统一按 data 原始顺序维护，保证 onChange 输出稳定 */
    const orderedSelected = useMemo(
        () => data.filter(item => selectedValues.includes(item.value)).map(item => item.value),
        [data, selectedValues]
    )

    const moveToSelected = (values: string[]) => {
        setSelectedValues(
            data.filter(item => selectedValues.includes(item.value) || values.includes(item.value)).map(item => item.value)
        )
    }

    const moveToSource = (values: string[]) => {
        setSelectedValues(orderedSelected.filter(item => !values.includes(item)))
    }

    const filterBySearch = (items: TransferItem[], query: string) => {
        if (!query.trim()) {
            return items
        }
        const keyword = query.trim().toLowerCase()
        return items.filter(item => {
            // label 为 ReactNode 的条目无法文本匹配：保留而非隐藏（类型上合法的输入）
            if (typeof item.label !== 'string') {
                return true
            }
            return (
                item.label.toLowerCase().includes(keyword) ||
                String(item.value).toLowerCase().includes(keyword)
            )
        })
    }

    /** 面板列表内方向键移动焦点（checkbox 天然可 Tab，方向键提供更快的遍历） */
    const handleItemKeyDown = (event: React.KeyboardEvent) => {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
            return
        }
        const listEl = (event.currentTarget as HTMLElement).parentElement
        const checkboxes = Array.from(
            listEl?.querySelectorAll<HTMLInputElement>(':scope > label input[type="checkbox"]') ?? []
        )
        const currentIndex = checkboxes.indexOf(event.target as HTMLInputElement)
        if (currentIndex === -1) {
            return
        }
        const nextIndex =
            event.key === 'ArrowDown'
                ? Math.min(currentIndex + 1, checkboxes.length - 1)
                : Math.max(currentIndex - 1, 0)
        const next = checkboxes[nextIndex]
        if (next && next !== event.target) {
            event.preventDefault()
            next.focus()
        }
    }

    const renderPanel = (side: 'source' | 'target') => {
        const isSource = side === 'source'
        const searchValue = isSource ? sourceSearch : targetSearch
        const setSearchValue = isSource ? setSourceSearch : setTargetSearch

        const sideItems = isSource
            ? data.filter(item => !selectedValues.includes(item.value))
            : data.filter(item => selectedValues.includes(item.value))
        const visibleItems = filterBySearch(sideItems, searchValue)
        const toggleableItems = visibleItems.filter(item => !item.disabled)

        const handleToggleAll = () => {
            const values = toggleableItems.map(item => item.value)
            if (isSource) {
                moveToSelected(values)
            } else {
                moveToSource(values)
            }
        }

        const handleToggleItem = (item: TransferItem) => {
            if (item.disabled || disabled) {
                return
            }
            if (isSource) {
                moveToSelected([item.value])
            } else {
                moveToSource([item.value])
            }
        }

        const listStyle = {
            '--transfer-list-height': typeof listHeight === 'number' ? `${listHeight}px` : listHeight
        } as React.CSSProperties

        return (
            <div
                {...getStyles('panel', { style: listStyle })}
                data-side={side}
                role="group"
                aria-label={typeof (isSource ? titles?.[0] : titles?.[1]) === 'string' ? (isSource ? titles?.[0] : titles?.[1]) as string : undefined}
            >
                <div {...getStyles('panelHeader')}>
                    {withSelectAll && (
                        <Button
                            size="compact-xs"
                            variant="subtle"
                            disabled={disabled || toggleableItems.length === 0}
                            onClick={handleToggleAll}
                            aria-label={isSource ? '全选到右侧' : '全部移除'}
                        >
                            {isSource ? '全选' : '清空'}
                        </Button>
                    )}
                    <span {...getStyles('panelTitle')}>{isSource ? titles?.[0] : titles?.[1]}</span>
                    <span {...getStyles('panelCount')}>{sideItems.length}</span>
                </div>
                {searchable && (
                    <div {...getStyles('searchInput')}>
                        <TextInput
                            size="xs"
                            placeholder={searchPlaceholder}
                            value={searchValue}
                            disabled={disabled}
                            onChange={event => setSearchValue(event.currentTarget.value)}
                            aria-label={isSource ? '搜索未选择项' : '搜索已选择项'}
                        />
                    </div>
                )}
                <div {...getStyles('panelList')}>
                    {visibleItems.length === 0 ? (
                        <div {...getStyles('empty')}>{nothingFoundMessage}</div>
                    ) : (
                        visibleItems.map(item => (
                            <label
                                key={item.value}
                                {...getStyles('item')}
                                data-disabled={item.disabled || disabled ? true : undefined}
                                onKeyDown={handleItemKeyDown}
                            >
                                <Checkbox
                                    size="xs"
                                    checked={isSource ? selectedValues.includes(item.value) : true}
                                    disabled={item.disabled || disabled}
                                    onChange={() => handleToggleItem(item)}
                                    aria-label={typeof item.label === 'string' ? item.label : undefined}
                                />
                                <span className={classes.itemLabel}>{item.label}</span>
                            </label>
                        ))
                    )}
                </div>
            </div>
        )
    }

    return (
        <Box
            ref={ref}
            {...getStyles('root')}
            data-size={size}
            mod={[{ disabled }, mod]}
            {...others}
        >
            {renderPanel('source')}
            {renderPanel('target')}
        </Box>
    )
})

Transfer.classes = classes
Transfer.displayName = '@xiaoye-react/ui/Transfer'

export namespace Transfer {
    export type Props = TransferProps
    export type StylesNames = TransferStylesNames
    export type Factory = TransferFactory
    export type Item = TransferItem
}
