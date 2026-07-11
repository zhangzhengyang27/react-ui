import { Radio } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Radio } from '@react-ui/ui';

function Demo() {
  return (
    <Radio
      iconColor="dark.8"
      color="lime.4"
      label="Custom icon color"
      name="check"
      value="check"
      defaultChecked
    />
  );
}
`;

function Demo() {
  return (
    <Radio
      iconColor="dark.8"
      color="lime.4"
      label="Custom icon color"
      name="check"
      value="check"
      defaultChecked
    />
  );
}

export const iconColor: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
