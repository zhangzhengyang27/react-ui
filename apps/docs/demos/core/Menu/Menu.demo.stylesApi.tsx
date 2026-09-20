import { Menu, MenuProps } from '@xiaoye-react/ui';
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

function Demo(props: MenuProps) {
  return (
    // hide：锚点滚出视口后隐藏浮层。本 demo 常开，页面为异步水合（demo 逐个挂载
    // 导致布局后期位移），不隐藏时 shift 会把浮层钳制在视口内、漂浮在无关内容上
    <Menu {...props} middlewares={{ hide: true }} opened withArrow position="left" trapFocus={false}>
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
