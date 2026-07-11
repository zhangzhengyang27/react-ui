import { alpha, darken, getPrimaryShade } from '../color-functions'
import type { MantineColor, MantineTheme } from '../theme.types'

interface GetColorVariablesInput {
    theme: MantineTheme
    color: MantineColor
    colorScheme: 'light' | 'dark'
    name?: string
    withColorValues?: boolean
}

export function getCSSColorVariables({
    theme,
    color,
    colorScheme,
    name = color,
    withColorValues = true
}: GetColorVariablesInput) {
    if (!theme.colors[color]) {
        return {}
    }

    if (colorScheme === 'light') {
        const primaryShade = getPrimaryShade(theme, 'light')

        const dynamicVariables = {
            [`--ui-color-${name}-text`]: `var(--ui-color-${name}-filled)`,
            [`--ui-color-${name}-filled`]: `var(--ui-color-${name}-${primaryShade})`,
            [`--ui-color-${name}-filled-hover`]: `var(--ui-color-${name}-${
                primaryShade === 9 ? 8 : primaryShade + 1
            })`,
            [`--ui-color-${name}-light`]: `var(--ui-color-${name}-${1})`,
            [`--ui-color-${name}-light-hover`]: `var(--ui-color-${name}-${2})`,
            [`--ui-color-${name}-light-color`]: `var(--ui-color-${name}-${9})`,
            [`--ui-color-${name}-outline`]: `var(--ui-color-${name}-${primaryShade})`,
            [`--ui-color-${name}-outline-hover`]: alpha(theme.colors[color][primaryShade], 0.05)
        }

        if (!withColorValues) {
            return dynamicVariables
        }

        return {
            [`--ui-color-${name}-0`]: theme.colors[color][0],
            [`--ui-color-${name}-1`]: theme.colors[color][1],
            [`--ui-color-${name}-2`]: theme.colors[color][2],
            [`--ui-color-${name}-3`]: theme.colors[color][3],
            [`--ui-color-${name}-4`]: theme.colors[color][4],
            [`--ui-color-${name}-5`]: theme.colors[color][5],
            [`--ui-color-${name}-6`]: theme.colors[color][6],
            [`--ui-color-${name}-7`]: theme.colors[color][7],
            [`--ui-color-${name}-8`]: theme.colors[color][8],
            [`--ui-color-${name}-9`]: theme.colors[color][9],
            ...dynamicVariables
        }
    }

    const primaryShade = getPrimaryShade(theme, 'dark')
    const dynamicVariables = {
        [`--ui-color-${name}-text`]: `var(--ui-color-${name}-4)`,
        [`--ui-color-${name}-filled`]: `var(--ui-color-${name}-${primaryShade})`,
        [`--ui-color-${name}-filled-hover`]: `var(--ui-color-${name}-${
            primaryShade === 9 ? 8 : primaryShade + 1
        })`,
        [`--ui-color-${name}-light`]: darken(theme.colors[color][9], 0.5),
        [`--ui-color-${name}-light-hover`]: darken(theme.colors[color][9], 0.3),
        [`--ui-color-${name}-light-color`]: `var(--ui-color-${name}-0)`,
        [`--ui-color-${name}-outline`]: `var(--ui-color-${name}-${Math.max(primaryShade - 4, 0)})`,
        [`--ui-color-${name}-outline-hover`]: alpha(
            theme.colors[color][Math.max(primaryShade - 4, 0)],
            0.05
        )
    }

    if (!withColorValues) {
        return dynamicVariables
    }

    return {
        [`--ui-color-${name}-0`]: theme.colors[color][0],
        [`--ui-color-${name}-1`]: theme.colors[color][1],
        [`--ui-color-${name}-2`]: theme.colors[color][2],
        [`--ui-color-${name}-3`]: theme.colors[color][3],
        [`--ui-color-${name}-4`]: theme.colors[color][4],
        [`--ui-color-${name}-5`]: theme.colors[color][5],
        [`--ui-color-${name}-6`]: theme.colors[color][6],
        [`--ui-color-${name}-7`]: theme.colors[color][7],
        [`--ui-color-${name}-8`]: theme.colors[color][8],
        [`--ui-color-${name}-9`]: theme.colors[color][9],
        ...dynamicVariables
    }
}
