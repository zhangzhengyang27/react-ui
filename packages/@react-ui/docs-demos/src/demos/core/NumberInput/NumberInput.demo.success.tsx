import { NumberInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { NumberInput } from '@react-ui/ui';

function Demo() {
  return <NumberInput label="Number Input" placeholder="Number Input" success="Looks good!" />;
}
`;

function Demo() {
  return <NumberInput label="Number Input" placeholder="Number Input" success="Looks good!" />;
}

export const success: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
