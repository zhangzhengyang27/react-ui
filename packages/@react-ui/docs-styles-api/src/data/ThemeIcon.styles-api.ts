import type { ThemeIconFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const ThemeIconStylesApi: StylesApiData<ThemeIconFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--ti-bg': '控制 `background`',
      '--ti-bd': '控制 `border`',
      '--ti-color': '控制 icon `color`',
      '--ti-radius': '控制 `border-radius`',
      '--ti-size': '控制 `width`、`height`、`min-width` 和 `min-height` 样式',
    },
  },
};
