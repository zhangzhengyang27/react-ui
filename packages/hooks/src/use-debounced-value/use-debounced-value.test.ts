import { renderHook, act } from '@testing-library/react'
import { useDebouncedValue } from './use-debounced-value'

describe('useDebouncedValue', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('returns initial value immediately', () => {
        const { result } = renderHook(() => useDebouncedValue('hello', 200))
        expect(result.current[0]).toBe('hello')
    })

    it('debounces value updates', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebouncedValue(value, 200),
            { initialProps: { value: 'hello' } }
        )

        rerender({ value: 'world' })
        expect(result.current[0]).toBe('hello')

        act(() => {
            vi.advanceTimersByTime(200)
        })
        expect(result.current[0]).toBe('world')
    })

    it('cancels pending update', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebouncedValue(value, 200),
            { initialProps: { value: 'hello' } }
        )

        rerender({ value: 'world' })
        act(() => {
            result.current[1]()
        })
        act(() => {
            vi.advanceTimersByTime(300)
        })
        expect(result.current[0]).toBe('hello')
    })

    it('flushes pending update immediately', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebouncedValue(value, 200),
            { initialProps: { value: 'hello' } }
        )

        rerender({ value: 'world' })
        act(() => {
            result.current[2].flush()
        })
        expect(result.current[0]).toBe('world')
    })

    it('supports leading option', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebouncedValue(value, 200, { leading: true }),
            { initialProps: { value: 'hello' } }
        )

        rerender({ value: 'world' })
        expect(result.current[0]).toBe('world')
    })
})
