import {
  ArrowsLeftRightIcon,
  ChatCircleIcon,
  GearSixIcon,
  ImageIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import { Button, Menu } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Menu, Button } from '@react-ui/ui';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Menu>
      <Menu.Target>
        <Button>切换菜单</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<MagnifyingGlassIcon size={14} />}
          disabled
        >
          Search
        </Menu.Item>

        {/* Other items ... */}
      </Menu.Dropdown>
    </Menu>
  );
}
`;

function Demo() {
  return (
    <Menu>
      <Menu.Target>
        <Button>切换菜单</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>应用</Menu.Label>
        <Menu.Item leftSection={<GearSixIcon size={14} />}>设置</Menu.Item>
        <Menu.Item leftSection={<ChatCircleIcon size={14} />}>消息</Menu.Item>
        <Menu.Item leftSection={<ImageIcon size={14} />}>相册</Menu.Item>
        <Menu.Item leftSection={<MagnifyingGlassIcon size={14} />} disabled>
          Search
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>危险区域</Menu.Label>
        <Menu.Item leftSection={<ArrowsLeftRightIcon size={14} />}>转移我的数据</Menu.Item>
        <Menu.Item color="red" leftSection={<TrashIcon size={14} />}>
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export const disabled: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
