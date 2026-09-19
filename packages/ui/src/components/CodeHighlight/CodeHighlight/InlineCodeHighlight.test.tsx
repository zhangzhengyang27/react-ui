import { tests } from '@xiaoye-react/tests';
import {
  InlineCodeHighlight,
  InlineCodeHighlightProps,
  InlineCodeHighlightStylesNames,
} from './InlineCodeHighlight';

const defaultProps: InlineCodeHighlightProps = {
  code: 'const a = 5',
  language: 'tsx',
};

describe('@xiaoye-react/code-highlight/InlineCodeHighlight', () => {
  tests.itSupportsSystemProps<InlineCodeHighlightProps, InlineCodeHighlightStylesNames>({
    component: InlineCodeHighlight,
    props: defaultProps,
    varsResolver: true,
    polymorphic: true,
    selector: '.ui-InlineCodeHighlight-inlineCodeHighlight',
    displayName: '@xiaoye-react/ui/InlineCodeHighlight',
    stylesApiSelectors: ['inlineCodeHighlight'],
  });
});
