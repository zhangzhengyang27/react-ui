import { renderHook } from '@testing-library/react'
import { useOs } from './use-os'

describe('useOs', () => {
    it('returns undetermined initially with getValueInEffect', () => {
        const { result } = renderHook(() => useOs())
        expect(result.current).toBe('undetermined')
    })

    it('detects macos from user agent', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
            value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
            configurable: true
        })

        const { result } = renderHook(() => useOs({ getValueInEffect: false }))
        expect(result.current).toBe('macos')
    })
})
