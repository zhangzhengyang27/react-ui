import type { FloatingIndicatorFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const FloatingIndicatorStylesApi: StylesApiData<FloatingIndicatorFactory> = {
  selectors: {
    root: '指示器元素，动画匹配目标位置和大小',
  },

  vars: {
    root: {
      '--transition-duration': '控制指示器过渡持续时间',
    },
  },

  modifiers: [
    {
      modifier: 'data-initialized',
      selector: 'root',
      condition: '指示器已初始化且过渡已启用',
    },
    {
      modifier: 'data-hidden',
      selector: 'root',
      condition: 'Indicator is hidden (when displayAfterTransitionEnd is true)',
    },
  ],
};
