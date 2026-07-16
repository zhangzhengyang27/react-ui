import { Children, cloneElement, isValidElement } from 'react'
import {
    Box,
    factory,
    useProps,
    type BoxProps,
    type CompoundStylesApiProps,
    type ElementProps,
    type Factory
} from '../../core'
import { useTabsContext } from './Tabs.context'
import classes from './Tabs.module.css'

export type TabsListStylesNames = 'list'

export interface TabsListProps extends BoxProps, CompoundStylesApiProps<TabsListFactory>, ElementProps<'div'> {
    /** Tab components */
    children: React.ReactNode

    /** If true, tabs grow to fill the available space @default false */
    grow?: boolean

    /** Tabs position @default 'left' */
    position?: 'left' | 'center' | 'right' | 'apart'
}

export type TabsListFactory = Factory<{
    props: TabsListProps
    ref: HTMLDivElement
    stylesNames: TabsListStylesNames
    compound: true
}>

export const TabsList = factory<TabsListFactory>((props, ref) => {
    const { classNames, className, style, styles, children, grow, position, mod, ...others } = useProps(
        'TabsList',
        null,
        props
    )
    const ctx = useTabsContext()

    const tabs = Children.toArray(children).map((child, index) => {
        if (isValidElement(child)) {
            return cloneElement(child as React.ReactElement<any>, { key: index })
        }
        return child
    })

    // ARIA Tabs 键盘导航:根据 orientation 用 Arrow 键在 tab 间移动焦点并激活,
    // Home/End 跳首末,遵循 https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        others.onKeyDown?.(event)

        const list = event.currentTarget
        const tabNodes = Array.from(
            list.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])')
        )
        if (tabNodes.length === 0) return

        const currentIndex = tabNodes.findIndex(node => node === document.activeElement)
        let nextIndex = currentIndex

        const isHorizontal = ctx.orientation === 'horizontal'
        switch (event.key) {
            case isHorizontal ? 'ArrowRight' : 'ArrowDown':
                nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % tabNodes.length
                break
            case isHorizontal ? 'ArrowLeft' : 'ArrowUp':
                nextIndex = currentIndex <= 0 ? tabNodes.length - 1 : currentIndex - 1
                break
            case 'Home':
                nextIndex = 0
                break
            case 'End':
                nextIndex = tabNodes.length - 1
                break
            default:
                return
        }

        event.preventDefault()
        const nextTab = tabNodes[nextIndex]
        nextTab.focus()
        // 通过点击触发激活,复用 TabsTab 的 onClick 逻辑(内含 activateTab)
        nextTab.click()
    }

    return (
        <Box
            ref={ref}
            role="tablist"
            aria-orientation={ctx.orientation}
            {...others}
            onKeyDown={handleKeyDown}
            {...ctx.getStyles('list', { className, classNames, style, styles })}
            mod={[{ grow, position }, mod]}
        >
            {tabs}
        </Box>
    )
})

TabsList.displayName = '@react-ui/ui/TabsList'
TabsList.classes = classes

export namespace TabsList {
    export type Props = TabsListProps
    export type StylesNames = TabsListStylesNames
    export type Factory = TabsListFactory
}
