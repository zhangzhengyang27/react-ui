import { NumberFormatter } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { NumberFormatter } from '@react-ui/ui';

function Demo() {
  return <NumberFormatter value={5 / 3} decimalScale={2} />;
}
`;

function Demo() {
  return <NumberFormatter value={5 / 3} decimalScale={2} />;
}

export const decimalScale: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
