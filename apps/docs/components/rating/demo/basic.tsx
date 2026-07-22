import React, { useState } from 'react';
import { Rating } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState(3);
  return (
    <DemoWrap>
      <Rating value={value} onChange={setValue} />
    </DemoWrap>
  );
};

export default App;
