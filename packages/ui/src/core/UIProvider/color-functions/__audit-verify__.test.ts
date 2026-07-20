import { describe, it, expect } from 'vitest'
import { toRgba } from './to-rgba/to-rgba'
import { rgba } from './rgba/rgba'
import { parseThemeColor } from './parse-theme-color/parse-theme-color'
import { defaultVariantColorsResolver } from './default-variant-colors-resolver/default-variant-colors-resolver'
import { borderResolver } from '../../Box/style-props/resolvers/border-resolver/border-resolver'
import { colorResolver } from '../../Box/style-props/resolvers/color-resolver/color-resolver'
import { deepMerge } from '../../utils/deep-merge/deep-merge'
import { mergeUITheme } from '../merge-ui-theme/merge-ui-theme'
import { rem } from '../../utils/units-converters/rem'
import { DEFAULT_THEME } from '../default-theme'

describe('audit fixes verification', () => {
    it('toRgba preserves alpha=0 (was coerced to 1)', () => {
        expect(toRgba('rgba(255, 0, 0, 0)').a).toBe(0)
        expect(toRgba('hsla(120, 100%, 50%, 0)').a).toBe(0)
        expect(toRgba('rgba(255, 0, 0, 0.5)').a).toBe(0.5)
        expect(toRgba('rgb(255, 0, 0)').a).toBe(1)
    })

    it('borderResolver splits on spaces (was splitting every char)', () => {
        const result = borderResolver('1px solid red', DEFAULT_THEME) as string
        expect(result).toContain('solid')
        expect(result).not.toContain('xsolidred')
        expect(result).toMatch(/0\.0625rem/)
    })

    it('colorResolver does not throw on null/undefined (was crashing render)', () => {
        expect(() => colorResolver(null, DEFAULT_THEME)).not.toThrow()
        expect(() => colorResolver(undefined, DEFAULT_THEME)).not.toThrow()
        expect(colorResolver('red', DEFAULT_THEME)).toContain('var(')
    })

    it('deepMerge handles primitive -> object override (was discarding the object)', () => {
        const result = deepMerge({ primaryShade: 6 }, { primaryShade: { light: 6, dark: 8 } })
        expect(result.primaryShade).toEqual({ light: 6, dark: 8 })
    })

    it('mergeUITheme does not mutate the parent theme headings', () => {
        const before = DEFAULT_THEME.headings.fontFamily
        mergeUITheme(DEFAULT_THEME, { fontFamily: 'Custom Font' })
        expect(DEFAULT_THEME.headings.fontFamily).toBe(before)
    })

    it('mergeUITheme merges primaryShade object override', () => {
        const result = mergeUITheme(DEFAULT_THEME, { primaryShade: { light: 5, dark: 7 } })
        expect(result.primaryShade).toEqual({ light: 5, dark: 7 })
        // DEFAULT_THEME itself must remain untouched
        expect(DEFAULT_THEME.primaryShade).toEqual({ light: 6, dark: 8 })
    })

    it('rem preserves comma separators (was dropping them)', () => {
        expect(rem('1px, 2px')).toContain(',')
    })

    it('parseThemeColor dimmed value matches its isLight gray index (was gray[7] vs gray[6])', () => {
        const result = parseThemeColor({ color: 'dimmed', theme: DEFAULT_THEME })
        expect(result.value).toBe(DEFAULT_THEME.colors.gray[6])
    })

    it('defaultVariantColorsResolver does not throw on undefined color (was crashing)', () => {
        expect(() =>
            defaultVariantColorsResolver({ color: undefined, theme: DEFAULT_THEME, variant: 'filled' })
        ).not.toThrow()
        const result = defaultVariantColorsResolver({ color: undefined, theme: DEFAULT_THEME, variant: 'filled' })
        expect(result.background).toContain(DEFAULT_THEME.primaryColor)
    })

    it('toRgba supports 4-digit #RGBA hex (was rejected by the regex)', () => {
        expect(toRgba('#f00f')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
        expect(toRgba('#f000')).toEqual({ r: 255, g: 0, b: 0, a: 0 })
        expect(toRgba('#00ff00ff')).toEqual({ r: 0, g: 255, b: 0, a: 1 })
    })

    it('toRgba parses modern space-separated rgb() syntax (was concatenating channels)', () => {
        expect(toRgba('rgb(255 0 0)')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
        expect(toRgba('rgb(255 0 0 / 0.5)')).toEqual({ r: 255, g: 0, b: 0, a: 0.5 })
        expect(toRgba('rgb(255 0 0 / 50%)')).toEqual({ r: 255, g: 0, b: 0, a: 0.5 })
        // legacy comma syntax still works
        expect(toRgba('rgba(255, 0, 0, 0.5)')).toEqual({ r: 255, g: 0, b: 0, a: 0.5 })
    })

    it('toRgba parses modern space-separated hsl() syntax (was returning black)', () => {
        expect(toRgba('hsl(120 100% 50%)')).toEqual({ r: 0, g: 255, b: 0, a: 1 })
        expect(toRgba('hsl(120 100% 50% / 0.5)')).toEqual({ r: 0, g: 255, b: 0, a: 0.5 })
        // legacy comma syntax still works
        expect(toRgba('hsla(120, 100%, 50%, 0.5)')).toEqual({ r: 0, g: 255, b: 0, a: 0.5 })
    })

    it('rgba replaces oklch percentage alpha (was leaving it untouched)', () => {
        expect(rgba('oklch(70% 0.15 180 / 50%)', 0.3)).toBe('oklch(70% 0.15 180 / 0.3)')
        expect(rgba('oklch(70% 0.15 180 / 0.8)', 0.3)).toBe('oklch(70% 0.15 180 / 0.3)')
        expect(rgba('oklch(70% 0.15 180)', 0.3)).toBe('oklch(70% 0.15 180 / 0.3)')
    })
})
