import * as React from 'react';
import * as all from '@xiaoye-react/ui';

interface AntdProps {
  component: keyof typeof all;
}

/**
 * 通用 react-ui 组件调度器。
 * 保留原 Antd builtin 名称以兼容 dumi 注册入口，
 * 但实际渲染来自 `@xiaoye-react/ui` 的组件。
 */
const Antd: React.FC<AntdProps> = (props) => {
  const { component, ...restProps } = props;
  const Component = (all[component] ?? React.Fragment) as React.ComponentType<any>;
  return <Component {...restProps} />;
};

export default Antd;
