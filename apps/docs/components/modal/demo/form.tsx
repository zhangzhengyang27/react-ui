import React, { useState } from 'react';
import { Button, Group, Modal, Stack, Text, TextInput } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <DemoWrap>
      <Group>
        <Button variant="filled" onClick={() => setOpened(true)}>
          打开表单 Modal
        </Button>
      </Group>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="创建项目"
        size="lg"
        centered
        yOffset="8dvh"
      >
        <Stack gap="md">
          <TextInput label="项目名称" placeholder="my-project" />
          <TextInput label="项目描述" placeholder="一句话描述" />
          <Text size="xs" c="dimmed">
            提示：项目名称创建后不可修改。
          </Text>
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={() => setOpened(false)}>
              取消
            </Button>
            <Button variant="filled" onClick={() => setOpened(false)}>
              创建
            </Button>
          </Group>
        </Stack>
      </Modal>
    </DemoWrap>
  );
};

export default App;
