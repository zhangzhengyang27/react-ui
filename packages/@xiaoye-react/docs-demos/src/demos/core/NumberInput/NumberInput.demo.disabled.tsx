import { NumberInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  return <NumberInput disabled label="已禁用输入" placeholder="已禁用输入" />;
}
`;

function Demo() {
  return <NumberInput disabled label="已禁用输入" placeholder="已禁用输入" />;
}

export const disabled: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
