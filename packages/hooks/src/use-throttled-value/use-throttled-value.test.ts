import { renderHook, act } from '@testing-library/react'
import { useThrottledValue } from './use-throttled-value'

describe('useThrottledValue', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('returns initial value immediately', () => {
        const { result } = renderHook(() => useThrottledValue('hello', 200))
        expect(result.current).toBe('hello')
    })

    it('throttles value updates', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useThrottledValue(value, 200),
            { initialProps: { value: 'hello' } }
        )

        rerender({ value: 'world' })
        expect(result.current).toBe('world')

        rerender({ value: 'updated' })
        expect(result.current).toBe('world')

        act(() => {
            vi.advanceTimersByTime(200)
        })
        expect(result.current).toBe('updated')
    })
})
