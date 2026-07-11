import { Code } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Code } from '@react-ui/ui';

function Demo() {
  return <Code>React.createElement()</Code>;
}
`;

function Demo() {
  return <Code>React.createElement()</Code>;
}

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
