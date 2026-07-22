// !!! demo not used on ui.dev to reduce bundle size
// used only for reference in development and documentation
import hljs from 'highlight.js/lib/core';
import tsLang from 'highlight.js/lib/languages/typescript';
import {
  CodeHighlight,
  CodeHighlightAdapterProvider,
  createHighlightJsAdapter,
} from '@xiaoye-react/code-highlight';
import { UIDemo } from '@xiaoye-react/demo';

hljs.registerLanguage('typescript', tsLang);

const exampleCode = `
type FilterPropsRes<T extends Record<string, any>> = {
  [Key in keyof T]-?: T[Key] extends undefined ? never : T[Key];
};

export function filterProps<T extends Record<string, any>>(props: T) {
  return Object.keys(props).reduce<FilterPropsRes<T>>((acc, key: keyof T) => {
    if (props[key] !== undefined) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as FilterPropsRes<T>);
}
`;

const code = `
import { CodeHighlight } from '@xiaoye-react/code-highlight';

const exampleCode = \`${exampleCode}\`;

function Demo() {
  return (
    <CodeHighlight
      code={exampleCode}
      language="tsx"
      radius="md"
      background="var(--ui-color-dark-8)"
      codeColorScheme="dark"
    />
  );
}
`;

const highlightJSAdapter = createHighlightJsAdapter(hljs);

function Demo() {
  return (
    <CodeHighlightAdapterProvider adapter={highlightJSAdapter}>
      <CodeHighlight
        code={exampleCode}
        language="tsx"
        radius="md"
        background="var(--ui-color-dark-8)"
        codeColorScheme="dark"
      />
    </CodeHighlightAdapterProvider>
  );
}

export const highlightjs: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
