import type { BlockquoteFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const BlockquoteStylesApi: StylesApiData<BlockquoteFactory> = {
  selectors: {
    root: '根元素',
    icon: '图标元素',
    cite: 'Cite 元素',
  },

  vars: {
    root: {
      '--bq-bg': '控制 `background-color`',
      '--bq-bd': '控制 `border` 和图标 `color`',
      '--bq-icon-size': 'Controls `width` and `height` of the icon',
      '--bq-radius': '控制 `border-radius`',
      '--bq-text-wrap': '控制 `text-wrap` 属性',
    },
  },
};
