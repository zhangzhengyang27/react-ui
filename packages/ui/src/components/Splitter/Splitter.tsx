import { Children, cloneElement, isValidElement, useEffect, useMemo } from 'react'
import {
    useMergedRef,
    useSplitter,
    type SplitterPaneSize,
    type SplitterStep,
    type UseSplitterPanel,
    type UseSplitterRedistributeFn
} from '@xiaoye-react/hooks'
import {
    Box,
    BoxProps,
    createVarsResolver,
    Factory,
    factory,
    rem,
    StylesApiProps,
    useDirection,
    useProps,
    useStyles
} from '../../core'
import classes from './Splitter.module.css'
import { SplitterContext } from './SplitterContext'
import { SplitterPanel, SplitterPanelProps } from './SplitterPanel/SplitterPanel'
import { SplitterResizer } from './SplitterResizer/SplitterResizer'

export type SplitterStylesNames = 'root' | 'panel' | 'resizer'
export type SplitterCssVariables = {
    root: '--splitter-line-size'
}

export interface SplitterProps extends BoxProps, StylesApiProps<SplitterFactory> {
    /** Splitter orientation @default 'horizontal' */
    orientation?: 'horizontal' | 'vertical'

    /** 分隔条粗细，`number`（如 `2`）与 `'2px'` 一律按 1rem = 16px 换算并乘主题 `--ui-scale`，
     * 其他字符串原样作为 CSS 长度。落到根节点的 `--splitter-line-size` 变量上
     * @default '4px'（由样式表提供） */
    lineSize?: number | string

    /** 受控的面板尺寸数组，每项单位与对应 `Splitter.Panel` 的 `size` 一致 */
    sizes?: SplitterPaneSize[]

    /** 拖拽或键盘调整尺寸时调用，回传当前全部面板尺寸 */
    onSizesChange?: (sizes: SplitterPaneSize[]) => void

    /** 相邻面板达到其 `min`/`max` 时，如何从非相邻面板借用空间：
     * `'nearest'` 优先向拖拽方向最近的面板借用，`'equal'` 在该方向上均摊，
     * 也可传自定义函数；不设置时只影响相邻的两个面板 */
    redistribute?: 'nearest' | 'equal' | UseSplitterRedistributeFn

    /** 方向键调整步长，`number`/`%` 为百分比，`px`/`rem` 为像素 @default 1 */
    step?: SplitterStep

    /** Shift + 方向键调整步长，单位同 `step` @default 10 */
    shiftStep?: SplitterStep

    /** Splitter content, should contain Splitter.Panel components */
    children?: React.ReactNode
}

export type SplitterFactory = Factory<{
    props: SplitterProps
    ref: HTMLDivElement
    stylesNames: SplitterStylesNames
    vars: SplitterCssVariables
    staticComponents: {
        Panel: typeof SplitterPanel
        Pane: typeof SplitterPanel
        Resizer: typeof SplitterResizer
    }
}>

const defaultProps = {
    orientation: 'horizontal'
} satisfies Partial<SplitterProps>

const varsResolver = createVarsResolver<SplitterFactory>((theme, { lineSize }) => ({
    root: {
        '--splitter-line-size': lineSize === undefined ? undefined : rem(lineSize)
    }
}))

function isPanel(child: React.ReactNode): child is React.ReactElement {
    if (!isValidElement(child)) {
        return false
    }
    const type = child.type as any
    // 优先查静态标记,displayName 字符串匹配仅作兜底,
    // 避免 HOC/memo 包装后 displayName 变化导致 Panel 被静默丢弃
    return type?.isSplitterPanel === true || type?.displayName === '@xiaoye-react/ui/SplitterPanel'
}

/** 面板的可序列化配置：useSplitter 的 min/max/size 从这里进 hook */
function getPanelConfig(panel: React.ReactElement, equalSize: number): UseSplitterPanel {
    const { size, min, max, collapsible, collapseThreshold } = panel.props as SplitterPanelProps
    return { defaultSize: size ?? equalSize, min, max, collapsible, collapseThreshold }
}

/** 配置指纹：面板 children 每次 render 都是新元素，靠指纹保持 hook 配置引用稳定 */
function getPanelsKey(panels: React.ReactElement[]): string {
    return panels
        .map((panel) => {
            const { size, min, max, collapsible, collapseThreshold } = panel.props as SplitterPanelProps
            return `${String(size)}/${String(min)}/${String(max)}/${String(collapsible)}/${String(collapseThreshold)}`
        })
        .join('|')
}

export const Splitter = factory<SplitterFactory>((_props, ref) => {
    const props = useProps('Splitter', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        orientation,
        lineSize,
        sizes: controlledSizes,
        onSizesChange,
        redistribute,
        step,
        shiftStep,
        children,
        ...others
    } = props

    const { dir } = useDirection()
    const panels = Children.toArray(children).filter(isPanel)
    const panelsKey = `${panels.length}:${getPanelsKey(panels)}`

    // useSplitter 是尺寸的唯一来源：面板级 size/min/max 进 hook，
    // 拖拽结果（含 min/max clamp 与 redistribute）由 hook 算，组件不再自管百分比
    const panelsConfig = useMemo<UseSplitterPanel[]>(() => {
        const equalSize = panels.length > 0 ? 100 / panels.length : 0
        return panels.map((panel) => getPanelConfig(panel, equalSize))
    }, [panelsKey])

    const splitter = useSplitter<HTMLDivElement>({
        panels: panelsConfig,
        orientation,
        sizes: controlledSizes,
        onSizeChange: onSizesChange,
        redistribute,
        step,
        shiftStep,
        dir
    })

    const mergedRef = useMergedRef<HTMLDivElement>(ref, splitter.ref)

    // 面板数量动态变化时同步 sizes，避免 sizes[index] 为 undefined 导致 flex-basis: NaN%
    // 策略：新增面板补 0（总和已为 100%，无剩余空间可均分，保持现有布局不变，由用户拖动 resizer 分配），多余截断
    // 受控模式下不回写，数组长度由消费者自己维护
    const { setSizes, sizes: currentSizes } = splitter
    useEffect(() => {
        if (controlledSizes !== undefined || currentSizes.length === panels.length) {
            return
        }

        setSizes(
            currentSizes.length > panels.length
                ? currentSizes.slice(0, panels.length)
                : [
                      ...currentSizes,
                      ...Array(panels.length - currentSizes.length).fill(0 as SplitterPaneSize)
                  ]
        )
    }, [panels.length, currentSizes, setSizes, controlledSizes])

    const ctxValue = useMemo(
        () => ({
            orientation: orientation!,
            sizes: currentSizes,
            pixelMode: splitter.pixelMode,
            getHandleProps: splitter.getHandleProps
        }),
        [orientation, currentSizes, splitter.pixelMode, splitter.getHandleProps]
    )

    const getStyles = useStyles<SplitterFactory>({
        name: 'Splitter',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver,
        rootSelector: 'root'
    })

    return (
        <SplitterContext.Provider value={ctxValue}>
            <Box
                ref={mergedRef}
                data-orientation={orientation}
                {...getStyles('root')}
                {...others}
            >
                {panels.map((panel, index) => (
                    <div key={index} style={{ display: 'contents' }}>
                        {cloneElement(panel as React.ReactElement<any>, { index })}
                        {index < panels.length - 1 && <SplitterResizer index={index} />}
                    </div>
                ))}
            </Box>
        </SplitterContext.Provider>
    )
})

Splitter.Panel = SplitterPanel
Splitter.Pane = SplitterPanel
Splitter.Resizer = SplitterResizer
Splitter.classes = classes
Splitter.displayName = '@xiaoye-react/ui/Splitter'
;(Splitter as any).varsResolver = varsResolver

export namespace Splitter {
    export type Props = SplitterProps
    export type Factory = SplitterFactory
    export type StylesNames = SplitterStylesNames
    export type CssVariables = SplitterCssVariables
}
