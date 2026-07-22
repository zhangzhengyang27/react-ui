import { Avatar, Button, Group, Paper, Popover, Stack, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Avatar, Button, Group, Paper, Popover, Stack, Text } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Popover width={260} shadow="md" position="bottom-start" offset={0}>
      <Popover.ContextMenu>
        <Paper withBorder p="xl" radius="md" style={{ userSelect: 'none', textAlign: 'center' }}>
          <Text fw={500}>在此区域内任意位置右键点击</Text>
          <Text c="dimmed" size="sm" mt={4}>
            A popover will open at the cursor position
          </Text>
        </Paper>
      </Popover.ContextMenu>

      <Popover.Dropdown>
        <Stack gap="xs">
          <Group gap="sm" wrap="nowrap">
            <Avatar radius="xl" color="blue">JD</Avatar>
            <div>
              <Text size="sm" fw={500}>Jane Doe</Text>
              <Text size="xs" c="dimmed">jane@example.com</Text>
            </div>
          </Group>
          <Group grow gap="xs">
            <Button size="xs" variant="default">消息</Button>
            <Button size="xs">关注</Button>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
`;

function Demo() {
  return (
    <Popover width={260} shadow="md" position="bottom-start" offset={0}>
      <Popover.ContextMenu>
        <Paper withBorder p="xl" radius="md" style={{ userSelect: 'none', textAlign: 'center' }}>
          <Text fw={500}>在此区域内任意位置右键点击</Text>
          <Text c="dimmed" size="sm" mt={4}>
            A popover will open at the cursor position
          </Text>
        </Paper>
      </Popover.ContextMenu>

      <Popover.Dropdown>
        <Stack gap="xs">
          <Group gap="sm" wrap="nowrap">
            <Avatar radius="xl" color="blue">
              JD
            </Avatar>
            <div>
              <Text size="sm" fw={500}>
                Jane Doe
              </Text>
              <Text size="xs" c="dimmed">
                jane@example.com
              </Text>
            </div>
          </Group>
          <Group grow gap="xs">
            <Button size="xs" variant="default">
              Message
            </Button>
            <Button size="xs">关注</Button>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

export const contextMenu: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
