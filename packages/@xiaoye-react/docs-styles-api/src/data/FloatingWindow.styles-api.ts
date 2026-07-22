import type { FloatingWindowFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const FloatingWindowStylesApi: StylesApiData<FloatingWindowFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {},
  modifiers: [
    { modifier: 'data-dragging', selector: 'root', condition: 'Window is being dragged' },
  ],
};
