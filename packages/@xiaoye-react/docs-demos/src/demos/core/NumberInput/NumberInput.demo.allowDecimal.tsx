import { NumberInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <NumberInput
      label="不允许小数"
      placeholder="请勿输入小数"
      allowDecimal={false}
    />
  );
}
`;

function Demo() {
  return (
    <NumberInput
      label="不允许小数"
      placeholder="请勿输入小数"
      allowDecimal={false}
    />
  );
}

export const allowDecimal: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
