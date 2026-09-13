import { useId, useUncontrolled } from '@xiaoye-react/hooks'
import {
    Box,
    createVarsResolver,
    factory,
    getRadius,
    useProps,
    useStyles,
    type BoxProps,
    type ElementProps,
    type Factory,
    type UIColor,
    type UIRadius,
    type StylesApiProps
} from '../../core'
import classes from './Tabs.module.css'
import { TabsProvider } from './Tabs.context'
import { TabsList } from './TabsList'
import { TabsPanel } from './TabsPanel'
import { TabsTab } from './TabsTab'

export type TabsStylesNames = 'root' | 'list' | 'tab' | 'tabSection' | 'panel'
export type TabsVariant = 'default' | 'outline' | 'pills'

export type TabsCssVariables = {
    root: '--tabs-radius' | '--tabs-color' | '--tabs-bg' | '--tabs-bd'
}

export interface TabsProps
    extends BoxProps,
        StylesApiProps<TabsFactory>,
        ElementProps<'div', 'value' | 'defaultValue' | 'onChange'> {
    /** 受控的活动标签页值 */
    value?: string

    /** 非受控组件的默认活动标签页值 */
    defaultValue?: string

    /** 活动标签页变化时调用 */
    onChange?: (value: string) => void

    /** Tabs 方向 @default 'horizontal' */
    orientation?: 'horizontal' | 'vertical'

    /** 主题色键或任意有效 CSS 颜色 @default theme.primaryColor */
    color?: UIColor

    /** Tabs 变体 @default 'default' */
    variant?: TabsVariant

    /** 主题圆角键或任意有效 CSS 值 @default theme.defaultRadius */
    radius?: UIRadius

    /** 如果为 true，非活动面板会保留在 DOM 中 @default false */
    keepMounted?: boolean

    /** Tabs 内容 */
    children?: React.ReactNode
}

export type TabsFactory = Factory<{
    props: TabsProps
    ref: HTMLDivElement
    stylesNames: TabsStylesNames
    vars: TabsCssVariables
    variant: TabsVariant
    staticComponents: {
        List: typeof TabsList
        Tab: typeof TabsTab
        Panel: typeof TabsPanel
    }
}>

const defaultProps = {
    orientation: 'horizontal',
    variant: 'default',
    keepMounted: false
} satisfies Partial<TabsProps>

const varsResolver = createVarsResolver<TabsFactory>((theme, { color, variant, radius }) => {
    const resolverVariant = variant === 'pills' ? 'light' : 'outline'
    const colors = theme.variantColorResolver({
        color: color || theme.primaryColor,
        theme,
        variant: resolverVariant
    })

    return {
        root: {
            '--tabs-radius': getRadius(radius),
            '--tabs-color': colors.color,
            '--tabs-bg': colors.background,
            '--tabs-bd': colors.border
        }
    }
})

export const Tabs = factory<TabsFactory>((_props, ref) => {
    const props = useProps('Tabs', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        children,
        value,
        defaultValue,
        onChange,
        orientation,
        color,
        variant,
        radius,
        keepMounted,
        mod,
        ...others
    } = props

    const [activeValue, setActiveValue] = useUncontrolled({
        value,
        defaultValue,
        finalValue: undefined,
        onChange
    })

    // tab/panel 的 id 关联：读屏器依赖 aria-controls / aria-labelledby 把标签页与面板配对
    const uuid = useId()
    const getTabId = (tabValue: string) => `${uuid}-${tabValue}-tab`
    const getPanelId = (panelValue: string) => `${uuid}-${panelValue}-panel`

    const getStyles = useStyles<TabsFactory>({
        name: 'Tabs',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver
    })

    const activateTab = (tabValue: string) => {
        if (activeValue !== tabValue) {
            setActiveValue(tabValue)
        }
    }

    return (
        <TabsProvider
            value={{
                activeValue,
                activateTab,
                getStyles,
                unstyled,
                variant,
                color,
                radius,
                orientation: orientation!,
                keepMounted: keepMounted!,
                getTabId,
                getPanelId
            }}
        >
            <Box ref={ref} {...getStyles('root')} mod={[{ orientation, variant }, mod]} {...others}>
                {children}
            </Box>
        </TabsProvider>
    )
})

Tabs.classes = classes
;(Tabs as any).varsResolver = varsResolver
Tabs.displayName = '@xiaoye-react/ui/Tabs'
Tabs.List = TabsList
Tabs.Tab = TabsTab
Tabs.Panel = TabsPanel

export namespace Tabs {
    export type Props = TabsProps
    export type StylesNames = TabsStylesNames
    export type CssVariables = TabsCssVariables
    export type Factory = TabsFactory
    export type Variant = TabsVariant
}
