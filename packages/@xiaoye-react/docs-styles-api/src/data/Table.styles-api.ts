import type { TableFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const TableStylesApi: StylesApiData<TableFactory> = {
  selectors: {
    root: '根 `table` 元素（`Table` component）',
    thead: '`thead` 元素（`Table.Thead` component）',
    tbody: '`tbody` 元素（`Table.Tbody` component）',
    tfoot: '`tfoot` 元素（`Table.Tfoot` component）',
    tr: '`tr` 元素（`Table.Tr` component）',
    th: '`th` 元素（`Table.Th` component）',
    td: '`td` 元素（`Table.Td` component）',
    caption: '`caption` 元素（`Table.Caption` component）',
  },

  vars: {
    root: {
      '--table-horizontal-spacing':
        'Controls `padding-left` and `padding-right` of `Table.Th` and `Table.Td` elements',
      '--table-vertical-spacing':
        'Controls `padding-top` and `padding-bottom` of `Table.Td` and `Table.Th` elements',
      '--table-caption-side': '控制 caption-side of the table element, `bottom` by default',
    },
  },

  modifiers: [
    {
      modifier: 'data-striped',
      selector: 'root',
      condition: '`striped` prop is set on `Table` 组件',
    },
    {
      modifier: 'data-highlight-on-hover',
      selector: 'root',
      condition: '`highlightOnHover` prop is set on `Table` 组件',
    },
    {
      modifier: 'data-with-table-border',
      selector: 'root',
      condition: '`withTableBorder` prop is set on `Table` 组件',
    },
    {
      modifier: 'data-with-column-borders',
      selector: 'root',
      condition: '`withColumnsBorder` prop is set on `Table` 组件',
    },
    {
      modifier: 'data-with-row-borders',
      selector: 'root',
      condition: '`withRowsBorder` prop is set on `Table` 组件',
    },
  ],
};
