import { Code } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Code } from '@xiaoye-react/ui';

function Demo() {
  return <Code>React.createElement()</Code>;
}
`;

function Demo() {
  return <Code>React.createElement()</Code>;
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
