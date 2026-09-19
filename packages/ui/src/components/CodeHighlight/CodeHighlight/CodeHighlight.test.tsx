import { tests } from '@xiaoye-react/tests';
import { CodeHighlight, CodeHighlightProps, CodeHighlightStylesNames } from './CodeHighlight';

const defaultProps: CodeHighlightProps = {
  withCopyButton: true,
  code: 'const a = 5',
  language: 'tsx',
  defaultExpanded: false,
};

describe('@xiaoye-react/code-highlight/CodeHighlight', () => {
  tests.itSupportsSystemProps<CodeHighlightProps, CodeHighlightStylesNames>({
    component: CodeHighlight,
    props: defaultProps,
    varsResolver: true,
    polymorphic: true,
    selector: '.ui-CodeHighlight-codeHighlight',
    displayName: '@xiaoye-react/ui/CodeHighlight',
    stylesApiSelectors: [
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
