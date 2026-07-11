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
    title: 'About ReactUI',
    slug: '/about',
    search: 'About ReactUI component library',
    hideSiblings: true,
    hideHeader: true,
  },

  GettingStarted: {
    title: 'Getting started',
    search: 'Getting started with ReactUI',
    slug: '/getting-started',
    hideSiblings: true,
    hideHeader: true,
  },

  Support: {
    title: 'Support',
    slug: '/support',
    hideInSearch: true,
    hideSiblings: true,
    hideHeader: true,
  },

  BrowserSupport: {
    title: 'Browser support',
    slug: '/browser-support',
    search: 'Browser versions supported by ReactUI',
    hideSiblings: true,
    hideHeader: true,
  },

  Contribute: {
    title: 'Contributing to ReactUI',
    slug: '/contribute',
    search: 'Learn how to contribute to ReactUI',
    hideSiblings: true,
    hideHeader: true,
  },
};
