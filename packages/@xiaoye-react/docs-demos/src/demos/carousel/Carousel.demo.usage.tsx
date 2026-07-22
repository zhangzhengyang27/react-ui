import { Carousel } from '@xiaoye-react/carousel';
import { UIDemo } from '@xiaoye-react/demo';
import { Slides } from './_slides';

const code = `
import { Carousel } from '@xiaoye-react/carousel';

function Demo() {
  return (
    <Carousel withIndicators height={200}>
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
    <Carousel withIndicators height={200}>
      <Slides count={5} />
    </Carousel>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 320,
};
