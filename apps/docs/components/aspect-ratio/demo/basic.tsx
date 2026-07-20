import React from 'react';
import { AspectRatio, Image } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <AspectRatio ratio={16 / 9} maw={300}>
      <Image src="https://images.unsplash.com/photo-1527118732049-c88155f2107c?w=400" />
    </AspectRatio>
  </DemoWrap>
);

export default App;
