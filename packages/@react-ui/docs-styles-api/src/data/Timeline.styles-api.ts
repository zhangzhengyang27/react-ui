import type { TimelineFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const TimelineStylesApi: StylesApiData<TimelineFactory> = {
  selectors: {
    root: '根元素',
    item: 'Item root 元素',
    itemBody: 'Item body, wraps title and content',
    itemTitle: 'Item title, controlled by title prop',
    itemContent: 'Item content, controlled by children prop',
    itemBullet: 'Item bullet',
  },

  vars: {
    root: {
      '--tl-bullet-size': '控制 bullet `width` and `height`',
      '--tl-color': 'Controls active bullet and line colors',
      '--tl-icon-color': 'Controls icon color',
      '--tl-line-width': '控制 the line between bullets 的 width',
      '--tl-radius': '控制 bullet `border-radius`',
    },
  },

  modifiers: [
    {
      modifier: 'data-active',
      selector: ['item', 'itemBullet'],
      condition: 'Item index is =< Timeline active prop',
    },
    {
      modifier: 'data-line-active',
      selector: ['item'],
      condition: 'Item index is < Timeline active prop',
    },
  ],
};
