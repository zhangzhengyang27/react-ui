import { Pagination } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

function Wrapper(props: any) {
  return <Pagination total={10} {...props} />;
}

const code = `
import { Pagination } from '@react-ui/ui';

function Demo() {
  return <Pagination total={10}{{props}} />;
}
`;

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    { prop: 'color', type: 'color', initialValue: 'blue', libraryValue: 'blue' },
    { prop: 'size', type: 'size', initialValue: 'md', libraryValue: 'md' },
    { prop: 'radius', type: 'size', initialValue: 'md', libraryValue: 'md' },
    { prop: 'withControls', type: 'boolean', initialValue: true, libraryValue: true },
    { prop: 'withEdges', type: 'boolean', initialValue: false, libraryValue: false },
    { prop: 'disabled', type: 'boolean', initialValue: false, libraryValue: false },
  ],
};
