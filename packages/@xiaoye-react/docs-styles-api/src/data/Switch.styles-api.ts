import type { SwitchFactory, SwitchGroupFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';
import { InputWrapperStylesApi } from './Input.styles-api';

export const SwitchStylesApi: StylesApiData<SwitchFactory> = {
  selectors: {
    root: '根元素',
    input: 'Input element (`input[type="checkbox"]`), hidden by default',
    track: 'Switch 轨道，包含 `thumb`、`onLabel` 和 `offLabel`',
    thumb: '`track` 内显示的滑块',
    body: '包含 `label`、`description` 和 `error` 的元素',
    label: '标签元素',
    description: '`label` 下方显示的描述',
    error: '`label` 下方显示的错误信息',
    onLabel: '选中时显示在 `track` 内的标签',
    offLabel: '未选中时显示在 `track` 内的标签',
  },

  vars: {
    root: {
      '--switch-width': '控制 `track` 的 min-width',
      '--switch-height': '控制 `track` 的 height',
      '--switch-thumb-size': '控制 `thumb` 的 width and height',
      '--switch-thumb-offset': '控制 `thumb` 与 `track` 边缘的偏移',
      '--switch-label-font-size': 'Controls `font-size` of `onLabel` and `offLabel`',
      '--switch-color': '控制 track `background-color` when input is checked',
      '--switch-on-label-offset': '控制 `onLabel` 的 `left` 偏移',
      '--switch-off-label-offset': '控制 `offLabel` 的 `right` 偏移',
    },
  },

  modifiers: [
    { modifier: 'data-checked', selector: ['root', 'track'], condition: '设置了 `checked` 属性' },
    { modifier: 'data-disabled', selector: 'root', condition: '设置了 `disabled` 属性' },
    { modifier: 'data-with-labels', selector: 'root', condition: '设置了 `onLabel` 或 `offLabel`' },
    { modifier: 'data-error', selector: ['root', 'track'], condition: '设置了 `error` 属性' },
  ],
};

export const SwitchGroupStylesApi: StylesApiData<SwitchGroupFactory> = {
  selectors: {
    ...InputWrapperStylesApi.selectors,
  },

  vars: {},
};
