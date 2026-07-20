import { Avatar } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { staticVariantsControl } from '../../shared';

const code = `
import { Avatar } from '@react-ui/ui';

function Demo() {
  return <Avatar{{props}} />;
}
`;

export const configurator: UIDemo = {
  type: 'configurator',
  component: Avatar,
  centered: true,
  code,
  controls: [
    staticVariantsControl,
    { prop: 'radius', type: 'size', initialValue: 'md', libraryValue: '100%' },
    { prop: 'size', type: 'size', initialValue: 'md', libraryValue: 'md' },
    { prop: 'color', type: 'color', initialValue: 'gray', libraryValue: 'gray' },
    {
      prop: 'src',
      type: 'string',
      initialValue: '',
      libraryValue: null,
    },
  ],
};
