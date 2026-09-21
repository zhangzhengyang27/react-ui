import { CodeDemo, CodeDemoProps } from './CodeDemo';
import { ConfiguratorDemo, ConfiguratorDemoProps } from './ConfiguratorDemo';
import { StylesApiDemo, StylesApiDemoProps } from './StylesApiDemo';

export interface DemoMetadata {
  title?: string;
  description?: string;
}

interface DemoComponent extends DemoMetadata {
  component: React.FC<any>;
}

export type UIDemo =
  | ({ type: 'code' } & DemoComponent & CodeDemoProps)
  | ({ type: 'configurator' } & DemoComponent & ConfiguratorDemoProps)
  | ({ type: 'styles-api' } & DemoComponent & StylesApiDemoProps);

interface DemoProps {
  data: UIDemo;
  demoProps?: {
    defaultExpanded?: boolean;
    maxCollapsedHeight?: number;
  };
}

export function Demo({ data, demoProps }: DemoProps) {
  // 解构必须发生在 switch 各分支内部：在 data 还没被 data.type 窄化之前就取 rest，
  // 得到的是三个变体 rest 的并集，会把兄弟变体才有的键一起 spread 进子组件。
  // title/description 被显式丢弃：DemoEngine 里没有任何一处消费它们，
  // 文档页的标题来自 .md 的 `### 标题`，往子组件传只会漏成无主属性。
  switch (data.type) {
    case 'code': {
      const { title: _title, description: _description, type: _type, component: Component, ...rest } = data;
      return (
        <CodeDemo {...rest} {...demoProps}>
          <Component />
        </CodeDemo>
      );
    }
    case 'configurator': {
      const { title: _title, description: _description, type: _type, component: Component, ...rest } = data;
      return (
        <ConfiguratorDemo {...rest} {...demoProps}>
          <Component />
        </ConfiguratorDemo>
      );
    }
    case 'styles-api': {
      const { title: _title, description: _description, type: _type, component: Component, ...rest } = data;
      return (
        <StylesApiDemo {...rest} {...demoProps}>
          <Component />
        </StylesApiDemo>
      );
    }
    default:
      return null;
  }
}
