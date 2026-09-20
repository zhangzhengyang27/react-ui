import { filterProps, getSpacing, InlineStyles, keys, rem, useUITheme,
  getSortedBreakpoints,
} from '../../core'
import type { GridProps } from './Grid'
import { getBaseValue } from './grid-responsive'

interface GridVariablesProps extends GridProps {
    selector: string
}

export function GridVariables({ cols, gutter, rowGap, columnGap, selector }: GridVariablesProps) {
    const theme = useUITheme()

    const baseStyles: Record<string, string | undefined> = filterProps({
        '--grid-cols': getBaseValue(cols)?.toString(),
        '--grid-gutter': getSpacing(getBaseValue(gutter)),
        '--grid-row-gap': getSpacing(getBaseValue(rowGap)),
        '--grid-column-gap': getSpacing(getBaseValue(columnGap))
    })

    // 按断点数值升序生成 @media：自定义主题追加乱序断点时，低断点规则
    // 才不会被后面的高断点规则覆盖（级联顺序错误）
    const breakpointKeys = getSortedBreakpoints(
      keys(theme.breakpoints),
      theme.breakpoints
    ).map((breakpoint) => breakpoint.value);
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
