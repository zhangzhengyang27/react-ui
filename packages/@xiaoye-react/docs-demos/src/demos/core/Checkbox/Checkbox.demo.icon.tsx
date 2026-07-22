import { BiohazardIcon, RadioactiveIcon } from '@phosphor-icons/react';
import { Checkbox, CheckboxIconComponent } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Checkbox, CheckboxIconComponent } from '@xiaoye-react/ui';
import { BiohazardIcon, RadioactiveIcon } from '@phosphor-icons/react';

const CheckboxIcon: CheckboxIconComponent = ({ indeterminate, ...others }) =>
  indeterminate ? <RadioactiveIcon {...others} /> : <BiohazardIcon {...others} />;

function Demo() {
  return (
    <>
      <Checkbox icon={CheckboxIcon} label="自定义图标" defaultChecked />
      <Checkbox icon={CheckboxIcon} label="自定义图标：不确定" indeterminate mt="sm" />
    </>
  );
}
`;

const CheckboxIcon: CheckboxIconComponent = ({ indeterminate, ...others }) =>
  indeterminate ? <RadioactiveIcon {...others} /> : <BiohazardIcon {...others} />;

function Demo() {
  return (
    <>
      <Checkbox icon={CheckboxIcon} label="自定义图标" defaultChecked />
      <Checkbox icon={CheckboxIcon} label="自定义图标：不确定" indeterminate mt="sm" />
    </>
  );
}

export const icon: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
