import { Children, cloneElement } from 'react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getRadius,
    getSize,
    getThemeColor,
    isElement,
    UIColor,
    UIRadius,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { TimelineItem } from './TimelineItem'
import classes from './Timeline.module.css'

export type TimelineStylesNames = 'root' | 'item' | 'itemBody' | 'itemTitle' | 'itemContent' | 'itemBullet' | 'itemLine'

export type TimelineCssVariables = {
    root: '--timeline-line-width' | '--timeline-bullet-size' | '--timeline-color' | '--timeline-radius'
}

export interface TimelineProps extends BoxProps, StylesApiProps<TimelineFactory>, ElementProps<'div'> {
    /** Index of the current active item @default -1 */
    active?: number

    /** 主题颜色的键或任意有效的 CSS 颜色 @default theme.primaryColor */
    color?: UIColor

    /** 项目符号之间连线的宽度 @default 4 */
    lineWidth?: number | string

    /** 项目符号的直径 @default 20 */
    bulletSize?: number | string

    /** If set, items after the active item will be marked as active instead of before */
    reverseActive?: boolean

    /** 时间轴对齐方式 @default 'left' */
    align?: 'left' | 'right'

    /** 主题圆角的键或任意有效的 CSS 值 @default theme.defaultRadius */
    radius?: UIRadius

    /** Timeline items */
    children: React.ReactNode
}

export type TimelineFactory = Factory<{
    props: TimelineProps
    ref: HTMLDivElement
    stylesNames: TimelineStylesNames
    vars: TimelineCssVariables
    staticComponents: {
        Item: typeof TimelineItem
    }
}>

const defaultProps = {
    active: -1,
    lineWidth: 4,
    bulletSize: 20,
    reverseActive: false,
    align: 'left'
} satisfies Partial<TimelineProps>

const varsResolver = createVarsResolver<TimelineFactory>((theme, { color, lineWidth, bulletSize, radius }) => ({
    root: {
        '--timeline-line-width': getSize(lineWidth, 'timeline-line-width'),
        '--timeline-bullet-size': getSize(bulletSize, 'timeline-bullet-size'),
        '--timeline-color': color ? getThemeColor(color, theme) : undefined,
        '--timeline-radius': radius === undefined ? undefined : getRadius(radius)
    }
}))

export const Timeline = factory<TimelineFactory>((_props, ref) => {
    const props = useProps('Timeline', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        children,
        active,
        color,
        lineWidth,
        bulletSize,
        reverseActive,
        align,
        radius,
        attributes,
        mod,
        ...others
    } = props

    const getStyles = useStyles<TimelineFactory>({
        name: 'Timeline',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver
    })

    const items = Children.toArray(children)
    const totalItems = items.length

    const clonedChildren = Children.map(items, (child, index) => {
        if (!isElement(child)) {
            return child
        }

        const itemActive = reverseActive ? index >= active! : index <= active!

        return cloneElement(child as React.ReactElement<any>, {
            key: index,
            index,
            totalItems,
            active: (child.props as any).active ?? itemActive,
            align,
            __getStyles: getStyles
        })
    })

    return (
        <Box ref={ref} {...getStyles('root')} mod={[{ align }, mod]} {...others}>
            {clonedChildren}
        </Box>
    )
})

Timeline.classes = classes
;(Timeline as any).varsResolver = varsResolver
Timeline.displayName = '@react-ui/ui/Timeline'
Timeline.Item = TimelineItem

export namespace Timeline {
    export type Props = TimelineProps
    export type StylesNames = TimelineStylesNames
    export type CssVariables = TimelineCssVariables
    export type Factory = TimelineFactory
}
