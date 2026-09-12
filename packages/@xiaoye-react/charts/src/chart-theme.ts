import {
    parseThemeColor,
    useComputedUIColorScheme,
    useUITheme,
    type UIColorScheme,
    type UITheme
} from '@xiaoye-react/ui'

/**
 * 解析图表颜色：支持主题 token（如 'indigo.6'）与任意 CSS 颜色
 * 返回真实颜色值（而非 CSS 变量引用）——SVG 的 presentation attribute
 * 不保证支持 var()，recharts 内部还会读取颜色做对比计算
 */
export function resolveChartColor(color: string, theme: UITheme, colorScheme: UIColorScheme): string {
    return parseThemeColor({ color, theme, colorScheme }).value
}

export interface ChartThemeColors {
    colorScheme: 'light' | 'dark'
    /** 网格线 */
    grid: string
    /** 轴刻度文字 */
    tick: string
    /** 悬浮提示背景 */
    tooltipBg: string
    /** 悬浮提示边框 */
    tooltipBorder: string
    /** 悬浮提示标题 */
    tooltipTitle: string
    /** 悬浮提示正文 */
    tooltipText: string
    /** 鼠标指示线 */
    cursor: string
}

export function useChartTheme(): ChartThemeColors {
    const theme = useUITheme()
    const colorScheme = useComputedUIColorScheme('light')
    const c = (color: string) => resolveChartColor(color, theme, colorScheme)
    const dark = colorScheme === 'dark'

    return {
        colorScheme,
        grid: c(dark ? 'dark.4' : 'gray.3'),
        tick: c(dark ? 'dark.2' : 'gray.6'),
        tooltipBg: c(dark ? 'dark.6' : 'white'),
        tooltipBorder: c(dark ? 'dark.4' : 'gray.3'),
        tooltipTitle: c(dark ? 'dark.0' : 'dark.9'),
        tooltipText: c(dark ? 'dark.1' : 'gray.7'),
        cursor: c(dark ? 'dark.3' : 'gray.4')
    }
}
