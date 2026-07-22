import React from 'react';
import { TypographyStylesProvider } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <TypographyStylesProvider>
      <div dangerouslySetInnerHTML={{ __html: '<h1>标题</h1><p>段落内容</p>' }} />
    </TypographyStylesProvider>
  </DemoWrap>
);

export default App;
