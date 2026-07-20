import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-bash';

export interface CodeHighlightTabsCode {
  code: string;
  fileName?: string;
  language?: string;
}

export interface DemoCodeProps {
  code?: string | CodeHighlightTabsCode[];
  defaultExpanded?: boolean;
  maxCollapsedHeight?: number;
  withLineNumbers?: boolean;
  withExpandButton?: boolean;
}

export function DemoCode({
  code,
  maxCollapsedHeight = 320,
  defaultExpanded = true,
  withLineNumbers = true,
  withExpandButton = true,
}: DemoCodeProps) {
  const codeRef = useRef<HTMLElement>(null);

  const _code: CodeHighlightTabsCode | CodeHighlightTabsCode[] | undefined =
    typeof code === 'string' ? [{ code, fileName: '示例.tsx', language: 'tsx' }] : code;

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightAllUnder(codeRef.current);
    }
  }, [_code]);

  if (!_code) return null;

  const codeArray = Array.isArray(_code) ? _code : [_code];

  return (
    <div
      ref={codeRef as any}
      style={{
        borderBottomRightRadius: 'var(--ui-radius-md, 6px)',
        borderBottomLeftRadius: 'var(--ui-radius-md, 6px)',
        overflow: 'hidden',
        borderTop: '1px solid var(--demo-border, #f0f0f0)',
        maxHeight: maxCollapsedHeight,
        overflowY: 'auto',
      }}
    >
      {codeArray.map((item, index) => (
        <div key={index}>
          {item.fileName && (
            <div
              style={{
                padding: '6px 12px',
                fontSize: 12,
                color: '#888',
                backgroundColor: 'rgba(0,0,0,0.02)',
                borderBottom: '1px solid var(--demo-border, #f0f0f0)',
              }}
            >
              {item.fileName}
            </div>
          )}
          <pre
            className={`language-${item.language || 'tsx'}`}
            style={{
              margin: 0,
              padding: '12px 16px',
              fontSize: 13,
              lineHeight: 1.6,
              background: 'transparent',
            }}
          >
            <code className={`language-${item.language || 'tsx'}`}>{item.code}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}
