import { NumberInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { NumberInput } from '@react-ui/ui';

function Demo() {
  return (
    <NumberInput
      label="小数点后最多输入 2 位"
      placeholder="请勿输入超过 2 位小数"
      decimalScale={2}
    />
  );
}
`;

function Demo() {
  return (
    <NumberInput
      label="小数点后最多输入 2 位"
      placeholder="请勿输入超过 2 位小数"
      decimalScale={2}
    />
  );
}

export const decimalScale: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
