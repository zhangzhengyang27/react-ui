import { describe, expect, it } from 'vitest'
import { rgba } from './rgba'

describe('@xiaoye-react/ui/rgba', () => {
    it('替换 oklch 的百分比 alpha', () => {
        expect(rgba('oklch(70% 0.15 180 / 50%)', 0.3)).toBe('oklch(70% 0.15 180 / 0.3)')
        expect(rgba('oklch(70% 0.15 180 / 0.8)', 0.3)).toBe('oklch(70% 0.15 180 / 0.3)')
        expect(rgba('oklch(70% 0.15 180)', 0.3)).toBe('oklch(70% 0.15 180 / 0.3)')
    })
})
