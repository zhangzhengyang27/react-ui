import type { TimelineFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const TimelineStylesApi: StylesApiData<TimelineFactory> = {
  selectors: {
    root: '根元素',
    item: 'Item root 元素',
    itemBody: 'Item body, wraps title and content',
    itemTitle: 'Item title, controlled by title prop',
    itemContent: 'Item content, controlled by children prop',
    itemBullet: 'Item bullet',
    itemLine: 'Item 之间的连接竖线',
  },

  vars: {
    root: {
      '--timeline-line-width': '控制 the line between bullets 的 width',
      '--timeline-bullet-size': '控制 bullet `width` and `height`',
      '--timeline-color': 'Controls active bullet and line colors',
      '--timeline-radius': '控制 bullet `border-radius`',
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
