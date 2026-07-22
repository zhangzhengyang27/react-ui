import { Box, Group, Kbd } from '@xiaoye-react/ui';
import { useHotkeys } from '@xiaoye-react/hooks';
import { modals } from '@xiaoye-react/modals';
import { UIDemo } from '@xiaoye-react/demo';

const shortcutCode = `
import { Box, Group, Kbd } from '@xiaoye-react/ui';

export function Shortcut({ symbol, description }: { symbol: string; description: string }) {
  return (
    <Group gap={7} p={10}>
      <Kbd size={20}>Ctrl</Kbd>
      <Box fz={22} fw={500}>
        +
      </Box>
      <Kbd size={20} w={40}>
        {symbol}
      </Kbd>

      <Box fz={18} ms="sm">
        – {description}
      </Box>
    </Group>
  );
}
`;

const code = `
import { useHotkeys } from '@xiaoye-react/hooks';
import { spotlight } from '@xiaoye-react/spotlight';
import { useUIColorScheme } from '@xiaoye-react/ui';
import { Shortcut } from './Shortcut';

function Demo() {
  const { toggleColorScheme } = useUIColorScheme();

  useHotkeys([
    ['mod + K', () => spotlight.open()],
    ['mod + J', () => toggleColorScheme()],
    ['mod + shift + alt + X', () => secret()],
  ]);

  return (
    <>
      <Shortcut symbol="K" description="打开搜索" />
      <Shortcut symbol="J" description="切换颜色方案" />
    </>
  );
}
`;

function Shortcut({ symbol, description }: { symbol: string; description: string }) {
  return (
    <Group gap={7} p={10}>
      <Kbd fz={{ base: 16, sm: 20 }}>Ctrl</Kbd>
      <Box fz={22} fw={500}>
        +
      </Box>
      <Kbd fz={{ base: 16, sm: 20 }} w={40}>
        {symbol}
      </Kbd>

      <Box fz={{ base: 14, sm: 18 }} ms="sm">
        – {description}
      </Box>
    </Group>
  );
}

function Demo() {
  useHotkeys([
    [
      'mod + shift + alt + X',
      () =>
        modals.open({
          withCloseButton: false,
          padding: 0,
          size: 500,
          styles: {
            content: {
              height: 300,
              overflow: 'hidden',
            },
          },
          children: (
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="YouTube 视频播放器"
              style={{ border: 0, margin: 0, width: '100%', height: 300 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ),
        }),
    ],
  ]);

  return (
    <>
      <Shortcut symbol="K" description="打开搜索" />
      <Shortcut symbol="J" description="切换颜色方案" />
    </>
  );
}

export const index: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: shortcutCode, language: 'tsx', fileName: '快捷键.tsx' },
  ],
  centered: true,
  defaultExpanded: false,
};
