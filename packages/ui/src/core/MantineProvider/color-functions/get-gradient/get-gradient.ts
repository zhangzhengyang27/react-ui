import { MantineGradient, MantineTheme } from '../../theme.types'
import { getThemeColor } from '../get-theme-color/get-theme-color'

/**
 * 根据提供的渐变配置或主题默认值生成线性渐变CSS字符串
 * @param {MantineGradient | undefined} gradient - 可选的渐变配置对象
 * @param {MantineTheme} theme - Mantine主题对象，包含默认渐变配置
 * @returns {string} 格式化的线性渐变CSS字符串，如"linear-gradient(90deg, #000 0%, #fff 100%)"
 */
export function getGradient(gradient: MantineGradient | undefined, theme: MantineTheme) {
    const merged = {
        from: gradient?.from || theme.defaultGradient.from,
        to: gradient?.to || theme.defaultGradient.to,
        deg: gradient?.deg ?? theme.defaultGradient.deg ?? 0
    }

    const fromColor = getThemeColor(merged.from, theme)
    const toColor = getThemeColor(merged.to, theme)

    return `linear-gradient(${merged.deg}deg, ${fromColor} 0%, ${toColor} 100%)`
}
