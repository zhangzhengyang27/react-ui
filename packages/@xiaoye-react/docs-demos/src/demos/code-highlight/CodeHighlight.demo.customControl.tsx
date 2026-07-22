import { ChatCircleIcon, CodesandboxLogoIcon } from '@phosphor-icons/react';
import { CodeHighlight, CodeHighlightControl } from '@xiaoye-react/code-highlight';
import { UIDemo } from '@xiaoye-react/demo';

const exampleCode = `
function greet() {
  return 'Hello, World!';
}
`;

const code = `
import { CodesandboxLogoIcon, ChatCircleIcon } from '@phosphor-icons/react';
import { CodeHighlight, CodeHighlightControl } from '@xiaoye-react/code-highlight';

const exampleCode = \`${exampleCode}\`;

function Demo() {
  return (
    <CodeHighlight
      code={exampleCode}
      language="tsx"
      radius="md"
      controls={[
        <CodeHighlightControl
          component="a"
          href="https://codesandbox.io"
          target="_blank"
          tooltipLabel="在 CodeSandbox 中打开"
          key="sandbox"
        >
          <CodesandboxLogoIcon />
        </CodeHighlightControl>,
        <CodeHighlightControl tooltipLabel="与 GPT 讨论" key="gpt">
          <ChatCircleIcon />
        </CodeHighlightControl>,
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <CodeHighlight
      code={exampleCode}
      language="tsx"
      radius="md"
      controls={[
        <CodeHighlightControl
          component="a"
          href="https://codesandbox.io"
          target="_blank"
          tooltipLabel="在 CodeSandbox 中打开"
          key="sandbox"
        >
          <CodesandboxLogoIcon />
        </CodeHighlightControl>,
        <CodeHighlightControl tooltipLabel="与 GPT 讨论" key="gpt">
          <ChatCircleIcon />
        </CodeHighlightControl>,
      ]}
    />
  );
}

export const customControl: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
