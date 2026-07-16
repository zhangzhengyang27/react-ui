import type { DropzoneFactory, DropzoneFullScreenFactory } from '@react-ui/dropzone';
import type { StylesApiData } from '../types';

export const DropzoneStylesApi: StylesApiData<DropzoneFactory> = {
  selectors: {
    root: 'Dropzone root 元素',
    inner: 'Dropzone inner element (wraps children)',
  },

  vars: {
    root: {
      '--dropzone-accept-bg': 'Controls `background-color` when file is accepted',
      '--dropzone-reject-bg': 'Controls `background-color` when file is rejected',
      '--dropzone-accept-color': 'Controls `color` when file is accepted',
      '--dropzone-reject-color': 'Controls `color` when file is rejected',
      '--dropzone-radius': '控制 `border-radius`',
    },
  },

  modifiers: [
    {
      modifier: 'data-accept',
      selector: 'root',
      condition: 'Files that are dragged over the dropzone are accepted',
    },
    {
      modifier: 'data-reject',
      selector: 'root',
      condition: 'Files that are dragged over the dropzone are rejected',
    },
    { modifier: 'data-idle', selector: 'root', condition: 'Dropzone is idle' },
    { modifier: 'data-loading', selector: 'root', condition: '设置了 `loading` 属性' },
    { modifier: 'data-disabled', selector: 'root', condition: '设置了 `disabled` 属性' },
    {
      modifier: 'data-activate-on-click',
      selector: 'root',
      condition: '`activateOnClick` prop is `true`',
    },
  ],
};

export const DropzoneFullScreenStylesApi: StylesApiData<DropzoneFullScreenFactory> = {
  selectors: {
    fullScreen: 'Dropzone.Fullscreen root 元素',
    ...DropzoneStylesApi.selectors,
  },

  vars: {},
};
