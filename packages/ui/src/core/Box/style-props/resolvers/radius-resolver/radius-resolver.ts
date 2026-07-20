import type { UITheme } from '../../../../../core/UIProvider'
import { rem } from '../../../../../core/utils'

export function radiusResolver(value: unknown, theme: UITheme) {
    if (typeof value === 'string' && Object.hasOwn(theme.radius, value)) {
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
