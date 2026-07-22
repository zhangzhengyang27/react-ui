import { ConfiguratorControlOptions } from '@xiaoye-react/demo';

export const inputOnlyControls: ConfiguratorControlOptions[] = [
  {
    type: 'segmented',
    prop: 'variant',
    data: ['default', 'filled', 'unstyled'],
    initialValue: 'default',
    libraryValue: 'default',
  },
  { type: 'size', prop: 'size', initialValue: 'sm', libraryValue: 'sm' },
  { type: 'size', prop: 'radius', initialValue: 'md', libraryValue: 'md' },
  { type: 'boolean', prop: 'disabled', initialValue: false, libraryValue: false },
  { type: 'boolean', prop: 'error', initialValue: false, libraryValue: false },
];

export const inputWrapperOnlyControls: ConfiguratorControlOptions[] = [
  { type: 'string', prop: 'label', initialValue: '输入标签', libraryValue: null },
  { type: 'boolean', prop: 'withAsterisk', initialValue: false, libraryValue: false },
  { type: 'string', prop: 'description', initialValue: '输入描述', libraryValue: null },
  { type: 'string', prop: 'error', initialValue: '输入错误', libraryValue: null },
  { type: 'size', prop: 'size', initialValue: 'sm', libraryValue: 'sm' },
];

export const inputControls: ConfiguratorControlOptions[] = [
  {
    type: 'segmented',
    prop: 'variant',
    data: ['default', 'filled', 'unstyled'],
    initialValue: 'default',
    libraryValue: 'default',
  },
  { type: 'size', prop: 'size', initialValue: 'sm', libraryValue: 'sm' },
  { type: 'size', prop: 'radius', initialValue: 'md', libraryValue: 'md' },
  { type: 'string', prop: 'label', initialValue: '输入标签', libraryValue: '' },
  { type: 'boolean', prop: 'withAsterisk', initialValue: false, libraryValue: false },
  { type: 'string', prop: 'description', initialValue: '输入描述', libraryValue: '' },
  { type: 'string', prop: 'error', initialValue: '', libraryValue: '' },
];
