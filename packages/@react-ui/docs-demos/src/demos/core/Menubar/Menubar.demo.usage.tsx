import { Menu, Menubar, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Menu, Menubar, Text } from '@react-ui/ui';

function Demo() {
  return (
    <Menubar>
      <Menubar.Menu width={220}>
        <Menubar.Target>文件</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item rightSection={<Text size="xs" c="dimmed">⌘N</Text>}>新建文件</Menu.Item>
          <Menu.Item rightSection={<Text size="xs" c="dimmed">⌘⇧N</Text>}>新建窗口</Menu.Item>
          <Menu.Sub>
            <Menu.Sub.Target>
              <Menu.Sub.Item>打开最近</Menu.Sub.Item>
            </Menu.Sub.Target>
            <Menu.Sub.Dropdown>
              <Menu.Item>project-alpha</Menu.Item>
              <Menu.Item>project-beta</Menu.Item>
              <Menu.Item>project-gamma</Menu.Item>
            </Menu.Sub.Dropdown>
          </Menu.Sub>
          <Menu.Divider />
          <Menu.Item rightSection={<Text size="xs" c="dimmed">⌘S</Text>}>保存</Menu.Item>
          <Menu.Item>Save as…</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>

      <Menubar.Menu width={220}>
        <Menubar.Target>编辑</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item rightSection={<Text size="xs" c="dimmed">⌘Z</Text>}>撤销</Menu.Item>
          <Menu.Item rightSection={<Text size="xs" c="dimmed">⌘⇧Z</Text>}>重做</Menu.Item>
          <Menu.Divider />
          <Menu.Item>剪切</Menu.Item>
          <Menu.Item>复制</Menu.Item>
          <Menu.Item>粘贴</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>

      <Menubar.Menu width={220}>
        <Menubar.Target>帮助</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>文档</Menu.Item>
          <Menu.Item>键盘快捷键</Menu.Item>
          <Menu.Item>关于</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>
    </Menubar>
  );
}
`;

function Demo() {
  return (
    <Menubar>
      <Menubar.Menu width={220}>
        <Menubar.Target>文件</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item
            rightSection={
              <Text size="xs" c="dimmed">
                ⌘N
              </Text>
            }
          >
            New file
          </Menu.Item>
          <Menu.Item
            rightSection={
              <Text size="xs" c="dimmed">
                ⌘⇧N
              </Text>
            }
          >
            New window
          </Menu.Item>
          <Menu.Sub>
            <Menu.Sub.Target>
              <Menu.Sub.Item>打开最近</Menu.Sub.Item>
            </Menu.Sub.Target>
            <Menu.Sub.Dropdown>
              <Menu.Item>project-alpha</Menu.Item>
              <Menu.Item>project-beta</Menu.Item>
              <Menu.Item>project-gamma</Menu.Item>
            </Menu.Sub.Dropdown>
          </Menu.Sub>
          <Menu.Divider />
          <Menu.Item
            rightSection={
              <Text size="xs" c="dimmed">
                ⌘S
              </Text>
            }
          >
            Save
          </Menu.Item>
          <Menu.Item>Save as…</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>

      <Menubar.Menu width={220}>
        <Menubar.Target>编辑</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item
            rightSection={
              <Text size="xs" c="dimmed">
                ⌘Z
              </Text>
            }
          >
            Undo
          </Menu.Item>
          <Menu.Item
            rightSection={
              <Text size="xs" c="dimmed">
                ⌘⇧Z
              </Text>
            }
          >
            Redo
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item>剪切</Menu.Item>
          <Menu.Item>复制</Menu.Item>
          <Menu.Item>粘贴</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>

      <Menubar.Menu width={220}>
        <Menubar.Target>帮助</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>文档</Menu.Item>
          <Menu.Item>键盘快捷键</Menu.Item>
          <Menu.Item>关于</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>
    </Menubar>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
