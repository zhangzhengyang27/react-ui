import { cloneElement, useState } from 'react';
import { Text, UnstyledButton } from '@react-ui/ui';
import { DemoAreaProps } from '../DemoArea';
import { DemoColumns } from '../DemoColumns';
import { DemoHeader, DemoHeaderProps } from '../DemoHeader';
import { DemoRoot } from '../DemoRoot';
import classes from './StylesApiDemo.module.css';

export interface StylesApiDemoProps extends DemoAreaProps, DemoHeaderProps {
  data: { selectors: Record<string, string> };
  code: string;
}

function getCss(hovered: string | null) {
  return hovered
    ? `.${hovered} {\n  outline: 2px solid #fe0d45;\n  outline-offset: -2px; \n}\n`
    : '/*\n * 将鼠标悬停在选择器上以应用轮廓样式\n *\n */';
}

export function StylesApiDemo({
  data,
  code,
  title,
  description,
  withPadding,
  maxWidth,
  centered,
  children,
  dimmed,
  striped,
}: StylesApiDemoProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const selectors = Object.keys(data.selectors);
  const controls = selectors.map((selector) => (
    <UnstyledButton
      className={classes.selector}
      key={selector}
      onMouseEnter={() => setHovered(selector)}
      onMouseLeave={() => setHovered(null)}
    >
      <Text mb={2}>{selector}</Text>
      <Text fz={11} c="dimmed">
        {data.selectors[selector]}
      </Text>
    </UnstyledButton>
  ));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: getCss(hovered) }} />
      <DemoRoot>
        <DemoHeader title={title} description={description} code={code} />
        <DemoColumns
          withPadding={withPadding}
          maxWidth={maxWidth}
          centered={centered}
          controls={controls}
          dimmed={dimmed}
          striped={striped}
          title="组件样式 API"
          description="将鼠标悬停在选择器上以高亮对应元素"
        >
          {cloneElement(children as React.JSX.Element, {
            classNames: selectors.reduce<Record<string, string>>((acc, item) => {
              acc[item] = item;
              return acc;
            }, {}),
          })}
        </DemoColumns>
      </DemoRoot>
    </>
  );
}
