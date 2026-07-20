import { NumberInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { NumberInput } from '@react-ui/ui';

function Demo() {
  return (
    <NumberInput
      label="输入 10 到 20 之间的值"
      placeholder="请输入 10 到 20 之间的数字"
      min={10}
      max={20}
    />
  );
}
`;

function Demo() {
  return (
    <NumberInput
      label="输入 10 到 20 之间的值"
      placeholder="请输入 10 到 20 之间的数字"
      min={10}
      max={20}
    />
  );
}

export const minMax: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
