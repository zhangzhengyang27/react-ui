import { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from 'react'
import { Box, BoxProps, Factory, factory, StylesApiProps, useProps, useStyles } from '../../core'
import classes from './Splitter.module.css'
import { SplitterContext } from './SplitterContext'
import { SplitterPanel } from './SplitterPanel/SplitterPanel'
import { SplitterResizer } from './SplitterResizer/SplitterResizer'

export type SplitterStylesNames = 'root' | 'panel' | 'resizer'

export interface SplitterProps extends BoxProps, StylesApiProps<SplitterFactory> {
    /** Splitter orientation @default 'horizontal' */
    orientation?: 'horizontal' | 'vertical'

    /** Splitter content, should contain Splitter.Panel components */
    children?: React.ReactNode
}

export type SplitterFactory = Factory<{
    props: SplitterProps
    ref: HTMLDivElement
    stylesNames: SplitterStylesNames
    staticComponents: {
        Panel: typeof SplitterPanel
        Pane: typeof SplitterPanel
        Resizer: typeof SplitterResizer
    }
}>

const defaultProps = {
    orientation: 'horizontal'
} satisfies Partial<SplitterProps>

function isPanel(child: React.ReactNode): child is React.ReactElement {
    if (!isValidElement(child)) {
        return false
    }
    const type = child.type as any
    // 优先查静态标记,displayName 字符串匹配仅作兜底,
    // 避免 HOC/memo 包装后 displayName 变化导致 Panel 被静默丢弃
    return type?.isSplitterPanel === true || type?.displayName === '@react-ui/ui/SplitterPanel'
}

export const Splitter = factory<SplitterFactory>((_props, ref) => {
    const props = useProps('Splitter', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, orientation, children, ...others } = props

    const containerRef = useRef<HTMLDivElement | null>(null)
    const panels = Children.toArray(children).filter(isPanel)

    const [sizes, setSizes] = useState<number[]>(() => Array(panels.length).fill(100 / panels.length))

    // 面板数量动态变化时同步 sizes,避免 sizes[index] 为 undefined 导致 flex-basis: NaN%
    // 策略:新增面板补 0(总和已为 100%,无剩余空间可均分,保持现有布局不变,由用户拖动 resizer 分配),多余截断
    useEffect(() => {
        setSizes((prev) => {
            if (prev.length === panels.length) {
                return prev
            }
            if (prev.length > panels.length) {
                return prev.slice(0, panels.length)
            }
            return [...prev, ...Array(panels.length - prev.length).fill(0)]
        })
    }, [panels.length])

    const ctxValue = useMemo(() => ({ orientation: orientation!, sizes, setSizes, containerRef }), [orientation, sizes])

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
        rootSelector: 'root'
    })

    return (
        <SplitterContext.Provider value={ctxValue}>
            <Box
                ref={(node: HTMLDivElement | null) => {
                    containerRef.current = node
                    if (typeof ref === 'function') {
                        ref(node)
                    } else if (ref) {
                        ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
                    }
                }}
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
Splitter.displayName = '@react-ui/ui/Splitter'

export namespace Splitter {
    export type Props = SplitterProps
    export type Factory = SplitterFactory
    export type StylesNames = SplitterStylesNames
}
