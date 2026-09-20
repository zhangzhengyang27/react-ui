import type { AppShellFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const AppShellStylesApi: StylesApiData<AppShellFactory> = {
  selectors: {
    root: '根元素（`AppShell` component）',
    navbar: '`AppShell.Navbar` root 元素',
    header: '`AppShell.Header` root 元素',
    main: '`AppShell.Main` root 元素',
    aside: '`AppShell.Aside` root 元素',
    footer: '`AppShell.Footer` root 元素',
  },

  vars: {
    root: {
      '--app-shell-padding': '控制 `main` 的 padding（来自 `padding` 属性）',
      '--app-shell-header-height': '控制 `header` 的 height（来自 `header.height`）',
      '--app-shell-footer-height': '控制 `footer` 的 height（来自 `footer.height`）',
      '--app-shell-navbar-width':
        '控制 `navbar` 宽度与 grid 轨道（来自 `navbar.width`，支持按断点分级）',
      '--app-shell-aside-width':
        '控制 `aside` 宽度与 grid 轨道（来自 `aside.width`，支持按断点分级）',
    },
  },

  modifiers: [
    { modifier: 'data-with-header', selector: 'root', condition: '设置了 `header` 属性' },
    {
      modifier: 'data-with-navbar',
      selector: 'root',
      condition: '设置了 `navbar` 且在所有断点上都未折叠',
    },
    {
      modifier: 'data-with-aside',
      selector: 'root',
      condition: '设置了 `aside` 且在所有断点上都未折叠',
    },
    { modifier: 'data-with-footer', selector: 'root', condition: '设置了 `footer` 属性' },
    { modifier: 'data-fixed', selector: 'root', condition: '设置了 `fixed` 属性' },
    {
      modifier: 'data-collapsed',
      selector: ['navbar', 'aside'],
      condition: '`collapsed` 在该断点为真（逐断点折叠时改由 `--app-shell-*-width` 表达）',
    },
  ],
};
