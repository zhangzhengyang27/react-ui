import { renderHook, act } from '@testing-library/react'
import { useInterval } from './use-interval'

describe('useInterval', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('does not start automatically by default', () => {
        const fn = vi.fn()
        const { result } = renderHook(() => useInterval(fn, 1000))

        expect(result.current.active).toBe(false)
        act(() => {
            vi.advanceTimersByTime(3000)
        })
        expect(fn).not.toHaveBeenCalled()
    })

    it('starts with autoInvoke', () => {
        const fn = vi.fn()
        renderHook(() => useInterval(fn, 1000, { autoInvoke: true }))

        act(() => {
            vi.advanceTimersByTime(3500)
        })
        expect(fn).toHaveBeenCalledTimes(3)
    })

    it('start/stop/toggle control the interval', () => {
        const fn = vi.fn()
        const { result } = renderHook(() => useInterval(fn, 1000))

        act(() => {
            result.current.start()
        })
        expect(result.current.active).toBe(true)

        act(() => {
            vi.advanceTimersByTime(2500)
        })
        expect(fn).toHaveBeenCalledTimes(2)

        act(() => {
            result.current.stop()
        })
        act(() => {
            vi.advanceTimersByTime(3000)
        })
        expect(fn).toHaveBeenCalledTimes(2)
    })

    it('calls the latest fn without restarting the interval', () => {
        const fn1 = vi.fn()
        const fn2 = vi.fn()
        const { result, rerender } = renderHook(({ fn }) => useInterval(fn, 1000), {
            initialProps: { fn: fn1 }
        })

        act(() => {
            result.current.start()
        })
        rerender({ fn: fn2 })

        act(() => {
            vi.advanceTimersByTime(2500)
        })
        // 应只调用最新的 fn2，且 interval 未因 rerender 重启（计数 2 而非 3）
        expect(fn1).not.toHaveBeenCalled()
        expect(fn2).toHaveBeenCalledTimes(2)
    })

    it('rebuilds the interval when interval value changes', () => {
        const fn = vi.fn()
        const { result, rerender } = renderHook(({ interval }) => useInterval(fn, interval), {
            initialProps: { interval: 1000 }
        })

        act(() => {
            result.current.start()
        })
        act(() => {
            vi.advanceTimersByTime(1000)
        })
        expect(fn).toHaveBeenCalledTimes(1)

        // 周期改为 500ms
        rerender({ interval: 500 })
        act(() => {
            vi.advanceTimersByTime(500)
        })
        expect(fn).toHaveBeenCalledTimes(2)

        // 再推进 500ms，按新周期应再触发一次
        act(() => {
            vi.advanceTimersByTime(500)
        })
        expect(fn).toHaveBeenCalledTimes(3)
    })

    it('clears interval on unmount', () => {
        const fn = vi.fn()
        const { result, unmount } = renderHook(() => useInterval(fn, 1000, { autoInvoke: true }))

        act(() => {
            vi.advanceTimersByTime(1000)
        })
        expect(fn).toHaveBeenCalledTimes(1)

        unmount()
        act(() => {
            vi.advanceTimersByTime(3000)
        })
        expect(fn).toHaveBeenCalledTimes(1)
    })
})
