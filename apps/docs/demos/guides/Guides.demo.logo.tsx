import { UIDemo } from '@react-ui/demo';
import { UILogo } from '@react-ui/logo';

const code = `
import { UILogo } from '@react-ui/logo';

function Demo() {
  return <UILogo{{props}} />;
}
`;

export const logo: UIDemo = {
  type: 'configurator',
  component: UILogo,
  code,
  centered: true,
  controls: [
    { type: 'color', prop: 'color', initialValue: 'blue', libraryValue: null },
    {
      type: 'segmented',
      prop: 'type',
      data: ['full', 'mark'],
      initialValue: 'full',
      libraryValue: 'full',
    },
    { prop: 'size', type: 'number', initialValue: 30, libraryValue: 30, max: 50, min: 10, step: 5 },
  ],
};
