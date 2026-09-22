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

describe('useLocalStorage: 同一事件批次内连续函数式更新', () => {
    beforeEach(() => {
        window.localStorage.clear()
    })

    it('composes consecutive functional updates instead of dropping them', () => {
        const { result } = renderHook(() =>
            useLocalStorage<number>({ key: 'consecutive-updates', defaultValue: 0 })
        )

        act(() => {
            result.current[1](v => v + 1)
            result.current[1](v => v + 1)
        })

        expect(result.current[0]).toBe(2)
        expect(window.localStorage.getItem('consecutive-updates')).toBe('2')
    })
})

describe('useLocalStorage: 动态 key', () => {
    beforeEach(() => {
        window.localStorage.clear()
    })

    it('re-reads the stored value when the key changes', async () => {
        window.localStorage.setItem('profile-a', JSON.stringify('A'))
        window.localStorage.setItem('profile-b', JSON.stringify('B'))

        const { result, rerender } = renderHook(
            ({ key }) =>
                useLocalStorage<string>({ key, defaultValue: 'none', getInitialValueInEffect: true }),
            { initialProps: { key: 'profile-a' } }
        )

        await waitFor(() => {
            expect(result.current[0]).toBe('A')
        })

        act(() => {
            rerender({ key: 'profile-b' })
        })

        await waitFor(() => {
            expect(result.current[0]).toBe('B')
        })
    })
})
