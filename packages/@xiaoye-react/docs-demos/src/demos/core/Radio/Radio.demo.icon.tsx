import { CheckIcon, Radio } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Radio, CheckIcon } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Radio icon={CheckIcon} label="自定义勾选图标" name="check" value="check" defaultChecked />
  );
}
`;

function Demo() {
  return (
    <Radio icon={CheckIcon} label="自定义勾选图标" name="check" value="check" defaultChecked />
  );
}

export const icon: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
