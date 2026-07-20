import React from 'react';
import { PropsTablesList } from '../PropsTable';
import { StylesApiTablesList } from '../StylesApiTable';

interface APITableProps {
  /** 组件名（对应 docgen.json 中的 key），多个用逗号分隔 */
  component?: string;
  /** 组件前缀（如 Menu），用于子组件名展示 */
  componentPrefix?: string;
  /** 是否显示样式 API 表格 */
  withStylesApi?: boolean;
}

/**
 * APITable - 组件 API 文档表格
 *
 * 在 markdown 中使用：
 *   <APITable component="Button" />
 *   <APITable component="Menu,MenuSub,MenuDropdown" componentPrefix="Menu" withStylesApi />
 */
const APITable: React.FC<APITableProps> = ({ component, componentPrefix, withStylesApi }) => {
  if (!component) {
    return null;
  }

  const components = component.split(',').map((c) => c.trim());

  return (
    <>
      <PropsTablesList components={components} componentPrefix={componentPrefix} />
      {withStylesApi && (
        <StylesApiTablesList components={components} componentPrefix={componentPrefix} />
      )}
    </>
  );
};

export default APITable;
