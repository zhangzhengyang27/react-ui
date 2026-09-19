import React, { useState } from 'react';
import { HueSlider, Text } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  // HueSlider 是受控组件：value 为 0 ~ 360 的色相角度
  const [value, setValue] = useState(250);

  return (
    <DemoWrap>
      <div style={{ width: 240 }}>
        <Text size="sm">色相值：{value}</Text>
        <HueSlider value={value} onChange={setValue} />
      </div>
    </DemoWrap>
  );
};

export default App;
