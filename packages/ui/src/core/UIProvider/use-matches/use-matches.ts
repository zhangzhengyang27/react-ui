import { useMediaQuery, UseMediaQueryOptions } from '@xiaoye-react/hooks'
import { useUITheme } from '../UIThemeProvider'
import { UIBreakpoint } from '../theme.types'

type UseMatchesInput<T> = Partial<Record<UIBreakpoint, T>>

const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl']

function getFirstMatchingValue<T>(
    value: UseMatchesInput<T>,
    biggestMatch: UIBreakpoint | undefined
): T | undefined {
    if (!biggestMatch) {
        return value.base
    }

    let index = BREAKPOINTS.indexOf(biggestMatch)

    while (index >= 0) {
        const breakpoint = BREAKPOINTS[index]
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
    const xsMatches = useMediaQuery(`(min-width: ${theme.breakpoints.xs})`, false, options)
    const smMatches = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`, false, options)
    const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`, false, options)
    const lgMatches = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`, false, options)
    const xlMatches = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`, false, options)

    const breakpoints = [xsMatches, smMatches, mdMatches, lgMatches, xlMatches]
    const firstMatchingBreakpointIndex = getFirstMatchingBreakpoint(breakpoints)
    return getFirstMatchingValue(payload, BREAKPOINTS[firstMatchingBreakpointIndex])
}
