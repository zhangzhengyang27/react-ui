import type { GridFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const GridStylesApi: StylesApiData<GridFactory> = {
  selectors: {
    root: '根元素',
    col: '`Grid.Col` root 元素',
  },

  vars: {
    root: {
      '--grid-cols': '控制 `grid-template-columns` 的列数',
      '--grid-gutter': '控制 `row-gap` 和 `column-gap`',
      '--grid-row-gap': '控制 `row-gap`',
      '--grid-column-gap': '控制 `column-gap`',
    },
  },

  modifiers: [{ modifier: 'data-grow', selector: 'root', condition: '设置了 `grow` 属性' }],
};
