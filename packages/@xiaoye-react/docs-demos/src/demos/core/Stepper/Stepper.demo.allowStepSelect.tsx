import { useState } from 'react';
import { Button, Group, Stepper } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { Content } from './_content';

const code = `
import { useState } from 'react';
import { Stepper, Button, Group } from '@xiaoye-react/ui';

function Demo() {
  const [active, setActive] = useState(1);
  const [highestStepVisited, setHighestStepVisited] = useState(active);

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  // Allow the user to freely go back and forth between visited steps.
  const shouldAllowSelectStep = (step: number) => highestStepVisited >= step && active !== step;

  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step
          label="第一步"
          description="创建账户"
          allowStepSelect={shouldAllowSelectStep(0)}
        >
          步骤 1 内容：创建账户
        </Stepper.Step>
        <Stepper.Step
          label="第二步"
          description="验证邮箱"
          allowStepSelect={shouldAllowSelectStep(1)}
        >
          步骤 2 内容：验证邮箱
        </Stepper.Step>
        <Stepper.Step
          label="最后一步"
          description="获取完整访问权限"
          allowStepSelect={shouldAllowSelectStep(2)}
        >
          步骤 3 内容：获取完整访问权限
        </Stepper.Step>

        <Stepper.Completed>
          已完成，点击返回按钮回到上一步
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={() => handleStepChange(active - 1)}>
          返回
        </Button>
        <Button onClick={() => handleStepChange(active + 1)}>下一步</Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const [active, setActive] = useState(1);
  const [highestStepVisited, setHighestStepVisited] = useState(active);

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  // Allow the user to freely go back and forth between visited steps.
  const shouldAllowSelectStep = (step: number) => highestStepVisited >= step && active !== step;

  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step
          label="第一步"
          description="创建账户"
          allowStepSelect={shouldAllowSelectStep(0)}
        >
          <Content>步骤 1 内容：创建账户</Content>
        </Stepper.Step>
        <Stepper.Step
          label="第二步"
          description="验证邮箱"
          allowStepSelect={shouldAllowSelectStep(1)}
        >
          <Content>步骤 2 内容：验证邮箱</Content>
        </Stepper.Step>
        <Stepper.Step
          label="最后一步"
          description="获取完整访问权限"
          allowStepSelect={shouldAllowSelectStep(2)}
        >
          <Content>步骤 3 内容：获取完整访问权限</Content>
        </Stepper.Step>

        <Stepper.Completed>
          <Content>已完成，点击返回按钮回到上一步</Content>
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={() => handleStepChange(active - 1)}>
          返回
        </Button>
        <Button onClick={() => handleStepChange(active + 1)}>下一步</Button>
      </Group>
    </>
  );
}

export const allowStepSelect: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
