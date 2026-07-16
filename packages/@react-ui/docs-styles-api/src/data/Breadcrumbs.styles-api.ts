import type { BreadcrumbsFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const BreadcrumbsStylesApi: StylesApiData<BreadcrumbsFactory> = {
  selectors: {
    root: '根元素',
    separator: '子元素之间的分隔符',
    breadcrumb: '面包屑项',
  },

  vars: {
    root: {
      '--bc-separator-margin': 'Control left and right `margin` of separator',
    },
  },
};
