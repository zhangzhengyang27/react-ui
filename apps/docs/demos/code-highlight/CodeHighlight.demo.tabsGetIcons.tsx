import { CodeHighlightTabs } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { CssIcon, TypeScriptIcon } from '@xiaoye-react/dev-icons';

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
import { CodeHighlightTabs } from '@xiaoye-react/ui';
import { TypeScriptIcon, CssIcon } from '@xiaoye-react/dev-icons';

const tsxCode = \`${tsxCode}\`;

const cssCode = \`${cssCode}\`;

function getFileIcon(fileName: string) {
  if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) {
    return <TypeScriptIcon size={14} />;
  }

  if (fileName.endsWith('.css')) {
    return <CssIcon size={14} />;
  }

  return null;
}

function Demo() {
  return (
    <CodeHighlightTabs
      getFileIcon={getFileIcon}
      radius="md"
      code={[
        {
          fileName: '按钮.tsx',
          code: tsxCode,
          language: 'tsx',
        },
        {
          fileName: '按钮样式.module.css',
          code: cssCode,
          language: 'scss',
        },
      ]}
    />
  );
}
`;

function getFileIcon(fileName: string) {
  if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) {
    return <TypeScriptIcon size={14} />;
  }

  if (fileName.endsWith('.css')) {
    return <CssIcon size={14} />;
  }

  return null;
}

function Demo() {
  return (
    <CodeHighlightTabs
      getFileIcon={getFileIcon}
      radius="md"
      code={[
        {
          fileName: '按钮.tsx',
          code: tsxCode,
          language: 'tsx',
        },
        {
          fileName: '按钮样式.module.css',
          code: cssCode,
          language: 'scss',
        },
      ]}
    />
  );
}

export const tabsGetIcons: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
