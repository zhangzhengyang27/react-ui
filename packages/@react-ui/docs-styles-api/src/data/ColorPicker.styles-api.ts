import type { ColorPickerFactory, ColorSliderFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const ColorPickerStylesApi: StylesApiData<ColorPickerFactory> = {
  selectors: {
    wrapper: '根元素',
    preview: 'Color preview, displayed only when `format` supports alpha channel',
    body: 'Contains alpha/hue sliders and color preview',
    slider: 'Alpha and hue sliders root',
    sliderOverlay: 'Element used to display various overlays over hue and alpha sliders',
    saturation: 'Saturation picker',
    saturationOverlay: 'Element used to display various overlays over saturation picker',
    sliders: 'Contains alpha and hue sliders',
    thumb: 'Thumb of all sliders',
    swatch: 'Color swatch',
    swatches: 'Color swatches list',
  },

  vars: {
    wrapper: {
      '--cp-body-spacing': 'Controls spacing between sliders and saturation',
      '--cp-preview-size': '控制 the preview swatch 的 size',
      '--cp-width': 'Controls `width` of the root 元素',
      '--cp-swatch-size': '控制 swatch `width` and `height`',
      '--cp-thumb-size': '控制 thumb `width` and `height` in all sliders and saturation picker',
      '--cp-saturation-height': 'Controls `height` of the saturation picker',
    },
  },
};

export const HueSliderStylesApi: StylesApiData<ColorSliderFactory> = {
  selectors: {
    slider: '根元素',
    sliderOverlay: 'Element used to display various overlays over hue slider',
    thumb: 'Thumb of the hue slider',
  },

  vars: {},
};

export const AlphaSliderStylesApi: StylesApiData<ColorSliderFactory> = HueSliderStylesApi;
