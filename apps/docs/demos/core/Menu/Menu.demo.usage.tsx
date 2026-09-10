import { Menu } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { DemoMenuItems } from './_menu-items'

const code = `
import { Menu, Button, Text } from '@xiaoye-react/ui';
import { GearSixIcon } from '@phosphor-icons/react/dist/csr/GearSix';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass';
import { ImageIcon } from '@phosphor-icons/react/dist/csr/Image';
import { ChatCircleIcon } from '@phosphor-icons/react/dist/csr/ChatCircle';
import { TrashIcon } from '@phosphor-icons/react/dist/csr/Trash';
import { ArrowsLeftRightIcon } from '@phosphor-icons/react/dist/csr/ArrowsLeftRight';
function Demo() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button>切换菜单</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>应用</Menu.Label>
        <Menu.Item leftSection={<GearSixIcon size={14} />}>
          Settings
        </Menu.Item>
        <Menu.Item leftSection={<ChatCircleIcon size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<ImageIcon size={14} />}>
          Gallery
        </Menu.Item>
        <Menu.Item
          leftSection={<MagnifyingGlassIcon size={14} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>危险区域</Menu.Label>
        <Menu.Item
          leftSection={<ArrowsLeftRightIcon size={14} />}
        >
          Transfer my data
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<TrashIcon size={14} />}
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
`

function Demo() {
    return (
        <Menu shadow="md" width={200} withinPortal>
            <DemoMenuItems />
        </Menu>
    )
}

export const usage: UIDemo = {
    type: 'code',
    code,
    component: Demo,
    centered: true
}
