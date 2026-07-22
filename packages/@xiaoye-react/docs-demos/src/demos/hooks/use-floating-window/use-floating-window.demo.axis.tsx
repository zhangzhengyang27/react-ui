import { useState } from 'react';
import { Button, CloseButton, Group, Paper, Portal, SegmentedControl, Text } from '@xiaoye-react/ui';
import { useDisclosure, useFloatingWindow } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Button, CloseButton, Group, Paper, Portal, SegmentedControl, Text } from '@xiaoye-react/ui';
import { useDisclosure, useFloatingWindow } from '@xiaoye-react/hooks';

function Demo() {
  const [visible, handlers] = useDisclosure();
  const [axis, setAxis] = useState<'x' | 'y'>('y');
  const floatingWindow = useFloatingWindow({
    axis,
    constrainToViewport: true,
    constrainOffset: 20,
    excludeDragHandleSelector: 'button',
    initialPosition: { top: 300, left: 20 },
  });

  return (
    <>
      <Group>
        <Button onClick={handlers.toggle} variant="default">
          {visible ? '隐藏' : '显示'} 浮动窗口
        </Button>
        <SegmentedControl data={['x', 'y']} onChange={(val) => setAxis(val as 'x')} value={axis} />
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
              <Text>轴演示</Text>
              <CloseButton onClick={handlers.close} />
            </Group>
            <Text fz="sm">
              When you set axis prop, the floating window can be dragged only horizontally or
              vertically.
            </Text>
          </Paper>
        </Portal>
      )}
    </>
  );
}
`;

function Demo() {
  const [visible, handlers] = useDisclosure();
  const [axis, setAxis] = useState<'x' | 'y'>('y');
  const floatingWindow = useFloatingWindow({
    axis,
    constrainToViewport: true,
    constrainOffset: 20,
    excludeDragHandleSelector: 'button',
    initialPosition: { top: 300, left: 20 },
  });

  return (
    <>
      <Group>
        <Button onClick={handlers.toggle} variant="default">
          {visible ? '隐藏' : '显示'} 浮动窗口
        </Button>
        <SegmentedControl data={['x', 'y']} onChange={(val) => setAxis(val as 'x')} value={axis} />
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
              <Text>轴演示</Text>
              <CloseButton onClick={handlers.close} />
            </Group>
            <Text fz="sm">
              When you set axis prop, the floating window can be dragged only horizontally or
              vertically.
            </Text>
          </Paper>
        </Portal>
      )}
    </>
  );
}

export const axis: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
