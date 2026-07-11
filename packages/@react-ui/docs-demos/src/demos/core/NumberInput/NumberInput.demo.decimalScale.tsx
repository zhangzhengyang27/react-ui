import { NumberInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { NumberInput } from '@react-ui/ui';

function Demo() {
  return (
    <NumberInput
      label="You can enter only 2 digits after decimal point"
      placeholder="Do not enter more than 2"
      decimalScale={2}
    />
  );
}
`;

function Demo() {
  return (
    <NumberInput
      label="You can enter only 2 digits after decimal point"
      placeholder="Do not enter more than 2"
      decimalScale={2}
    />
  );
}

export const decimalScale: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
