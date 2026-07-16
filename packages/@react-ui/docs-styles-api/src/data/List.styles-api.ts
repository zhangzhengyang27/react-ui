import type { ListFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const ListStylesApi: StylesApiData<ListFactory> = {
  selectors: {
    root: '根元素',
    item: 'ListItem root 元素',
    itemIcon: 'ListItem 图标',
    itemLabel: 'ListItem 内容',
    itemWrapper: 'ListItem wrapper element, container, icon and content',
  },

  vars: {
    root: {
      '--list-fz': '控制 `font-size`',
      '--list-lh': '控制 `line-height`',
      '--list-spacing': '控制项之间的间距',
    },
  },

  modifiers: [
    { modifier: 'data-with-padding', selector: 'root', condition: '设置了 `withPadding` 属性' },
    {
      modifier: 'data-centered',
      selector: 'item',
      condition: '`center` prop is set on List 组件',
    },
    {
      modifier: 'data-with-icon',
      selector: 'item',
      condition: '`icon` prop is set on ListItem 组件',
    },
  ],
};
