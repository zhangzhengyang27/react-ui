import type {
    UIBreakpoint,
    UIColor,
    UIFontSize,
    UILineHeight,
    UISpacing
} from '../../../core/UIProvider'

/** 定义泛型类型 `StyleProps<Value>`，用于描述响应式样式值的类型 */
export type StyleProp<Value> = Value | Partial<Record<UIBreakpoint | (string & {}), Value>>

export interface UIStyleProps {
    /** Margin, theme key: theme.spacing */
    m?: StyleProp<UISpacing>
    /** MarginBlock, theme key: theme.spacing */
    my?: StyleProp<UISpacing>
    /** MarginInline, theme key: theme.spacing */
    mx?: StyleProp<UISpacing>
    /** MarginTop, theme key: theme.spacing */
    mt?: StyleProp<UISpacing>
    /** MarginBottom, theme key: theme.spacing */
    mb?: StyleProp<UISpacing>
    /** MarginInlineStart, theme key: theme.spacing */
    ms?: StyleProp<UISpacing>
    /** MarginInlineEnd, theme key: theme.spacing */
    me?: StyleProp<UISpacing>
    /** MarginLeft, theme key: theme.spacing */
    ml?: StyleProp<UISpacing>
    /** MarginRight, theme key: theme.spacing */
    mr?: StyleProp<UISpacing>

    /** Padding, theme key: theme.spacing */
    p?: StyleProp<UISpacing>
    /** PaddingBlock, theme key: theme.spacing */
    py?: StyleProp<UISpacing>
    /** PaddingInline, theme key: theme.spacing */
    px?: StyleProp<UISpacing>
    /** PaddingTop, theme key: theme.spacing */
    pt?: StyleProp<UISpacing>
    /** PaddingBottom, theme key: theme.spacing */
    pb?: StyleProp<UISpacing>
    /** PaddingInlineStart, theme key: theme.spacing */
    ps?: StyleProp<UISpacing>
    /** PaddingInlineEnd, theme key: theme.spacing */
    pe?: StyleProp<UISpacing>
    /** PaddingLeft, theme key: theme.spacing */
    pl?: StyleProp<UISpacing>
    /** PaddingRight, theme key: theme.spacing */
    pr?: StyleProp<UISpacing>

    /** Border */
    bd?: StyleProp<React.CSSProperties['border']>
    /** BorderRadius, theme key: theme.radius */
    bdrs?: StyleProp<UISpacing>
    /** Background, theme key: theme.colors */
    bg?: StyleProp<UIColor>
    /** Color */
    c?: StyleProp<UIColor>
    opacity?: StyleProp<React.CSSProperties['opacity']>

    /** FontFamily */
    ff?: StyleProp<'monospace' | 'text' | 'heading' | (string & {})>
    /** FontSize, theme key: theme.fontSizes */
    fz?: StyleProp<UIFontSize | `h${1 | 2 | 3 | 4 | 5 | 6}` | number | (string & {})>
    /** FontWeight */
    fw?: StyleProp<React.CSSProperties['fontWeight']>
    /** LetterSpacing */
    lts?: StyleProp<React.CSSProperties['letterSpacing']>
    /** TextAlign */
    ta?: StyleProp<React.CSSProperties['textAlign']>
    /** LineHeight, theme key: lineHeights */
    lh?: StyleProp<UILineHeight | `h${1 | 2 | 3 | 4 | 5 | 6}` | number | (string & {})>
    /** FontStyle */
    fs?: StyleProp<React.CSSProperties['fontStyle']>
    /** TextTransform */
    tt?: StyleProp<React.CSSProperties['textTransform']>
    /** TextDecoration */
    td?: StyleProp<React.CSSProperties['textDecoration']>

    /** Width, theme key: theme.spacing */
    w?: StyleProp<React.CSSProperties['width']>
    /** MinWidth, theme key: theme.spacing*/
    miw?: StyleProp<React.CSSProperties['minWidth']>
    /** MaxWidth, theme key: theme.spacing */
    maw?: StyleProp<React.CSSProperties['maxWidth']>
    /** Height, theme key: theme.spacing */
    h?: StyleProp<React.CSSProperties['height']>
    /** MinHeight, theme key: theme.spacing */
    mih?: StyleProp<React.CSSProperties['minHeight']>
    /** MaxHeight, theme key: theme.spacing */
    mah?: StyleProp<React.CSSProperties['maxHeight']>

    /** BackgroundSize */
    bgsz?: StyleProp<React.CSSProperties['backgroundSize']>
    /** BackgroundPosition */
    bgp?: StyleProp<React.CSSProperties['backgroundPosition']>
    /** BackgroundRepeat */
    bgr?: StyleProp<React.CSSProperties['backgroundRepeat']>
    /** BackgroundAttachment */
    bga?: StyleProp<React.CSSProperties['backgroundAttachment']>

    /** Position */
    pos?: StyleProp<React.CSSProperties['position']>
    top?: StyleProp<React.CSSProperties['top']>
    left?: StyleProp<React.CSSProperties['left']>
    bottom?: StyleProp<React.CSSProperties['bottom']>
    right?: StyleProp<React.CSSProperties['right']>
    inset?: StyleProp<React.CSSProperties['inset']>

    display?: StyleProp<React.CSSProperties['display']>
    flex?: StyleProp<React.CSSProperties['flex']>
}
