import { describe, expect, it } from 'vitest'
import { rem } from './rem'

describe('@xiaoye-react/ui/rem', () => {
    it('保留逗号分隔（此前多值会被吃掉分隔符）', () => {
        expect(rem('1px, 2px')).toContain(',')
    })
})
