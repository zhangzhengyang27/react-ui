import { Stepper, StepperProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

function Wrapper(props: Partial<StepperProps>) {
  return (
    <Stepper {...props} active={1}>
      <Stepper.Step label="步骤 1" description="创建账户" />
      <Stepper.Step label="步骤 2" description="验证邮箱" />
    </Stepper>
  );
}

const code = `
import { Stepper } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Stepper{{props}} active={1}>
      <Stepper.Step label="步骤 1" description="创建账户" />
      <Stepper.Step label="步骤 2" description="验证邮箱" />
    </Stepper>
  );
}
`;

export const sizeConfigurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'size',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
  ],
};
