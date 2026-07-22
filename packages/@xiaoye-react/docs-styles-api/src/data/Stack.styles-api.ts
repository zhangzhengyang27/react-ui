import type { StackFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const StackStylesApi: StylesApiData<StackFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--stack-align': '控制 `align-items` 属性',
      '--stack-justify': '控制 `justify-content` 属性',
      '--stack-gap': 'Controls `gap` property',
    },
  },
};
