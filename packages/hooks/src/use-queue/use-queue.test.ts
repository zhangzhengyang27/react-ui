import { renderHook, act } from '@testing-library/react'
import { useQueue } from './use-queue'

describe('useQueue', () => {
    it('splits initial values into state and queue', () => {
        const { result } = renderHook(() => useQueue({ initialValues: [1, 2, 3], limit: 2 }))
        expect(result.current.state).toEqual([1, 2])
        expect(result.current.queue).toEqual([3])
    })

    it('adds items and maintains limit', () => {
        const { result } = renderHook(() => useQueue({ initialValues: [1], limit: 2 }))

        act(() => {
            result.current.add(2, 3, 4)
        })

        expect(result.current.state).toEqual([1, 2])
        expect(result.current.queue).toEqual([3, 4])
    })

    it('cleans queue', () => {
        const { result } = renderHook(() => useQueue({ initialValues: [1, 2, 3], limit: 1 }))

        act(() => {
            result.current.cleanQueue()
        })

        expect(result.current.state).toEqual([1])
        expect(result.current.queue).toEqual([])
    })
})
