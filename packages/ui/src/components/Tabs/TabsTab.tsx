import { useRef } from 'react'
import { useIsomorphicEffect, useMergedRef } from '@xiaoye-react/hooks'
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

export type TabsTabStylesNames = 'tab' | 'tabSection'

export interface TabsTabProps extends BoxProps, CompoundStylesApiProps<TabsTabFactory>, ElementProps<'button'> {
    /** Tab value used to identify the tab */
    value: string

    /** Content on the left side of the tab label */
    leftSection?: React.ReactNode

    /** Content on the right side of the tab label */
    rightSection?: React.ReactNode

    /** If true, the tab is disabled @default false */
    disabled?: boolean

    /** Tab label */
    children?: React.ReactNode
}

export type TabsTabFactory = Factory<{
    props: TabsTabProps
    ref: HTMLButtonElement
    stylesNames: TabsTabStylesNames
    compound: true
}>

export const TabsTab = factory<TabsTabFactory>((props, ref) => {
    const {
        classNames,
        className,
        style,
        styles,
        value,
        leftSection,
        rightSection,
        disabled,
        children,
        mod,
        id,
        ...others
    } = useProps('TabsTab', null, props)
    const ctx = useTabsContext()

    const isActive = ctx.activeValue === value
    // 消费者显式传入 id 时以其为准，aria-controls 与之保持一致
    const tabId = id || ctx.getTabId(value)

    const tabRef = useRef<HTMLButtonElement>(null)
    const mergedRef = useMergedRef(ref, tabRef)

    // 无激活值（未传 value/defaultValue）时所有 tab 的 tabIndex 都是 -1，
    // roving tabindex 失效、Tab 键无法进入标签列表：把 tablist 内第一个
    // 未禁用的 tab 设为可聚焦。激活值存在时由 JSX prop 接管，无需干预
    useIsomorphicEffect(() => {
        const node = tabRef.current
        if (!node || ctx.activeValue !== undefined) {
            return
        }
        const first = node
            .closest('[role="tablist"]')
            ?.querySelector<HTMLButtonElement>('[role="tab"]:not([disabled])')
        node.tabIndex = first === node ? 0 : -1
    })

    return (
        <Box
            component="button"
            ref={mergedRef}
            type="button"
            role="tab"
            id={tabId}
            aria-controls={ctx.getPanelId(value)}
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            disabled={disabled}
            data-value={value}
            {...others}
            {...ctx.getStyles('tab', { className, classNames, style, styles })}
            mod={[{ active: isActive, disabled }, mod]}
            onClick={event => {
                others.onClick?.(event)
                if (!disabled) {
                    ctx.activateTab(value)
                }
            }}
        >
            {leftSection && (
                <Box
                    component="span"
                    {...ctx.getStyles('tabSection', { classNames, styles })}
                    mod={{ position: 'left' }}
                >
                    {leftSection}
                </Box>
            )}
            {children}
            {rightSection && (
                <Box
                    component="span"
                    {...ctx.getStyles('tabSection', { classNames, styles })}
                    mod={{ position: 'right' }}
                >
                    {rightSection}
                </Box>
            )}
        </Box>
    )
})

TabsTab.displayName = '@xiaoye-react/ui/TabsTab'
TabsTab.classes = classes

export namespace TabsTab {
    export type Props = TabsTabProps
    export type StylesNames = TabsTabStylesNames
    export type Factory = TabsTabFactory
}
