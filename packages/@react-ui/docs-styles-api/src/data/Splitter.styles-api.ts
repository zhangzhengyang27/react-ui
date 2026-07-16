import type { SplitterFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const SplitterStylesApi: StylesApiData<SplitterFactory> = {
  selectors: {
    root: '根元素',
    pane: 'Pane element (`Splitter.Pane` component)',
    handle: 'Handle element between panes, contains the separator line and the thumb',
    thumb: 'Thumb element inside the handle, contains the grip icon',
  },

  vars: {
    root: {
      '--splitter-line-size': '控制 the separator line between panes 的 the thickness',
      '--splitter-handle-color': '控制 the separator line between panes 的 the color',
    },
  },

  modifiers: [
    {
      modifier: 'data-orientation',
      selector: ['root', 'handle', 'thumb'],
      value: '`orientation` 属性的值',
    },
    {
      modifier: 'data-active',
      selector: ['handle', 'thumb'],
      condition: '手柄正在被拖动',
    },
    {
      modifier: 'data-collapsed',
      selector: 'pane',
      condition: '窗格已折叠',
    },
  ],
};
