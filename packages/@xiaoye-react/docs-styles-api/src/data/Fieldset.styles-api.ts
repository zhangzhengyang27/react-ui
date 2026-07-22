import type { FieldsetFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const FieldsetStylesApi: StylesApiData<FieldsetFactory> = {
  selectors: {
    root: '根元素',
    legend: 'Legend 元素',
  },

  vars: {
    root: {
      '--fieldset-radius': '控制 `border-radius`',
    },
  },
};
