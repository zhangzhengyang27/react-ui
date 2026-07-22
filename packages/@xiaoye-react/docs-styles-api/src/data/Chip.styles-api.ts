import type { ChipFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const ChipStylesApi: StylesApiData<ChipFactory> = {
  selectors: {
    root: '根元素',
    checkIcon: 'Check icon, visible when checked prop is true',
    iconWrapper: 'Wraps `checkIcon` for alignment',
    input: 'Input element, hidden by default',
    label: 'Input label, used as a chip body',
  },

  vars: {
    root: {
      '--chip-fz': '控制 `font-size`',
      '--chip-size': '控制 `height`',
      '--chip-icon-size': '控制 the icon 的 width and height',
      '--chip-padding': 'Controls horizontal padding when chip is not checked',
      '--chip-checked-padding': 'Controls horizontal padding when chip is checked',
      '--chip-radius': '控制 `border-radius`',
      '--chip-bg': 'Controls `background-color` when chip is checked',
      '--chip-hover': 'Controls `background-color` when chip is checked and hovered',
      '--chip-color': 'Controls `color` when chip is checked',
      '--chip-bd': 'Controls border when chip is checked',
      '--chip-spacing': 'Controls spacing between check icon and label',
    },
  },

  modifiers: [
    { modifier: 'data-checked', selector: 'label', condition: 'Chip is checked' },
    { modifier: 'data-disabled', selector: 'label', condition: '设置了 `disabled` 属性' },
  ],
};
