import type { SplitterFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const SplitterStylesApi: StylesApiData<SplitterFactory> = {
  selectors: {
    root: '根元素',
    panel: '面板元素（`Splitter.Panel` 组件）',
    resizer: '面板之间的拖拽手柄，即分隔线本身',
  },

  vars: {},

  modifiers: [
    {
      modifier: 'data-orientation',
      selector: ['root', 'panel', 'resizer'],
      value: '`orientation` 属性的值',
    },
  ],
};
