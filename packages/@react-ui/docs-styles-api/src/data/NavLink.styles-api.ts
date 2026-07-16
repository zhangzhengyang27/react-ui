import type { NavLinkFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const NavLinkStylesApi: StylesApiData<NavLinkFactory> = {
  selectors: {
    root: '根元素',
    body: '包含标签和描述',
    section: '左侧和右侧区域',
    label: 'NavLink 标签',
    description: '标签下方显示的暗淡描述',
    children: '嵌套链接的包装器',
    chevron: '默认 chevron 图标',
    collapse: 'Nested links Collapse 容器',
  },

  vars: {
    root: {
      '--nl-bg': '控制 link `background-color`',
      '--nl-color': '控制 link `color`',
      '--nl-hover': '控制 link `background-color` when hovered',
    },

    children: {
      '--nl-offset': '控制嵌套链接偏移',
    },
  },

  modifiers: [{ modifier: 'data-active', selector: 'root', condition: '设置了 `active` 属性' }],
};
