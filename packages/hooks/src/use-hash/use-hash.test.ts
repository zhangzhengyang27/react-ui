import { renderHook, act } from '@testing-library/react'
import { useHash } from './use-hash'

describe('useHash', () => {
    afterEach(() => {
        window.location.hash = ''
    })

    it('reads current hash', () => {
        window.location.hash = '#section'
        const { result } = renderHook(() => useHash({ getInitialValueInEffect: false }))
        expect(result.current[0]).toBe('#section')
    })

    it('sets hash value', () => {
        const { result } = renderHook(() => useHash({ getInitialValueInEffect: false }))

        act(() => {
            result.current[1]('test')
        })

        expect(window.location.hash).toBe('#test')
        expect(result.current[0]).toBe('#test')
    })
})
