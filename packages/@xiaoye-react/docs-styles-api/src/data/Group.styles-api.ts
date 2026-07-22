import type { GroupFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const GroupStylesApi: StylesApiData<GroupFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--group-align': '控制 `align-items` 属性',
      '--group-justify': '控制 `justify-content` 属性',
      '--group-gap': 'Controls `gap` property',
      '--group-wrap': 'Controls `flex-wrap` property',
      '--group-child-width':
        'Controls `max-width` of child elements, applied when grow prop is set and `preventGrowOverflow` is `true`',
    },
  },

  modifiers: [{ modifier: 'data-grow', selector: 'root', condition: '设置了 `grow` 属性' }],
};
