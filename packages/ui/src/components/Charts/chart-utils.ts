const DEFAULT_PALETTE = [
    'blue',
    'teal',
    'grape',
    'orange',
    'cyan',
    'green',
    'red',
    'pink',
    'yellow',
    'indigo'
]

/**
 * Resolves a chart color string to a CSS variable or raw color value.
 *
 * Supported formats:
 * - CSS variable: `var(--xxx)` → returned as-is
 * - Hex color: `#xxx` → returned as-is
 * - RGB/RGBA: `rgb(...)` / `rgba(...)` → returned as-is
 * - Mantine-style with shade: `blue.6` → `var(--ui-color-blue-6)`
 * - Color name only: `blue` → `var(--ui-color-blue-6)` (default shade 6)
 * - undefined → uses DEFAULT_PALETTE[index] with shade 6
 */
export function resolveChartColor(color?: string, index: number = 0): string {
    if (color?.startsWith('var(') || color?.startsWith('#') || color?.startsWith('rgb')) {
        return color
    }
    if (color) {
        // Support Mantine-style dot notation: "blue.6" → colorName="blue", shade="6"
        const dotIndex = color.indexOf('.')
        if (dotIndex > 0) {
            const colorName = color.slice(0, dotIndex)
            const shade = color.slice(dotIndex + 1)
            return `var(--ui-color-${colorName}-${shade})`
        }
        return `var(--ui-color-${color}-6)`
    }
    return `var(--ui-color-${DEFAULT_PALETTE[index % DEFAULT_PALETTE.length]}-6)`
}
