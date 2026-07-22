import { useState } from 'react';
import { Box, Button, Code, Group, Portal, Stack, Text } from '@xiaoye-react/ui';
import { useDisclosure, useHeadroom } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Box, Button, Code, Group, Portal, Stack, Text } from '@xiaoye-react/ui';
import { useDisclosure, useHeadroom } from '@xiaoye-react/hooks';

function Demo() {
  const [showHeader, handlers] = useDisclosure(false);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) =>
    setLog((prev) => [\`\${new Date().toLocaleTimeString()} — \${msg}\`, ...prev].slice(0, 10));

  const { pinned } = useHeadroom({
    fixedAt: 80,
    onPin: () => addLog('onPin'),
    onRelease: () => addLog('onRelease'),
    onFix: () => addLog('onFix'),
  });

  return (
    <>
      {showHeader && (
        <Portal>
          <Box
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: 60,
              zIndex: 1000000,
              transform: \`translate3d(0, \${pinned ? 0 : '-110px'}, 0)\`,
              transition: 'transform 400ms ease',
              backgroundColor: pinned
                ? 'var(--ui-color-teal-6)'
                : 'var(--ui-color-red-6)',
            }}
          >
            <Group justify="center" h="100%">
              <Text c="white" fw={500}>
                {pinned ? '已固定' : '已释放'}
              </Text>
            </Group>
          </Box>
        </Portal>
      )}

      <Stack>
        <Button onClick={handlers.toggle} variant="default">
          {showHeader ? '隐藏' : '显示'} 头部
        </Button>
        <Code block>
          {log.length === 0 ? '滚动查看回调事件' : log.join('\\n')}
        </Code>
      </Stack>
    </>
  );
}
`;

function Demo() {
  const [showHeader, handlers] = useDisclosure(false);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) =>
    setLog((prev) => [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev].slice(0, 10));

  const { pinned } = useHeadroom({
    fixedAt: 80,
    onPin: () => addLog('onPin'),
    onRelease: () => addLog('onRelease'),
    onFix: () => addLog('onFix'),
  });

  return (
    <>
      {showHeader && (
        <Portal>
          <Box
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: 60,
              zIndex: 1000000,
              transform: `translate3d(0, ${pinned ? 0 : '-110px'}, 0)`,
              transition: 'transform 400ms ease',
              backgroundColor: pinned
                ? 'var(--ui-color-teal-6)'
                : 'var(--ui-color-red-6)',
            }}
          >
            <Group justify="center" h="100%">
              <Text c="white" fw={500}>
                {pinned ? '已固定' : '已释放'}
              </Text>
            </Group>
          </Box>
        </Portal>
      )}

      <Stack>
        <Button onClick={handlers.toggle} variant="default">
          {showHeader ? '隐藏' : '显示'} 头部
        </Button>
        <Code block>{log.length === 0 ? '滚动查看回调事件' : log.join('\n')}</Code>
      </Stack>
    </>
  );
}

export const callbacks: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
