import type { ContainerFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const ContainerStylesApi: StylesApiData<ContainerFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--container-size': '控制 container `max-width`',
    },
  },
};
