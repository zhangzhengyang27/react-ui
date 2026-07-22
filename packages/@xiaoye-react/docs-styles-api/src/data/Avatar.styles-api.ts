import type { AvatarFactory, AvatarGroupFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const AvatarStylesApi: StylesApiData<AvatarFactory> = {
  selectors: {
    root: '根元素',
    image: '`img` 元素',
    placeholder: 'Avatar placeholder, displayed when the image cannot be loaded',
  },

  vars: {
    root: {
      '--avatar-bd': '控制 placeholder `border`',
      '--avatar-bg': '控制 placeholder `background`',
      '--avatar-color': '控制 placeholder text `color`',
      '--avatar-size': 'Controls `width`, `min-width` and `height`',
      '--avatar-radius': '控制 `border-radius`',
    },
  },
};

export const AvatarGroupStylesApi: StylesApiData<AvatarGroupFactory> = {
  selectors: {
    group: '根元素',
  },

  vars: {
    group: {
      '--ag-spacing': 'Controls negative spacing between avatars',
    },
  },
};
