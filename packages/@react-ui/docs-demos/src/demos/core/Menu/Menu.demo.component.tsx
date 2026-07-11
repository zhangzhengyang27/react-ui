import { ArrowSquareOutIcon } from '@phosphor-icons/react';
import { Button, Menu } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Menu, Button } from '@react-ui/ui';
import { ArrowSquareOutIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        <Button>Toggle menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item component="a" href="https://mantine.dev">
          ReactUI website
        </Menu.Item>
        <Menu.Item
          leftSection={<ArrowSquareOutIcon size={14} />}
          component="a"
          href="https://mantine.dev"
          target="_blank"
        >
          External link
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
`;

function Demo() {
  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        <Button>Toggle menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item component="a" href="https://mantine.dev">
          ReactUI website
        </Menu.Item>
        <Menu.Item
          leftSection={<ArrowSquareOutIcon size={14} />}
          component="a"
          href="https://mantine.dev"
          target="_blank"
        >
          External link
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export const component: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
