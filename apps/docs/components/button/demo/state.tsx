import React, { useState } from 'react';
import { Button, Group } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <DemoWrap>
      <Group>
        <Button loading>一直加载</Button>
        <Button loading={loading} onClick={handleClick}>
          {loading ? '提交中…' : '点击提交'}
        </Button>
        <Button disabled>禁用</Button>
        <Button variant="filled" color="red">
          危险色
        </Button>
      </Group>
    </DemoWrap>
  );
};

export default App;
