import type { ComboboxFactory, ComboboxLikeStylesNames } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const ComboboxStylesApi: StylesApiData<ComboboxFactory> = {
  selectors: {
    options: '`Combobox.Options` 组件',
    dropdown: '`Combobox.Dropdown` 组件',
    option: '`Combobox.Option` 组件',
    search: '`Combobox.Search` 输入框',
    empty: '`Combobox.Empty` 组件',
    header: '`Combobox.Header` 组件',
    footer: '`Combobox.Footer` 组件',
    group: '`Combobox.Group` 组件',
    groupLabel: '`Combobox.Group` 组件的标签',
  },

  vars: {
    dropdown: {
      '--combobox-option-fz': '控制选项的 `font-size`',
      '--combobox-option-padding': '控制选项的 `padding`',
      '--combobox-padding': '控制下拉框的 `padding`',
    },

    options: {
      '--combobox-option-fz': '控制选项的 `font-size`',
      '--combobox-option-padding': '控制选项的 `padding`',
    },
  },

  modifiers: [
    { modifier: 'data-combobox-selected', selector: 'option', condition: '选项被选中' },
    { modifier: 'data-combobox-active', selector: 'option', condition: '设置了 `active` 属性' },
    { modifier: 'data-combobox-disabled', selector: 'option', condition: '设置了 `disabled` 属性' },
    { modifier: 'data-hidden', selector: 'dropdown', condition: '设置了 `hidden` 属性' },
  ],
};

export const ComboboxLikeSelectors: Record<ComboboxLikeStylesNames, string> = {
  dropdown: '下拉框根元素',
  options: '选项包装器',
  option: '选项',
  empty: '无匹配结果消息',
  group: '选项分组包装器',
  groupLabel: '选项分组标签',
};
