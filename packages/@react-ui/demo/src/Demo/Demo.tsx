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
  const { title, description, ...rest } = data;
  const metadata: DemoMetadata = { title, description };

  switch (data.type) {
    case 'code':
      return (
        <CodeDemo {...rest} {...demoProps} {...metadata}>
          <data.component />
        </CodeDemo>
      );
    case 'configurator':
      return (
        <ConfiguratorDemo {...rest} {...demoProps} {...metadata}>
          <data.component />
        </ConfiguratorDemo>
      );
    case 'styles-api':
      return (
        <StylesApiDemo {...rest} {...demoProps} {...metadata}>
          <data.component />
        </StylesApiDemo>
      );
    default:
      return null;
  }
}
