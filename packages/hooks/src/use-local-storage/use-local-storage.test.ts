import { renderHook, act, waitFor } from '@testing-library/react'
import { useLocalStorage } from './use-local-storage'

describe('useLocalStorage', () => {
    it('returns default value on initial render', () => {
        const { result } = renderHook(() =>
            useLocalStorage({ key: 'test-key', defaultValue: 'default' })
        )
        expect(result.current[0]).toBe('default')
    })

    it('updates value via setter', async () => {
        const { result } = renderHook(() =>
            useLocalStorage({ key: 'test-key', defaultValue: 'default' })
        )

        act(() => {
            result.current[1]('new-value')
        })

        await waitFor(() => {
            expect(result.current[0]).toBe('new-value')
        })
    })

    it('resets value via removeStorageValue', async () => {
        const { result } = renderHook(() =>
            useLocalStorage({ key: 'test-key', defaultValue: 'default' })
        )

        act(() => {
            result.current[1]('stored')
        })

        await waitFor(() => {
            expect(result.current[0]).toBe('stored')
        })

        act(() => {
            result.current[2]()
        })

        expect(result.current[0]).toBe('default')
    })
})
