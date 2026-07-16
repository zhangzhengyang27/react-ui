import { CheckIcon, Radio } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Radio, CheckIcon } from '@react-ui/ui';

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
