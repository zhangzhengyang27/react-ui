import React, { useState } from 'react';
import { Switch } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [checked, setChecked] = useState(true);
  return (
    <DemoWrap>
      <Switch checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)} label="开启通知" />
    </DemoWrap>
  );
};

export default App;
