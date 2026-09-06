import { renderHook, act } from '@testing-library/react'
import { useTimeout } from './use-timeout'

describe('useTimeout', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('does not invoke callback before delay', () => {
        const fn = vi.fn()
        renderHook(() => useTimeout(fn, 1000))

        act(() => {
            vi.advanceTimersByTime(999)
        })
        expect(fn).not.toHaveBeenCalled()
    })

    it('invokes callback after start', () => {
        const fn = vi.fn()
        const { result } = renderHook(() => useTimeout(fn, 1000))

        act(() => {
            result.current.start()
        })
        act(() => {
            vi.advanceTimersByTime(1000)
        })
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('supports autoInvoke', () => {
        const fn = vi.fn()
        renderHook(() => useTimeout(fn, 1000, { autoInvoke: true }))

        act(() => {
            vi.advanceTimersByTime(1000)
        })
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('clear prevents callback', () => {
        const fn = vi.fn()
        const { result } = renderHook(() => useTimeout(fn, 1000))

        act(() => {
            result.current.start()
        })
        act(() => {
            result.current.clear()
        })
        act(() => {
            vi.advanceTimersByTime(1000)
        })
        expect(fn).not.toHaveBeenCalled()
    })

    it('passes args to callback', () => {
        const fn = vi.fn()
        const { result } = renderHook(() => useTimeout(fn, 1000))

        act(() => {
            result.current.start('hello', 42)
        })
        act(() => {
            vi.advanceTimersByTime(1000)
        })
        expect(fn).toHaveBeenCalledWith('hello', 42)
    })

    it('clears timeout on unmount', () => {
        const fn = vi.fn()
        const { result, unmount } = renderHook(() => useTimeout(fn, 1000))

        act(() => {
            result.current.start()
        })
        unmount()
        act(() => {
            vi.advanceTimersByTime(1000)
        })
        expect(fn).not.toHaveBeenCalled()
    })
})
