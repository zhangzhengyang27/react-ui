import { SegmentedControl } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { SegmentedControl } from '@xiaoye-react/ui';

function Demo() {
  return <SegmentedControl{{props}} data={['React', 'Angular', 'Vue', 'Svelte']} />;
}
`;

function Wrapper(props: any) {
  return <SegmentedControl data={['React', 'Angular', 'Vue', 'Svelte']} {...props} />;
}

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [{ prop: 'color', type: 'color', initialValue: 'blue', libraryValue: null }],
};
