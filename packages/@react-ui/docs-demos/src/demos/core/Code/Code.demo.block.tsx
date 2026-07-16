import { Code } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Code } from '@react-ui/ui';

const codeForPreviousDemo = \`import { Code } from '@react-ui/ui';

function Demo() {
  return <Code>React.createElement()</Code>;
}\`;

function Demo() {
  return <Code block>{codeForPreviousDemo}</Code>;
}
`;

const codeForPreviousDemo = `import { Code } from '@react-ui/ui';

function Demo() {
  return <Code>React.createElement()</Code>;
}`;

function Demo() {
  return <Code block>{codeForPreviousDemo}</Code>;
}

export const block: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
