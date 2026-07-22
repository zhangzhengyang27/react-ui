import { Menu, Menubar } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Menu, Menubar } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Menubar trigger="hover">
      <Menubar.Menu width={220}>
        <Menubar.Target>文件</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>新建文件</Menu.Item>
          <Menu.Item>新建窗口</Menu.Item>
          <Menu.Item>保存</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>

      <Menubar.Menu width={220}>
        <Menubar.Target>编辑</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>撤销</Menu.Item>
          <Menu.Item>重做</Menu.Item>
          <Menu.Item>剪切</Menu.Item>
          <Menu.Item>复制</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>

      <Menubar.Menu width={220}>
        <Menubar.Target>视图</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>放大</Menu.Item>
          <Menu.Item>缩小</Menu.Item>
          <Menu.Item>重置缩放</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>
    </Menubar>
  );
}
`;

function Demo() {
  return (
    <Menubar trigger="hover">
      <Menubar.Menu width={220}>
        <Menubar.Target>文件</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>新建文件</Menu.Item>
          <Menu.Item>新建窗口</Menu.Item>
          <Menu.Item>保存</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>

      <Menubar.Menu width={220}>
        <Menubar.Target>编辑</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>撤销</Menu.Item>
          <Menu.Item>重做</Menu.Item>
          <Menu.Item>剪切</Menu.Item>
          <Menu.Item>复制</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>

      <Menubar.Menu width={220}>
        <Menubar.Target>视图</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>放大</Menu.Item>
          <Menu.Item>缩小</Menu.Item>
          <Menu.Item>重置缩放</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>
    </Menubar>
  );
}

export const hover: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
