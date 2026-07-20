import { Menu, Menubar } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { MenubarStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { Menu, Menubar } from '@react-ui/ui';

function Demo() {
  return (
    <Menubar{{props}}>
      <Menubar.Menu width={220}>
        <Menubar.Target>文件</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>新建文件</Menu.Item>
          <Menu.Item>保存</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>

      <Menubar.Menu width={220}>
        <Menubar.Target>编辑</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>撤销</Menu.Item>
          <Menu.Item>重做</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>
    </Menubar>
  );
}
`;

function Demo(props: any) {
  return (
    <Menubar {...props}>
      <Menubar.Menu width={220}>
        <Menubar.Target>文件</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>新建文件</Menu.Item>
          <Menu.Item>保存</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>

      <Menubar.Menu width={220}>
        <Menubar.Target>编辑</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>撤销</Menu.Item>
          <Menu.Item>重做</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>
    </Menubar>
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: MenubarStylesApi,
  component: Demo,
  code,
  centered: true,
};
