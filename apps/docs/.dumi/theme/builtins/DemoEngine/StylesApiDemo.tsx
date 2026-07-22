import { cloneElement, useEffect, useMemo, useState } from 'react';
import { Text, UnstyledButton } from '@xiaoye-react/ui';

import { DemoAreaProps } from './DemoArea';
import { DemoColumns } from './DemoColumns';
import { DemoRoot } from './DemoRoot';
import { useCodeExpand } from '../Previewer/CodeExpandContext';

export interface StylesApiDemoProps extends DemoAreaProps {
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
  withPadding,
  maxWidth,
  centered,
  children,
  dimmed,
  striped,
}: StylesApiDemoProps) {
  const codeExpand = useCodeExpand();
  const registerRealCode = codeExpand?.registerRealCode;
  const unregisterRealCode = codeExpand?.unregisterRealCode;
  const updateRealCode = codeExpand?.updateRealCode;
  const [hovered, setHovered] = useState<string | null>(null);

  const selectors = Object.keys(data.selectors);
  const controls = selectors.map((selector) => (
    <UnstyledButton
      style={{
        display: 'block',
        width: '100%',
        fontSize: 'var(--ui-font-size-sm, 14px)',
        padding: '6px var(--ui-spacing-sm, 8px)',
        borderRadius: 'var(--ui-radius-sm, 4px)',
        cursor: 'help',
      }}
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

  const classNamesProp = hovered ? ` classNames={{ ${hovered}: classes.${hovered} }}` : '';
  const codeArray = useMemo(
    () => [
      { fileName: '演示样式.module.css', language: 'scss', code: getCss(hovered) },
      {
        fileName: '演示代码.tsx',
        language: 'tsx',
        code: code.replace('{{props}}', classNamesProp),
      },
    ],
    [hovered, classNamesProp, code],
  );

  useEffect(() => {
    registerRealCode?.(codeArray);
    return () => {
      unregisterRealCode?.();
    };
    // codeArray 的后续变更由下面的 updateRealCode effect 处理，避免每次悬停状态变化都重新注册/注销
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerRealCode, unregisterRealCode]);

  useEffect(() => {
    updateRealCode?.(codeArray);
  }, [updateRealCode, codeArray]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: getCss(hovered) }} />
      <DemoRoot>
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
