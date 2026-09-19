import type { ChipFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const ChipStylesApi: StylesApiData<ChipFactory> = {
  selectors: {
    root: '根元素',
    checkIcon: 'Check icon, visible when checked prop is true',
    label: 'Input label, used as a chip body',
  },

  vars: {
    root: {
      '--chip-size': '控制 `height`',
      '--chip-radius': '控制 `border-radius`',
      '--chip-color': 'Controls `color` when chip is checked',
    },
  },

  modifiers: [
    { modifier: 'data-checked', selector: 'label', condition: 'Chip is checked' },
    { modifier: 'data-disabled', selector: 'label', condition: '设置了 `disabled` 属性' },
  ],
};
