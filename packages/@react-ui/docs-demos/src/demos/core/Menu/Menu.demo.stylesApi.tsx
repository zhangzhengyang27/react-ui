import { Menu } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { MenuStylesApi } from '@react-ui/docs-styles-api';
import { DemoMenuItems } from './_menu-items';

const code = `
import { Menu } from '@react-ui/ui';

function Demo() {
  return (
    <Menu {...props} opened withArrow position="left">
      {/* ... menu items */}
    </Menu>
  );
}
`;

function Demo(props: any) {
  return (
    <Menu {...props} opened withArrow position="left" trapFocus={false}>
      <DemoMenuItems />
    </Menu>
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: MenuStylesApi,
  component: Demo,
  code,
  centered: true,
};
