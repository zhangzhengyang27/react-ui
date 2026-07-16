import type { DrawerFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const DrawerStylesApi: StylesApiData<DrawerFactory> = {
  selectors: {
    root: '根元素',
    inner: '用于居中模态框的元素，固定定位，占据整个屏幕',
    content: '`Drawer.Content` 根元素',
    header: '包含标题和关闭按钮',
    overlay: '显示在 `Drawer.Content` 下方的遮罩层',
    title: 'Drawer 标题（h2 标签），显示在 header 中',
    body: 'Drawer 主体，显示在 header 之后',
    close: '关闭按钮',
  },

  vars: {
    root: {
      '--drawer-offset': '控制 `Drawer.Content` 的 `margin`',
      '--drawer-size': '控制 `Drawer.Content` 的 `width`',
      '--drawer-flex': '控制 `Drawer.Content` 的 `flex` 属性',
      '--drawer-align': '控制 `Drawer.Content` 的 `align-items` 属性',
      '--drawer-justify': '控制 `Drawer.Content` 的 `justify-content` 属性',
      '--drawer-height': '控制 `Drawer.Content` 的 `height` 属性',
    },
  },
};
