import { Carousel } from '@xiaoye-react/carousel';
import { Image } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { images as _images } from './_images';

const code = `
import { Carousel } from '@xiaoye-react/carousel';
import { Image } from '@xiaoye-react/ui';

const images = [
  'https://raw.githubusercontent.com/uidev/ui/master/.demo/images/bg-1.png',
  'https://raw.githubusercontent.com/uidev/ui/master/.demo/images/bg-2.png',
  'https://raw.githubusercontent.com/uidev/ui/master/.demo/images/bg-3.png',
  'https://raw.githubusercontent.com/uidev/ui/master/.demo/images/bg-4.png',
  'https://raw.githubusercontent.com/uidev/ui/master/.demo/images/bg-5.png',
];

function Demo() {
  const slides = images.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} />
    </Carousel.Slide>
  ));

  return (
    <Carousel withIndicators height={200}>
      {slides}
    </Carousel>
  );
}
`;

function Demo() {
  const slides = _images.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} />
    </Carousel.Slide>
  ));

  return (
    <Carousel withIndicators height={200}>
      {slides}
    </Carousel>
  );
}

export const images: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 380,
  centered: true,
};
