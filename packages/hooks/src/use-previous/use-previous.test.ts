import { renderHook, act } from '@testing-library/react'
import { usePrevious } from './use-previous'

describe('usePrevious', () => {
    it('returns undefined on first render', () => {
        const { result } = renderHook(() => usePrevious(1))
        expect(result.current).toBeUndefined()
    })

    it('returns the previous value after update', () => {
        const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
            initialProps: { value: 1 }
        })

        expect(result.current).toBeUndefined()

        rerender({ value: 2 })
        expect(result.current).toBe(1)

        rerender({ value: 3 })
        expect(result.current).toBe(2)
    })

    it('works with object values', () => {
        const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
            initialProps: { value: { name: 'a' } }
        })

        rerender({ value: { name: 'b' } })
        expect(result.current).toEqual({ name: 'a' })
    })
})
