import { Menu } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { DemoMenuItems } from './_menu-items';

const code = `
import { Menu } from '@xiaoye-react/ui';

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
