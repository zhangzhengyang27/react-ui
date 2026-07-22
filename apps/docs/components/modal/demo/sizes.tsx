import React, { useState } from 'react';
import { Button, Group, Modal } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  const [opened, setOpened] = useState(false);

  const open = (s: typeof size) => {
    setSize(s);
    setOpened(true);
  };

  return (
    <DemoWrap>
      <Group>
        <Button variant="outline" onClick={() => open('xs')}>
          size = xs
        </Button>
        <Button variant="outline" onClick={() => open('sm')}>
          size = sm
        </Button>
        <Button variant="outline" onClick={() => open('md')}>
          size = md
        </Button>
        <Button variant="outline" onClick={() => open('lg')}>
          size = lg
        </Button>
        <Button variant="outline" onClick={() => open('xl')}>
          size = xl
        </Button>
      </Group>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`size = ${size}`}
        size={size}
        centered
      >
        当前 Modal 宽度由 size = {size} 决定。
      </Modal>
    </DemoWrap>
  );
};

export default App;
