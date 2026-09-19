import React, { useState } from 'react';
import { Button, CloseButton, FloatingWindow, Group, Text } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  // FloatingWindow 没有 onClose 属性：显示与否由是否挂载决定，enabled 只控制能否拖动
  const [opened, setOpened] = useState(false);

  return (
    <DemoWrap>
      <Button onClick={() => setOpened(true)}>打开浮动窗口</Button>

      {opened && (
        <FloatingWindow
          w={280}
          p="md"
          withBorder
          excludeDragHandleSelector="button"
          initialPosition={{ top: 200, left: 40 }}
          style={{ cursor: 'move' }}
        >
          <Group justify="space-between" mb="md">
            <Text fz="sm">浮动窗口</Text>
            <CloseButton onClick={() => setOpened(false)} />
          </Group>
          <Text fz="sm">这是一个可拖动的浮动窗口。</Text>
        </FloatingWindow>
      )}
    </DemoWrap>
  );
};

export default App;
