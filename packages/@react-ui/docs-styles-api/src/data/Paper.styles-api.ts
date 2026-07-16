import type { PaperFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const PaperStylesApi: StylesApiData<PaperFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--paper-radius': '控制 `border-radius`',
      '--paper-shadow': '控制 `box-shadow`',
    },
  },

  modifiers: [
    { modifier: 'data-with-border', selector: 'root', condition: '`withBorderProp` is set' },
  ],
};
