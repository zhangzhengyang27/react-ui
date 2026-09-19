import React from 'react';
import { MediaQuery, Text } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    {/* MediaQuery 只接受 query 属性：命中媒体查询时才渲染 children */}
    <MediaQuery query="(min-width: 768px)">
      <Text>仅在视口宽度不小于 768px 时显示</Text>
    </MediaQuery>
  </DemoWrap>
);

export default App;
