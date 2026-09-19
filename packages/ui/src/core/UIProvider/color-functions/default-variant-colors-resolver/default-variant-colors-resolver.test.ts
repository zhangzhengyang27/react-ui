import { describe, expect, it } from 'vitest'
import { DEFAULT_THEME } from '../../default-theme'
import { defaultVariantColorsResolver } from './default-variant-colors-resolver'

describe('@xiaoye-react/ui/defaultVariantColorsResolver', () => {
    it('color 为 undefined 时回落到 primaryColor 而不抛错', () => {
        expect(() =>
            defaultVariantColorsResolver({ color: undefined, theme: DEFAULT_THEME, variant: 'filled' })
        ).not.toThrow()
        const result = defaultVariantColorsResolver({ color: undefined, theme: DEFAULT_THEME, variant: 'filled' })
        expect(result.background).toContain(DEFAULT_THEME.primaryColor)
    })
})
