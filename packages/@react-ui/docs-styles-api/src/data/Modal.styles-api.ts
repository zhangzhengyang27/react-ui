import type { ModalFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const ModalStylesApi: StylesApiData<ModalFactory> = {
  selectors: {
    root: '根元素',
    inner: '用于居中模态框的元素，固定定位，占据整个屏幕',
    content: '`Modal.Content` 根元素',
    header: '包含标题和关闭按钮',
    overlay: '显示在 `Modal.Content` 下方的遮罩层',
    title: '模态框标题（h2 标签），显示在 header 中',
    body: '模态框主体，显示在 header 之后',
    close: '关闭按钮',
  },

  vars: {
    root: {
      '--modal-radius': '控制 `Modal.Content` 的 `border-radius`',
      '--modal-size': '控制 `Modal.Content` 的 `width`',
      '--modal-x-offset':
        '控制用于定位 `Modal.Content` 的内部元素的左右 `padding`',
      '--modal-y-offset':
        '控制用于定位 `Modal.Content` 的内部元素的上下 `padding`',
    },
  },

  modifiers: [
    { modifier: 'data-full-screen', selector: 'root', condition: '设置了 `fullScreen` 属性' },
    { modifier: 'data-centered', selector: 'root', condition: '设置了 `centered` 属性' },
  ],
};
