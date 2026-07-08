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
        ...others
    } = useProps('TabsTab', null, props)
    const ctx = useTabsContext()

    const isActive = ctx.activeValue === value

    return (
        <Box
            component="button"
            ref={ref}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
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

TabsTab.displayName = '@react-ui/ui/TabsTab'
TabsTab.classes = classes

export namespace TabsTab {
    export type Props = TabsTabProps
    export type StylesNames = TabsTabStylesNames
    export type Factory = TabsTabFactory
}
