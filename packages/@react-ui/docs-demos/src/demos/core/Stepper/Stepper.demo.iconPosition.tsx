import { useState } from 'react';
import { Stepper } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Stepper } from '@react-ui/ui';

function Demo() {
  const [active, setActive] = useState(1);

  return (
    <Stepper active={active} onStepClick={setActive} iconPosition="right">
      <Stepper.Step label="步骤 1" description="创建账户" />
      <Stepper.Step label="步骤 2" description="验证邮箱" />
      <Stepper.Step label="步骤 3" description="获取完整访问权限" />
    </Stepper>
  );
}
`;

function Demo() {
  const [active, setActive] = useState(1);
  return (
    <Stepper active={active} onStepClick={setActive} iconPosition="right">
      <Stepper.Step label="步骤 1" description="创建账户" />
      <Stepper.Step label="步骤 2" description="验证邮箱" />
      <Stepper.Step label="步骤 3" description="获取完整访问权限" />
    </Stepper>
  );
}

export const iconPosition: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
