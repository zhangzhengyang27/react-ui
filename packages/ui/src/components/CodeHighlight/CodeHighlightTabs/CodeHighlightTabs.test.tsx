import { tests } from '@xiaoye-react/tests';
import {
  CodeHighlightTabs,
  CodeHighlightTabsProps,
  CodeHighlightTabsStylesNames,
} from './CodeHighlightTabs';

const defaultProps: CodeHighlightTabsProps = {
  withCopyButton: true,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code: 'const a = 5', language: 'tsx' }],
};

describe('@xiaoye-react/code-highlight/CodeHighlightTabs', () => {
  tests.itSupportsSystemProps<CodeHighlightTabsProps, CodeHighlightTabsStylesNames>({
    component: CodeHighlightTabs,
    props: defaultProps,
    polymorphic: true,
    providerStylesApi: false,
    displayName: '@xiaoye-react/code-highlight/CodeHighlightTabs',
    stylesApiSelectors: [
      'root',
      'codeHighlight',
      'pre',
      'code',
      'control',
      'controls',
      'scrollarea',
      'showCodeButton',
    ],
  });
});
