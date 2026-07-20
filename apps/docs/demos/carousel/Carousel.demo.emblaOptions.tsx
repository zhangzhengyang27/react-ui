import { Carousel } from '@react-ui/carousel';
import { UIDemo } from '@react-ui/demo';
import { Slides } from './_slides';

function Wrapper(props: any) {
  return (
    <Carousel height={200} slideSize="70%" slideGap="md" emblaOptions={props}>
      <Slides count={5} />
    </Carousel>
  );
}

const code = (props: any) => `
import { Carousel } from '@react-ui/carousel';

function Demo() {
  return (
    <Carousel
      slideSize="70%"
      height={200}
      emblaOptions={{
        loop: ${props.loop},
        dragFree: ${props.dragFree},
        align: '${props.align}'
      }}
    >
      {/* ...slides */}
    </Carousel>
  );
}
`;

export const emblaOptions: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: '100%',
  controls: [
    {
      prop: 'align',
      type: 'segmented',
      initialValue: 'center',
      libraryValue: '__',
      data: [
        { label: '起点', value: 'start' },
        { label: '居中', value: 'center' },
        { label: '终点', value: 'end' },
      ],
    },
    { prop: 'loop', type: 'boolean', initialValue: true, libraryValue: '__' },
    { prop: 'dragFree', type: 'boolean', initialValue: false, libraryValue: '__' },
  ],
};
