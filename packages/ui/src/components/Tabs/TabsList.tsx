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

    return (
        <Box
            ref={ref}
            role="tablist"
            aria-orientation={ctx.orientation}
            {...others}
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
