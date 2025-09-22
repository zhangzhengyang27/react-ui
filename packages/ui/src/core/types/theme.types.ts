export type UISize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface VariantColorResolverResult {
    background: string
    hover: string
    color: string
    border: string
    hoverColor?: string
}

export interface UITheme {}

export type UIThemeOverrides = Partial<UITheme>
