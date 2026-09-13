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

export type TabsPanelStylesNames = 'panel'

export interface TabsPanelProps extends BoxProps, CompoundStylesApiProps<TabsPanelFactory>, ElementProps<'div'> {
    /** Panel value used to match active tab */
    value: string

    /** Panel content */
    children?: React.ReactNode
}

export type TabsPanelFactory = Factory<{
    props: TabsPanelProps
    ref: HTMLDivElement
    stylesNames: TabsPanelStylesNames
    compound: true
}>

export const TabsPanel = factory<TabsPanelFactory>((props, ref) => {
    const { classNames, className, style, styles, value, children, mod, id, ...others } = useProps(
        'TabsPanel',
        null,
        props
    )
    const ctx = useTabsContext()

    const isActive = ctx.activeValue === value

    if (!isActive && !ctx.keepMounted) {
        return null
    }

    return (
        <Box
            ref={ref}
            role="tabpanel"
            id={id || ctx.getPanelId(value)}
            aria-labelledby={ctx.getTabId(value)}
            {...others}
            {...ctx.getStyles('panel', { className, classNames, style, styles })}
            mod={[{ active: isActive, hidden: !isActive }, mod]}
            hidden={!isActive || undefined}
        >
            {children}
        </Box>
    )
})

TabsPanel.displayName = '@xiaoye-react/ui/TabsPanel'
TabsPanel.classes = classes

export namespace TabsPanel {
    export type Props = TabsPanelProps
    export type StylesNames = TabsPanelStylesNames
    export type Factory = TabsPanelFactory
}
