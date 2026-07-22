import { Carousel } from '@xiaoye-react/carousel';
import { UIDemo } from '@xiaoye-react/demo';
import { Slides } from './_slides';
import classes from './Carousel.demo.controlsStyles.module.css';

const cssCode = `
.control {
  &[data-inactive] {
    opacity: 0;
    cursor: default;
  }
}
`;

const code = `
import { Carousel } from '@xiaoye-react/carousel';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Carousel height={200} classNames={classes}>
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
    <Carousel height={200} classNames={classes}>
      <Slides count={5} />
    </Carousel>
  );
}

export const controlsStyles: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
  ],
  centered: true,
  maxWidth: 320,
};
