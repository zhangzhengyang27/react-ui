import type { AffixFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const AffixStylesApi: StylesApiData<AffixFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--affix-z-index': 'Controls `z-index` property',
      '--affix-top': 'Controls `top` property',
      '--affix-bottom': 'Controls `bottom` property',
      '--affix-left': 'Controls `left` property',
      '--affix-right': 'Controls `right` property',
    },
  },
};
