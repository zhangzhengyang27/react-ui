import type { MantineTheme } from '../../../../../core/MantineProvider'
import { rem } from '../../../../../core/utils'

export function radiusResolver(value: unknown, theme: MantineTheme) {
    if (typeof value === 'string' && value in theme.radius) {
        return `var(--ui-radius-${value})`
    }

    if (typeof value === 'number') {
        return rem(value)
    }

    if (typeof value === 'string') {
        return rem(value)
    }

    return value
}
