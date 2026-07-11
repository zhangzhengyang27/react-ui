import { Kbd } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Kbd } from '@react-ui/ui';

function Demo() {
  return <Kbd{{props}}>Shift</Kbd>;
}
`;

function Wrapper(props: any) {
  return <Kbd {...props}>Shift</Kbd>;
}

export const size: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [{ type: 'size', prop: 'size', initialValue: 'sm', libraryValue: 'sm' }],
};
