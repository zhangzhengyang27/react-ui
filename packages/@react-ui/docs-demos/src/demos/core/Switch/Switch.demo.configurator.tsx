import { Switch } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Switch } from '@react-ui/ui';


function Demo() {
  return (
    <Switch
      defaultChecked
      {{props}}
    />
  );
}
`;

export const configurator: MantineDemo = {
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
        { value: 'right', label: 'Right' },
        { value: 'left', label: 'Left' },
      ],
      initialValue: 'right',
      libraryValue: 'right',
    },
    { prop: 'label', type: 'string', initialValue: 'I agree to sell my privacy', libraryValue: '' },
    { prop: 'description', type: 'string', initialValue: '', libraryValue: '' },
    { prop: 'error', type: 'string', initialValue: '', libraryValue: '' },
    { prop: 'size', type: 'size', initialValue: 'sm', libraryValue: 'sm' },
    { prop: 'radius', type: 'size', initialValue: 'xl', libraryValue: 'xl' },
    { prop: 'disabled', type: 'boolean', initialValue: false, libraryValue: false },
  ],
};
