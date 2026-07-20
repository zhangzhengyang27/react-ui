import { useState } from 'react';
import { Button, Group, Stepper } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { StepperStylesApi } from '@react-ui/docs-styles-api';
import { Content } from './_content';

const code = `
import { Stepper } from '@react-ui/ui';

function Demo() {
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive}{{props}}>
        <Stepper.Step label="第一步" description="创建账户" loading>
          <Content>步骤 1 内容：创建账户</Content>
        </Stepper.Step>
        <Stepper.Step label="第二步" description="验证邮箱">
          <Content>步骤 2 内容：验证邮箱</Content>
        </Stepper.Step>

        <Stepper.Completed>
          <Content>已完成，点击返回按钮回到上一步</Content>
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          返回
        </Button>
        <Button onClick={nextStep}>下一步</Button>
      </Group>
    </>
  );
}
`;

function Demo(props: any) {
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive} {...props}>
        <Stepper.Step label="第一步" description="创建账户" loading>
          <Content>步骤 1 内容：创建账户</Content>
        </Stepper.Step>
        <Stepper.Step label="第二步" description="验证邮箱">
          <Content>步骤 2 内容：验证邮箱</Content>
        </Stepper.Step>

        <Stepper.Completed>
          <Content>已完成，点击返回按钮回到上一步</Content>
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          返回
        </Button>
        <Button onClick={nextStep}>下一步</Button>
      </Group>
    </>
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  centered: true,
  maxWidth: '100%',
  data: StepperStylesApi,
  component: Demo,
  code,
};
