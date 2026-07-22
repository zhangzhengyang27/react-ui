import { Code } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Code } from '@xiaoye-react/ui';

const codeForPreviousDemo = \`import { Code } from '@xiaoye-react/ui';

function Demo() {
  return <Code>React.createElement()</Code>;
}\`;

function Demo() {
  return <Code block>{codeForPreviousDemo}</Code>;
}
`;

const codeForPreviousDemo = `import { Code } from '@xiaoye-react/ui';

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
