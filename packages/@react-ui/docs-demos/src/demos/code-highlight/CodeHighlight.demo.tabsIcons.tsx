import { CodeHighlightTabs } from '@react-ui/code-highlight';
import { UIDemo } from '@react-ui/demo';
import { CssIcon, TypeScriptIcon } from '@react-ui/dev-icons';

const tsxCode = `
function Button() {
  return <button>点击我</button>;
}
`;

const cssCode = `
.button {
  background-color: transparent;
  color: var(--ui-color-blue-9);
}
`;

const code = `
import { CodeHighlightTabs } from '@react-ui/code-highlight';
import { TypeScriptIcon, CssIcon } from '@react-ui/dev-icons';

const tsxCode = \`${tsxCode}\`;

const cssCode = \`${cssCode}\`;

function Demo() {
  const tsIcon = <TypeScriptIcon size={14} />;
  const cssIcon = <CssIcon size={14} />;

  return (
    <CodeHighlightTabs
      radius="md"
      code={[
        {
          fileName: '按钮.tsx',
          code: tsxCode,
          language: 'tsx',
          icon: tsIcon,
        },
        {
          fileName: '按钮样式.module.css',
          code: cssCode,
          language: 'scss',
          icon: cssIcon,
        },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <CodeHighlightTabs
      radius="md"
      code={[
        {
          fileName: '按钮.tsx',
          code: tsxCode,
          language: 'tsx',
          icon: <TypeScriptIcon size={14} />,
        },
        {
          fileName: '按钮样式.module.css',
          code: cssCode,
          language: 'scss',
          icon: <CssIcon size={14} />,
        },
      ]}
    />
  );
}

export const tabsIcons: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
