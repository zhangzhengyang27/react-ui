import { Children, cloneElement, isValidElement, useMemo, useRef, useState } from 'react'
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
}>

const defaultProps = {
    orientation: 'horizontal'
} satisfies Partial<SplitterProps>

function isPanel(child: React.ReactNode): child is React.ReactElement {
    return isValidElement(child) && (child.type as any)?.displayName === '@react-ui/ui/SplitterPanel'
}

export const Splitter = factory<SplitterFactory>((_props, ref) => {
    const props = useProps('Splitter', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, orientation, children, ...others } = props

    const containerRef = useRef<HTMLDivElement | null>(null)
    const panels = Children.toArray(children).filter(isPanel)

    const [sizes, setSizes] = useState<number[]>(() => Array(panels.length).fill(100 / panels.length))

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
