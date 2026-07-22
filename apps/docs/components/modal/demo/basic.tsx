import React, { useState } from 'react';
import { Button, Group, Modal, Text } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <DemoWrap>
      <Group>
        <Button variant="filled" onClick={() => setOpened(true)}>
          打开 Modal
        </Button>
      </Group>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="订阅确认"
        centered
        size="md"
      >
        <Text size="sm" c="dimmed">
          这是一个 react-ui Modal 的基础用法演示。点击遮罩层或按 ESC 键即可关闭。
        </Text>
        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={() => setOpened(false)}>
            取消
          </Button>
          <Button variant="filled" onClick={() => setOpened(false)}>
            确认
          </Button>
        </Group>
      </Modal>
    </DemoWrap>
  );
};

export default App;
