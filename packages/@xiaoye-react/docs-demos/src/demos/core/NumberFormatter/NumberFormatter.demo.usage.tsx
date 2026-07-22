import { NumberFormatter } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { NumberFormatter } from '@xiaoye-react/ui';

function Demo() {
  return <NumberFormatter prefix="$ " value={1000000} thousandSeparator />;
}
`;

function Demo() {
  return <NumberFormatter prefix="$ " value={1000000} thousandSeparator />;
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
