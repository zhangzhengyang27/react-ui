import React from 'react';

interface PreProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * 代码块容器组件。
 * dumi 默认会处理 markdown 中的 ``` 代码围栏，本组件用于在 JSX 标签中手动渲染代码块。
 * 旧 MdxPre 依赖 @xiaoye-react/code-highlight，这里简化为原生 pre + code。
 */
const Pre: React.FC<PreProps> = ({ children, className }) => {
  return (
    <pre
      className={className}
      style={{
        padding: '12px 16px',
        borderRadius: 6,
        fontSize: 13,
        lineHeight: 1.6,
        overflowX: 'auto',
        backgroundColor: 'rgba(0,0,0,0.04)',
        margin: '12px 0',
        fontFamily:
          'ui-monospace,SFMono-Regular,Menlo,Consolas,Liberation Mono,monospace',
      }}
    >
      {children}
    </pre>
  );
};

export default Pre;
