import React from 'react';
import { FileButton, Button } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <FileButton onChange={(file) => console.log(file)}>
      {({ onClick }) => <Button onClick={onClick}>上传文件</Button>}
    </FileButton>
  </DemoWrap>
);

export default App;
