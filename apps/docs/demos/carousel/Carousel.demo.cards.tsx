import { Carousel, CarouselProps } from '@xiaoye-react/carousel';
import { Button, Paper, Text, Title, useUITheme } from '@xiaoye-react/ui';
import { useMediaQuery } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';
import classes from './Carousel.demo.cards.module.css';

const cssCode = `.card {
  height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-size: cover;
  background-position: center;
}

.title {
  font-weight: 900;
  color: var(--ui-color-white);
  line-height: 1.2;
  font-size: 32px;
  margin-top: var(--ui-spacing-xs);
  cursor: default;
}

.category {
  color: var(--ui-color-white);
  opacity: 0.7;
  font-weight: 700;
  text-transform: uppercase;
  cursor: default;
}
`;

const code = `
import { Carousel } from '@xiaoye-react/carousel';
import { useMediaQuery } from '@xiaoye-react/hooks';
import { Button, Paper, Title, useUITheme, Text } from '@xiaoye-react/ui';
import classes from './Demo.module.css';

const data = [
  {
    image:
      '/demo/images/card-1.jpg',
    title: '北美最佳森林游览地',
    category: 'nature',
  },
  {
    image:
      '/demo/images/card-2.jpg',
    title: '夏威夷海滩评测：比你想象的更好',
    category: 'beach',
  },
  {
    image:
      '/demo/images/card-3.jpg',
    title: '夜间山脉：12 个最佳观景点',
    category: 'nature',
  },
  {
    image:
      '/demo/images/card-4.jpg',
    title: '挪威极光：最佳观赏时间',
    category: 'nature',
  },
  {
    image:
      '/demo/images/card-5.jpg',
    title: '今年冬天最佳旅游目的地',
    category: 'tourism',
  },
  {
    image:
      '/demo/images/card-6.jpg',
    title: '活火山评测：旅行风险自负',
    category: 'nature',
  },
];

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  return (
    <Paper
      shadow="md"
      p="xl"
      style={{ backgroundImage: \`url(\${image})\` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Read article
      </Button>
    </Paper>
  );
}

function Demo() {
  const theme = useUITheme();
  const mobile = useMediaQuery(\`(max-width: \${theme.breakpoints.sm})\`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize={{ base: '100%', sm: '50%' }}
      slideGap={{ base: 'xl', sm: 2 }}
      emblaOptions={{ align: 'start', slidesToScroll: mobile ? 1 : 2 }}
    >
      {slides}
    </Carousel>
  );
}
`;

const data = [
  {
    image:
      '/demo/images/card-1.jpg',
    title: '北美最佳森林游览地',
    category: 'nature',
  },
  {
    image:
      '/demo/images/card-2.jpg',
    title: '夏威夷海滩评测：比你想象的更好',
    category: 'beach',
  },
  {
    image:
      '/demo/images/card-3.jpg',
    title: '夜间山脉：12 个最佳观景点',
    category: 'nature',
  },
  {
    image:
      '/demo/images/card-4.jpg',
    title: '挪威极光：最佳观赏时间',
    category: 'nature',
  },
  {
    image:
      '/demo/images/card-5.jpg',
    title: '今年冬天最佳旅游目的地',
    category: 'tourism',
  },
  {
    image:
      '/demo/images/card-6.jpg',
    title: '活火山评测：旅行风险自负',
    category: 'nature',
  },
];

interface CardProps {
  image: string;
  title: string;
  category: string;
}

export function Card({ image, title, category }: CardProps) {
  return (
    <Paper shadow="md" p="xl" style={{ backgroundImage: `url(${image})` }} className={classes.card}>
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Read article
      </Button>
    </Paper>
  );
}

export function CarouselCardsDemos(props: CarouselProps) {
  const theme = useUITheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize={{ base: '100%', sm: '50%' }}
      slideGap={{ base: 'xl', sm: 2 }}
      emblaOptions={{ align: 'start', slidesToScroll: mobile ? 1 : 2 }}
      {...props}
    >
      {slides}
    </Carousel>
  );
}

export const cards: UIDemo = {
  type: 'code',
  component: CarouselCardsDemos,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
  ],
};
