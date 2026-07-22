import React from 'react';
import { DataList } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <DataList>
      <DataList.Item>
        <DataList.ItemLabel>姓名</DataList.ItemLabel>
        <DataList.ItemValue>张三</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>邮箱</DataList.ItemLabel>
        <DataList.ItemValue>zhangsan@example.com</DataList.ItemValue>
      </DataList.Item>
    </DataList>
  </DemoWrap>
);

export default App;
