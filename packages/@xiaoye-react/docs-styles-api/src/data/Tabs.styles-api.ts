import type { TabsFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const TabsStylesApi: StylesApiData<TabsFactory> = {
  selectors: {
    root: '`Tabs` 组件的根元素',
    list: '标签页列表（`Tabs.List` 组件）',
    panel: '带标签页内容的面板（`Tabs.Panel` 组件）',
    tab: '标签页按钮（`Tabs.Tab` 组件）',
    tabSection: '`Tabs.Tab` 的左右区域',
  },

  vars: {
    root: {
      '--tabs-radius': '控制 `Tabs.Tab` 的 `border-radius`',
      '--tabs-color':
        '控制 `Tabs.Tab` 的颜色，仅在 variant 为 `pills` 或 `default` 时适用',
      '--tabs-bg': '控制 `pills` 变体下选中 `Tabs.Tab` 的 `background`',
      '--tabs-bd': '控制 `outline`/`default` 变体下 `Tabs.Tab` 的 `border-color`',
    },
  },

  modifiers: [
    {
      modifier: 'data-orientation',
      selector: ['root', 'tab', 'list', 'panel'],
      value: '`orientation` 属性的值',
    },
    {
      modifier: 'data-placement',
      selector: ['root', 'tab', 'list'],
      value: 'placement 属性的值',
      condition: '`Tabs` 组件的 `orientation` 属性值为 "vertical"',
    },
    {
      modifier: 'data-inverted',
      selector: ['tab', 'list'],
      condition: '`Tabs` 组件设置了 `inverted` 属性',
    },
    {
      modifier: 'data-grow',
      selector: ['list'],
      condition: '`Tabs.List` 组件设置了 `grow` 属性',
    },
    {
      modifier: 'data-position',
      selector: ['tabSection'],
      value: '区域位置：左侧或右侧',
    },
  ],
};
