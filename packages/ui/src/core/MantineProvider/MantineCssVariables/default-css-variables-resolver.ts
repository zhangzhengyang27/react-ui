import { keys, rem } from '../../utils'
import { getPrimaryContrastColor, getPrimaryShade, getVirtualColorContrast } from '../color-functions'
import type { ConvertCSSVariablesInput } from '../convert-css-variables'
import type { MantineTheme } from '../theme.types'
import { getCSSColorVariables } from './get-css-color-variables'
import { isVirtualColor } from './virtual-color/virtual-color'

export type CSSVariablesResolver = (theme: MantineTheme) => ConvertCSSVariablesInput

function assignSizeVariables(variables: Record<string, string>, sizes: Record<string, string>, name: string) {
    keys(sizes).forEach((size) => Object.assign(variables, { [`--ui-${name}-${size}`]: sizes[size] }))
}

export const defaultCssVariablesResolver: CSSVariablesResolver = (theme) => {
    const lightPrimaryShade = getPrimaryShade(theme, 'light')
    const defaultRadius = theme.defaultRadius in theme.radius ? theme.radius[theme.defaultRadius as 'xs'] : rem(theme.defaultRadius)

    const result: ConvertCSSVariablesInput = {
        variables: {
            '--ui-z-index-app': '100',
            '--ui-z-index-modal': '200',
            '--ui-z-index-popover': '300',
            '--ui-z-index-overlay': '400',
            '--ui-z-index-max': '9999',
            '--ui-scale': theme.scale.toString(),
            '--ui-cursor-type': theme.cursorType,
            '--ui-webkit-font-smoothing': theme.fontSmoothing ? 'antialiased' : 'unset',
            '--ui-moz-font-smoothing': theme.fontSmoothing ? 'grayscale' : 'unset',
            '--ui-color-white': theme.white,
            '--ui-color-black': theme.black,
            '--ui-line-height': theme.lineHeights.md,
            '--ui-font-family': theme.fontFamily,
            '--ui-font-family-monospace': theme.fontFamilyMonospace,
            '--ui-font-family-headings': theme.headings.fontFamily,
            '--ui-heading-font-weight': theme.headings.fontWeight,
            '--ui-heading-text-wrap': theme.headings.textWrap,
            '--ui-radius-default': defaultRadius,

            // Primary colors
            '--ui-primary-color-filled': `var(--ui-color-${theme.primaryColor}-filled)`,
            '--ui-primary-color-filled-hover': `var(--ui-color-${theme.primaryColor}-filled-hover)`,
            '--ui-primary-color-light': `var(--ui-color-${theme.primaryColor}-light)`,
            '--ui-primary-color-light-hover': `var(--ui-color-${theme.primaryColor}-light-hover)`,
            '--ui-primary-color-light-color': `var(--ui-color-${theme.primaryColor}-light-color)`
        },
        light: {
            '--ui-color-scheme': 'light',
            '--ui-primary-color-contrast': getPrimaryContrastColor(theme, 'light'),
            '--ui-color-bright': 'var(--ui-color-black)',
            '--ui-color-text': theme.black,
            '--ui-color-body': theme.white,
            '--ui-color-error': 'var(--ui-color-red-6)',
            '--ui-color-success': 'var(--ui-color-teal-8)',
            '--ui-color-placeholder': 'var(--ui-color-gray-5)',
            '--ui-color-anchor': `var(--ui-color-${theme.primaryColor}-${lightPrimaryShade})`,
            '--ui-color-default': 'var(--ui-color-white)',
            '--ui-color-default-hover': 'var(--ui-color-gray-0)',
            '--ui-color-default-color': 'var(--ui-color-black)',
            '--ui-color-default-border': 'var(--ui-color-gray-4)',
            '--ui-color-dimmed': 'var(--ui-color-gray-6)',
            '--ui-color-disabled': 'var(--ui-color-gray-2)',
            '--ui-color-disabled-color': 'var(--ui-color-gray-5)',
            '--ui-color-disabled-border': 'var(--ui-color-gray-3)'
        },
        dark: {
            '--ui-color-scheme': 'dark',
            '--ui-primary-color-contrast': getPrimaryContrastColor(theme, 'dark'),
            '--ui-color-bright': 'var(--ui-color-white)',
            '--ui-color-text': 'var(--ui-color-dark-0)',
            '--ui-color-body': 'var(--ui-color-dark-7)',
            '--ui-color-error': 'var(--ui-color-red-8)',
            '--ui-color-success': 'var(--ui-color-teal-8)',
            '--ui-color-placeholder': 'var(--ui-color-dark-3)',
            '--ui-color-anchor': `var(--ui-color-${theme.primaryColor}-4)`,
            '--ui-color-default': 'var(--ui-color-dark-6)',
            '--ui-color-default-hover': 'var(--ui-color-dark-5)',
            '--ui-color-default-color': 'var(--ui-color-white)',
            '--ui-color-default-border': 'var(--ui-color-dark-4)',
            '--ui-color-dimmed': 'var(--ui-color-dark-2)',
            '--ui-color-disabled': 'var(--ui-color-dark-6)',
            '--ui-color-disabled-color': 'var(--ui-color-dark-3)',
            '--ui-color-disabled-border': 'var(--ui-color-dark-4)'
        }
    }

    assignSizeVariables(result.variables, theme.breakpoints, 'breakpoint')
    assignSizeVariables(result.variables, theme.spacing, 'spacing')
    assignSizeVariables(result.variables, theme.fontSizes, 'font-size')
    assignSizeVariables(result.variables, theme.lineHeights, 'line-height')
    assignSizeVariables(result.variables, theme.shadows, 'shadow')
    assignSizeVariables(result.variables, theme.radius, 'radius')


    theme.colors[theme.primaryColor].forEach((_, index) => {
        result.variables[`--ui-primary-color-${index}`] = `var(--ui-color-${theme.primaryColor}-${index})`
    })

    keys(theme.colors).forEach((color) => {
        const value = theme.colors[color]

        if (isVirtualColor(value)) {
            Object.assign(
                result.light,
                getCSSColorVariables({
                    theme,
                    name: value.name,
                    color: value.light,
                    colorScheme: 'light',
                    withColorValues: true
                })
            )

            Object.assign(
                result.dark,
                getCSSColorVariables({
                    theme,
                    name: value.name,
                    color: value.dark,
                    colorScheme: 'dark',
                    withColorValues: true
                })
            )

            result.light[`--ui-color-${value.name}-contrast`] = getVirtualColorContrast(value, theme, 'light')
            result.dark[`--ui-color-${value.name}-contrast`] = getVirtualColorContrast(value, theme, 'dark')

            return
        }

        value.forEach((shade, index) => {
            result.variables[`--ui-color-${color}-${index}`] = shade
        })

        Object.assign(
            result.light,
            getCSSColorVariables({
                theme,
                color,
                colorScheme: 'light',
                withColorValues: false
            })
        )

        Object.assign(
            result.dark,
            getCSSColorVariables({
                theme,
                color,
                colorScheme: 'dark',
                withColorValues: false
            })
        )
    })

    const headings = theme.headings.sizes

    keys(headings).forEach((heading) => {
        result.variables[`--ui-${heading}-font-size`] = headings[heading].fontSize || rem(16)
        result.variables[`--ui-${heading}-line-height`] = headings[heading].lineHeight || '1.5'
        result.variables[`--ui-${heading}-font-weight`] =
            headings[heading].fontWeight || theme.headings.fontWeight || '700'
    })

    return result
}
