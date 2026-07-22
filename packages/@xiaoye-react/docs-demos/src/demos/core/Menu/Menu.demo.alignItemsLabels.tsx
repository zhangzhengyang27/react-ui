import { Menu, MenuProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

function Wrapper(props: MenuProps) {
  return (
    <Menu opened trapFocus={false} closeOnItemClick={false} width={240} shadow="md" {...props}>
      <Menu.Target>
        <button type="button">切换菜单</button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>查看详情</Menu.Item>
        <Menu.Item>复制</Menu.Item>
        <Menu.Divider />
        <Menu.CheckboxItem defaultChecked>已固定</Menu.CheckboxItem>
        <Menu.CheckboxItem>已归档</Menu.CheckboxItem>
        <Menu.Divider />
        <Menu.RadioGroup defaultValue="newest">
          <Menu.RadioItem value="newest">最新的在前</Menu.RadioItem>
          <Menu.RadioItem value="oldest">最旧的在前</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Dropdown>
    </Menu>
  );
}

const code = `
import { Menu } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Menu{{props}}>
      <Menu.Target>
        <button type="button">切换菜单</button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>查看详情</Menu.Item>
        <Menu.Item>复制</Menu.Item>
        <Menu.Divider />
        <Menu.CheckboxItem defaultChecked>已固定</Menu.CheckboxItem>
        <Menu.CheckboxItem>已归档</Menu.CheckboxItem>
        <Menu.Divider />
        <Menu.RadioGroup defaultValue="newest">
          <Menu.RadioItem value="newest">最新的在前</Menu.RadioItem>
          <Menu.RadioItem value="oldest">最旧的在前</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Dropdown>
    </Menu>
  );
}
`;

export const alignItemsLabels: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      prop: 'alignItemsLabels',
      type: 'select',
      initialValue: 'with-indicators',
      libraryValue: 'with-indicators',
      data: [
        { label: 'with-indicators', value: 'with-indicators' },
        { label: 'all', value: 'all' },
        { label: 'none', value: 'none' },
      ],
    },
  ],
};
