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

    it('does not revert to an older value when leading fire is followed by changes in the cooldown window', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebouncedValue(value, 200, { leading: true }),
            { initialProps: { value: 'A' } }
        )

        // B:开启冷却窗口,leading 立即生效
        rerender({ value: 'B' })
        expect(result.current[0]).toBe('B')

        // C:冷却窗口内变更,走尾随,暂不生效
        rerender({ value: 'C' })
        expect(result.current[0]).toBe('B')

        // D:旧实现里冷却被 cancel 提前清零,D 误走 leading 立即生效且不清挂起的
        // 尾随定时器,尾随到期后会把值回退成 C;修复后冷却语义保持,D 走尾随
        rerender({ value: 'D' })
        expect(result.current[0]).toBe('B')

        act(() => {
            vi.advanceTimersByTime(200)
        })
        // 尾随到期只落最新值 D,不会把值回退成 C
        expect(result.current[0]).toBe('D')

        act(() => {
            vi.advanceTimersByTime(200)
        })
        expect(result.current[0]).toBe('D')
    })

    it('keeps leading eligibility governed by the cooldown timer after cancel', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebouncedValue(value, 200, { leading: true }),
            { initialProps: { value: 'A' } }
        )

        rerender({ value: 'B' })
        expect(result.current[0]).toBe('B')

        // 冷却窗口内变更后 cancel 掉尾随定时器:值停住,且冷却窗口内
        // 下一次变更不应误走 leading(冷却资格由冷却定时器恢复)
        rerender({ value: 'C' })
        act(() => {
            result.current[1]()
        })
        expect(result.current[0]).toBe('B')

        rerender({ value: 'D' })
        expect(result.current[0]).toBe('B')

        act(() => {
            vi.advanceTimersByTime(200)
        })
        // 冷却结束后恢复 leading 资格
        rerender({ value: 'E' })
        expect(result.current[0]).toBe('E')
    })
})
