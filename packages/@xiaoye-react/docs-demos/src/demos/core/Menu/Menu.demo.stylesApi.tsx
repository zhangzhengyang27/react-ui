import { Menu } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { MenuStylesApi } from '@xiaoye-react/docs-styles-api';
import { DemoMenuItems } from './_menu-items';

const code = `
import { Menu } from '@xiaoye-react/ui';

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
