import { Frontmatter } from '@/types';

export const MDX_STYLES_DATA: Record<string, Frontmatter> = {
  StylesOverview: {
    title: '样式概述',
    slug: '/styles/styles-overview',
    search: '应用样式的方式概述',
    hideHeader: true,
  },

  UIStyles: {
    title: 'ReactUI 样式',
    slug: '/styles/ui-styles',
    search: 'ReactUI .css 文件',
    hideHeader: true,
  },

  CSSModules: {
    title: 'CSS 模块',
    slug: '/styles/css-modules',
    search: 'CSS 模块入门',
    hideHeader: true,
  },

  VanillaExtract: {
    title: 'Vanilla Extract',
    slug: '/styles/vanilla-extract',
    search: 'ReactUI + Vanilla extract 集成',
    hideHeader: true,
  },

  UsageWithSass: {
    title: '配合 Sass 使用',
    slug: '/styles/sass',
    search: 'ReactUI Sass mixins、函数和变量',
    hideHeader: true,
  },

  PostCSSPreset: {
    title: 'PostCSS 预设',
    slug: '/styles/postcss-preset',
    search: 'postcss-preset-ui, mixins, CSS 函数',
    hideHeader: true,
  },

  GlobalStyles: {
    title: '全局样式',
    slug: '/styles/global-styles',
    search: 'ReactUI 组件正常工作所需的全局样式',
    hideHeader: true,
  },

  CssVariables: {
    title: 'CSS 变量',
    slug: '/styles/css-variables',
    search: 'ReactUI CSS 变量和解析器',
    hideHeader: true,
  },

  CSSVariablesList: {
    title: 'CSS 变量列表',
    slug: '/styles/css-variables-list',
    search: '默认 CSS 变量解析器生成的所有 ReactUI CSS 变量列表',
    hideHeader: true,
  },

  CSSFilesList: {
    title: 'CSS 文件列表',
    slug: '/styles/css-files-list',
    search: '所有 ReactUI .css 文件列表',
    hideHeader: true,
  },

  Rem: {
    title: 'rem、em 和 px 单位',
    slug: '/styles/rem',
    search: 'ReactUI 组件中的 rem 和 em 单位，单位转换',
    hideHeader: true,
  },

  StyleProp: {
    title: 'style 属性',
    slug: '/styles/style',
    search: 'style 属性使用',
    hideHeader: true,
  },

  ResponsiveStyles: {
    title: '响应式样式',
    slug: '/styles/responsive',
    search: '媒体查询、断点、内联响应式样式',
    searchTags:
      'use-matches, useMatches, use-media-query, useMediaQuery, hiddenFrom, visibleFrom, container queries, responsive style props',
    hideHeader: true,
  },

  StylesApi: {
    title: '样式 API',
    slug: '/styles/styles-api',
    search: 'classNames、styles 和 unstyled 属性',
    searchTags: 'classNames prop, styles prop, selectors, css variables, static classes',
    hideHeader: true,
  },

  DataAttributes: {
    title: 'data-* 属性',
    slug: '/styles/data-attributes',
    search: '使用 data-* 属性应用样式',
    searchTags: 'mod prop, data attributes, modifiers',
    hideHeader: true,
  },

  VariantsAndSizes: {
    title: '变体和尺寸',
    slug: '/styles/variants-sizes',
    search: '自定义组件尺寸和变体',
    searchTags: 'variantColorResolver, custom variants, custom sizes, data-size',
    hideHeader: true,
  },

  StyleProps: {
    title: '样式属性',
    slug: '/styles/style-props',
    search: '添加内联样式的属性',
    hideHeader: true,
  },

  Rtl: {
    title: 'RTL（从右到左）',
    slug: '/styles/rtl',
    search: '将文本方向更改为从右到左',
    searchTags: 'DirectionProvider, useDirection, use-direction, dir attribute, rtl mixin',
    hideHeader: true,
  },

  StylesPerformance: {
    title: '样式性能',
    slug: '/styles/styles-performance',
    search: '学习如何提升样式性能',
    hideHeader: true,
  },

  UnstyledComponents: {
    title: '无样式 / Headless',
    slug: '/styles/unstyled',
    search: 'Headless/无样式组件',
    searchTags: 'HeadlessUIProvider, unstyled prop, headless ui',
    hideHeader: true,
  },

  Emotion: {
    title: '配合 Emotion 使用',
    slug: '/styles/emotion',
    search: 'sx props, createStyles, emotion 集成',
    hideHeader: true,
  },
};
