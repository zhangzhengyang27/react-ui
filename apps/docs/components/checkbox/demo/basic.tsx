import React, { useState } from 'react';
import { Checkbox, Stack } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [checked, setChecked] = useState(true);

  return (
    <DemoWrap>
      <Stack gap="md">
        <Checkbox label="受控（checked）" checked={checked} onChange={e => setChecked(e.currentTarget.checked)} />
        <Checkbox label="非受控默认选中" defaultChecked />
        <Checkbox label="未选中" />
        <Checkbox label="禁用 - 已选" disabled checked />
        <Checkbox label="禁用 - 未选" disabled />
        <Checkbox label="不确定状态" indeterminate />
      </Stack>
    </DemoWrap>
  );
};

export default App;
