import { describe, expect, it } from 'vitest'
import { DEFAULT_THEME } from '../../default-theme'
import { parseThemeColor } from './parse-theme-color'

describe('@xiaoye-react/ui/parseThemeColor', () => {
    it('dimmed 与 isLight 判定使用同一个 gray 下标', () => {
        const result = parseThemeColor({ color: 'dimmed', theme: DEFAULT_THEME })
        expect(result.value).toBe(DEFAULT_THEME.colors.gray[6])
    })
})
