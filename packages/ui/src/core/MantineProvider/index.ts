export * from './theme.types'
export * from './color-functions'

export { MantineProvider, type MantineProviderProps } from './MantineProvider'
export { createTheme } from './create-theme/create-theme'
export { DEFAULT_THEME } from './default-theme'
export { virtualColor, isVirtualColor } from './MantineCssVariables/virtual-color/virtual-color'
export { defaultCssVariablesResolver } from './MantineCssVariables'
export { ColorSchemeScript } from './ColorSchemeScript'
export type { ColorSchemeScriptProps } from './ColorSchemeScript'

export {
    MantineContext,
    useMantineContext,
    useMantineClassNamesPrefix,
    useMantineStyleNonce,
    useMantineCssVariablesResolver,
    useMantineWithStaticClasses,
    useMantineIsHeadless,
    useMantineSxTransform,
    useMantineStylesTransform,
    useMantineEnv
} from './Mantine.context'

export { useMantineTheme, useSafeMantineTheme, MantineThemeContext, MantineThemeProvider } from './MantineThemeProvider'

export { useProps } from './use-props/use-props'

export { useMatches } from './use-matches/use-matches'

export * from './use-mantine-color-scheme'
