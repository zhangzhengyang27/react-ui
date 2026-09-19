import type { DialogFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const DialogStylesApi: StylesApiData<DialogFactory> = {
  selectors: {
    root: '根元素',
    header: '包含标题和关闭按钮',
    title: '标题元素（h2 标签），显示在 header 中',
    body: 'Dialog 主体，显示在 header 之后',
    content: '`Dialog.Content` 根元素',
    inner: '用于居中模态框的元素，固定定位，占据整个屏幕',
    close: '关闭按钮',
    overlay: '显示在 `Dialog.Content` 下方的遮罩层',
  },

  vars: {
    root: {
      '--dialog-size': 'Controls `width` of the dialog',
      '--dialog-radius': 'Controls `border-radius` of the dialog',
    },
  },
};
