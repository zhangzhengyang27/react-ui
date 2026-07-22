import { NumberInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  return <NumberInput label="数字输入" placeholder="数字输入" success="看起来不错！" />;
}
`;

function Demo() {
  return <NumberInput label="数字输入" placeholder="数字输入" success="看起来不错！" />;
}

export const success: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
