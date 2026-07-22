import { Switch } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Switch } from '@xiaoye-react/ui';


function Demo() {
  return (
    <Switch
      defaultChecked
      {{props}}
    />
  );
}
`;

export const configurator: UIDemo = {
  type: 'configurator',
  component: (props: any) => <Switch defaultChecked {...props} />,
  code,
  centered: true,
  controls: [
    { prop: 'color', type: 'color', initialValue: 'blue', libraryValue: 'blue' },
    { prop: 'withThumbIndicator', type: 'boolean', initialValue: true, libraryValue: true },
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
    { prop: 'size', type: 'size', initialValue: 'sm', libraryValue: 'sm' },
    { prop: 'radius', type: 'size', initialValue: 'xl', libraryValue: 'xl' },
    { prop: 'disabled', type: 'boolean', initialValue: false, libraryValue: false },
  ],
};
