import { renderHook, act } from '@testing-library/react'
import { useStateHistory } from './use-state-history'

describe('useStateHistory', () => {
    it('returns initial value with empty history', () => {
        const { result } = renderHook(() => useStateHistory(0))
        const [value, , state] = result.current

        expect(value).toBe(0)
        expect(state.history).toEqual([0])
        expect(state.current).toBe(0)
    })

    it('tracks history and supports back/forward', () => {
        const { result } = renderHook(() => useStateHistory(0))
        const [, handlers] = result.current

        act(() => {
            handlers.set(1)
            handlers.set(2)
            handlers.set(3)
        })
        expect(result.current[0]).toBe(3)

        act(() => {
            handlers.back()
        })
        expect(result.current[0]).toBe(2)

        act(() => {
            handlers.back(2)
        })
        expect(result.current[0]).toBe(0)

        act(() => {
            handlers.forward()
        })
        expect(result.current[0]).toBe(1)
    })

    it('resets history', () => {
        const { result } = renderHook(() => useStateHistory(0))
        const [, handlers] = result.current

        act(() => {
            handlers.set(1)
            handlers.set(2)
            handlers.reset()
        })
        expect(result.current[0]).toBe(0)
        expect(result.current[2].history).toEqual([0])
    })

    it('limits history size when limit is set', () => {
        const { result } = renderHook(() => useStateHistory(0, { limit: 3 }))
        const [, handlers] = result.current

        act(() => {
            handlers.set(1)
            handlers.set(2)
            handlers.set(3)
            handlers.set(4)
        })

        const [, , state] = result.current
        expect(state.history.length).toBe(3)
        // 最旧的 0、1 被丢弃，保留 2、3、4
        expect(state.history).toEqual([2, 3, 4])
        expect(result.current[0]).toBe(4)
    })

    it('branches history after going back then setting a new value', () => {
        const { result } = renderHook(() => useStateHistory(0))
        const [, handlers] = result.current

        act(() => {
            handlers.set(1)
            handlers.set(2)
            handlers.back()
            handlers.set(9)
        })

        const [, , state] = result.current
        expect(result.current[0]).toBe(9)
        expect(state.history).toEqual([0, 1, 9])
    })
})
