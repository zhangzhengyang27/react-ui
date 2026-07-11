import { renderHook, act } from '@testing-library/react'
import { useListState } from './use-list-state'

describe('useListState', () => {
    it('initializes with default empty array', () => {
        const { result } = renderHook(() => useListState())
        expect(result.current[0]).toEqual([])
    })

    it('initializes with given values', () => {
        const { result } = renderHook(() => useListState([1, 2, 3]))
        expect(result.current[0]).toEqual([1, 2, 3])
    })

    it('appends items', () => {
        const { result } = renderHook(() => useListState<number>())
        act(() => result.current[1].append(1, 2))
        expect(result.current[0]).toEqual([1, 2])
    })

    it('prepends items', () => {
        const { result } = renderHook(() => useListState<number>([3, 4]))
        act(() => result.current[1].prepend(1, 2))
        expect(result.current[0]).toEqual([1, 2, 3, 4])
    })

    it('inserts items at index', () => {
        const { result } = renderHook(() => useListState<number>([1, 4]))
        act(() => result.current[1].insert(1, 2, 3))
        expect(result.current[0]).toEqual([1, 2, 3, 4])
    })

    it('pops last item', () => {
        const { result } = renderHook(() => useListState<number>([1, 2, 3]))
        act(() => result.current[1].pop())
        expect(result.current[0]).toEqual([1, 2])
    })

    it('shifts first item', () => {
        const { result } = renderHook(() => useListState<number>([1, 2, 3]))
        act(() => result.current[1].shift())
        expect(result.current[0]).toEqual([2, 3])
    })

    it('removes items by indices', () => {
        const { result } = renderHook(() => useListState<number>([1, 2, 3, 4]))
        act(() => result.current[1].remove(1, 3))
        expect(result.current[0]).toEqual([1, 3])
    })

    it('reorders items', () => {
        const { result } = renderHook(() => useListState<number>([1, 2, 3, 4]))
        act(() => result.current[1].reorder({ from: 1, to: 3 }))
        expect(result.current[0]).toEqual([1, 3, 4, 2])
    })

    it('swaps items', () => {
        const { result } = renderHook(() => useListState<number>([1, 2, 3, 4]))
        act(() => result.current[1].swap({ from: 0, to: 3 }))
        expect(result.current[0]).toEqual([4, 2, 3, 1])
    })

    it('sets item at index', () => {
        const { result } = renderHook(() => useListState<number>([1, 2, 3]))
        act(() => result.current[1].setItem(1, 99))
        expect(result.current[0]).toEqual([1, 99, 3])
    })

    it('sets item prop at index', () => {
        const { result } = renderHook(() => useListState<{ name: string; age: number }>([
            { name: 'Alice', age: 20 },
            { name: 'Bob', age: 25 }
        ]))
        act(() => result.current[1].setItemProp(0, 'age', 21))
        expect(result.current[0][0].age).toBe(21)
    })

    it('applies function to all items', () => {
        const { result } = renderHook(() => useListState<number>([1, 2, 3]))
        act(() => result.current[1].apply(item => item * 2))
        expect(result.current[0]).toEqual([2, 4, 6])
    })

    it('applies function conditionally', () => {
        const { result } = renderHook(() => useListState<number>([1, 2, 3, 4]))
        act(() => result.current[1].applyWhere(
            (item) => item % 2 === 0,
            (item) => item * 10
        ))
        expect(result.current[0]).toEqual([1, 20, 3, 40])
    })

    it('filters items', () => {
        const { result } = renderHook(() => useListState<number>([1, 2, 3, 4, 5]))
        act(() => result.current[1].filter((item) => item > 2))
        expect(result.current[0]).toEqual([3, 4, 5])
    })
})
