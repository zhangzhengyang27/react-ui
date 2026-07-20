import React from 'react';
import { Carousel, Center, Text } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Carousel withIndicators height={200}>
      {['1', '2', '3'].map((i) => (
        <Carousel.Slide key={i}>
          <Center h="100%" bg="blue.6">
            <Text c="#fff">Slide {i}</Text>
          </Center>
        </Carousel.Slide>
      ))}
    </Carousel>
  </DemoWrap>
);

export default App;
