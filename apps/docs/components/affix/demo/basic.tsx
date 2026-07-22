import React from 'react';
import { Affix, Button } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <div style={{ height: 120, position: 'relative' }}>
      <Affix position={{ bottom: 10, right: 10 }}>
        <Button size="xs">Affix</Button>
      </Affix>
    </div>
  </DemoWrap>
);

export default App;
