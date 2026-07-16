import { Group, Menu } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { DemoMenuItems } from './_menu-items';

const code = `
import { Group, Menu } from '@react-ui/ui';

function Demo() {
  const menus = Array(4)
    .fill(0)
    .map((e, i) => (
      <Menu
        key={i}
        trigger="click-hover"
        loop={false}
        withinPortal={false}
        trapFocus={false}
        menuItemTabIndex={0}
      >
        {/* ... menu items */}
      </Menu>
    ));
  return <Group>{menus}</Group>;
}
`;

function Demo() {
  const menus = Array(4)
    .fill(0)
    .map((_, i) => (
      <Menu
        key={i}
        trigger="click-hover"
        loop={false}
        withinPortal={false}
        trapFocus={false}
        menuItemTabIndex={0}
      >
        <DemoMenuItems />
      </Menu>
    ));
  return <Group>{menus}</Group>;
}

export const navigation: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
