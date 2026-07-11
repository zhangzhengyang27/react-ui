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

export function resolveChartColor(color?: string, index: number = 0): string {
    if (color?.startsWith('var(') || color?.startsWith('#') || color?.startsWith('rgb')) {
        return color
    }
    if (color) {
        return `var(--ui-color-${color}-6)`
    }
    return `var(--ui-color-${DEFAULT_PALETTE[index % DEFAULT_PALETTE.length]}-6)`
}
