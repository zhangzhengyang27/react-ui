import { Menu } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
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

export const transitions: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
