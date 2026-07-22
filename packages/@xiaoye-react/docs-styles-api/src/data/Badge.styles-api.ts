import type { BadgeFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const BadgeStylesApi: StylesApiData<BadgeFactory> = {
  selectors: {
    root: '根元素',
    section: '左侧和右侧区域',
    label: 'Badge 子元素',
  },

  vars: {
    root: {
      '--badge-bd': '控制 `border`',
      '--badge-bg': '控制 `background`',
      '--badge-color': '控制 text `color`',
      '--badge-dot-color': '控制 dot `color`, only applicable when `variant="dot"`',
      '--badge-fz': '控制 `font-size`',
      '--badge-height': '控制 `height`',
      '--badge-padding-x': '控制 horizontal `padding`',
      '--badge-radius': '控制 `border-radius`',
    },
  },

  modifiers: [
    { modifier: 'data-block', selector: 'root', condition: '设置了 `fullWidth` 属性' },
    { modifier: 'data-position', selector: 'section', value: '区块位置：左或右' },
  ],
};
