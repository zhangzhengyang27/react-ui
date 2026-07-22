import type { PopoverFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const PopoverStylesApi: StylesApiData<PopoverFactory> = {
  selectors: {
    dropdown: '下拉元素',
    arrow: '下拉箭头',
    overlay: '遮罩层元素',
  },

  vars: {
    dropdown: {
      '--popover-radius': 'Controls dropdown border-radius',
      '--popover-shadow': 'Controls dropdown box-shadow',
    },
  },

  modifiers: [
    {
      modifier: 'data-position',
      selector: 'dropdown',
      value: 'floating ui 下拉框位置的值',
    },
  ],
};
