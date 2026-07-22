import type { TreeFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const TreeStylesApi: StylesApiData<TreeFactory> = {
  selectors: {
    root: '根元素',
    node: 'Node element (li), contains label and subtree elements',
    subtree: 'Subtree element (ul)',
    label: 'Node label',
  },

  vars: {
    root: {
      '--level-offset': '控制 nested tree levels 的 offset',
    },
  },

  modifiers: [
    { modifier: 'data-selected', selector: ['node', 'label'], condition: 'The node is selected' },
    { modifier: 'data-hovered', selector: ['node', 'label'], condition: 'The node is hovered' },
    { modifier: 'data-level', selector: 'node', value: 'Nesting level of the node' },
  ],
};
