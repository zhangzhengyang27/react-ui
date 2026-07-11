import { Menu } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { DemoMenuItems } from './_menu-items';

const code = `
import { Menu } from '@react-ui/ui';

function Demo() {
  return (
    <Menu transitionProps={{ transition: 'rotate-right', duration: 150 }}>
      {/* Menu content */}
    </Menu>
  );
}
`;

function Demo() {
  return (
    <Menu transitionProps={{ transition: 'rotate-right', duration: 150 }}>
      <DemoMenuItems />
    </Menu>
  );
}

export const transitions: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
