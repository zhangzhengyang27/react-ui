import React from 'react';
import { Fieldset, TextInput } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Fieldset legend="个人信息">
      <TextInput label="姓名" placeholder="请输入姓名" />
    </Fieldset>
  </DemoWrap>
);

export default App;
