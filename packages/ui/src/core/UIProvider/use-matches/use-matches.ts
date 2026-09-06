import { useMediaQuery, UseMediaQueryOptions } from '@xiaoye-react/hooks'
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

export function useMatches<T>(payload: UseMatchesInput<T>, options?: UseMediaQueryOptions) {
    const theme = useUITheme()
    // 断点序取自主题：自定义主题增删断点同样生效。
    // 主题对象在 UIThemeProvider 内 memo 化，断点键序在一次主题下稳定，hooks 数量恒定。
    const breakpoints = Object.keys(theme.breakpoints) as UIBreakpoint[]
    const matches = breakpoints.map(breakpoint =>
        useMediaQuery(`(min-width: ${theme.breakpoints[breakpoint]})`, false, options)
    )

    const firstMatchingBreakpointIndex = getFirstMatchingBreakpoint(matches)
    return getFirstMatchingValue(payload, breakpoints[firstMatchingBreakpointIndex], breakpoints)
}
