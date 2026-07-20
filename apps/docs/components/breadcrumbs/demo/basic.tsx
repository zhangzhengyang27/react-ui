import React from 'react';
import { Breadcrumbs, Anchor } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Breadcrumbs>
      {['首页', '列表', '详情'].map((item) => (
        <Anchor href="#" key={item}>{item}</Anchor>
      ))}
    </Breadcrumbs>
  </DemoWrap>
);

export default App;
