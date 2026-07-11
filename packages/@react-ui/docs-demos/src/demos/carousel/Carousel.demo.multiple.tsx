import { Carousel } from '@react-ui/carousel';
import { MantineDemo } from '@react-ui/demo';
import { Slides } from './_slides';

const code = `
import { Carousel } from '@react-ui/carousel';

function Demo() {
  return (
    <Carousel
      withIndicators
      height={200}
      slideSize="33.333333%"
      slideGap="md"
      emblaOptions={{ loop: true, align: 'start', slidesToScroll: 3 }}
    >
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}
`;

function Demo() {
  return (
    <Carousel
      withIndicators
      height={200}
      slideSize="33.333333%"
      slideGap="md"
      emblaOptions={{ loop: true, align: 'start', slidesToScroll: 3 }}
    >
      <Slides count={12} />
    </Carousel>
  );
}

export const multiple: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
