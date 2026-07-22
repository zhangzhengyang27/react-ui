import { NumberFormatter } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { NumberFormatter } from '@xiaoye-react/ui';

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
