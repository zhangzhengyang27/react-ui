import { act, renderHook } from '@testing-library/react'
import { createElement } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../UIProvider'
import { useMatches } from './use-matches'

/**
 * window.matchMedia 的测试替身：matches 由"假视口宽度 ≥ 查询里的 min-width"决定，
 * 监听器记账，方便断言卸载后有没有解绑。
 */
function installMatchMedia(getWidth: () => number) {
    const instances = new Set<{ query: string; listeners: Set<(event: unknown) => void> }>()

    const impl = (query: string) => {
        const entry = { query, listeners: new Set<(event: unknown) => void>() }
        instances.add(entry)
        const list = {
            media: query,
            get matches() {
                return minOf(query) <= getWidth()
            },
            addEventListener: (_: string, cb: (event: unknown) => void) => entry.listeners.add(cb),
            removeEventListener: (_: string, cb: (event: unknown) => void) => entry.listeners.delete(cb),
            addListener: (cb: (event: unknown) => void) => entry.listeners.add(cb),
            removeListener: (cb: (event: unknown) => void) => entry.listeners.delete(cb),
            onchange: null,
            dispatchEvent: () => true
        }
        return list as unknown as MediaQueryList
    }

    vi.stubGlobal('matchMedia', impl)

    return {
        /** 模拟视口变化：按当前宽度重算 matches 并通知所有还在监听里的查询 */
        resize: () => {
            instances.forEach(entry => {
                const matches = minOf(entry.query) <= getWidth()
                entry.listeners.forEach(cb => cb({ matches, media: entry.query }))
            })
        },
        listenerCount: () => [...instances].reduce((total, entry) => total + entry.listeners.size, 0)
    }
}

function minOf(query: string) {
    // 括号不配平 = 畸形查询。真实浏览器不会为它抛错，而是给出 matches:false，
    // 这里照抄这个语义（否则测不出"一条查询被拆成两条"的那类 bug）
    const open = (query.match(/\(/g) ?? []).length
    const close = (query.match(/\)/g) ?? []).length
    if (open !== close) {
        return Number.POSITIVE_INFINITY
    }
    // 允许 min()/clamp() 这类嵌套函数：数字不必紧跟在 min-width: 后面
    return Number(/min-width:[\s\S]*?([\d.]+)em/.exec(query)?.[1] ?? Number.POSITIVE_INFINITY)
}

/**
 * RTL 的 wrapper 在 rerender 时不会被替换（只会把参数当成 props 传回旧 wrapper），
 * 所以主题必须走这个可变闭包：每次渲染都读当前的 themeOverride，
 * 才能让同一个 hook 实例真正遇到"断点数量变了"。
 */
let themeOverride: Record<string, unknown> | undefined

const ThemeWrapper = ({ children }: { children: React.ReactNode }) =>
    createElement(UIProvider, { theme: themeOverride }, children)

describe('useMatches', () => {
    // 视口按 em 计：默认断点是 xs 36 / sm 48 / md 62 / lg 75 / xl 88
    let width = 20
    let media: ReturnType<typeof installMatchMedia>

    beforeEach(() => {
        width = 20
        themeOverride = undefined
        media = installMatchMedia(() => width)
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('取不到任何断点时回落 base', () => {
        const { result } = renderHook(() => useMatches({ base: 'compact', md: 'roomy' }), {
            wrapper: ThemeWrapper
        })

        expect(result.current).toBe('compact')
    })

    it('视口跨过断点后取该断点声明的值（订阅自己会推，不需要外部重渲染）', async () => {
        const { result } = renderHook(() => useMatches({ base: 'compact', md: 'roomy' }), {
            wrapper: ThemeWrapper
        })

        expect(result.current).toBe('compact')

        act(() => {
            width = 65
            media.resize()
        })
        await act(async () => {})

        expect(result.current).toBe('roomy')
    })

    it('挂载后主题的断点数量变化不会错位（旧实现每断点一个 hook，这里必崩）', async () => {
        const { rerender, result } = renderHook(() => useMatches({ base: 'a', md: 'b', xl: 'c' }), {
            wrapper: ThemeWrapper
        })

        expect(result.current).toBe('a')

        themeOverride = { breakpoints: { xxl: '100em' } }
        // hook 数量若随断点数变化，React 在这次重渲染就抛
        // "Rendered more hooks than during the previous render"
        expect(() => rerender()).not.toThrow()
        expect(result.current).toBe('a')

        act(() => {
            width = 65
            media.resize()
        })
        await act(async () => {})

        expect(result.current).toBe('b')
    })

    it('卸载时解绑全部媒体查询监听', () => {
        const { unmount } = renderHook(() => useMatches({ base: 'a', md: 'b' }), {
            wrapper: ThemeWrapper
        })

        expect(media.listenerCount()).toBeGreaterThan(0)
        unmount()
        expect(media.listenerCount()).toBe(0)
    })

    it('getInitialValueInEffect: false 时首帧就取到生效断点，不闪 base', () => {
        width = 65

        const { result } = renderHook(
            () => useMatches({ base: 'compact', md: 'roomy' }, { getInitialValueInEffect: false }),
            { wrapper: ThemeWrapper }
        )

        expect(result.current).toBe('roomy')
    })

    // 回归：实现曾把全部查询拼成一个字符串再 split(',') 还原，
    // 而断点在类型上就是任意 string——写成 min()/clamp() 这类含逗号的值时
    // 一条查询被拆成两条，畸形查询在浏览器里恒 false，于是永远回落 base。
    it('断点值是含逗号的 CSS 函数时不被拆坏', () => {
        themeOverride = { breakpoints: { md: 'min(39.375em, 100%)' } }
        width = 65

        const { result } = renderHook(
            () => useMatches({ base: 'a', md: 'b' }, { getInitialValueInEffect: false }),
            { wrapper: ThemeWrapper }
        )

        expect(result.current).toBe('b')
    })
})
