import { Checkbox } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Checkbox } from '@react-ui/ui';

function Demo() {
  return (
    <Checkbox
      defaultChecked
      color="lime.4"
      iconColor="dark.8"
      size="md"
      label="Bright lime checkbox"
    />
  );
}
`;

function Demo() {
  return (
    <Checkbox
      defaultChecked
      color="lime.4"
      iconColor="dark.8"
      size="md"
      label="Bright lime checkbox"
    />
  );
}

export const iconColor: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
