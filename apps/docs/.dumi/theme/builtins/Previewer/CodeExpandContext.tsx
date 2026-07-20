import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface CodeHighlightTabsCode {
  code: string;
  fileName?: string;
  language?: string;
}

export type RealCode = string | CodeHighlightTabsCode[];

interface CodeExpandContextValue {
  /** 当前代码是否展开 */
  expanded: boolean;
  /** 设置展开状态 */
  setExpanded: (value: boolean) => void;
  /** 切换展开状态 */
  toggle: () => void;
  /** 由 DemoEngine 调用，注册真实可展示代码 */
  registerRealCode: (code: RealCode) => void;
  /** 由 DemoEngine 调用，注销真实可展示代码 */
  unregisterRealCode: () => void;
  /** 由 DemoEngine 调用，更新真实可展示代码（如 Configurator 状态变化） */
  updateRealCode: (code: RealCode) => void;
  /** CodePreviewer 是否需要用真实代码替换默认 entryCode */
  hasRealCode: boolean;
  /** 真实代码内容 */
  realCode: RealCode | null;
}

const CodeExpandContext = createContext<CodeExpandContextValue | null>(null);

interface CodeExpandProviderProps {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  children: React.ReactNode;
}

export const CodeExpandProvider: React.FC<CodeExpandProviderProps> = ({
  expanded,
  setExpanded,
  children,
}) => {
  const [realCodeState, setRealCodeState] = useState<{ count: number; code: RealCode | null }>({
    count: 0,
    code: null,
  });

  const registerRealCode = useCallback((code: RealCode) => {
    setRealCodeState((state) => ({
      count: state.count + 1,
      code,
    }));
  }, []);
  const unregisterRealCode = useCallback(() => {
    setRealCodeState((state) => ({
      count: Math.max(0, state.count - 1),
      code: state.count <= 1 ? null : state.code,
    }));
  }, []);
  const updateRealCode = useCallback((code: RealCode) => {
    setRealCodeState((state) => ({
      ...state,
      code,
    }));
  }, []);
  const toggle = useCallback(() => setExpanded(!expanded), [expanded, setExpanded]);

  const value = useMemo(
    () => ({
      expanded,
      setExpanded,
      toggle,
      registerRealCode,
      unregisterRealCode,
      updateRealCode,
      hasRealCode: realCodeState.count > 0,
      realCode: realCodeState.code,
    }),
    [expanded, setExpanded, toggle, registerRealCode, unregisterRealCode, updateRealCode, realCodeState],
  );

  return <CodeExpandContext.Provider value={value}>{children}</CodeExpandContext.Provider>;
}

export function useCodeExpand(): CodeExpandContextValue | null {
  return useContext(CodeExpandContext);
}
