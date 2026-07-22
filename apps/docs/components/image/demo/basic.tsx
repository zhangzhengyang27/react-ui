import React from 'react';
import { Image } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Image
      radius="md"
      src="https://images.unsplash.com/photo-1527118732049-c88155f2107c?w=400"
      style={{ width: 200 }}
    />
  </DemoWrap>
);

export default App;
