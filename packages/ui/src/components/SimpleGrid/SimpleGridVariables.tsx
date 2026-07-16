import { filterProps, getSpacing, InlineStyles, keys, rem, useUITheme } from '../../core'
import type { SimpleGridProps } from './SimpleGrid'

interface SimpleGridVariablesProps extends SimpleGridProps {
    selector: string
}

function getMinColWidthValue(value: string | number | undefined): string | undefined {
    if (value === undefined) {
        return undefined
    }

    if (typeof value === 'number') {
        return rem(value)
    }

    return value
}

function getBaseValue<Value>(value: Value | Partial<Record<string, Value>> | undefined): Value | undefined {
    if (typeof value === 'object' && value !== null && 'base' in value) {
        return (value as Record<string, Value>).base
    }

    return value as Value | undefined
}

export function SimpleGridVariables({
    spacing,
    verticalSpacing,
    cols,
    minColWidth,
    autoRows,
    selector
}: SimpleGridVariablesProps) {
    const theme = useUITheme()
    const _verticalSpacing = verticalSpacing === undefined ? spacing : verticalSpacing
    const useAutoColumns = minColWidth !== undefined

    const baseStyles: Record<string, string | undefined> = filterProps({
        '--sg-spacing-x': getSpacing(getBaseValue(spacing)),
        '--sg-spacing-y': getSpacing(getBaseValue(_verticalSpacing)),
        '--sg-auto-rows': autoRows,
        ...(useAutoColumns
            ? { '--sg-min-col-width': getMinColWidthValue(minColWidth) }
            : { '--sg-cols': getBaseValue(cols)?.toString() })
    })

    const breakpointKeys = keys(theme.breakpoints)
    const media: { query: string; styles: Record<string, string> }[] = []

    breakpointKeys.forEach(breakpoint => {
        const styles: Record<string, string> = {}

        if (typeof spacing === 'object' && spacing[breakpoint] !== undefined) {
            styles['--sg-spacing-x'] = getSpacing(spacing[breakpoint])!
        }

        if (typeof _verticalSpacing === 'object' && _verticalSpacing[breakpoint] !== undefined) {
            styles['--sg-spacing-y'] = getSpacing(_verticalSpacing[breakpoint])!
        }

        if (!useAutoColumns && typeof cols === 'object' && cols[breakpoint] !== undefined) {
            styles['--sg-cols'] = String(cols[breakpoint])
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
