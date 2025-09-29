import type { MantineTheme } from '../../../../../core/MantineProvider'
import { rem } from '../../../../../core/utils'

/**
 * 解析间距值，根据输入类型返回对应的CSS值
 * @param {unknown} value - 输入的间距值，可以是数字或字符串
 * @param {MantineTheme} theme - Mantine主题对象，包含间距定义
 * @returns {string|unknown} 解析后的CSS值，可能是rem单位、CSS变量或原始值
 * @throws 不会抛出异常，但会返回原始值如果输入类型不支持
 */
export function spacingResolver(value: unknown, theme: MantineTheme) {
    if (typeof value === 'number') {
        return rem(value)
    }

    if (typeof value === 'string') {
        const mod = value.replace('-', '')

        if (!(mod in theme.spacing)) {
            return rem(value)
        }

        const variable = `--mantine-spacing-${mod}`
        return value.startsWith('-') ? `calc(var(${variable}) * -1)` : `var(${variable})`
    }

    return value
}
