import { describe, expect, it } from 'vitest'
import { DEFAULT_THEME } from '../default-theme'
import { mergeUITheme } from './merge-ui-theme'

describe('@xiaoye-react/ui/mergeUITheme', () => {
    it('显式 undefined 的 primaryShade 按未配置处理，不回退成 undefined', () => {
        const theme = mergeUITheme(DEFAULT_THEME, { primaryShade: undefined })

        expect(theme.primaryShade).toBe(DEFAULT_THEME.primaryShade)
    })

    it('配置器常见的 undefined 覆盖不会让变量生成崩页', () => {
        expect(() => mergeUITheme(DEFAULT_THEME, { primaryShade: undefined })).not.toThrow()
    })

    it('有效覆盖仍然生效', () => {
        expect(mergeUITheme(DEFAULT_THEME, { primaryShade: 4 }).primaryShade).toBe(4)
        expect(mergeUITheme(DEFAULT_THEME, { primaryShade: { light: 2, dark: 7 } }).primaryShade).toEqual({
            light: 2,
            dark: 7
        })
    })
})
