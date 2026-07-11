import type { FloatingWindowFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const FloatingWindowStylesApi: StylesApiData<FloatingWindowFactory> = {
  selectors: {
    root: 'Root element',
  },

  vars: {},
  modifiers: [
    { modifier: 'data-dragging', selector: 'root', condition: 'Window is being dragged' },
  ],
};
