import { renderHook, waitFor } from '@testing-library/react'
import { useFetch } from './use-fetch'

describe('useFetch', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('fetches data on mount', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ name: 'test' })
            } as Response)
        ))

        const { result } = renderHook(() => useFetch<{ name: string }>('/api/user'))

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.data).toEqual({ name: 'test' })
        expect(result.current.error).toBeNull()
    })

    it('sets error on failed request', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: false,
                status: 500
            } as Response)
        ))

        const { result } = renderHook(() => useFetch('/api/user'))

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.error).toBeInstanceOf(Error)
    })
})
