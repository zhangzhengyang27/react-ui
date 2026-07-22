import type { MenuFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';
import { PopoverStylesApi } from './Popover.styles-api';

export const MenuStylesApi: StylesApiData<MenuFactory> = {
  selectors: {
    ...PopoverStylesApi.selectors,
    divider: '`Menu.Divider` root 元素',
    label: '`Menu.Label` root 元素',
    item: '`Menu.Item` root 元素',
    itemLabel: 'Label of `Menu.Item`',
    itemSection: 'Left and right sections of `Menu.Item`',
    itemIndicator: 'Indicator slot of `Menu.CheckboxItem` and `Menu.RadioItem`',
    chevron: '子菜单箭头',
    search: '`Menu.Search` input 元素',
  },

  vars: {},

  modifiers: [
    {
      modifier: 'data-disabled',
      selector: 'item',
      condition: '在 `Menu.Item` 上设置了 `disabled` 属性',
    },
  ],
};
