import type { TableOfContentsFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const TableOfContentsStylesApi: StylesApiData<TableOfContentsFactory> = {
  selectors: {
    root: '根元素',
    control: 'Control 元素',
  },

  vars: {
    root: {
      '--toc-bg': 'Background color of active control',
      '--toc-color': 'Text color of active control',
      '--toc-depth-offset': 'Offset between of control depending on depth',
      '--toc-radius': 'Border-radius of control',
      '--toc-size': '控制 all elements 的 font-size and padding',
    },
  },

  modifiers: [
    {
      modifier: 'data-active',
      selector: 'control',
      condition: 'Associated heading is currently the best match in the viewport',
    },
  ],
};
