import { describe, expect, it } from 'vitest'
import { deepMerge } from './deep-merge'

describe('@xiaoye-react/ui/deepMerge', () => {
    it('基本值被对象覆盖时保留对象（此前会丢弃覆盖值）', () => {
        const result = deepMerge({ primaryShade: 6 }, { primaryShade: { light: 6, dark: 8 } })
        expect(result.primaryShade).toEqual({ light: 6, dark: 8 })
    })
})
