import React, { useState } from 'react';
import { Stepper, Group, Button } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [active, setActive] = useState(1);
  return (
    <DemoWrap>
      {/* Stepper 基础用法 */}
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="第一步" description="填写信息" />
        <Stepper.Step label="第二步" description="确认订单" />
        <Stepper.Step label="第三步" description="完成支付" />
      </Stepper>
      <Group mt="xl">
        <Button variant="default" onClick={() => setActive((p) => Math.max(0, p - 1))}>上一步</Button>
        <Button onClick={() => setActive((p) => Math.min(2, p + 1))}>下一步</Button>
      </Group>
    </DemoWrap>
  );
};

export default App;
