import type { PillFactory, PillGroupFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const PillStylesApi: StylesApiData<PillFactory> = {
  selectors: {
    root: '根元素',
    label: 'Pill label (children)',
    remove: 'Remove button',
  },

  vars: {
    root: {
      '--pill-height': 'Controls `height` of the pill',
      '--pill-fz': '控制 `font-size`',
      '--pill-radius': '控制 `border-radius`',
    },
  },

  modifiers: [
    { modifier: 'data-with-remove', selector: 'root', condition: '设置了 `withRemoveButton` 属性' },
    { modifier: 'data-disabled', selector: 'root', condition: '设置了 `disabled` 属性' },
  ],
};

export const PillGroupStylesApi: StylesApiData<PillGroupFactory> = {
  selectors: {
    group: '根元素',
  },

  vars: {
    group: {
      '--pg-gap': 'Controls `gap` between pills',
    },
  },
};
