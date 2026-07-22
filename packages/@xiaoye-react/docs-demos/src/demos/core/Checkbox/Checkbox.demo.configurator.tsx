import { Checkbox, CheckboxProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Checkbox } from '@xiaoye-react/ui';


function Demo() {
  return (
    <Checkbox
      defaultChecked
      {{props}}
    />
  );
}
`;

export const configurator: UIDemo = {
  type: 'configurator',
  component: (props: CheckboxProps) => <Checkbox {...props} defaultChecked />,
  code,
  centered: true,
  controls: [
    {
      prop: 'labelPosition',
      type: 'segmented',
      data: [
        { value: 'right', label: '右' },
        { value: 'left', label: '左' },
      ],
      initialValue: 'right',
      libraryValue: 'right',
    },
    { prop: 'label', type: 'string', initialValue: '我同意出售我的隐私', libraryValue: '' },
    { prop: 'description', type: 'string', initialValue: '', libraryValue: '' },
    { prop: 'error', type: 'string', initialValue: '', libraryValue: '' },
    { prop: 'color', type: 'color', initialValue: 'blue', libraryValue: 'blue' },
    {
      prop: 'variant',
      type: 'segmented',
      data: [
        { value: 'filled', label: '填充' },
        { value: 'outline', label: '轮廓' },
      ],
      initialValue: 'filled',
      libraryValue: 'filled',
    },
    { prop: 'radius', type: 'size', initialValue: 'sm', libraryValue: 'sm' },
    { prop: 'size', type: 'size', initialValue: 'sm', libraryValue: 'sm' },
    { prop: 'disabled', type: 'boolean', initialValue: false, libraryValue: false },
    { prop: 'indeterminate', type: 'boolean', initialValue: false, libraryValue: false },
  ],
};
