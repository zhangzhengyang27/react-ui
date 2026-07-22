import { NumberInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <NumberInput
      label="始终显示 2 位小数"
      placeholder="请勿输入超过 2 位小数"
      decimalScale={2}
      fixedDecimalScale
      defaultValue={2.2}
    />
  );
}
`;

function Demo() {
  return (
    <NumberInput
      label="始终显示 2 位小数"
      placeholder="请勿输入超过 2 位小数"
      decimalScale={2}
      fixedDecimalScale
      defaultValue={2.2}
    />
  );
}

export const fixedDecimalScale: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
