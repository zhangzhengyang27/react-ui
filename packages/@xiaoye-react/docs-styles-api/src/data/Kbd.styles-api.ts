import type { KbdFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const KbdStylesApi: StylesApiData<KbdFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--kbd-fz': '控制 `font-size`',
      '--kbd-padding': '控制 `padding`',
    },
  },
};
