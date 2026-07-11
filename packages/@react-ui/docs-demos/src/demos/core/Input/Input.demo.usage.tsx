import { Input } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { inputOnlyControls } from '../../../shared';

const code = `
import { Input } from '@react-ui/ui';

function Demo() {
  return <Input{{props}} placeholder="Input component" />;
}
`;

function Wrapper(props: any) {
  return <Input placeholder="Input component" {...props} />;
}

export const usage: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputOnlyControls,
};
