import { useState } from 'react';
import { Button, Group, Stepper } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { Content } from './_content';

const code = `
import { useState } from 'react';
import { Stepper, Button, Group } from '@react-ui/ui';

function Demo() {
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="第一步" description="创建账户">
          步骤 1 内容：创建账户
        </Stepper.Step>
        <Stepper.Step label="第二步" description="验证邮箱">
          步骤 2 内容：验证邮箱
        </Stepper.Step>
        <Stepper.Step label="最后一步" description="获取完整访问权限">
          步骤 3 内容：获取完整访问权限
        </Stepper.Step>
        <Stepper.Completed>
          已完成，点击返回按钮回到上一步
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

function Demo() {
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="第一步" description="创建账户">
          <Content>步骤 1 内容：创建账户</Content>
        </Stepper.Step>
        <Stepper.Step label="第二步" description="验证邮箱">
          <Content>步骤 2 内容：验证邮箱</Content>
        </Stepper.Step>
        <Stepper.Step label="最后一步" description="获取完整访问权限">
          <Content>步骤 3 内容：获取完整访问权限</Content>
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

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
