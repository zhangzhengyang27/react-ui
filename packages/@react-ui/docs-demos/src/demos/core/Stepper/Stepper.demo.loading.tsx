import { Stepper } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Stepper } from '@react-ui/ui';

function Demo() {
  return (
    <Stepper active={1}>
      <Stepper.Step label="步骤 1" description="创建账户" />
      <Stepper.Step label="步骤 2" description="验证邮箱" loading />
      <Stepper.Step label="步骤 3" description="获取完整访问权限" />
    </Stepper>
  );
}
`;

function Demo() {
  return (
    <Stepper active={1}>
      <Stepper.Step label="步骤 1" description="创建账户" />
      <Stepper.Step label="步骤 2" description="验证邮箱" loading />
      <Stepper.Step label="步骤 3" description="获取完整访问权限" />
    </Stepper>
  );
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
