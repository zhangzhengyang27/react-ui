import type { BlockquoteFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const BlockquoteStylesApi: StylesApiData<BlockquoteFactory> = {
  selectors: {
    root: '根元素',
    icon: '图标元素',
    cite: 'Cite 元素',
  },

  vars: {
    root: {
      '--bq-bd': '控制 `border`',
      '--bq-bg-dark': '控制深色模式下的 `background-color`',
      '--bq-bg-light': 'Controls `background-color` in light color scheme',
      '--bq-icon-size': 'Controls `width` and `height` of the icon',
      '--bq-radius': '控制 `border-radius`',
      '--bq-text-wrap': '控制 `text-wrap` 属性',
    },
  },
};
