import { useUncontrolled } from '@react-ui/hooks'
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
    type MantineColor,
    type MantineRadius,
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
    /** Controlled active tab value */
    value?: string

    /** Default active tab value for uncontrolled component */
    defaultValue?: string

    /** Called when active tab changes */
    onChange?: (value: string) => void

    /** Tabs orientation @default 'horizontal' */
    orientation?: 'horizontal' | 'vertical'

    /** Key of theme.colors or any valid CSS color @default theme.primaryColor */
    color?: MantineColor

    /** Tabs variant @default 'default' */
    variant?: TabsVariant

    /** Key of theme.radius or any valid CSS value @default theme.defaultRadius */
    radius?: MantineRadius

    /** If true, inactive panels stay mounted in the DOM @default false */
    keepMounted?: boolean

    /** Tabs content */
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
                keepMounted: keepMounted!
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
Tabs.displayName = '@react-ui/ui/Tabs'
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
