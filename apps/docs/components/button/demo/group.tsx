import React from 'react';
import { Button } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Button.Group>
      <Button variant="default">Prev</Button>
      <Button variant="default">Current</Button>
      <Button variant="default">Next</Button>
    </Button.Group>
  </DemoWrap>
);

export default App;
