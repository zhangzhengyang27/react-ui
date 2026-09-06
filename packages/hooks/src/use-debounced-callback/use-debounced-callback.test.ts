import { renderHook, act } from '@testing-library/react'
import { useDebouncedCallback } from './use-debounced-callback'

describe('useDebouncedCallback', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('debounces the callback', () => {
        const fn = vi.fn()
        const { result } = renderHook(() => useDebouncedCallback(fn, 200))

        act(() => {
            result.current()
            vi.advanceTimersByTime(100)
            result.current()
            vi.advanceTimersByTime(100)
        })
        expect(fn).not.toHaveBeenCalled()

        act(() => {
            vi.advanceTimersByTime(200)
        })
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('supports leading option', () => {
        const fn = vi.fn()
        const { result } = renderHook(() => useDebouncedCallback(fn, { delay: 200, leading: true }))

        act(() => {
            result.current()
        })
        expect(fn).toHaveBeenCalledTimes(1)

        act(() => {
            vi.advanceTimersByTime(200)
        })
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('reports pending state via isPending', () => {
        const fn = vi.fn()
        const { result } = renderHook(() => useDebouncedCallback(fn, 200))

        expect(result.current.isPending()).toBe(false)

        act(() => {
            result.current()
        })
        expect(result.current.isPending()).toBe(true)

        act(() => {
            vi.advanceTimersByTime(200)
        })
        expect(result.current.isPending()).toBe(false)
    })

    it('flush invokes pending callback immediately', () => {
        const fn = vi.fn()
        const { result } = renderHook(() => useDebouncedCallback(fn, 200))

        act(() => {
            result.current('arg')
            result.current.flush()
        })
        expect(fn).toHaveBeenCalledTimes(1)
        expect(fn).toHaveBeenCalledWith('arg')
        expect(result.current.isPending()).toBe(false)
    })

    it('cancel clears pending callback', () => {
        const fn = vi.fn()
        const { result } = renderHook(() => useDebouncedCallback(fn, 200))

        act(() => {
            result.current()
            result.current.cancel()
        })
        act(() => {
            vi.advanceTimersByTime(200)
        })
        expect(fn).not.toHaveBeenCalled()
    })

    it('respects maxWait', () => {
        const fn = vi.fn()
        const { result } = renderHook(() => useDebouncedCallback(fn, { delay: 1000, maxWait: 300 }))

        act(() => {
            result.current()
            vi.advanceTimersByTime(150)
            result.current()
            vi.advanceTimersByTime(150)
        })
        // 累计 300ms 触发 maxWait
        expect(fn).toHaveBeenCalledTimes(1)
    })
})
