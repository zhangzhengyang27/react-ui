import { useEffect } from 'react';
import { Box, BoxProps, ElementProps } from '../../../core/Box/Box';
import { useProps } from '../../../core/UIProvider/index';
import { Factory } from '../../../core/factory/create-factory';
import { factory } from '../../../core/factory/factory';
import { useResolvedStylesApi } from '../../../core/styles-api/index';
import { StylesApiProps } from '../../../core/styles-api/styles-api.types';
import { useStyles } from '../../../core/styles-api/use-styles/use-styles';
import { ScrollArea } from '../../ScrollArea/ScrollArea';
import { UnstyledButton } from '../../UnstyledButton/UnstyledButton';
import { useUncontrolled } from '@xiaoye-react/hooks';
import {
  CodeHighlight,
  CodeHighlightSettings,
  CodeHighlightStylesNames,
} from '../CodeHighlight/CodeHighlight';
import { FileIcon } from './FileIcon';
import classes from '../CodeHighlight.module.css';

/** Available shiki languages for default UI shiki instance.
 *  Should be used only with *.ui.dev projects */
export type CodeHighlightDefaultLanguage = 'tsx' | 'scss' | 'html' | 'bash' | 'json';

export interface CodeHighlightTabsCode {
  language?: CodeHighlightDefaultLanguage | (string & {});
  code: string;
  fileName?: string;
  icon?: React.ReactNode;
}

export type CodeHighlightTabsStylesNames =
  | 'root'
  | 'files'
  | 'file'
  | 'fileIcon'
  | 'filesScrollarea'
  | CodeHighlightStylesNames;

export interface CodeHighlightTabsProps
  extends
    CodeHighlightSettings,
    BoxProps,
    StylesApiProps<CodeHighlightTabsFactory>,
    ElementProps<'div'> {
  /** Code to highlight with meta data (file name and icon) */
  code: CodeHighlightTabsCode[];

  /** Function that returns icon based on file name */
  getFileIcon?: (fileName: string) => React.ReactNode;

  /** Default active tab index */
  defaultActiveTab?: number;

  /** Index of controlled active tab state */
  activeTab?: number;

  /** Called when tab changes */
  onTabChange?: (tab: number) => void;
}

export type CodeHighlightTabsFactory = Factory<{
  props: CodeHighlightTabsProps;
  ref: HTMLDivElement;
  stylesNames: CodeHighlightTabsStylesNames;
}>;

export const CodeHighlightTabs = factory<CodeHighlightTabsFactory>((_props) => {
  const props = useProps('CodeHighlightTabs', null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    defaultActiveTab,
    activeTab,
    onTabChange,
    defaultExpanded,
    expanded,
    onExpandedChange,
    code,
    getFileIcon,
    withCopyButton,
    withExpandButton,
    withBorder,
    radius,
    maxCollapsedHeight,
    copyLabel,
    copiedLabel,
    expandCodeLabel,
    collapseCodeLabel,
    background,
    controls,
    codeColorScheme,
    withLineNumbers,
    attributes,
    ...others
  } = props;

  const getStyles = useStyles<CodeHighlightTabsFactory>({
    name: 'CodeHighlightTabs',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
  });

  const [value, setValue] = useUncontrolled({
    defaultValue: defaultActiveTab,
    value: activeTab,
    finalValue: 0,
    onChange: onTabChange,
  });

  const [_expanded, setExpanded] = useUncontrolled({
    defaultValue: defaultExpanded,
    value: expanded,
    finalValue: true,
    onChange: onExpandedChange,
  });

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<CodeHighlightTabsFactory>({
    classNames,
    styles,
    props,
  });

  useEffect(() => {
    // 空数组时不得把 value 钳到 -1：异步加载后 -1 >= length 恒 false，
    // activeTab 会永久停留在 -1，代码区一直渲染 fallback 空内容
    if (code.length > 0 && value >= code.length) {
      setValue(code.length - 1);
    }
  }, [value, code]);

  if (code.length <= 0) {
    return null;
  }

  const currentCode = code[value] || { code: '', language: 'tsx', fileName: '' };

  const files = code.map((node, index) => (
    <UnstyledButton
      {...getStyles('file')}
      // fileName 可缺省或重复,退回 index 保证 key 稳定唯一
      key={node.fileName ?? index}
      mod={{ active: index === value }}
      role="tab"
      aria-selected={index === value}
      onClick={() => setValue(index)}
      data-color-scheme={codeColorScheme}
    >
      <FileIcon
        fileIcon={node.icon}
        getFileIcon={getFileIcon}
        fileName={node.fileName}
        key="file-icon"
        {...getStyles('fileIcon')}
      />
      <span key="file-name">{node.fileName}</span>
    </UnstyledButton>
  ));

  return (
    <Box {...getStyles('root')} {...others}>
      <ScrollArea type="never" dir="ltr" offsetScrollbars={false} {...getStyles('filesScrollarea')}>
        <div {...getStyles('files')} role="tablist">
          {files}
        </div>
      </ScrollArea>

      <CodeHighlight
        code={currentCode.code}
        language={currentCode.language}
        expanded={_expanded}
        onExpandedChange={setExpanded}
        withCopyButton={withCopyButton}
        withExpandButton={withExpandButton}
        withBorder={withBorder}
        radius={radius}
        maxCollapsedHeight={maxCollapsedHeight}
        copiedLabel={copiedLabel}
        copyLabel={copyLabel}
        expandCodeLabel={expandCodeLabel}
        collapseCodeLabel={collapseCodeLabel}
        background={background}
        controls={controls}
        codeColorScheme={codeColorScheme}
        withLineNumbers={withLineNumbers}
        __withOffset
        __staticSelector="CodeHighlightTabs"
        classNames={resolvedClassNames}
        styles={resolvedStyles}
        attributes={attributes}
      />
    </Box>
  );
});

CodeHighlightTabs.displayName = '@xiaoye-react/ui/CodeHighlightTabs';
CodeHighlightTabs.classes = classes;
