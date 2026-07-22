import { UIDemo } from '@xiaoye-react/demo';
import { UILogo } from '@xiaoye-react/logo';

const code = `
import { UILogo } from '@xiaoye-react/logo';

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
