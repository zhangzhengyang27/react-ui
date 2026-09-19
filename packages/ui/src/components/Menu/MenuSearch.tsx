import { useEffect, useRef, useState } from 'react'
import type { ElementProps } from '../../core'
import { Input } from '../Input/Input'
import { useMenuContext } from './Menu.context'
import classes from './Menu.module.css'

export interface MenuSearchProps
    extends React.ComponentProps<typeof Input>,
        ElementProps<'input', 'size' | 'style' | 'ref' | 'value' | 'defaultValue' | 'onChange'> {
    /** If set, clears the search value after the menu closes @default true */
    clearSearchOnClose?: boolean
    /** 受控搜索值 */
    value?: string
    /** 非受控初始搜索值 */
    defaultValue?: string
    /** 搜索值变化回调 */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function MenuSearch(props: MenuSearchProps) {
    const ctx = useMenuContext()
    const { clearSearchOnClose = true, value, defaultValue, onChange, ...others } = props

    // 内部托管搜索值以便菜单关闭时清空；外部传入 value（受控用法）时从 value 同步
    const [searchValue, setSearchValue] = useState<string>(String(value ?? defaultValue ?? ''))

    useEffect(() => {
        if (value !== undefined) {
            setSearchValue(String(value))
        }
    }, [value])

    // clearSearchOnClose（默认 true）：菜单由开转关时清空搜索值
    const prevOpenedRef = useRef(ctx.opened)
    useEffect(() => {
        const wasOpened = prevOpenedRef.current
        prevOpenedRef.current = ctx.opened
        if (wasOpened && !ctx.opened && clearSearchOnClose) {
            setSearchValue('')
            if (value !== undefined) {
                // 受控用法：内部 state 会被外部 value 覆盖，需通知外部同步清空
                onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
            }
        }
    }, [ctx.opened, clearSearchOnClose, value, onChange])

    return (
        <Input
            data-autofocus
            data-ui-stop-propagation
            type="search"
            {...others}
            value={searchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchValue(event.currentTarget.value)
                onChange?.(event)
            }}
            __staticSelector="Menu"
        />
    )
}

MenuSearch.displayName = '@xiaoye-react/ui/MenuSearch'
