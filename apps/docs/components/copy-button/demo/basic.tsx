import React from 'react';
import { CopyButton, Button } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <CopyButton value="Hello react-ui">
      {({ copied, copy }) => (
        <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
          {copied ? '已复制' : '复制'}
        </Button>
      )}
    </CopyButton>
  </DemoWrap>
);

export default App;
