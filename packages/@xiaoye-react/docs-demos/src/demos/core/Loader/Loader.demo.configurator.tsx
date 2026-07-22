import { Loader } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Loader } from '@xiaoye-react/ui';

function Demo() {
  return <Loader{{props}} />;
}
`;

export const configurator: UIDemo = {
  type: 'configurator',
  component: Loader,
  code,
  centered: true,
  controls: [
    { type: 'color', prop: 'color', initialValue: 'blue', libraryValue: null },
    { type: 'size', prop: 'size', initialValue: 'md', libraryValue: 'md' },
    {
      type: 'segmented',
      prop: 'type',
      data: ['oval', 'bars', 'dots'],
      initialValue: 'oval',
      libraryValue: 'oval',
    },
  ],
};
