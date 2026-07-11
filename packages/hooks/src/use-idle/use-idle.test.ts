import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { useIdle } from './use-idle'

describe('useIdle', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('becomes idle after timeout', () => {
        const { result } = renderHook(() => useIdle(1000))

        act(() => {
            vi.advanceTimersByTime(1000)
        })

        expect(result.current).toBe(true)
    })

    it('resets idle on interaction', () => {
        const { result } = renderHook(() => useIdle(1000))

        act(() => {
            vi.advanceTimersByTime(500)
            document.dispatchEvent(new MouseEvent('mousemove'))
            vi.advanceTimersByTime(500)
        })

        expect(result.current).toBe(false)
    })
})
