import { CodeHighlightTabs, CodeHighlightTabsCode } from '@xiaoye-react/code-highlight';
import { getCodeFileIcon } from '@xiaoye-react/dev-icons';
import classes from './DemoCode.module.css';

export interface DemoCodeProps {
  code?: string | CodeHighlightTabsCode[];
  defaultExpanded?: boolean;
  maxCollapsedHeight?: number;
  withLineNumbers?: boolean;
  withExpandButton?: boolean;
}

export function DemoCode({
  code,
  maxCollapsedHeight,
  defaultExpanded = true,
  withLineNumbers = true,
  withExpandButton = true,
}: DemoCodeProps) {
  const _code: CodeHighlightTabsCode | CodeHighlightTabsCode[] | undefined =
    typeof code === 'string' ? [{ code, fileName: '示例.tsx', language: 'tsx' }] : code;
  return _code ? (
    <CodeHighlightTabs
      code={_code}
      className={classes.code}
      getFileIcon={getCodeFileIcon}
      withExpandButton={withExpandButton}
      withLineNumbers={withLineNumbers}
      maxCollapsedHeight={maxCollapsedHeight}
      defaultExpanded={defaultExpanded}
      expandCodeLabel="展开代码"
      collapseCodeLabel="收起代码"
    />
  ) : null;
}
