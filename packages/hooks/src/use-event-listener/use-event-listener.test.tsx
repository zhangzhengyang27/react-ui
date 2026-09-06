import { render, renderHook, act } from '@testing-library/react'
import { useState } from 'react'
import { useEventListener } from './use-event-listener'

describe('useEventListener', () => {
    it('attaches listener to the element', () => {
        const fn = vi.fn()
        const { result } = renderHook(() => useEventListener('click', fn))

        const el = document.createElement('button')
        render(<button ref={result.current} />)

        act(() => {
            result.current(el)
        })

        act(() => {
            el.click()
        })
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('uses the latest listener on state update', () => {
        const { result } = renderHook(() => {
            const [count, setCount] = useState(0)
            const ref = useEventListener('click', () => setCount(c => c + 1))
            return { ref, count, setCount }
        })

        const el = document.createElement('button')
        act(() => {
            result.current.ref(el)
        })

        act(() => {
            el.click()
        })
        expect(result.current.count).toBe(1)

        act(() => {
            el.click()
        })
        expect(result.current.count).toBe(2)
    })

    it('removes listener on unmount', () => {
        const fn = vi.fn()
        const { result, unmount } = renderHook(() => useEventListener('click', fn))

        const el = document.createElement('button')
        act(() => {
            result.current(el)
        })

        unmount()

        act(() => {
            el.click()
        })
        expect(fn).not.toHaveBeenCalled()
    })
})
