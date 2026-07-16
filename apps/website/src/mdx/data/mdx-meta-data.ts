import { Frontmatter } from '@/types';

export const MDX_META_DATA: Record<string, Frontmatter> = {
  NotFound: {
    title: '404',
    slug: '/404',
    hideHeader: true,
    hideInSearch: true,
    hideSiblings: true,
  },

  About: {
    title: '关于 ReactUI',
    slug: '/about',
    search: '关于 ReactUI 组件库',
    hideSiblings: true,
    hideHeader: true,
  },

  GettingStarted: {
    title: '开始使用',
    search: 'ReactUI 入门',
    slug: '/getting-started',
    hideSiblings: true,
    hideHeader: true,
  },

  Support: {
    title: '支持',
    slug: '/support',
    hideInSearch: true,
    hideSiblings: true,
    hideHeader: true,
  },

  BrowserSupport: {
    title: '浏览器支持',
    slug: '/browser-support',
    search: 'ReactUI 支持的浏览器版本',
    hideSiblings: true,
    hideHeader: true,
  },

  Contribute: {
    title: '为 ReactUI 做贡献',
    slug: '/contribute',
    search: '学习如何为 ReactUI 做贡献',
    hideSiblings: true,
    hideHeader: true,
  },
};
