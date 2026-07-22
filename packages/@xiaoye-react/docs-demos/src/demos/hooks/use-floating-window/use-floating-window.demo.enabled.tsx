import { useState } from 'react';
import { Button, Chip, CloseButton, Group, Paper, Portal, Text } from '@xiaoye-react/ui';
import { useDisclosure, useFloatingWindow } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Button, Chip, CloseButton, Group, Paper, Portal, Text } from '@xiaoye-react/ui';
import { useDisclosure, useFloatingWindow } from '@xiaoye-react/hooks';

function Demo() {
  const [visible, handlers] = useDisclosure();
  const [enabled, setEnabled] = useState(true);
  const floatingWindow = useFloatingWindow({
    enabled,
    constrainToViewport: true,
    constrainOffset: 20,
    excludeDragHandleSelector: 'button',
    initialPosition: { top: 300, left: 20 },
  });

  return (
    <>
      <Group>
        <Button variant="default" onClick={handlers.toggle}>
          {visible ? '隐藏' : '显示'} 浮动窗口
        </Button>
        <Chip checked={enabled} onChange={() => setEnabled((e) => !e)}>
          Drag {enabled ? 'enabled' : 'disabled'}
        </Chip>
      </Group>

      {visible && (
        <Portal>
          <Paper
            w={280}
            p="md"
            withBorder
            pos="fixed"
            style={{ cursor: 'move', transition: 'box-shadow 70ms ease', zIndex: 400 }}
            shadow={floatingWindow.isDragging ? 'md' : undefined}
            ref={floatingWindow.ref}
          >
            <Group justify="space-between" mb="md">
              <Text>启用演示</Text>
              <CloseButton onClick={handlers.close} />
            </Group>
            <Text fz="sm">这是一个浮动窗口。你可以拖动它。</Text>
          </Paper>
        </Portal>
      )}
    </>
  );
}
`;

function Demo() {
  const [visible, handlers] = useDisclosure();
  const [enabled, setEnabled] = useState(true);
  const floatingWindow = useFloatingWindow({
    enabled,
    constrainToViewport: true,
    constrainOffset: 20,
    excludeDragHandleSelector: 'button',
    initialPosition: { top: 300, left: 20 },
  });

  return (
    <>
      <Group>
        <Button variant="default" onClick={handlers.toggle}>
          {visible ? '隐藏' : '显示'} 浮动窗口
        </Button>
        <Chip checked={enabled} onChange={() => setEnabled((e) => !e)}>
          Drag {enabled ? 'enabled' : 'disabled'}
        </Chip>
      </Group>

      {visible && (
        <Portal>
          <Paper
            w={280}
            p="md"
            withBorder
            pos="fixed"
            style={{ cursor: 'move', transition: 'box-shadow 70ms ease', zIndex: 400 }}
            shadow={floatingWindow.isDragging ? 'md' : undefined}
            ref={floatingWindow.ref}
          >
            <Group justify="space-between" mb="md">
              <Text>启用演示</Text>
              <CloseButton onClick={handlers.close} />
            </Group>
            <Text fz="sm">这是一个浮动窗口。你可以拖动它。</Text>
          </Paper>
        </Portal>
      )}
    </>
  );
}

export const enabled: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
