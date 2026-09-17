import { act, renderHook } from '@testing-library/react'
import { useDebouncedState } from './use-debounced-state'

describe('useDebouncedState', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('delays updates until wait has elapsed', () => {
        const { result } = renderHook(() => useDebouncedState('init', 200))

        act(() => {
            result.current[1]('next')
        })
        expect(result.current[0]).toBe('init')

        act(() => {
            vi.advanceTimersByTime(200)
        })
        expect(result.current[0]).toBe('next')
    })

    it('fires immediately again after a quiet period with leading option', () => {
        const { result } = renderHook(() => useDebouncedState('init', 200, { leading: true }))

        // 首次调用前导立即生效
        act(() => {
            result.current[1]('first')
        })
        expect(result.current[0]).toBe('first')

        // 静默期(远超 wait)后,新调用应恢复前导立即触发,
        // 旧实现里 leadingRef 永久为 false,会退化成尾随触发
        act(() => {
            vi.advanceTimersByTime(1000)
        })
        act(() => {
            result.current[1]('second')
        })
        expect(result.current[0]).toBe('second')
    })

    it('falls back to trailing behavior within the leading cooldown window', () => {
        const { result } = renderHook(() => useDebouncedState('init', 200, { leading: true }))

        act(() => {
            result.current[1]('first')
        })
        expect(result.current[0]).toBe('first')

        // 冷却窗口内的调用走尾随
        act(() => {
            result.current[1]('second')
        })
        expect(result.current[0]).toBe('first')

        act(() => {
            vi.advanceTimersByTime(200)
        })
        expect(result.current[0]).toBe('second')
    })
})
