import type { CodeFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const CodeStylesApi: StylesApiData<CodeFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--code-bg': '控制 `background-color`',
    },
  },

  modifiers: [{ modifier: 'data-block', selector: 'root', condition: '设置了 `block` 属性' }],
};
