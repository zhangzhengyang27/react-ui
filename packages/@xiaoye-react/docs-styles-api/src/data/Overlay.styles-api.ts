import type { OverlayFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const OverlayStylesApi: StylesApiData<OverlayFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--overlay-bg': '控制 `background-color`',
      '--overlay-filter': '控制 `backdrop-filter`',
      '--overlay-radius': '控制 `border-radius`',
      '--overlay-z-index': '控制 `z-index`',
    },
  },

  modifiers: [
    { modifier: 'data-center', selector: 'root', condition: '设置了 `center` 属性' },
    { modifier: 'data-fixed', selector: 'root', condition: '设置了 `fixed` 属性' },
  ],
};
