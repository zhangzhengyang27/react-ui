import { Loader } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Loader } from '@react-ui/ui';

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
