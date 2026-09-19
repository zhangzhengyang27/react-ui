import type { NavLinkFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const NavLinkStylesApi: StylesApiData<NavLinkFactory> = {
  selectors: {
    root: '根元素',
    inner: '包含 `section`、`body` 和 chevron 的包装器',
    body: '包含标签和描述',
    section: '左侧和右侧区域',
    label: 'NavLink 标签',
    description: '标签下方显示的暗淡描述',
    children: '嵌套链接的包装器',
    chevron: '默认 chevron 图标',
  },

  vars: {
    root: {
      '--navlink-color': '控制 link `color`',
      '--navlink-bg': '控制 link `background-color`',
      '--navlink-hover': '控制 link `background-color` when hovered',
    },
  },

  modifiers: [{ modifier: 'data-active', selector: 'root', condition: '设置了 `active` 属性' }],
};
