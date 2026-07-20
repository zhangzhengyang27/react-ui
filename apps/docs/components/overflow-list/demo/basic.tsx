import React from 'react';
import { OverflowList, Badge } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const data = Array.from({ length: 20 }, (_, i) => `标签 ${i + 1}`);

const App: React.FC = () => (
  <DemoWrap>
    <OverflowList
      style={{ width: 300 }}
      data={data}
      renderItem={(item) => <Badge>{item}</Badge>}
      renderOverflow={(items) => <Badge color="gray">+{items.length}</Badge>}
    />
  </DemoWrap>
);

export default App;
