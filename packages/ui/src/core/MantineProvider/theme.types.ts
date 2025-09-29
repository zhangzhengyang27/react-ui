import type { PartialDeep } from 'type-fest'
import type { VariantColorsResolver } from './color-functions'

/**
 * Mantine 主题配置接口，定义了整个 Mantine UI 库的主题配置结构
 */
export interface MantineTheme {
    /**
     * 控制焦点环样式，支持以下选项：
     * - `auto` - 仅当用户通过键盘导航时显示焦点环（默认值）
     * - `always` - 无论通过键盘还是鼠标导航都显示焦点环
     * - `never` - 始终隐藏焦点环（不推荐）
     */
    focusRing: 'auto' | 'never' | 'always'

    /**
     * Rem 单位缩放比例
     * 如果自定义了 <html> 元素的字体大小，可以调整此值
     * 默认值为 1（对应 100%/16px 的基准字体大小）
     */
    scale: number

    /** 是否在 body 上设置 font-smoothing 属性，默认为 true */
    fontSmoothing: boolean

    /** 白色颜色值 */
    white: string

    /** 黑色颜色值 */
    black: string

    /** 颜色配置对象，键为颜色的名称，值包含至少 10 个颜色值的数组 */
    colors: MantineThemeColors

    /**
     * 主色调配置
     * 可以是数字（0-9）或对象（分别为浅色/深色模式指定不同色调）
     * 默认值：{ light: 6, dark: 8 }
     */
    primaryShade: MantineColorShade | MantinePrimaryShade

    /**
     * 主色调名称
     * 必须是 theme.colors 中的键名
     * 默认值：blue
     */
    primaryColor: string

    /**
     * 颜色解析函数
     * 用于自定义 Button、ActionIcon 等组件如何应用主题颜色
     */
    variantColorResolver: VariantColorsResolver

    /**
     * 是否自动调整文本对比度
     * 当设置为 true 时，会根据背景色自动调整文本颜色
     * 默认值：false
     */
    autoContrast: boolean

    /**
     * 亮度阈值，用于确定文本颜色应为浅色还是深色
     * 仅在 autoContrast 为 true 时生效
     * 默认值：0.3
     */
    luminanceThreshold: number

    /**
     * 默认字体，用于所有组件的默认字体设置
     * 默认为系统字体
     */
    fontFamily: string

    /**
     * 等宽字体，用于代码块等需要等宽字体的组件
     * 默认为系统等宽字体
     */
    fontFamilyMonospace: string

    /** 标题样式配置，控制 h1-h6 元素的样式 */
    headings: {
        fontFamily: string
        fontWeight: string
        textWrap: 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable'
        sizes: {
            h1: HeadingStyle
            h2: HeadingStyle
            h3: HeadingStyle
            h4: HeadingStyle
            h5: HeadingStyle
            h6: HeadingStyle
        }
    }

    /** 圆角配置对象 */
    radius: MantineRadiusValues

    /** 默认圆角值 */
    defaultRadius: MantineRadius

    /** 间距配置对象 */
    spacing: MantineSpacingValues

    /** 字体大小配置对象 */
    fontSizes: MantineFontSizesValues

    /** 行高配置对象 */
    lineHeights: MantineLineHeightValues

    /** 断点配置对象（单位为 em） */
    breakpoints: MantineBreakpointsValues

    /** 阴影配置对象 */
    shadows: MantineShadowsValues

    /** 是否尊重系统减少动画设置，默认为 false */
    respectReducedMotion: boolean

    /**
     * 交互元素光标类型
     * - default: 默认光标
     * - pointer: 指针光标
     */
    cursorType: 'default' | 'pointer'

    /** 默认渐变配置 */
    defaultGradient: MantineGradient

    /** Class added to the elements that have active styles, for example, `Button` and `ActionIcon` */
    activeClassName: string

    /** Class added to the elements that have focus styles, for example, `Button` or `ActionIcon`.
     *  Overrides `theme.focusRing` property.
     */
    focusClassName: string

    /** 组件样式覆盖配置 */
    components: MantineThemeComponents

    /** Any other properties that you want to access with the theme objects */
    other: MantineThemeOther
}

/** 颜色方案类型：light（浅色）、dark（深色）或 auto（自动） */
export type MantineColorScheme = 'light' | 'dark' | 'auto'

/** 主题覆盖类型，允许部分覆盖主题属性 */
export type MantineThemeOverride = PartialDeep<MantineTheme>

/** 样式记录类型 */
export type MantineStylesRecord = Record<string, React.CSSProperties>

/** 组件主题配置接口 */
export interface MantineThemeComponent {
    classNames?: any
    styles?: any
    vars?: any
    defaultProps?: any
}

/** 组件主题配置集合 */
export type MantineThemeComponents = Record<string, MantineThemeComponent>

/** 标题样式接口 */
export interface HeadingStyle {
    fontSize: string
    fontWeight?: string
    lineHeight?: string
}

/** 尺寸类型 */
export type MantineSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type DefaultMantineSize = MantineSize
export interface MantineThemeSizesOverride {}

/** 断点类型 */
export type MantineBreakpoint =
    | (MantineThemeSizesOverride extends {
          breakpoints: Record<infer CustomBreakpoints, string>
      }
          ? CustomBreakpoints
          : MantineSize)
    | (string & {})

export type MantineBreakpointsValues = Record<MantineBreakpoint, string>

export type MantineFontSize =
    | (MantineThemeSizesOverride extends {
          fontSizes: Record<infer CustomFontSizes, string>
      }
          ? CustomFontSizes
          : MantineSize)
    | (string & {})
export type MantineFontSizesValues = Record<MantineFontSize, string>

type _MantineRadius =
    | (MantineThemeSizesOverride extends {
          radius: Record<infer CustomRadius, string>
      }
          ? CustomRadius
          : MantineSize)
    | (string & {})
export type MantineRadius = _MantineRadius | number
export type MantineRadiusValues = Record<_MantineRadius, string>

type _MantineSpacing =
    | (MantineThemeSizesOverride extends {
          spacing: Record<infer CustomSpacing, string>
      }
          ? CustomSpacing
          : MantineSize)
    | (string & {})
export type MantineSpacing = _MantineSpacing | number
export type MantineSpacingValues = Record<MantineSpacing, string>

export type MantineShadow =
    | (MantineThemeSizesOverride extends {
          shadows: Record<infer CustomShadow, string>
      }
          ? CustomShadow
          : MantineSize)
    | (string & {})
export type MantineShadowsValues = Record<MantineShadow, string>

export type MantineLineHeight =
    | (MantineThemeSizesOverride extends {
          lineHeights: Record<infer CustomLineHeight, string>
      }
          ? CustomLineHeight
          : MantineSize)
    | (string & {})
export type MantineLineHeightValues = Record<MantineLineHeight, string>

export interface MantineThemeOther {
    [key: string]: any
}

export interface MantineGradient {
    from: string
    to: string
    deg?: number
}

export type MantineColorsTuple = readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    ...string[]
]

export type MantineColorShade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface MantinePrimaryShade {
    light: MantineColorShade
    dark: MantineColorShade
}

export type DefaultMantineColor =
    | 'dark'
    | 'gray'
    | 'red'
    | 'pink'
    | 'grape'
    | 'violet'
    | 'indigo'
    | 'blue'
    | 'cyan'
    | 'green'
    | 'lime'
    | 'yellow'
    | 'orange'
    | 'teal'
    | (string & {})

export interface MantineThemeColorsOverride {}

export type MantineThemeColors = MantineThemeColorsOverride extends {
    colors: Record<infer CustomColors, MantineColorsTuple>
}
    ? Record<CustomColors, MantineColorsTuple>
    : Record<DefaultMantineColor, MantineColorsTuple>

export type MantineColor = keyof MantineThemeColors
