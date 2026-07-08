import type { MantineTheme } from '../../../../../core/MantineProvider'
import { rem } from '../../../../../core/utils'

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export function fontSizeResolver(value: unknown, theme: MantineTheme) {
    if (typeof value === 'string') {
        if (value in theme.fontSizes) {
            return `var(--ui-font-size-${value})`
        }
        if (headings.includes(value)) {
            return `var(--ui-${value}-font-size)`
        }
        return rem(value)
    }

    if (typeof value === 'number') {
        return rem(value)
    }

    return value
}
