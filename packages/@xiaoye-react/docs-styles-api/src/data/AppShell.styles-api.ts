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
      '--app-shell-transition-duration': '控制 all children 的 transition duration',
      '--app-shell-transition-timing-function':
        'Controls transition timing function of all children',
    },
  },

  modifiers: [
    { modifier: 'data-resizing', selector: 'root', condition: 'User is resizing the window' },
    { modifier: 'data-layout', selector: 'root', value: 'Value of the `layout` prop' },
    { modifier: 'data-disabled', selector: 'root', condition: '设置了 `disabled` 属性' },
    {
      modifier: 'data-with-border',
      selector: ['navbar', 'header', 'aside', 'footer'],
      condition: '`withBorder` prop is set either on the `AppShell` or on the associated 组件',
    },
  ],
};
