import { NumberFormatter } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { NumberFormatter } from '@react-ui/ui';

function Demo() {
  return <NumberFormatter prefix="$ " value={1000000} thousandSeparator />;
}
`;

function Demo() {
  return <NumberFormatter prefix="$ " value={1000000} thousandSeparator />;
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
