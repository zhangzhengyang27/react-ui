import type { InputFactory, InputWrapperFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const InputStylesApi: StylesApiData<InputFactory> = {
  selectors: {
    wrapper: 'Input 的根元素',
    input: '输入元素',
    section: '左侧和右侧区域',
    bottomSection: '底部区域元素，渲染在输入框底部边框内',
  },

  vars: {
    wrapper: {
      '--input-fz': '输入元素的 `font-size`',
      '--input-height':
        '输入元素的 `height` 或 `min-height`（取决于 `multiline` 属性）',
      '--input-left-section-width': '左侧区域的 `width`',
      '--input-right-section-width': '右侧区域的 `width`',
      '--input-margin-bottom':
        '输入元素的 `margin-bottom`，通常由 `Input.Wrapper` 控制',
      '--input-margin-top':
        '输入元素的 `margin-top`，通常由 `Input.Wrapper` 控制',
      '--input-padding-y': '输入元素的 `padding-top` 和 `padding-bottom`',
      '--input-radius': '输入元素的 `border-radius`',
      '--input-left-section-pointer-events': '控制左侧区域的 `pointer-events`',
      '--input-right-section-pointer-events': '控制右侧区域的 `pointer-events`',
    },
  },

  modifiers: [
    { modifier: 'data-error', selector: ['wrapper', 'input'], condition: '设置了 `error` 属性' },
    {
      modifier: 'data-success',
      selector: ['wrapper', 'input'],
      condition: '设置了 `success` 属性且未设置 `error`',
    },
    { modifier: 'data-disabled', selector: 'input', condition: '设置了 `disabled` 属性' },
    {
      modifier: 'data-with-right-section',
      selector: 'wrapper',
      condition: '设置了 `rightSection` 属性',
    },
    {
      modifier: 'data-with-left-section',
      selector: 'wrapper',
      condition: '设置了 `leftSection` 属性',
    },
    { modifier: 'data-multiline', selector: 'wrapper', condition: '设置了 `multiline` 属性' },
    { modifier: 'data-pointer', selector: 'wrapper', condition: '设置了 `pointer` 属性' },
    { modifier: 'data-position', selector: 'section', value: '区域位置：左侧或右侧' },
  ],
};

export const InputWrapperStylesApi: StylesApiData<InputWrapperFactory> = {
  selectors: {
    root: '根元素',
    label: '标签元素',
    required: '必填星号元素，渲染在标签内',
    description: '描述元素',
    error: '错误元素',
    success: '成功元素',
  },

  vars: {
    label: {
      '--input-label-size': '控制标签的 `font-size`',
      '--input-asterisk-color': '控制标签星号文本的 `color`',
    },

    error: {
      '--input-error-size': '控制错误文本的 `font-size`',
    },

    success: {
      '--input-success-size': '控制成功文本的 `font-size`',
    },

    description: {
      '--input-description-size': '控制描述文本的 `font-size`',
    },
  },
};
