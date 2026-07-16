export * from './theme.types'
export * from './color-functions'

export { UIProvider, type UIProviderProps } from './UIProvider'
export { createTheme } from './create-theme/create-theme'
export { DEFAULT_THEME } from './default-theme'
export { virtualColor, isVirtualColor } from './UICssVariables/virtual-color/virtual-color'
export { defaultCssVariablesResolver } from './UICssVariables'
export { ColorSchemeScript } from './ColorSchemeScript'
export type { ColorSchemeScriptProps } from './ColorSchemeScript'

export {
    UIContext,
    useUIContext,
    useUIClassNamesPrefix,
    useUIStyleNonce,
    useUICssVariablesResolver,
    useUIWithStaticClasses,
    useUIIsHeadless,
    useUISxTransform,
    useUIStylesTransform,
    useUIEnv
} from './UI.context'

export { useUITheme, useSafeUITheme, UIThemeContext, UIThemeProvider } from './UIThemeProvider'

export { useProps } from './use-props/use-props'

export { useMatches } from './use-matches/use-matches'

export * from './use-ui-color-scheme'
