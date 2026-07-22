import type { AlertFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const AlertStylesApi: StylesApiData<AlertFactory> = {
  selectors: {
    root: '根元素',
    wrapper: 'Wrapper around `body` and `icon`',
    body: 'Body element, contains `title` and `message`',
    title: 'Title element, contains `label` and `icon`',
    label: 'Title label',
    message: 'Alert message',
    icon: '图标元素',
    closeButton: '关闭按钮',
  },

  vars: {
    root: {
      '--alert-bd': '控制 `border`',
      '--alert-bg': '控制 `background`',
      '--alert-color': '控制 `color`',
      '--alert-radius': '控制 `border-radius`',
    },
  },

  modifiers: [
    {
      modifier: 'data-with-close-button',
      selector: 'title',
      condition: '设置了 `withCloseButton` 属性',
    },
  ],
};
