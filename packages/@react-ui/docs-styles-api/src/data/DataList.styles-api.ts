import type { DataListFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const DataListStylesApi: StylesApiData<DataListFactory> = {
  selectors: {
    root: '根 `dl` 元素',
    item: 'DataList.Item root 元素',
    itemLabel: 'DataList.ItemLabel `dt` 元素',
    itemValue: 'DataList.ItemValue `dd` 元素',
  },

  vars: {
    root: {
      '--data-list-fz': '控制 `font-size`',
      '--data-list-lh': '控制 `line-height`',
      '--data-list-gap': '控制项之间的间距',
      '--data-list-label-width': 'Controls `min-width` of `DataList.ItemLabel`',
    },
  },

  modifiers: [
    {
      modifier: 'data-orientation',
      selector: 'root',
      value: '`orientation` 属性的值',
    },
    {
      modifier: 'data-with-divider',
      selector: 'root',
      condition: '设置了 `withDivider` 属性',
    },
  ],
};
