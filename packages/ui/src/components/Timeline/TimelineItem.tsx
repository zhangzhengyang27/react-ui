import {
    Box,
    BoxProps,
    CompoundStylesApiProps,
    CSSProperties,
    CssVariables,
    ElementProps,
    factory,
    Factory,
    getRadius,
    getThemeColor,
    GetStylesApiOptions,
    UIColor,
    UIRadius,
    useUITheme,
    useProps
} from '../../core'
import type { TimelineStylesNames } from './Timeline'
import classes from './Timeline.module.css'

export type TimelineItemStylesNames = 'item' | 'itemBody' | 'itemTitle' | 'itemContent' | 'itemBullet' | 'itemLine'

export interface TimelineItemProps
    extends BoxProps,
        CompoundStylesApiProps<TimelineItemFactory>,
        ElementProps<'div', 'title'> {
    /** Item title */
    title?: React.ReactNode

    /** Custom bullet content */
    bullet?: React.ReactNode

    /** 主题颜色的键或任意有效的 CSS 颜色, overrides Timeline color */
    color?: UIColor

    /** If set, overrides active state computed by Timeline */
    active?: boolean

    /** Line variant @default 'solid' */
    lineVariant?: 'solid' | 'dashed' | 'dotted'

    /** 主题圆角的键或任意有效的 CSS 值, overrides Timeline radius */
    radius?: UIRadius

    /** Item content */
    children?: React.ReactNode
}

export type TimelineItemFactory = Factory<{
    props: TimelineItemProps
    ref: HTMLDivElement
    stylesNames: TimelineItemStylesNames
    compound: true
}>

interface TimelineItemInternalProps extends TimelineItemProps {
    index?: number
    totalItems?: number
    align?: 'left' | 'right'
    __getStyles?: (
        selector: TimelineStylesNames,
        options?: GetStylesApiOptions
    ) => { className: string; style: CSSProperties }
}

const defaultProps = {
    lineVariant: 'solid'
} satisfies Partial<TimelineItemProps>

export const TimelineItem = factory<TimelineItemFactory>((props, ref) => {
    const {
        classNames,
        className,
        style,
        styles,
        title,
        bullet,
        color,
        active,
        lineVariant,
        radius,
        children,
        mod,
        index,
        totalItems,
        align,
        __getStyles,
        ...others
    } = useProps('TimelineItem', defaultProps, props as TimelineItemInternalProps)

    const theme = useUITheme()
    // 脱离 Timeline 单独使用时（虽不推荐，但组件被公开导出）给出可读错误，
    // 而非 undefined.getStyles 的裸 TypeError
    if (!__getStyles) {
        throw new Error(
            '[@xiaoye-react/ui] Timeline.Item component should only be used inside of the Timeline component'
        )
    }
    const getStyles = __getStyles

    const isLast = index === (totalItems ?? 0) - 1
    const itemVars: CssVariables = {
        '--timeline-item-line-variant': lineVariant
    }

    if (color) {
        itemVars['--timeline-item-color'] = getThemeColor(color, theme)
    }

    if (radius !== undefined) {
        itemVars['--timeline-item-radius'] = getRadius(radius)
    }

    return (
        <Box
            ref={ref}
            {...getStyles('item', { className, style, classNames, styles })}
            __vars={itemVars}
            mod={[
                {
                    active,
                    last: isLast,
                    align
                },
                mod
            ]}
            {...others}
        >
            <div {...getStyles('itemBullet', { classNames, styles })}>{bullet ?? <span />}</div>
            <div {...getStyles('itemBody', { classNames, styles })}>
                {title && <div {...getStyles('itemTitle', { classNames, styles })}>{title}</div>}
                {children && <div {...getStyles('itemContent', { classNames, styles })}>{children}</div>}
            </div>
            {!isLast && <div {...getStyles('itemLine', { classNames, styles })} aria-hidden />}
        </Box>
    )
})

TimelineItem.classes = classes
TimelineItem.displayName = '@xiaoye-react/ui/TimelineItem'

export namespace TimelineItem {
    export type Props = TimelineItemProps
    export type StylesNames = TimelineItemStylesNames
    export type Factory = TimelineItemFactory
}
