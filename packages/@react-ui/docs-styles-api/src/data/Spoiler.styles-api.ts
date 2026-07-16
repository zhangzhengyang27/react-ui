import type { SpoilerFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const SpoilerStylesApi: StylesApiData<SpoilerFactory> = {
  selectors: {
    root: '根元素',
    content: 'Wraps content to set max-height and transition',
    control: 'Show/hide content control',
  },

  vars: {
    root: {
      '--spoiler-transition-duration': 'Controls transition duration',
    },
  },

  modifiers: [
    {
      modifier: 'data-has-spoiler',
      selector: 'root',
      condition: 'Whether the control button is shown or not',
    },
  ],
};
