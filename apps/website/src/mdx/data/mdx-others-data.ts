import { Frontmatter } from '@/types';

export const MDX_OTHERS_DATA: Record<string, Frontmatter> = {
  ExtensionsPackage: {
    title: 'ReactUI extensions',
    slug: '/x/extensions',
    hideInSearch: true,
    hideHeader: true,
  },

  Notifications: {
    title: 'Notifications system',
    package: '@react-ui/ui',
    slug: '/x/notifications',
    props: ['Notifications'],
    styles: ['Notifications'],
    description: 'ReactUI notifications system',
    source: '@react-ui/ui/src',
    license: 'MIT',
    docs: 'x/notifications.mdx',
    searchTags: 'toast, snackbar, alerts, messages, notify, popup notification',
  },

  Spotlight: {
    title: 'Spotlight',
    package: '@react-ui/ui',
    slug: '/x/spotlight',
    props: [
      'Spotlight',
      'SpotlightRoot',
      'SpotlightAction',
      'SpotlightActionsGroup',
      'SpotlightSearch',
    ],
    styles: ['Spotlight'],
    description: 'Command center for your application',
    source: '@react-ui/ui/src',
    license: 'MIT',
    docs: 'x/spotlight.mdx',
    searchTags:
      'search, command palette, cmdk, cmd k, quick actions, global search, command bar, fuzzy search',
  },

  Carousel: {
    title: 'Carousel',
    package: '@react-ui/ui',
    slug: '/x/carousel',
    props: ['Carousel'],
    styles: ['Carousel'],
    description: 'Embla based carousel component',
    source: '@react-ui/ui/src',
    license: 'MIT',
    docs: 'x/carousel.mdx',
    searchTags: 'slider, slideshow, gallery, swiper, embla, image carousel',
  },

  Dropzone: {
    title: 'Dropzone',
    package: '@react-ui/ui',
    slug: '/x/dropzone',
    props: ['Dropzone'],
    styles: ['Dropzone'],
    description: 'Capture files from user with drag and drop',
    source: '@react-ui/ui/src',
    license: 'MIT',
    docs: 'x/dropzone.mdx',
    searchTags: 'drag and drop, file upload, file drop zone, upload area, drop files',
  },

  Nprogress: {
    title: 'NavigationProgress',
    package: '@react-ui/ui',
    slug: '/x/nprogress',
    props: ['NavigationProgress'],
    description: 'Navigation progress bar',
    source: '@react-ui/ui/src',
    license: 'MIT',
    docs: 'x/nprogress.mdx',
    searchTags: 'top progress bar, page loading bar, route progress, nprogress, youtube bar',
  },

  CodeHighlight: {
    title: 'CodeHighlight',
    package: '@react-ui/ui',
    slug: '/x/code-highlight',
    props: ['CodeHighlight', 'CodeHighlightTabs', 'InlineCodeHighlight'],
    styles: ['CodeHighlight', 'CodeHighlightTabs', 'InlineCodeHighlight'],
    description: 'Highlight code with shiki or highlight.js',
    source: '@react-ui/ui/src',
    license: 'MIT',
    docs: 'x/code-highlight.mdx',
    searchTags: 'syntax highlighting, prism, shiki, highlight.js, code block, snippet',
  },

  Modals: {
    title: 'Modals manager',
    package: '@react-ui/ui',
    slug: '/x/modals',
    props: ['ModalsProvider'],
    description: 'Centralized modals manager with option to handle state of multi-step modals',
    source: '@react-ui/ui/src',
    license: 'MIT',
    docs: 'x/modals.mdx',
    searchTags:
      'confirm dialog, alert dialog, dialog manager, prompt, confirmation, imperative modal',
  },

  TipTap: {
    title: 'Rich text editor',
    package: '@react-ui/ui',
    slug: '/x/tiptap',
    props: ['RichTextEditor'],
    styles: ['RichTextEditor'],
    description: 'Tiptap based rich text editor',
    source: '@react-ui/ui/src',
    license: 'MIT',
    docs: 'x/tiptap.mdx',
    searchTags:
      'wysiwyg, rich text, tiptap, prosemirror, html editor, markdown editor, text editor',
  },

  OxcConfig: {
    title: 'ReactUI oxc 配置',
    slug: '/oxc-config-mantine',
    hideInSearch: true,
    hideHeader: true,
  },
};
