import type { CSSProperties } from 'react'
import type { SplitterPaneSize } from '@xiaoye-react/hooks'
import { Box, BoxProps, Factory, factory, StylesApiProps, useProps, useStyles } from '../../../core'
import classes from '../Splitter.module.css'
import { useSplitterContext } from '../SplitterContext'

export interface SplitterPanelProps extends BoxProps, StylesApiProps<SplitterPanelFactory> {
    /** Panel content */
    children?: React.ReactNode

    /** 初始尺寸，`number`/`%` 为弹性尺寸（按权重分享剩余空间），`px`/`rem` 为固定尺寸。
     * 未设置时按容器百分比等分 */
    size?: SplitterPaneSize

    /** 面板可拖拽到的最小尺寸，单位与 `size` 一致，默认 `0` */
    min?: SplitterPaneSize

    /** 面板可拖拽到的最大尺寸，单位与 `size` 一致，默认无上限（弹性模式下为 100%） */
    max?: SplitterPaneSize

    /** 面板是否可以被折叠（拖拽越过 `collapseThreshold` 或分隔条上按 Enter） @default false */
    collapsible?: boolean

    /** 小于该尺寸时面板吸附到折叠状态，默认为 `min` */
    collapseThreshold?: SplitterPaneSize

    /** @internal Index assigned by Splitter parent */
    index?: number
}

export type SplitterPanelFactory = Factory<{
    props: SplitterPanelProps
    ref: HTMLDivElement
    stylesNames: 'panel'
    staticComponents: {
        isSplitterPanel: true
    }
}>

const defaultProps = {} satisfies Partial<SplitterPanelProps>

// 与 useSplitter 的单位判定保持一致：px/rem 为固定尺寸，其余为弹性尺寸
const FIXED_SIZE_RE = /^-?[\d.]+(px|rem)$/

/** 把 useSplitter 维护的尺寸写成 flex 相关样式。
 * 百分比模式下 basis 即占比；像素模式下固定面板锁死尺寸、弹性面板按权重瓜分剩余空间 */
function getSizeStyle(size: SplitterPaneSize | undefined, pixelMode: boolean): CSSProperties {
    if (size === undefined) {
        return {}
    }

    const raw = typeof size === 'number' ? `${size}%` : size

    if (!pixelMode) {
        return { flexBasis: raw }
    }

    return FIXED_SIZE_RE.test(raw) ? { flex: `0 0 ${raw}` } : { flex: `${parseFloat(raw) || 0} 1 0%` }
}

export const SplitterPanel = factory<SplitterPanelFactory>((_props, ref) => {
    const props = useProps('SplitterPanel', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        index,
        children,
        size,
        min,
        max,
        collapsible,
        collapseThreshold,
        ...others
    } = props
    const ctx = useSplitterContext()

    const getStyles = useStyles<SplitterPanelFactory>({
        name: 'Splitter',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        rootSelector: 'panel'
    })

    const currentSize = index !== undefined ? ctx.sizes[index] : undefined

    return (
        <Box
            ref={ref}
            data-orientation={ctx.orientation}
            {...getStyles('panel')}
            style={{
                ...getSizeStyle(currentSize, ctx.pixelMode),
                ...style
            }}
            {...others}
        >
            {children}
        </Box>
    )
})

SplitterPanel.classes = classes
SplitterPanel.displayName = '@xiaoye-react/ui/SplitterPanel'
// 静态标记:供 Splitter 的 isPanel 识别(HOC/memo 包装后 displayName 可能丢失)
SplitterPanel.isSplitterPanel = true

export namespace SplitterPanel {
    export type Props = SplitterPanelProps
    export type Factory = SplitterPanelFactory
}
