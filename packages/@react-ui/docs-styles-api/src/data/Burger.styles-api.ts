import type { BurgerFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const BurgerStylesApi: StylesApiData<BurgerFactory> = {
  selectors: {
    root: '根元素（button）',
    burger: 'Inner element that contains burger lines',
  },

  vars: {
    root: {
      '--burger-line-size': '控制 lines 的 height',
      '--burger-color': '控制 lines 的 background-color',
      '--burger-size': '控制 the button 的 width and height',
      '--burger-transition-duration': '控制 lines 的 transition-duration',
      '--burger-transition-timing-function': '控制 lines 的 transition-timing-function',
    },
  },

  modifiers: [{ modifier: 'data-opened', selector: 'burger', condition: 'opened prop is set' }],
};
