import React, { useState } from 'react';
import { AlphaSlider, Text } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  // AlphaSlider 是受控组件：value 为 0 ~ 1 的透明度，color 决定渐变右侧的目标色
  const [value, setValue] = useState(0.55);

  return (
    <DemoWrap>
      <div style={{ width: 240 }}>
        <Text size="sm">Alpha 值：{value}</Text>
        <AlphaSlider color="#1c7ed6" value={value} onChange={setValue} />
      </div>
    </DemoWrap>
  );
};

export default App;
