import { filterProps, getSpacing, InlineStyles, keys, rem, useMantineTheme } from '../../core'
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

export function GridVariables({ cols, gutter, selector }: GridVariablesProps) {
    const theme = useMantineTheme()

    const baseStyles: Record<string, string | undefined> = filterProps({
        '--grid-cols': getBaseValue(cols)?.toString(),
        '--grid-gutter': getSpacing(getBaseValue(gutter))
    })

    const breakpointKeys = keys(theme.breakpoints)
    const media: { query: string; styles: Record<string, string> }[] = []

    breakpointKeys.forEach(breakpoint => {
        const styles: Record<string, string> = {}

        if (typeof gutter === 'object' && gutter[breakpoint] !== undefined) {
            styles['--grid-gutter'] = getSpacing(gutter[breakpoint])!
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
