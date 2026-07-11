import { createSafeContext, GetStylesApi } from '@react-ui/ui';
import type { CodeHighlightFactory } from './CodeHighlight';

export interface CodeHighlightContextValue {
  getStyles: GetStylesApi<CodeHighlightFactory>;
  codeColorScheme: 'light' | 'dark' | (string & {}) | undefined;
}

export const [CodeHighlightContextProvider, useCodeHighlightContext] =
  createSafeContext<CodeHighlightContextValue>(
    'CodeHighlightProvider was not found in the component tree'
  );
