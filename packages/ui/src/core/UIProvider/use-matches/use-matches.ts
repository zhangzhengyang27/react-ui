import { attachMediaListener, UseMediaQueryOptions } from '@xiaoye-react/hooks'
import { useEffect, useState } from 'react'
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

/**
 * 按当前视口取出 payload 里"生效的那个断点"的值。
 *
 * 实现上刻意不调用 useMediaQuery：逐断点各调一次会让 hook 数量等于主题的断点数量，
 * 换一次断点个数不同的主题就是 "Rendered more hooks than during the previous render"。
 * 这里一条订阅覆盖全部查询，hooks 数量与断点个数无关。
 *
 * `options` 只为兼容既有签名：真值一律在 effect 里补，首帧全是 false ⇒ 回落 base
 * （逐条 useMediaQuery(query, false, options) 原本也是这个时序——第二参传了 boolean
 * 时 getInitialValueInEffect 不起作用）。
 */
export function useMatches<T>(payload: UseMatchesInput<T>, options?: UseMediaQueryOptions) {
    const theme = useUITheme()
    const breakpoints = Object.keys(theme.breakpoints) as UIBreakpoint[]
    // 主题对象在 UIThemeProvider 内 memo 化，同一主题下这个指纹稳定
    const signature = breakpoints.map(breakpoint => `(min-width: ${theme.breakpoints[breakpoint]})`).join(',')
    const [matches, setMatches] = useState<boolean[]>(() => [])

    useEffect(() => {
        // signature 本身就是查询列表（媒体特性里不会出现逗号），从它还原可以让依赖表是完备的
        const activeQueries = signature.split(',')
        let lists: MediaQueryList[]
        try {
            lists = activeQueries.map(query => window.matchMedia(query))
        } catch {
            // Safari iframe 场景 matchMedia 会抛，与 useMediaQuery 一样保持 false（即回落 base）
            return
        }

        const sync = () => setMatches(lists.map(list => list.matches))
        sync()

        const detach = lists.map(list => attachMediaListener(list, sync))
        return () => detach.forEach(off => off())
    }, [signature])

    // 换主题的当帧 matches 可能还是上一副主题的长/短，取交集避免按下标越界
    const index = getFirstMatchingBreakpoint(matches.slice(0, breakpoints.length))
    return getFirstMatchingValue(payload, breakpoints[index], breakpoints)
}
