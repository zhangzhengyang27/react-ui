import React from 'react';
import { Menu, Button } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Menu>
      <Menu.Target>
        <Button>打开菜单</Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>复制</Menu.Item>
        <Menu.Item>粘贴</Menu.Item>
        <Menu.Item>删除</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  </DemoWrap>
);

export default App;
