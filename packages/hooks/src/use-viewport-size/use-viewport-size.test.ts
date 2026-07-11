import { renderHook, act } from '@testing-library/react'
import { useViewportSize } from './use-viewport-size'

describe('useViewportSize', () => {
    it('returns viewport size after mount', () => {
        Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: 768, configurable: true })

        const { result } = renderHook(() => useViewportSize())

        expect(result.current).toEqual({ width: 1024, height: 768 })
    })

    it('updates size on resize event', () => {
        const { result } = renderHook(() => useViewportSize())

        Object.defineProperty(window, 'innerWidth', { value: 800, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: 600, configurable: true })

        act(() => {
            window.dispatchEvent(new Event('resize'))
        })

        expect(result.current).toEqual({ width: 800, height: 600 })
    })
})
