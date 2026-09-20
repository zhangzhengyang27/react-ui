import type { SplitterFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const SplitterStylesApi: StylesApiData<SplitterFactory> = {
  selectors: {
    root: '根元素',
    panel: '面板元素（`Splitter.Panel` 组件）',
    resizer: '面板之间的拖拽手柄，即分隔线本身',
  },

  vars: {
    root: {
      '--splitter-line-size': '分隔条的粗细（水平方向为 width，垂直方向为 height），由 `lineSize` 属性写入',
    },
  },

  modifiers: [
    {
      modifier: 'data-orientation',
      selector: ['root', 'panel', 'resizer'],
      value: '`orientation` 属性的值',
    },
    {
      modifier: 'data-active',
      selector: 'resizer',
      condition: '该分隔条正在被拖拽',
    },
  ],
};
