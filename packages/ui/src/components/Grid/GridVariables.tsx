import { filterProps, getSpacing, InlineStyles, keys, rem, useUITheme } from '../../core'
import type { GridProps } from './Grid'

interface GridVariablesProps extends GridProps {
    selector: string
}

function getBaseValue<Value>(value: Value | Partial<Record<string, Value>> | undefined): Value | undefined {
    if (typeof value === 'object' && value !== null && 'base' in value) {
        return (value as Record<string, Value>).base
    }
    return value as Value | undefined
}

export function GridVariables({ cols, gutter, rowGap, columnGap, selector }: GridVariablesProps) {
    const theme = useUITheme()

    const baseStyles: Record<string, string | undefined> = filterProps({
        '--grid-cols': getBaseValue(cols)?.toString(),
        '--grid-gutter': getSpacing(getBaseValue(gutter)),
        '--grid-row-gap': getSpacing(getBaseValue(rowGap)),
        '--grid-column-gap': getSpacing(getBaseValue(columnGap))
    })

    const breakpointKeys = keys(theme.breakpoints)
    const media: { query: string; styles: Record<string, string> }[] = []

    breakpointKeys.forEach(breakpoint => {
        const styles: Record<string, string> = {}

        if (typeof gutter === 'object' && gutter[breakpoint] !== undefined) {
            styles['--grid-gutter'] = getSpacing(gutter[breakpoint])!
        }

        if (typeof rowGap === 'object' && rowGap[breakpoint] !== undefined) {
            styles['--grid-row-gap'] = getSpacing(rowGap[breakpoint])!
        }

        if (typeof columnGap === 'object' && columnGap[breakpoint] !== undefined) {
            styles['--grid-column-gap'] = getSpacing(columnGap[breakpoint])!
        }

        if (typeof cols === 'object' && cols[breakpoint] !== undefined) {
            styles['--grid-cols'] = String(cols[breakpoint])
        }

        if (Object.keys(styles).length > 0) {
            media.push({
                query: `(min-width: ${theme.breakpoints[breakpoint]})`,
                styles
            })
        }
    })

    return <InlineStyles styles={baseStyles} media={media} selector={selector} />
}
