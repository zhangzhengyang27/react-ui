import { createContextContainer, tests } from '@xiaoye-react/tests';
import { Carousel } from '../Carousel';
import { CarouselSlide, CarouselSlideProps, CarouselSlideStylesNames } from './CarouselSlide';

const TestContainer = createContextContainer(CarouselSlide, Carousel, {});

const defaultProps: CarouselSlideProps = {};

describe('@xiaoye-react/carousel/CarouselSlide', () => {
  tests.itSupportsSystemProps<CarouselSlideProps, CarouselSlideStylesNames>({
    component: TestContainer,
    props: defaultProps,
    displayName: '@xiaoye-react/carousel/CarouselSlide',
    stylesApiSelectors: ['slide'],
    providerStylesApi: false,
    selector: '.ui-Carousel-slide',
    stylesApiName: 'Carousel',
    compound: true,
  });

  tests.itThrowsContextError({
    component: CarouselSlide,
    props: defaultProps,
    error: 'Carousel component was not found in tree',
  });
});
