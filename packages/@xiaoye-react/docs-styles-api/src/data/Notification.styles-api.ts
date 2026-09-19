import type { NotificationFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const NotificationStylesApi: StylesApiData<NotificationFactory> = {
  selectors: {
    root: '根元素',
    icon: '图标组件，仅在设置 `icon` 属性时显示',
    body: 'Notification body，包含所有其他元素',
    title: '标题元素，仅在设置 `title` 属性时显示',
    description: '标题下方显示的描述',
    closeButton: '关闭按钮元素',
  },

  vars: {
    root: {
      '--notification-radius': '控制 `border-radius`',
      '--notification-color': 'Controls icon color or notification line color',
    },
  },

  modifiers: [
    { modifier: 'data-with-icon', selector: 'root', condition: '设置了 `icon` 属性' },
    { modifier: 'data-with-border', selector: 'root', condition: '设置了 `withBorder` 属性' },
    { modifier: 'data-with-title', selector: 'description', condition: '设置了 `title` 属性' },
  ],
};
