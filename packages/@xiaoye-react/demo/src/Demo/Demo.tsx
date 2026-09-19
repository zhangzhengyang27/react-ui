import { CodeDemo, CodeDemoProps } from '../CodeDemo/CodeDemo';
import { ConfiguratorDemo, ConfiguratorDemoProps } from '../ConfiguratorDemo/ConfiguratorDemo';
import { StylesApiDemo, StylesApiDemoProps } from '../StylesApiDemo/StylesApiDemo';

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
  switch (data.type) {
    // 逐分支解构：先解构再判断会丢失可辨识联合的收窄，rest 会带上其它分支的 code 类型
    case 'code': {
      const { component: Component, title, description, ...rest } = data;
      return (
        <CodeDemo {...rest} {...demoProps} title={title} description={description}>
          <Component />
        </CodeDemo>
      );
    }
    case 'configurator': {
      const { component: Component, title, description, ...rest } = data;
      return (
        <ConfiguratorDemo {...rest} {...demoProps} title={title} description={description}>
          <Component />
        </ConfiguratorDemo>
      );
    }
    case 'styles-api': {
      const { component: Component, title, description, ...rest } = data;
      return (
        <StylesApiDemo {...rest} {...demoProps} title={title} description={description}>
          <Component />
        </StylesApiDemo>
      );
    }
    default:
      return null;
  }
}
