import { CodeHighlightTabs, CodeHighlightTabsCode } from '@xiaoye-react/ui';
import { getCodeFileIcon } from '@xiaoye-react/dev-icons';
import classes from './DemoCode.module.css';

/** 可展示的源码：字符串或分文件数组（函数形式在传入前需先被求值） */
export type DemoCodeValue = string | CodeHighlightTabsCode[];

export interface DemoCodeProps {
  code?: DemoCodeValue;
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
  const _code: CodeHighlightTabsCode[] | undefined =
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
