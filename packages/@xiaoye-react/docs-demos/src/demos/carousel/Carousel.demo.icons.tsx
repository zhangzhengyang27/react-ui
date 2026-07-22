import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { Carousel } from '@xiaoye-react/carousel';
import { UIDemo } from '@xiaoye-react/demo';
import { Slides } from './_slides';

const code = `
import { Carousel } from '@xiaoye-react/carousel';
import { ArrowRightIcon, ArrowLeftIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Carousel
      height={180}
      nextControlIcon={<ArrowRightIcon size={16} />}
      previousControlIcon={<ArrowLeftIcon size={16} />}
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
      height={180}
      nextControlIcon={<ArrowRightIcon size={16} />}
      previousControlIcon={<ArrowLeftIcon size={16} />}
    >
      <Slides count={5} />
    </Carousel>
  );
}

export const icons: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 320,
};
