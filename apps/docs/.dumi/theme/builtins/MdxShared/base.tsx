import React from 'react';
import { Anchor, Title, Text } from '@react-ui/ui';

// MdxLink — 链接组件
export function MdxLink({ href, children }: { href?: string; children?: React.ReactNode }) {
  if (!href) return <>{children}</>;
  const isInternal = href.startsWith('/') && !href.startsWith('//');
  return (
    <Anchor href={href} target={isInternal ? undefined : '_blank'}>
      {children}
    </Anchor>
  );
}

// MdxTitle — 标题组件（渲染为 h3 级别）
export function MdxTitle({ id, children }: { id?: string; children?: React.ReactNode }) {
  return (
    <Title order={3} id={id} style={{ marginTop: 28, marginBottom: 12 }}>
      {children}
    </Title>
  );
}

// MdxParagraph — 段落
export function MdxParagraph({ children }: { children?: React.ReactNode }) {
  return <Text component="p" style={{ marginBottom: 12 }}>{children}</Text>;
}

// MdxCode — 行内代码
export function MdxCode({ children }: { children?: React.ReactNode }) {
  return (
    <code
      style={{
        padding: '2px 6px',
        borderRadius: 4,
        fontSize: '0.85em',
        backgroundColor: 'rgba(0,0,0,0.06)',
        fontFamily:
          'ui-monospace,SFMono-Regular,Menlo,Consolas,Liberation Mono,monospace',
      }}
    >
      {children}
    </code>
  );
}

// MdxLi — 列表项
export function MdxLi({ children }: { children?: React.ReactNode }) {
  return <li style={{ marginBottom: 4 }}>{children}</li>;
}

// MdxUl — 无序列表
export function MdxUl({ children }: { children?: React.ReactNode }) {
  return <ul style={{ paddingLeft: 20, marginBottom: 12 }}>{children}</ul>;
}

// MdxCodeHighlight — 代码块高亮
export function MdxCodeHighlight({
  code,
  language = 'tsx',
}: {
  code: string;
  language?: string;
}) {
  return (
    <pre
      className={`language-${language}`}
      style={{
        padding: '12px 16px',
        borderRadius: 6,
        fontSize: 13,
        lineHeight: 1.6,
        overflowX: 'auto',
        backgroundColor: 'rgba(0,0,0,0.04)',
        margin: '12px 0',
      }}
    >
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
}

// MdxInfo — 信息提示框
export function MdxInfo({
  children,
  icon,
  color,
}: {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  color?: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        padding: '12px 16px',
        borderRadius: 6,
        margin: '12px 0',
        backgroundColor: color ? `${color}10` : 'rgba(22, 119, 255, 0.06)',
        borderLeft: `3px solid ${color || '#1677ff'}`,
      }}
    >
      {icon && <div style={{ flexShrink: 0 }}>{icon}</div>}
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
