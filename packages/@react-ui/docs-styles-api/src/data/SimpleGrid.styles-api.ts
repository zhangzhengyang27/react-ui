import type { SimpleGridFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const SimpleGridStylesApi: StylesApiData<SimpleGridFactory> = {
  selectors: {
    root: '根元素',
    container: 'Container element, available only when `type="container"` is set',
  },

  vars: {},
};
