import { Marquee, MarqueeProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { UILogo } from '@xiaoye-react/logo';

function Wrapper(props: Partial<MarqueeProps>) {
  return (
    <Marquee {...props} mah={200} maw={400}>
      <UILogo size={120} type="full" color="blue" />
      <UILogo size={120} type="full" color="cyan" />
      <UILogo size={120} type="full" color="teal" />
      <UILogo size={120} type="full" color="green" />
      <UILogo size={120} type="full" color="lime" />
      <UILogo size={120} type="full" color="yellow" />
      <UILogo size={120} type="full" color="orange" />
      <UILogo size={120} type="full" color="red" />
    </Marquee>
  );
}

const code = `
import { Marquee } from '@xiaoye-react/ui';
import { UILogo } from '@xiaoye-react/logo';

function Demo() {
  return (
    <Marquee{{props}} mah={200} maw={400}>
      <UILogo size={120} type="full" color="blue" />
      <UILogo size={120} type="full" color="cyan" />
      <UILogo size={120} type="full" color="teal" />
      <UILogo size={120} type="full" color="green" />
      <UILogo size={120} type="full" color="lime" />
      <UILogo size={120} type="full" color="yellow" />
      <UILogo size={120} type="full" color="orange" />
      <UILogo size={120} type="full" color="red" />
    </Marquee>
  );
}
`;

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 400,
  controls: [
    { prop: 'reverse', type: 'boolean', initialValue: false, libraryValue: false },
    { prop: 'pauseOnHover', type: 'boolean', initialValue: false, libraryValue: false },
    {
      prop: 'orientation',
      type: 'segmented',
      data: ['horizontal', 'vertical'],
      initialValue: 'horizontal',
      libraryValue: 'horizontal',
    },
    { prop: 'repeat', type: 'number', min: 1, max: 10, initialValue: 4, libraryValue: 4 },
    {
      prop: 'duration',
      type: 'number',
      min: 5000,
      max: 100000,
      step: 1000,
      initialValue: 40000,
      libraryValue: 40000,
    },
    { prop: 'gap', type: 'size', initialValue: 'md', libraryValue: 'md' },
    { prop: 'fadeEdges', type: 'boolean', initialValue: true, libraryValue: true },
  ],
};
