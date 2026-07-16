import { CodeHighlight } from '@react-ui/code-highlight';
import { UIDemo } from '@react-ui/demo';

const exampleCode = `
function Button() {
  return <button>点击我</button>;
}
`;

const code = `
import { CodeHighlight } from '@react-ui/code-highlight';

const exampleCode = \`${exampleCode}\`;

function Demo() {
  return (
    <>
      <CodeHighlight
        code={\`// Custom copy label\${exampleCode}\`}
        language="tsx"
        copyLabel="复制按钮代码"
        copiedLabel="已复制！"
        radius="md"
      />
      <CodeHighlight
        code={\`// Without copy button\${exampleCode}\`}
        language="tsx"
        withCopyButton={false}
        mt="md"
        radius="md"
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <CodeHighlight
        code={`// Custom copy label${exampleCode}`}
        language="tsx"
        copyLabel="复制按钮代码"
        copiedLabel="已复制！"
        radius="md"
      />
      <CodeHighlight
        code={`// Without copy button${exampleCode}`}
        language="tsx"
        withCopyButton={false}
        mt="md"
        radius="md"
      />
    </>
  );
}

export const copy: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
