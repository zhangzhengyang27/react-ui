import { Menu } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { DemoMenuItems } from './_menu-items';

const code = `
import { Menu } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Menu trigger="hover" openDelay={100} closeDelay={400}>
      {/* ... menu items */}
    </Menu>
  );
}
`;

function Demo() {
  return (
    <Menu trigger="hover" openDelay={100} closeDelay={400}>
      <DemoMenuItems />
    </Menu>
  );
}

export const hover: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
