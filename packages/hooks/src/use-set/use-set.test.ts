import { renderHook, act } from '@testing-library/react'
import { useSet } from './use-set'

describe('useSet', () => {
    it('initializes with values', () => {
        const { result } = renderHook(() => useSet([1, 2, 2, 3]))
        expect(result.current.has(1)).toBe(true)
        expect(result.current.has(2)).toBe(true)
        expect(result.current.has(4)).toBe(false)
    })

    it('adds values and triggers update', () => {
        const { result } = renderHook(() => useSet<number>())

        act(() => {
            result.current.add(1)
        })

        expect(result.current.has(1)).toBe(true)
    })

    it('deletes values', () => {
        const { result } = renderHook(() => useSet([1, 2]))

        act(() => {
            result.current.delete(1)
        })

        expect(result.current.has(1)).toBe(false)
        expect(result.current.has(2)).toBe(true)
    })

    it('clears all values', () => {
        const { result } = renderHook(() => useSet([1, 2]))

        act(() => {
            result.current.clear()
        })

        expect(result.current.size).toBe(0)
    })
})
