import { describe, expect, it } from 'vitest'
import { DEFAULT_THEME } from '../../../../UIProvider/default-theme'
import { colorResolver } from './color-resolver'

describe('@xiaoye-react/ui/colorResolver', () => {
    it('null/undefined 不抛错（此前会让渲染崩）', () => {
        expect(() => colorResolver(null, DEFAULT_THEME)).not.toThrow()
        expect(() => colorResolver(undefined, DEFAULT_THEME)).not.toThrow()
        expect(colorResolver('red', DEFAULT_THEME)).toContain('var(')
    })
})
