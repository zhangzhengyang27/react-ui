import { useEffect, useRef } from 'react';

import { DemoArea, DemoAreaProps } from './DemoArea';
import { DemoCodeProps } from './DemoCode';
import { DemoRoot } from './DemoRoot';
import { useCodeExpand } from '../Previewer/CodeExpandContext';

export interface CodeDemoProps extends DemoCodeProps, DemoAreaProps {}

export function CodeDemo({
  code,
  children,
  withPadding,
  centered,
  maxWidth,
  // 与 @xiaoye-react/demo 包内 CodeDemo 的默认值保持一致，
  // 否则单按钮类 demo 的预览框会塌缩到内容高度
  minHeight = 120,
  dimmed,
  striped,
  overflow,
}: CodeDemoProps) {
  const codeExpand = useCodeExpand();
  const registerRealCode = codeExpand?.registerRealCode;
  const unregisterRealCode = codeExpand?.unregisterRealCode;
  const updateRealCode = codeExpand?.updateRealCode;

  // CodeDemo 的 code 是静态的，使用 ref 保存初始值，避免因为父组件重渲染导致 code 引用变化，
  // 从而触发 registerRealCode -> setState -> 重渲染的无限循环。
  const codeRef = useRef(code);
  const initialCode = codeRef.current;

  // 仅在 registerRealCode/unregisterRealCode 可用时注册一次真实代码
  useEffect(() => {
    if (initialCode && registerRealCode) {
      registerRealCode(initialCode);
      return () => {
        unregisterRealCode?.();
      };
    }
  }, [registerRealCode, unregisterRealCode, initialCode]);

  // 仅在 code 内容真正发生变化时更新（如 HMR），忽略引用变化
  useEffect(() => {
    if (code && code !== codeRef.current) {
      codeRef.current = code;
      updateRealCode?.(code);
    }
  }, [code, updateRealCode]);

  return (
    <DemoRoot>
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
