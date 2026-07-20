import { DemoArea, DemoAreaProps } from '../DemoArea';
import { DemoCodeProps } from '../DemoCode';
import { DemoHeader, DemoHeaderProps } from '../DemoHeader';
import { DemoRoot } from '../DemoRoot';

export interface CodeDemoProps extends DemoCodeProps, DemoAreaProps, DemoHeaderProps {}

export function CodeDemo({
  code,
  children,
  title,
  description,
  withPadding,
  centered,
  maxWidth,
  minHeight = 120,
  dimmed,
  striped,
  overflow,
}: CodeDemoProps) {
  return (
    <DemoRoot>
      <DemoHeader title={title} description={description} code={code} />
      <DemoArea
        withPadding={withPadding}
        centered={centered}
        maxWidth={maxWidth}
        minHeight={minHeight}
        dimmed={dimmed}
        striped={striped}
        overflow={overflow}
      >
        {children}
      </DemoArea>
    </DemoRoot>
  );
}
