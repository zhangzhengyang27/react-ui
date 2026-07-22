import React, { useState } from 'react';
import { Collapse, Button, Text } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [opened, setOpened] = useState(false);
  return (
    <DemoWrap>
      <Button onClick={() => setOpened((o) => !o)}>切换</Button>
      <Collapse expanded={opened} mt="sm">
        <Text>折叠区域内容</Text>
      </Collapse>
    </DemoWrap>
  );
};

export default App;
