import { Menu, Menubar } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Menu, Menubar } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Menubar>
      <Menubar.Menu width={220}>
        <Menubar.Target>视图</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.CheckboxItem defaultChecked>显示侧边栏</Menu.CheckboxItem>
          <Menu.CheckboxItem>显示状态栏</Menu.CheckboxItem>
          <Menu.Divider />
          <Menu.Label>外观</Menu.Label>
          <Menu.RadioGroup defaultValue="comfortable">
            <Menu.RadioItem value="compact">紧凑</Menu.RadioItem>
            <Menu.RadioItem value="comfortable">舒适</Menu.RadioItem>
            <Menu.RadioItem value="spacious">宽松</Menu.RadioItem>
          </Menu.RadioGroup>
        </Menubar.Dropdown>
      </Menubar.Menu>

      <Menubar.Menu width={220}>
        <Menubar.Target>窗口</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>最小化</Menu.Item>
          <Menu.Item>缩放</Menu.Item>
          <Menu.Item>全部置于顶层</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>
    </Menubar>
  );
}
`;

function Demo() {
  return (
    <Menubar>
      <Menubar.Menu width={220}>
        <Menubar.Target>视图</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.CheckboxItem defaultChecked>显示侧边栏</Menu.CheckboxItem>
          <Menu.CheckboxItem>显示状态栏</Menu.CheckboxItem>
          <Menu.Divider />
          <Menu.Label>外观</Menu.Label>
          <Menu.RadioGroup defaultValue="comfortable">
            <Menu.RadioItem value="compact">紧凑</Menu.RadioItem>
            <Menu.RadioItem value="comfortable">舒适</Menu.RadioItem>
            <Menu.RadioItem value="spacious">宽松</Menu.RadioItem>
          </Menu.RadioGroup>
        </Menubar.Dropdown>
      </Menubar.Menu>

      <Menubar.Menu width={220}>
        <Menubar.Target>窗口</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>最小化</Menu.Item>
          <Menu.Item>缩放</Menu.Item>
          <Menu.Item>全部置于顶层</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>
    </Menubar>
  );
}

export const selectable: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
