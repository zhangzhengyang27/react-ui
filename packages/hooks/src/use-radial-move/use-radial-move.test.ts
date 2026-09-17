import { describe, expect, it } from 'vitest'
import { normalizeRadialValue } from './use-radial-move'

describe('normalizeRadialValue', () => {
    it('snaps to the ceil grid when step divides 360', () => {
        expect(normalizeRadialValue(50, 15)).toBe(60)
        expect(normalizeRadialValue(359, 1)).toBe(359)
        expect(normalizeRadialValue(360, 15)).toBe(0)
    })

    it('never exceeds 360 when step does not divide 360', () => {
        // step=7、拖到 358°：ceil 网格 52*7=364 越界，回落 round 网格 51*7=357
        expect(normalizeRadialValue(358, 7)).toBe(357)
        expect(normalizeRadialValue(357, 7)).toBe(357)
        expect(normalizeRadialValue(359, 8)).toBeLessThan(360)
    })

    it('wraps 360 back into the [0, 360) range', () => {
        expect(normalizeRadialValue(359, 4)).toBe(0)
    })
})
