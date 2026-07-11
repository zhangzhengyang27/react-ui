import { renderHook, act } from '@testing-library/react'
import { useWindowScroll } from './use-window-scroll'

describe('useWindowScroll', () => {
    it('returns initial scroll position', () => {
        const { result } = renderHook(() => useWindowScroll())
        expect(result.current[0]).toEqual({ x: 0, y: 0 })
    })

    it('updates position on scroll event', () => {
        const { result } = renderHook(() => useWindowScroll())

        Object.defineProperty(window, 'scrollX', { value: 100, configurable: true })
        Object.defineProperty(window, 'scrollY', { value: 200, configurable: true })

        act(() => {
            window.dispatchEvent(new Event('scroll'))
        })

        expect(result.current[0]).toEqual({ x: 100, y: 200 })
    })

    it('scrollTo calls window.scrollTo', () => {
        const { result } = renderHook(() => useWindowScroll())
        const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

        act(() => {
            result.current[1]({ y: 500 })
        })

        expect(scrollToSpy).toHaveBeenCalledWith(
            expect.objectContaining({ top: 500, behavior: 'smooth' })
        )

        scrollToSpy.mockRestore()
    })
})
