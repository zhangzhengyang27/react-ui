import React from 'react';
import { ScatterChart } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <ScatterChart
      data={[
        { x: 10, y: 20 },
        { x: 15, y: 10 },
        { x: 25, y: 30 },
        { x: 30, y: 25 },
        { x: 40, y: 35 },
      ]}
      xAxisKey="x"
      yAxisKey="y"
      color="blue.6"
      h={300}
    />
  </DemoWrap>
);

export default App;
