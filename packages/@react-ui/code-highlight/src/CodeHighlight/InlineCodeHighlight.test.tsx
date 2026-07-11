import { tests } from '@mantine-tests/core';
import {
  InlineCodeHighlight,
  InlineCodeHighlightProps,
  InlineCodeHighlightStylesNames,
} from './InlineCodeHighlight';

const defaultProps: InlineCodeHighlightProps = {
  code: 'const a = 5',
  language: 'tsx',
};

describe('@react-ui/code-highlight/InlineCodeHighlight', () => {
  tests.itSupportsSystemProps<InlineCodeHighlightProps, InlineCodeHighlightStylesNames>({
    component: InlineCodeHighlight,
    props: defaultProps,
    varsResolver: true,
    polymorphic: true,
    selector: '.mantine-InlineCodeHighlight-inlineCodeHighlight',
    displayName: '@react-ui/code-highlight/InlineCodeHighlight',
    stylesApiSelectors: ['inlineCodeHighlight'],
  });
});
