import { GetStylesApi } from '../../../core/styles-api/use-styles/use-styles';
import { createSafeContext } from '../../../core/utils/index';
import type { CodeHighlightFactory } from './CodeHighlight';

export interface CodeHighlightContextValue {
  getStyles: GetStylesApi<CodeHighlightFactory>;
  codeColorScheme: 'light' | 'dark' | (string & {}) | undefined;
}

export const [CodeHighlightContextProvider, useCodeHighlightContext] =
  createSafeContext<CodeHighlightContextValue>(
    'CodeHighlightProvider was not found in the component tree'
  );
