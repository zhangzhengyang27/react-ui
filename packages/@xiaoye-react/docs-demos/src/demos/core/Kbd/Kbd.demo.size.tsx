import { Kbd } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Kbd } from '@xiaoye-react/ui';

function Demo() {
  return <Kbd{{props}}>Shift</Kbd>;
}
`;

function Wrapper(props: any) {
  return <Kbd {...props}>Shift</Kbd>;
}

export const size: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [{ type: 'size', prop: 'size', initialValue: 'sm', libraryValue: 'sm' }],
};
