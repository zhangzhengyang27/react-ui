import React from 'react';
import { RadarChart } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <RadarChart
      data={[
        { name: '一月', value: 400 },
        { name: '二月', value: 300 },
        { name: '三月', value: 200 },
        { name: '四月', value: 278 },
        { name: '五月', value: 189 },
      ]}
      dataKey="name"
      series={[{ name: 'value', color: 'blue.6' }]}
      h={300}
    />
  </DemoWrap>
);

export default App;
