import { Menu, Paper, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Menu, Paper, Text } from '@react-ui/ui';

function Demo() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.ContextMenu>
        <Paper withBorder p="xl" radius="md" style={{ userSelect: 'none', textAlign: 'center' }}>
          <Text fw={500}>在此区域内任意位置右键点击</Text>
          <Text c="dimmed" size="sm" mt={4}>
            The menu will open at the cursor position
          </Text>
        </Paper>
      </Menu.ContextMenu>

      <Menu.Dropdown>
        <Menu.Label>操作</Menu.Label>
        <Menu.Item>打开</Menu.Item>
        <Menu.Item>重命名</Menu.Item>
        <Menu.Item>复制</Menu.Item>
        <Menu.Divider />
        <Menu.Item color="red">删除</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
`;

function Demo() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.ContextMenu>
        <Paper withBorder p="xl" radius="md" style={{ userSelect: 'none', textAlign: 'center' }}>
          <Text fw={500}>在此区域内任意位置右键点击</Text>
          <Text c="dimmed" size="sm" mt={4}>
            The menu will open at the cursor position
          </Text>
        </Paper>
      </Menu.ContextMenu>

      <Menu.Dropdown>
        <Menu.Label>操作</Menu.Label>
        <Menu.Item>打开</Menu.Item>
        <Menu.Item>重命名</Menu.Item>
        <Menu.Item>复制</Menu.Item>
        <Menu.Divider />
        <Menu.Item color="red">删除</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export const contextMenu: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
