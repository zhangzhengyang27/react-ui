import type { SwitchFactory, SwitchGroupFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';
import { InputWrapperStylesApi } from './Input.styles-api';

export const SwitchStylesApi: StylesApiData<SwitchFactory> = {
  selectors: {
    root: '根元素',
    track: 'Switch track, contains `thumb` and `trackLabel`',
    trackLabel: '`track` 内显示的标签',
    thumb: '`track` 内显示的滑块',
    input: 'Input element (`input[type="checkbox"]`), hidden by default',
    body: 'Input body，包含所有其他元素',
    labelWrapper: 'Contains `label`, `description` and `error`',
    label: '标签元素',
    description: '标签下方显示的描述',
    error: '标签下方显示的错误信息',
  },

  vars: {
    root: {
      '--switch-radius': 'Controls `border-radius` of `track` and `thumb`',
      '--switch-height': '控制 `track` 的 height',
      '--switch-width': '控制 `track` 的 min-width',
      '--switch-thumb-size': '控制 `thumb` 的 width and height',
      '--switch-label-font-size': 'Controls `font-size` of `trackLabel`',
      '--switch-track-label-padding': 'Controls `trackLabel` offset',
      '--switch-color': '控制 track `background-color` when input is checked',
    },
  },

  modifiers: [
    { modifier: 'data-error', selector: 'track', condition: '设置了 `error` 属性' },
    {
      modifier: 'data-label-position',
      selector: ['track', 'root'],
      value: '`labelPosition` 属性的值',
    },
    { modifier: 'data-disabled', selector: 'label', condition: '设置了 `disabled` 属性' },
  ],
};

export const SwitchGroupStylesApi: StylesApiData<SwitchGroupFactory> = {
  selectors: {
    ...InputWrapperStylesApi.selectors,
  },

  vars: {},
};
