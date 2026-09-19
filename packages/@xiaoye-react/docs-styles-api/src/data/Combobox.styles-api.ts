import type { ComboboxStylesNames } from '@xiaoye-react/ui';
import type { Modifier } from '../types';

/** `Combobox` 是复合组件，其 factory 未声明 `stylesNames`/`vars`，
 *  `StylesApiData` 无法承载 selectors，故此处直接按真实的 `ComboboxStylesNames` 校验 */
export const ComboboxStylesApi: {
  selectors: Record<ComboboxStylesNames, string>;
  vars: {
    dropdown: Record<'--combobox-radius' | '--combobox-shadow' | '--combobox-max-height', string>;
  };
  modifiers: Modifier<'option'>[];
} = {
  selectors: {
    options: '`Combobox.Options` 组件',
    dropdown: '`Combobox.Dropdown` 组件',
    option: '`Combobox.Option` 组件',
    optionLabel: '`Combobox.Option` 的标签样式名，当前渲染未使用',
    empty: '`Combobox.Empty` 组件',
    header: '`Combobox.Header` 组件',
    footer: '`Combobox.Footer` 组件',
    group: '`Combobox.Group` 组件',
    groupLabel: '`Combobox.Group` 组件的标签',
  },

  vars: {
    dropdown: {
      '--combobox-radius': '控制下拉框的 `border-radius`',
      '--combobox-shadow': '控制下拉框的 `box-shadow`',
      '--combobox-max-height': '控制下拉框的 `max-height`',
    },
  },

  modifiers: [
    { modifier: 'data-combobox-selected', selector: 'option', condition: '选项被选中' },
    { modifier: 'data-combobox-active', selector: 'option', condition: '设置了 `active` 属性' },
    { modifier: 'data-combobox-disabled', selector: 'option', condition: '设置了 `disabled` 属性' },
  ],
};

/** `Autocomplete`/`Select`/`MultiSelect`/`TagsInput`/`TreeSelect` 等组件共用的 Combobox 下拉选择器 */
export const ComboboxLikeSelectors: Pick<
  Record<ComboboxStylesNames, string>,
  'dropdown' | 'options' | 'option' | 'empty' | 'group' | 'groupLabel'
> = {
  dropdown: '下拉框根元素',
  options: '选项包装器',
  option: '选项',
  empty: '无匹配结果消息',
  group: '选项分组包装器',
  groupLabel: '选项分组标签',
};
