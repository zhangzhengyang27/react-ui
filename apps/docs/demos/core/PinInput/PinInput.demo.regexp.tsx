import { PinInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { PinInput } from '@react-ui/ui';

function Demo() {
  return <PinInput type={/^[0-3]*$/} inputType="tel" inputMode="numeric" />;
}
`;

function Demo() {
  return <PinInput type={/^[0-3]*$/} inputType="tel" inputMode="numeric" />;
}

export const regexp: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
