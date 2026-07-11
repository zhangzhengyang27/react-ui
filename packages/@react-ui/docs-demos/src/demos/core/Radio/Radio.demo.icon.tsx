import { CheckIcon, Radio } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Radio, CheckIcon } from '@react-ui/ui';

function Demo() {
  return (
    <Radio icon={CheckIcon} label="Custom check icon" name="check" value="check" defaultChecked />
  );
}
`;

function Demo() {
  return (
    <Radio icon={CheckIcon} label="Custom check icon" name="check" value="check" defaultChecked />
  );
}

export const icon: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
