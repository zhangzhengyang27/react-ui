import { renderHook, act } from '@testing-library/react'
import { useMap } from './use-map'

describe('useMap', () => {
    it('initializes with entries', () => {
        const { result } = renderHook(() => useMap<string, number>([['a', 1]]))
        expect(result.current.get('a')).toBe(1)
    })

    it('sets values and triggers update', () => {
        const { result } = renderHook(() => useMap<string, number>())

        act(() => {
            result.current.set('a', 1)
        })

        expect(result.current.get('a')).toBe(1)
    })

    it('deletes values', () => {
        const { result } = renderHook(() => useMap<string, number>([['a', 1]]))

        act(() => {
            result.current.delete('a')
        })

        expect(result.current.has('a')).toBe(false)
    })

    it('clears all values', () => {
        const { result } = renderHook(() => useMap<string, number>([['a', 1]]))

        act(() => {
            result.current.clear()
        })

        expect(result.current.size).toBe(0)
    })
})
