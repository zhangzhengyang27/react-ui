import type { ColorInputFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';
import { ColorPickerStylesApi } from './ColorPicker.styles-api';
import { InputStylesApi, InputWrapperStylesApi } from './Input.styles-api';

export const ColorInputStylesApi: StylesApiData<ColorInputFactory> = {
  selectors: {
    ...InputStylesApi.selectors,
    ...InputWrapperStylesApi.selectors,
    ...ColorPickerStylesApi.selectors,
    dropdown: 'Popover 下拉框',
    colorPreview: '输入左侧区域的颜色预览',
    eyeDropperButton: '取色器按钮',
    eyeDropperIcon: '默认取色器图标',
  },

  vars: {
    colorPreview: {
      '--ci-preview-size': 'Controls `width` and `height` of color preview',
    },

    eyeDropperButton: {
      '--ci-button-size': 'Controls `width` and `height` of the eye dropper button',
    },

    eyeDropperIcon: {
      '--ci-eye-dropper-icon-size': '控制 the eye dropper icon 的 width and height',
    },
  },
};
