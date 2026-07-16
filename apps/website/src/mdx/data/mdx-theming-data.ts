import { Frontmatter } from '@/types';

export const MDX_THEMING_DATA: Record<string, Frontmatter> = {
  UIProvider: {
    title: 'UIProvider',
    slug: '/theming/ui-provider',
    search: '主题上下文、CSS 重置、CSS 变量、上下文类和样式',
    searchTags: 'UIProvider, theme provider, cssVariablesResolver, getRootElement',
    hideHeader: true,
  },

  ThemeObject: {
    title: '主题对象',
    slug: '/theming/theme-object',
    search: 'use-ui-theme, 主题覆盖, UITheme',
    searchTags: 'useUITheme, mergeThemeOverrides, createTheme, default theme',
    hideHeader: true,
  },

  ColorSchemes: {
    title: '配色方案',
    slug: '/theming/color-schemes',
    search: 'use-ui-color-scheme, 配色方案管理, data-ui-color-scheme',
    searchTags:
      'useUIColorScheme, useComputedUIColorScheme, use-computed-color-scheme, ColorSchemeScript, UIColorSchemeManager, lightHidden, darkHidden, dark mode, light mode',
    hideHeader: true,
  },

  Colors: {
    title: '颜色',
    slug: '/theming/colors',
    search: '默认颜色, primaryColor, primaryShade',
    searchTags:
      'colorsTuple, virtual colors, variantColorResolver, autoContrast, color prop, c prop',
    hideHeader: true,
  },

  ColorFunctions: {
    title: '颜色函数',
    slug: '/styles/color-functions',
    search: '颜色操作函数, darken, lighten, parse',
    searchTags:
      'darken, lighten, alpha, parseThemeColor, getThemeColor, getGradient, isLightColor, luminance',
    hideHeader: true,
  },

  TypographyTheming: {
    title: '排版',
    slug: '/theming/typography',
    search: '更改字体, @font-face',
    searchTags: 'font family, font sizes, line heights, headings, h1 h2 h3 h4 h5 h6',
    hideHeader: true,
  },

  DefaultProps: {
    title: '默认属性',
    slug: '/theming/default-props',
    search: '组件默认属性',
    searchTags: 'useProps, use-props, withProps, with-props, theme.components',
    hideHeader: true,
  },

  DefaultTheme: {
    title: '默认主题',
    slug: '/theming/default-theme',
    hideHeader: true,
  },
};
