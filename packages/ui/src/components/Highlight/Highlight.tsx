import {
    Box,
    BoxProps,
    UIColor,
    polymorphicFactory,
    PolymorphicFactory,
    StylesApiProps,
    useProps
} from '../../core'
import { Mark } from '../Mark'
import classes from './Highlight.module.css'

export type HighlightStylesNames = 'root' | 'highlight'

export interface HighlightProps extends BoxProps, StylesApiProps<HighlightFactory> {
    /** String value to highlight in children */
    highlight: string

    /** Key of `theme.colors` or any valid CSS color @default theme.primaryColor */
    color?: UIColor

    /** Highlight content, must be a string */
    children: string
}

export type HighlightFactory = PolymorphicFactory<{
    props: HighlightProps
    defaultRef: HTMLElement
    defaultComponent: 'span'
    stylesNames: HighlightStylesNames
}>

const defaultProps = {} satisfies Partial<HighlightProps>

function getChunks({ text, highlight }: { text: string; highlight: string }) {
    if (!highlight || typeof highlight !== 'string') {
        return [{ chunk: text, highlighted: false }]
    }

    // gi 标志与下方 toLowerCase 判定保持一致：split 出的命中段即大小写不敏感匹配段，
    // 缺 i 标志时"ABC hello"高亮"abc"不高亮、而恰好等于"ABC"时整段误标亮
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)

    return parts.map(part => ({
        chunk: part,
        highlighted: part.toLowerCase() === highlight.toLowerCase()
    }))
}

/**
 * 高亮文本中的指定子串组件。对齐 ui Highlight（polymorphicFactory + CSS module）。
 * 使用 Mark 组件渲染被高亮子串。
 */
export const Highlight = polymorphicFactory<HighlightFactory>((_props, _ref) => {
    const props = useProps('Highlight', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, children, highlight, color, attributes, ...others } = props

    const text = typeof children === 'string' ? children : String(children ?? '')
    const chunks = getChunks({ text, highlight })

    return (
        <Box ref={_ref} component="span" className={className} style={style} {...others}>
            {chunks.map(({ chunk, highlighted }, index) =>
                highlighted ? (
                    <Mark color={color} key={index}>
                        {chunk}
                    </Mark>
                ) : (
                    <span key={index}>{chunk}</span>
                )
            )}
        </Box>
    )
})

Highlight.classes = classes
Highlight.displayName = '@xiaoye-react/ui/Highlight'

export namespace Highlight {
    export type Props = HighlightProps
    export type StylesNames = HighlightStylesNames
    export type Factory = HighlightFactory
}
