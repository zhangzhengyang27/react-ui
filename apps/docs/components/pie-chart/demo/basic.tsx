import React from 'react';
import { PieChart } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <PieChart
      data={[
        { name: '一月', value: 400 },
        { name: '二月', value: 300 },
        { name: '三月', value: 200 },
        { name: '四月', value: 278 },
        { name: '五月', value: 189 },
      ]}
      nameKey="name"
      valueKey="value"
      colors={['blue.6', 'cyan.6', 'teal.6', 'violet.6', 'grape.6']}
      h={300}
    />
  </DemoWrap>
);

export default App;
