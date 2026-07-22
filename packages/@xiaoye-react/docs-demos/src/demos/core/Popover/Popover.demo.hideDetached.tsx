import { Box, Button, Group, Popover, useComputedUIColorScheme } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Box, Button, Group, Popover } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Box
      bd="1px solid var(--ui-color-dimmed)"
      p="xl"
      w={{ base: 340, sm: 400 }}
      h={200}
      style={{ overflow: 'auto' }}
    >
      <Box w={1000} h={400}>
        <Group>
          <Popover width="target" position="bottom" opened>
            <Popover.Target>
              <Button>切换气泡卡片</Button>
            </Popover.Target>
            <Popover.Dropdown>此气泡卡片下拉在分离时隐藏</Popover.Dropdown>
          </Popover>

          <Popover width="target" position="bottom" opened hideDetached={false}>
            <Popover.Target>
              <Button>切换气泡卡片</Button>
            </Popover.Target>
            <Popover.Dropdown>此气泡卡片下拉在分离时可见</Popover.Dropdown>
          </Popover>
        </Group>
      </Box>
    </Box>
  );
}
`;

function Demo() {
  const colorScheme = useComputedUIColorScheme();

  return (
    <Box
      bd="1px solid var(--ui-color-dimmed)"
      p="xl"
      w={{ base: 340, sm: 400 }}
      h={200}
      style={{ overflow: 'auto', colorScheme }}
    >
      <Box w={1000} h={400}>
        <Group>
          <Popover width="target" position="bottom" opened>
            <Popover.Target>
              <Button>切换气泡卡片</Button>
            </Popover.Target>
            <Popover.Dropdown>此气泡卡片下拉在分离时隐藏</Popover.Dropdown>
          </Popover>

          <Popover width="target" position="bottom" opened hideDetached={false}>
            <Popover.Target>
              <Button>切换气泡卡片</Button>
            </Popover.Target>
            <Popover.Dropdown>此气泡卡片下拉在分离时可见</Popover.Dropdown>
          </Popover>
        </Group>
      </Box>
    </Box>
  );
}

export const hideDetached: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
