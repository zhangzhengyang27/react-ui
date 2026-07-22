import { NumberInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <NumberInput
      label="不允许负数"
      placeholder="请勿输入负数"
      allowNegative={false}
    />
  );
}
`;

function Demo() {
  return (
    <NumberInput
      label="不允许负数"
      placeholder="请勿输入负数"
      allowNegative={false}
    />
  );
}

export const allowNegative: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
