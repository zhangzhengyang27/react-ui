import { Frontmatter } from '@/types';

export const MDX_GUIDES_DATA: Record<string, Frontmatter> = {
  Polymorphic: {
    title: 'Polymorphic components',
    slug: '/guides/polymorphic',
    search: 'polymorphic, change root element, component prop',
    hideHeader: true,
  },

  CustomComponents: {
    title: 'Custom components',
    slug: '/guides/custom-components',
    search: 'factory, genericFactory, useStyles, varsResolver',
    searchTags:
      'useProps, use-props, useStyles, use-styles, polymorphicFactory, ExtendComponent, theme.components',
    hideHeader: true,
  },

  NextJs: {
    title: 'Usage with Next.js',
    slug: '/guides/next',
    search: 'Get started with Next.js',
    hideHeader: true,
  },

  Vite: {
    title: 'Usage with Vite',
    slug: '/guides/vite',
    search: 'Get started with Vite',
    hideHeader: true,
  },

  ReactRouter: {
    title: 'Usage with React Router',
    slug: '/guides/react-router',
    search: 'Get started with React Router',
    hideHeader: true,
  },

  Gatsby: {
    title: 'Usage with Gatsby',
    slug: '/guides/gatsby',
    search: 'Get started with Gatsby',
    hideHeader: true,
  },

  Redwood: {
    title: 'Usage with Redwood',
    slug: '/guides/redwood',
    search: 'Get started with Redwood',
    hideHeader: true,
  },

  Storybook: {
    title: 'Usage with Storybook',
    slug: '/guides/storybook',
    search: 'Setup ReactUI with Storybook',
    hideHeader: true,
  },

  TypeScript: {
    title: 'Usage with TypeScript',
    slug: '/guides/typescript',
    search: 'Usage with TypeScript',
    hideHeader: true,
  },

  JavaScript: {
    title: 'Usage with JavaScript',
    slug: '/guides/javascript',
    search: 'Usage with JavaScript',
    hideHeader: true,
  },

  Icons: {
    title: 'Icons libraries',
    slug: '/guides/icons',
    search: 'Usage of icons libraries with ReactUI',
    hideHeader: true,
  },

  Jest: {
    title: 'Testing with Jest',
    slug: '/guides/jest',
    search: 'Testing with Jest and React Testing Library',
    hideHeader: true,
  },

  Vitest: {
    title: 'Testing with Vitest',
    slug: '/guides/vitest',
    search: 'Testing with Vitest and React Testing Library',
    hideHeader: true,
  },

  FunctionsReference: {
    title: 'Functions reference',
    slug: '/guides/functions-reference',
    search:
      'A list of functions exported from ReactUI packages that are not documented anywhere else',
    hideHeader: true,
  },

  LLMDocumentation: {
    title: 'ReactUI with LLMs',
    slug: '/guides/llms',
    search: 'LLM, AI, ChatGPT, Claude, Copilot, Cursor, Windsurf, documentation',
    hideHeader: true,
  },

  ControlledVsUncontrolled: {
    title: 'Controlled vs Uncontrolled',
    slug: '/guides/controlled-vs-uncontrolled',
    search: 'Controlled vs Uncontrolled components in React',
    hideHeader: true,
  },
};
