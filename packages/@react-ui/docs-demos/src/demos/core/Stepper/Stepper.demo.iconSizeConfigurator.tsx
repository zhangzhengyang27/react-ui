import { Stepper, StepperProps } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

function Wrapper(props: Partial<StepperProps>) {
  return (
    <Stepper {...props} active={1}>
      <Stepper.Step label="步骤 1" description="创建账户" />
      <Stepper.Step label="步骤 2" description="验证邮箱" />
    </Stepper>
  );
}

const code = `
import { Stepper } from '@react-ui/ui';

function Demo() {
  return (
    <Stepper{{props}} active={1}>
      <Stepper.Step label="步骤 1" description="创建账户" />
      <Stepper.Step label="步骤 2" description="验证邮箱" />
    </Stepper>
  );
}
`;

export const iconSizeConfigurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'iconSize',
      type: 'number',
      initialValue: 42,
      libraryValue: '__',
      min: 32,
      max: 62,
      step: 5,
    },
  ],
};
