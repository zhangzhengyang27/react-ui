import { PinInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { PinInput } from '@react-ui/ui';

function Demo() {
  return <PinInput type={/^[0-3]*$/} inputType="tel" inputMode="numeric" />;
}
`;

function Demo() {
  return <PinInput type={/^[0-3]*$/} inputType="tel" inputMode="numeric" />;
}

export const regexp: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
