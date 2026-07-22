import type { TextFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const TextStylesApi: StylesApiData<TextFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--text-fz': 'Controls `font-size` property',
      '--text-lh': 'Controls `line-height` property',
      '--text-gradient': '文本填充渐变',
      '--text-line-clamp': '应可见的行数',
      '--text-text-wrap': '控制 `text-wrap` 属性',
    },
  },

  modifiers: [
    {
      modifier: 'data-truncate',
      selector: 'root',
      value: 'Value of `truncate` prop',
      condition: '设置了 `truncate` 属性',
    },
    { modifier: 'data-line-clamp', selector: 'root', condition: '`lineClamp` prop is a number' },
    { modifier: 'data-inline', selector: 'root', condition: '设置了 `inline` 属性' },
    { modifier: 'data-inherit', selector: 'root', condition: '设置了 `inherit` 属性' },
  ],
};
