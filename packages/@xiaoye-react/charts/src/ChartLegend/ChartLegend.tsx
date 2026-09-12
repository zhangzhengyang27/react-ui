import type { CSSProperties } from 'react'
import classes from '../ChartTooltip/ChartTooltip.module.css'

export interface ChartSeries {
    /** 对应 data 中的字段名，同时作为图例/提示中的显示名 */
    name: string
    /** 主题颜色 token（如 'indigo.6'）或任意 CSS 颜色 */
    color: string
}

export function ChartLegend({ series, resolvedColors }: { series: ChartSeries[]; resolvedColors: string[] }) {
    if (series.length === 0) {
        return null
    }

    return (
        <div className={classes.legend}>
            {series.map((s, i) => (
                <span key={s.name} className={classes.legendItem}>
                    <span
                        className={classes.legendSwatch}
                        style={{ background: resolvedColors[i] } as CSSProperties}
                    />
                    {s.name}
                </span>
            ))}
        </div>
    )
}
