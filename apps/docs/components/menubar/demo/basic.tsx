import React from 'react';
import { Menubar, Menu } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Menubar>
      <Menubar.Menu>
        <Menubar.Target>文件</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>新建</Menu.Item>
          <Menu.Item>打开</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Target>编辑</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>撤销</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>
    </Menubar>
  </DemoWrap>
);

export default App;
