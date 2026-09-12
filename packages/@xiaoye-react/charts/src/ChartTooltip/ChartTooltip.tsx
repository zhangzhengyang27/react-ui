import type { CSSProperties } from 'react'
import type { ChartThemeColors } from '../chart-theme'
import classes from './ChartTooltip.module.css'

interface TooltipEntry {
    color?: string
    name?: string | number
    value?: string | number
    dataKey?: string | number
    payload?: Record<string, unknown>
}

export interface ChartTooltipProps {
    active?: boolean
    label?: string | number
    payload?: TooltipEntry[]
    /** 数值后缀，如 '%'、'次' */
    unit?: string
    colors: ChartThemeColors
    /** 数值格式化 */
    formatter?: (value: number | string) => string
}

/**
 * recharts `<Tooltip content={...}>` 的自定义内容组件。
 * recharts 会注入 active/payload/label，其余 props 由调用方传入。
 */
export function ChartTooltip({ active, payload, label, unit, colors, formatter }: ChartTooltipProps) {
    if (!active || !payload || payload.length === 0) {
        return null
    }

    const vars = {
        '--tooltip-bg': colors.tooltipBg,
        '--tooltip-border': colors.tooltipBorder,
        '--tooltip-title': colors.tooltipTitle,
        '--tooltip-text': colors.tooltipText
    } as CSSProperties

    return (
        <div className={classes.tooltip} style={vars}>
            {label !== undefined && label !== '' && <div className={classes.label}>{label}</div>}
            <ul className={classes.list}>
                {payload.map((entry, index) => {
                    const color =
                        entry.color ?? (entry.payload?.color as string | undefined) ?? (entry.payload?.fill as string | undefined)
                    const raw = entry.value ?? entry.payload?.value
                    const text = formatter ? formatter((raw ?? 0) as string | number) : `${raw ?? 0}${unit ?? ''}`
                    return (
                        <li key={entry.dataKey ?? index} className={classes.item}>
                            {color && <span className={classes.swatch} style={{ background: color }} />}
                            <span className={classes.name}>{entry.name ?? entry.dataKey}</span>
                            <span className={classes.value}>{text}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

ChartTooltip.displayName = '@xiaoye-react/charts/ChartTooltip'
