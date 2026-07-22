import { Badge } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Badge } from '@xiaoye-react/ui';

function Demo() {
  return <Badge{{props}}>徽章</Badge>;
}
`;

function Wrapper(props: any) {
  return <Badge {...props}>徽章</Badge>;
}

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      prop: 'variant',
      type: 'select',
      initialValue: 'filled',
      libraryValue: 'filled',
      data: ['filled', 'light', 'outline', 'dot', 'transparent', 'default', 'white'],
    },
    { type: 'color', prop: 'color', initialValue: 'blue', libraryValue: null },
    { type: 'size', prop: 'size', initialValue: 'md', libraryValue: 'md' },
    { type: 'size', prop: 'radius', initialValue: 'xl', libraryValue: 'xl' },
  ],
};
