import { renderHook, act } from '@testing-library/react'
import { useToggle } from './use-toggle'

describe('useToggle', () => {
    it('toggles between false and true by default', () => {
        const { result } = renderHook(() => useToggle())
        const [value, toggle] = result.current

        expect(value).toBe(false)

        act(() => toggle())
        expect(result.current[0]).toBe(true)

        act(() => toggle())
        expect(result.current[0]).toBe(false)
    })

    it('cycles through custom values', () => {
        const { result } = renderHook(() => useToggle(['dark', 'light', 'system'] as const))

        expect(result.current[0]).toBe('dark')

        act(() => result.current[1]())
        expect(result.current[0]).toBe('light')

        act(() => result.current[1]())
        expect(result.current[0]).toBe('system')

        act(() => result.current[1]())
        expect(result.current[0]).toBe('dark')
    })

    it('accepts explicit value to set', () => {
        const { result } = renderHook(() => useToggle(['dark', 'light'] as const))

        act(() => result.current[1]('light'))
        expect(result.current[0]).toBe('light')

        act(() => result.current[1]('dark'))
        expect(result.current[0]).toBe('dark')
    })
})
