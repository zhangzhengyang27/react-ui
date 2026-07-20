import React, { useState } from 'react';
import { Transition, Button, Paper, Text } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  return (
    <DemoWrap>
      <Button onClick={() => setMounted((m) => !m)}>切换</Button>
      <Transition mounted={mounted} transition="fade">
        {(styles) => (
          <Paper p="md" mt="sm" style={styles}>
            <Text>过渡内容</Text>
          </Paper>
        )}
      </Transition>
    </DemoWrap>
  );
};

export default App;
