import { NumberInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <NumberInput
      label="严格限制在 0 到 100 之间"
      placeholder="输入一个数字"
      clampBehavior="strict"
      min={0}
      max={100}
    />
  );
}
`;

function Demo() {
  return (
    <NumberInput
      label="严格限制在 0 到 100 之间"
      placeholder="输入一个数字"
      clampBehavior="strict"
      min={0}
      max={100}
    />
  );
}

export const strictClamp: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
