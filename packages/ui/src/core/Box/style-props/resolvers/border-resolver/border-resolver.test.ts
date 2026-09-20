import { describe, expect, it } from 'vitest'
import { DEFAULT_THEME } from '../../../../UIProvider/default-theme'
import { borderResolver } from './border-resolver'

describe('@xiaoye-react/ui/borderResolver', () => {
    it('按空格分词而不是逐字符拆分', () => {
        const result = borderResolver('1px solid red', DEFAULT_THEME) as string
        expect(result).toContain('solid')
        // cspell:ignore xsolidred  断言的是空格被吃掉后的退化形式
        expect(result).not.toContain('xsolidred')
        expect(result).toMatch(/0\.0625rem/)
    })
})
