import { Frontmatter } from '@/types';

export const MDX_GUIDES_DATA: Record<string, Frontmatter> = {
  Polymorphic: {
    title: '多态组件',
    slug: '/guides/polymorphic',
    search: '多态, 更改根元素, component prop',
    hideHeader: true,
  },

  CustomComponents: {
    title: '自定义组件',
    slug: '/guides/custom-components',
    search: 'factory, genericFactory, useStyles, varsResolver',
    searchTags:
      'useProps, use-props, useStyles, use-styles, polymorphicFactory, ExtendComponent, theme.components',
    hideHeader: true,
  },

  NextJs: {
    title: '配合 Next.js 使用',
    slug: '/guides/next',
    search: 'ReactUI 配合 Next.js 入门',
    hideHeader: true,
  },

  Vite: {
    title: '配合 Vite 使用',
    slug: '/guides/vite',
    search: 'ReactUI 配合 Vite 入门',
    hideHeader: true,
  },

  ReactRouter: {
    title: '配合 React Router 使用',
    slug: '/guides/react-router',
    search: 'ReactUI 配合 React Router 入门',
    hideHeader: true,
  },

  Gatsby: {
    title: '配合 Gatsby 使用',
    slug: '/guides/gatsby',
    search: 'ReactUI 配合 Gatsby 入门',
    hideHeader: true,
  },

  Redwood: {
    title: '配合 Redwood 使用',
    slug: '/guides/redwood',
    search: 'ReactUI 配合 Redwood 入门',
    hideHeader: true,
  },

  Storybook: {
    title: '配合 Storybook 使用',
    slug: '/guides/storybook',
    search: 'ReactUI 配合 Storybook 配置',
    hideHeader: true,
  },

  TypeScript: {
    title: '配合 TypeScript 使用',
    slug: '/guides/typescript',
    search: 'ReactUI 配合 TypeScript 使用',
    hideHeader: true,
  },

  JavaScript: {
    title: '配合 JavaScript 使用',
    slug: '/guides/javascript',
    search: 'ReactUI 配合 JavaScript 使用',
    hideHeader: true,
  },

  Icons: {
    title: '图标库',
    slug: '/guides/icons',
    search: 'ReactUI 图标库使用',
    hideHeader: true,
  },

  Jest: {
    title: '使用 Jest 测试',
    slug: '/guides/jest',
    search: '使用 Jest 和 React Testing Library 测试 ReactUI',
    hideHeader: true,
  },

  Vitest: {
    title: '使用 Vitest 测试',
    slug: '/guides/vitest',
    search: '使用 Vitest 和 React Testing Library 测试 ReactUI',
    hideHeader: true,
  },

  FunctionsReference: {
    title: '函数参考',
    slug: '/guides/functions-reference',
    search:
      'ReactUI 各包中导出但未在其他地方记录的函数列表',
    hideHeader: true,
  },

  LLMDocumentation: {
    title: 'ReactUI 与大语言模型',
    slug: '/guides/llms',
    search: '大语言模型, AI, ChatGPT, Claude, Copilot, Cursor, Windsurf, documentation',
    hideHeader: true,
  },

  ControlledVsUncontrolled: {
    title: '受控与非受控',
    slug: '/guides/controlled-vs-uncontrolled',
    search: 'React 中的受控与非受控组件',
    hideHeader: true,
  },
};
