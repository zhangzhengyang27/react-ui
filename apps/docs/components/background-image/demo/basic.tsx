import React from 'react';
import { BackgroundImage, Center, Text } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <BackgroundImage
      src="https://images.unsplash.com/photo-1527118732049-c88155f2107c?w=400"
      radius="sm"
      h={160}
    >
      <Center p="md" h="100%">
        <Text c="#fff" fw={700}>背景图片</Text>
      </Center>
    </BackgroundImage>
  </DemoWrap>
);

export default App;
