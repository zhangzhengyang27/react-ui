import type { MenubarFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const MenubarStylesApi: StylesApiData<MenubarFactory> = {
  selectors: {
    root: 'Root element with `role="menubar"`',
    target: '`Menubar.Target` top-level trigger button',
  },

  vars: {},

  modifiers: [
    {
      modifier: 'data-expanded',
      selector: 'target',
      condition: 'Associated menu is opened',
    },
  ],
};
