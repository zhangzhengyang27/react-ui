import { NumberFormatter } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { NumberFormatter } from '@react-ui/ui';

function Demo() {
  return <NumberFormatter value={5 / 3} decimalScale={2} />;
}
`;

function Demo() {
  return <NumberFormatter value={5 / 3} decimalScale={2} />;
}

export const decimalScale: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
