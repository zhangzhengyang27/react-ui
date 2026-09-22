import { attachMediaListener, UseMediaQueryOptions } from '@xiaoye-react/hooks'
import { useEffect, useMemo, useState } from 'react'
import { useUITheme } from '../UIThemeProvider'
import { UIBreakpoint } from '../theme.types'

type UseMatchesInput<T> = Partial<Record<UIBreakpoint, T>>

function getFirstMatchingValue<T>(
    value: UseMatchesInput<T>,
    biggestMatch: UIBreakpoint | undefined,
    breakpoints: UIBreakpoint[]
): T | undefined {
    if (!biggestMatch) {
        return value.base
    }

    let index = breakpoints.indexOf(biggestMatch)

    while (index >= 0) {
        const breakpoint = breakpoints[index]
        if (Object.hasOwn(value, breakpoint)) {
            return value[breakpoint]
        }
        index -= 1
    }

    return value.base
}

function getFirstMatchingBreakpoint(matches: (boolean | undefined)[]) {
    for (let index = matches.length - 1; index >= 0; index -= 1) {
        if (matches[index]) {
            return index
        }
    }

    return -1
}

/** 同步读一次全部查询；Safari iframe 里 matchMedia 会抛，此时按"读不到"处理。 */
function readMatches(queries: string[]): boolean[] {
    try {
        return queries.map(query => window.matchMedia(query).matches)
    } catch {
        return []
    }
}

/**
 * 按当前视口取出 payload 里"生效的那个断点"的值。
 *
 * 实现上刻意不调用 useMediaQuery：逐断点各调一次会让 hook 数量等于主题的断点数量，
 * 换一次断点个数不同的主题就是 "Rendered more hooks than during the previous render"。
 * 这里一条订阅覆盖全部查询，hooks 数量与断点个数无关。
 *
 * `getInitialValueInEffect` 与 useMediaQuery 同义：默认 true ⇒ 首帧回落 base，真值在
 * effect 里补；传 false ⇒ 首帧就同步读真值（不想看到 base 闪一帧的场景）。
 */
export function useMatches<T>(payload: UseMatchesInput<T>, options?: UseMediaQueryOptions) {
    const theme = useUITheme()
    // 断点名与媒体查询都必须 memo 在 theme 上：Object.keys 每帧产生新数组，
    // 直接放依赖里等于每帧重订阅 matchMedia。
    // 必须是数组而不能是拼好的字符串再 split 还原：断点在类型上就是任意 string，
    // 写成 min(30em, 50vw) 这类含逗号的 CSS 函数时 split(',') 会把一条查询拆成两条。
    const breakpoints = useMemo(
        () => Object.keys(theme.breakpoints) as UIBreakpoint[],
        [theme]
    )
    const queries = useMemo(
        () => breakpoints.map(breakpoint => `(min-width: ${theme.breakpoints[breakpoint]})`),
        [theme, breakpoints]
    )
    const [matches, setMatches] = useState<boolean[]>(() =>
        options?.getInitialValueInEffect === false && typeof window !== 'undefined'
            ? readMatches(queries)
            : []
    )

    useEffect(() => {
        let lists: MediaQueryList[]
        try {
            lists = queries.map(query => window.matchMedia(query))
        } catch {
            // Safari iframe 场景 matchMedia 会抛，与 useMediaQuery 一样保持 false（即回落 base）
            return
        }

        // 值没变就不产生新数组，免得白刷一帧
        const sync = () =>
            setMatches(previous => {
                const next = lists.map(list => list.matches)
                return previous.length === next.length && previous.every((v, i) => v === next[i])
                    ? previous
                    : next
            })
        sync()

        const detach = lists.map(list => attachMediaListener(list, sync))
        return () => detach.forEach(off => off())
    }, [queries])

    // 换主题的当帧 matches 可能还是上一副主题的长/短，取交集避免按下标越界
    const index = getFirstMatchingBreakpoint(matches.slice(0, breakpoints.length))
    return getFirstMatchingValue(payload, breakpoints[index], breakpoints)
}
