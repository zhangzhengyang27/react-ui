import { CodeHighlightTabs } from '@react-ui/code-highlight';
import { UIDemo } from '@react-ui/demo';

const tsxCode = `
import { Group, Button, UIProvider, createTheme } from '@react-ui/ui';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <Group>
        <Button variant="danger">危险变体</Button>
        <Button variant="primary">主要变体</Button>
      </Group>
    </UIProvider>
  );
}
`;

const cssCode = `
.root {
  &[data-variant='danger'] {
    background-color: var(--ui-color-red-9);
    color: var(--ui-color-red-0);
  }

  &[data-variant='primary'] {
    background: linear-gradient(45deg, #4b6cb7 10%, #253b67 90%);
    color: var(--ui-color-white);
  }
}
`;

const codeFile = `
export const tsxCode = \`${tsxCode}\`;

export const cssCode = \`${cssCode}\`;
`;

const code = `
import { CodeHighlightTabs } from '@react-ui/code-highlight';
import { tsxCode, cssCode } from './code';

function Demo() {
  return (
    <CodeHighlightTabs
      radius="md"
      code={[
        { fileName: '演示代码.tsx', code: tsxCode, language: 'tsx' },
        { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
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
        { fileName: '演示代码.tsx', code: tsxCode, language: 'tsx' },
        { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
      ]}
    />
  );
}

export const tabs: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: 'code.ts', code: codeFile, language: 'tsx' },
  ],
};
