import { rem } from '../../../utils'
import { UIColor, UIGradient, UITheme } from '../../theme.types'
import { darken } from '../darken/darken'
import { getGradient } from '../get-gradient/get-gradient'
import { parseThemeColor } from '../parse-theme-color/parse-theme-color'
import { rgba } from '../rgba/rgba'

export interface VariantColorsResolverInput {
    color: UIColor | undefined
    theme: UITheme
    variant: string
    gradient?: UIGradient
    autoContrast?: boolean
}

export interface VariantColorResolverResult {
    background: string
    hover: string
    color: string
    border: string
    hoverColor?: string
}

export type VariantColorsResolver = (input: VariantColorsResolverInput) => VariantColorResolverResult

export const defaultVariantColorsResolver: VariantColorsResolver = ({
    color,
    theme,
    variant,
    gradient,
    autoContrast
}) => {
    const parsed = parseThemeColor({ color, theme })

    const _autoContrast = typeof autoContrast === 'boolean' ? autoContrast : theme.autoContrast

    if (variant === 'none') {
        return {
            background: 'transparent',
            hover: 'transparent',
            color: parsed.color,
            border: 'transparent'
        }
    }

    if (variant === 'filled') {
        const textColor = _autoContrast && parsed.isLight ? 'var(--ui-color-black)' : 'var(--ui-color-white)'

        if (parsed.isThemeColor) {
            if (parsed.shade === undefined) {
                return {
                    background: `var(--ui-color-${color}-filled)`,
                    hover: `var(--ui-color-${color}-filled-hover)`,
                    color: textColor,
                    border: `${rem(1)} solid transparent`
                }
            }

            return {
                background: `var(--ui-color-${parsed.color}-${parsed.shade})`,
                hover: `var(--ui-color-${parsed.color}-${parsed.shade === 9 ? 8 : parsed.shade + 1})`,
                color: textColor,
                border: `${rem(1)} solid transparent`
            }
        }

        return {
            background: color!,
            hover: darken(color!, 0.1),
            color: textColor,
            border: `${rem(1)} solid transparent`
        }
    }

    if (variant === 'light') {
        if (parsed.isThemeColor) {
            if (parsed.shade === undefined) {
                return {
                    background: `var(--ui-color-${color}-light)`,
                    hover: `var(--ui-color-${color}-light-hover)`,
                    color: `var(--ui-color-${color}-light-color)`,
                    border: `${rem(1)} solid transparent`
                }
            }

            const parsedColor = theme.colors[parsed.color][parsed.shade]

            return {
                background: rgba(parsedColor, 0.1),
                hover: rgba(parsedColor, 0.12),
                color: `var(--ui-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
                border: `${rem(1)} solid transparent`
            }
        }

        return {
            background: rgba(color!, 0.1),
            hover: rgba(color!, 0.12),
            color: color!,
            border: `${rem(1)} solid transparent`
        }
    }

    if (variant === 'outline') {
        if (parsed.isThemeColor) {
            if (parsed.shade === undefined) {
                return {
                    background: 'transparent',
                    hover: `var(--ui-color-${color}-outline-hover)`,
                    color: `var(--ui-color-${color}-outline)`,
                    border: `${rem(1)} solid var(--ui-color-${color}-outline)`
                }
            }

            return {
                background: 'transparent',
                hover: rgba(theme.colors[parsed.color][parsed.shade], 0.05),
                color: `var(--ui-color-${parsed.color}-${parsed.shade})`,
                border: `${rem(1)} solid var(--ui-color-${parsed.color}-${parsed.shade})`
            }
        }

        return {
            background: 'transparent',
            hover: rgba(color!, 0.05),
            color: color!,
            border: `${rem(1)} solid ${color}`
        }
    }

    if (variant === 'subtle') {
        if (parsed.isThemeColor) {
            if (parsed.shade === undefined) {
                return {
                    background: 'transparent',
                    hover: `var(--ui-color-${color}-light-hover)`,
                    color: `var(--ui-color-${color}-light-color)`,
                    border: `${rem(1)} solid transparent`
                }
            }

            const parsedColor = theme.colors[parsed.color][parsed.shade]

            return {
                background: 'transparent',
                hover: rgba(parsedColor, 0.12),
                color: `var(--ui-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
                border: `${rem(1)} solid transparent`
            }
        }

        return {
            background: 'transparent',
            hover: rgba(color!, 0.12),
            color: color!,
            border: `${rem(1)} solid transparent`
        }
    }

    if (variant === 'transparent') {
        if (parsed.isThemeColor) {
            if (parsed.shade === undefined) {
                return {
                    background: 'transparent',
                    hover: 'transparent',
                    color: `var(--ui-color-${color}-light-color)`,
                    border: `${rem(1)} solid transparent`
                }
            }

            return {
                background: 'transparent',
                hover: 'transparent',
                color: `var(--ui-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
                border: `${rem(1)} solid transparent`
            }
        }

        return {
            background: 'transparent',
            hover: 'transparent',
            color: color!,
            border: `${rem(1)} solid transparent`
        }
    }

    if (variant === 'white') {
        if (parsed.isThemeColor) {
            if (parsed.shade === undefined) {
                return {
                    background: 'var(--ui-color-white)',
                    hover: darken(theme.white, 0.01),
                    color: `var(--ui-color-${color}-filled)`,
                    border: `${rem(1)} solid transparent`
                }
            }

            return {
                background: 'var(--ui-color-white)',
                hover: darken(theme.white, 0.01),
                color: `var(--ui-color-${parsed.color}-${parsed.shade})`,
                border: `${rem(1)} solid transparent`
            }
        }

        return {
            background: 'var(--ui-color-white)',
            hover: darken(theme.white, 0.01),
            color: color!,
            border: `${rem(1)} solid transparent`
        }
    }

    if (variant === 'gradient') {
        return {
            background: getGradient(gradient, theme),
            hover: getGradient(gradient, theme),
            color: 'var(--ui-color-white)',
            border: 'none'
        }
    }

    if (variant === 'default') {
        return {
            background: 'var(--ui-color-default)',
            hover: 'var(--ui-color-default-hover)',
            color: 'var(--ui-color-default-color)',
            border: `${rem(1)} solid var(--ui-color-default-border)`
        }
    }

    return {} as VariantColorResolverResult
}
