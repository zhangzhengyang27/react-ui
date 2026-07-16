export interface Template {
  name: string;
  link: string;
  description: string;
  type: 'next' | 'gatsby' | 'vite' | 'redwood' | 'react-router';
}

export const TEMPLATES_DATA: Template[] = [
  {
    type: 'next',
    name: 'next-app-template',
    link: 'https://github.com/react-ui-org/next-app-template',
    description: 'Next.js App Router 完整模板，包含 Jest、Storybook、oxlint',
  },
  {
    type: 'next',
    name: 'next-pages-template',
    link: 'https://github.com/react-ui-org/next-pages-template',
    description: 'Next.js Pages Router 完整模板，包含 Jest、Storybook、oxlint',
  },
  {
    type: 'next',
    name: 'next-app-min-template',
    link: 'https://github.com/react-ui-org/next-app-min-template',
    description:
      'Next.js App Router 最小模板，不包含额外工具，仅默认 Next.js 配置',
  },
  {
    type: 'next',
    name: 'next-pages-min-template',
    link: 'https://github.com/react-ui-org/next-pages-min-template',
    description:
      'Next.js Pages Router 最小模板，不包含额外工具，仅默认 Next.js 配置',
  },
  {
    type: 'next',
    name: 'next-vanilla-extract-template',
    link: 'https://github.com/react-ui-org/next-vanilla-extract-template',
    description: '包含 Vanilla Extract 示例的 Next.js 模板',
  },
  {
    type: 'vite',
    name: 'vite-template',
    link: 'https://github.com/react-ui-org/vite-template',
    description: 'Vite 完整模板，包含 Vitest、oxfmt、Storybook、oxlint',
  },
  {
    type: 'vite',
    name: 'vite-min-template',
    link: 'https://github.com/react-ui-org/vite-min-template',
    description:
      'Vite 最小模板，不包含额外工具，仅默认 Vite 配置',
  },
  {
    type: 'vite',
    name: 'vite-vanilla-extract-template',
    link: 'https://github.com/react-ui-org/vite-vanilla-extract-template',
    description: '包含 Vanilla Extract 示例的 Vite 模板',
  },
  {
    type: 'gatsby',
    name: 'gatsby-template',
    link: 'https://github.com/react-ui-org/gatsby-template',
    description: 'Gatsby 基础模板',
  },
  {
    type: 'redwood',
    name: 'redwood-template',
    link: 'https://github.com/react-ui-org/redwood-template',
    description: 'RedwoodJS 基础模板',
  },
];
