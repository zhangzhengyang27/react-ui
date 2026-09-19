import { Button, Menu } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Menu } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Menu width={200} position="bottom-start">
      <Menu.Target>
        <Button>切换菜单</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>仪表盘</Menu.Item>

        <Menu.Sub openDelay={120} closeDelay={150}>
          <Menu.Sub.Target>
            <Menu.Sub.Item>产品</Menu.Sub.Item>
          </Menu.Sub.Target>

          <Menu.Sub.Dropdown>
            <Menu.Item>所有产品</Menu.Item>
            <Menu.Item>分类</Menu.Item>
            <Menu.Item>标签</Menu.Item>
            <Menu.Item>属性</Menu.Item>
            <Menu.Item>配送类别</Menu.Item>
          </Menu.Sub.Dropdown>
        </Menu.Sub>

        <Menu.Item>客户</Menu.Item>
        <Menu.Item>报表</Menu.Item>

        <Menu.Sub>
          <Menu.Sub.Target>
            <Menu.Sub.Item>订单</Menu.Sub.Item>
          </Menu.Sub.Target>

          <Menu.Sub.Dropdown>
            <Menu.Item>打开</Menu.Item>
            <Menu.Item>已完成</Menu.Item>
            <Menu.Item>已取消</Menu.Item>
          </Menu.Sub.Dropdown>
        </Menu.Sub>

        <Menu.Sub>
          <Menu.Sub.Target>
            <Menu.Sub.Item>设置</Menu.Sub.Item>
          </Menu.Sub.Target>

          <Menu.Sub.Dropdown>
            <Menu.Item>个人资料</Menu.Item>
            <Menu.Item>安全</Menu.Item>
            <Menu.Item>通知</Menu.Item>
          </Menu.Sub.Dropdown>
        </Menu.Sub>
      </Menu.Dropdown>
    </Menu>
  );
}
`;

function Demo() {
  return (
    <Menu width={200} position="bottom-start">
      <Menu.Target>
        <Button>切换菜单</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>仪表盘</Menu.Item>

        <Menu.Sub>
          <Menu.Sub.Target>
            <Menu.Sub.Item>产品</Menu.Sub.Item>
          </Menu.Sub.Target>

          <Menu.Sub.Dropdown>
            <Menu.Item>所有产品</Menu.Item>
            <Menu.Item>分类</Menu.Item>
            <Menu.Item>标签</Menu.Item>
            <Menu.Item>属性</Menu.Item>
            <Menu.Item>配送类别</Menu.Item>
          </Menu.Sub.Dropdown>
        </Menu.Sub>

        <Menu.Item>客户</Menu.Item>
        <Menu.Item>报表</Menu.Item>

        <Menu.Sub>
          <Menu.Sub.Target>
            <Menu.Sub.Item>订单</Menu.Sub.Item>
          </Menu.Sub.Target>

          <Menu.Sub.Dropdown>
            <Menu.Item>打开</Menu.Item>
            <Menu.Item>已完成</Menu.Item>
            <Menu.Item>已取消</Menu.Item>
          </Menu.Sub.Dropdown>
        </Menu.Sub>

        <Menu.Sub>
          <Menu.Sub.Target>
            <Menu.Sub.Item>设置</Menu.Sub.Item>
          </Menu.Sub.Target>

          <Menu.Sub.Dropdown>
            <Menu.Item>个人资料</Menu.Item>
            <Menu.Item>安全</Menu.Item>
            <Menu.Item>通知</Menu.Item>
          </Menu.Sub.Dropdown>
        </Menu.Sub>
      </Menu.Dropdown>
    </Menu>
  );
}

export const sub: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
