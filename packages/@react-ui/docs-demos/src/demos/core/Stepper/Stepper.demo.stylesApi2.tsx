import { useState } from 'react';
import { Stepper, StepperProps } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Stepper, StepperProps } from '@react-ui/ui';

function StyledStepper(props: StepperProps) {
  return (
    <Stepper
      styles={{
        stepBody: {
          display: 'none',
        },

        step: {
          padding: 0,
        },

        stepIcon: {
          borderWidth: 4,
        },

        separator: {
          marginLeft: -2,
          marginRight: -2,
          height: 10,
        },
      }}
      {...props}
    />
  );
}

function Demo() {
  const [active, setActive] = useState(1);
  return (
    <StyledStepper active={active} onStepClick={setActive}>
      <Stepper.Step label="步骤 1" description="创建账户" />
      <Stepper.Step label="步骤 2" description="验证邮箱" />
      <Stepper.Step label="步骤 3" description="获取完整访问权限" />
    </StyledStepper>
  );
}
`;

function StyledStepper(props: StepperProps) {
  return (
    <Stepper
      styles={{
        stepBody: {
          display: 'none',
        },

        step: {
          padding: 0,
        },

        stepIcon: {
          borderWidth: 3,
        },

        separator: {
          marginLeft: -2,
          marginRight: -2,
          height: 6,
        },
      }}
      {...props}
    />
  );
}

function Demo() {
  const [active, setActive] = useState(1);
  return (
    <StyledStepper active={active} onStepClick={setActive}>
      <Stepper.Step label="步骤 1" description="创建账户" />
      <Stepper.Step label="步骤 2" description="验证邮箱" />
      <Stepper.Step label="步骤 3" description="获取完整访问权限" />
    </StyledStepper>
  );
}

export const stylesApi2: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
