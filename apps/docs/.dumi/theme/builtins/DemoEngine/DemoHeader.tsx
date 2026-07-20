import type { CSSProperties } from 'react';
import { CopyButton, Text } from '@react-ui/ui';

export interface DemoHeaderProps {
  title?: string;
  description?: string;
  code?: string | { code: string; fileName?: string; language?: string }[] | ((props: any) => string);
}

function normalizeCode(code: DemoHeaderProps['code']): string | undefined {
  if (!code) return undefined;
  if (typeof code === 'string') return code;
  if (typeof code === 'function') return code({});
  if (Array.isArray(code)) {
    return code.map((item) => `// ${item.fileName || '示例.tsx'}\n${item.code}`).join('\n\n');
  }
  return undefined;
}

export function DemoHeader({ title, description, code }: DemoHeaderProps) {
  const codeValue = normalizeCode(code);
  if (!title && !description) return null;

  const style: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 'var(--ui-spacing-md, 16px)',
    padding: 'var(--ui-spacing-md, 16px) var(--ui-spacing-lg, 20px)',
    paddingBottom: 'var(--ui-spacing-sm, 8px)',
    backgroundColor: 'light-dark(var(--ui-color-gray-0), var(--ui-color-dark-8))',
    borderBottom: '1px solid var(--demo-border, #f0f0f0)',
  };

  return (
    <div style={style}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ui-spacing-xs, 4px)', minWidth: 0 }}>
        {title && (
          <Text fw={600} style={{ fontSize: 'var(--ui-font-size-lg, 18px)' }}>
            {title}
          </Text>
        )}
        {description && (
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        )}
      </div>
      {codeValue && (
        <CopyButton value={codeValue}>
          {({ copied, copy }) => (
            <button
              type="button"
              onClick={copy}
              style={{
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                height: 28,
                padding: '0 10px',
                fontSize: 'var(--ui-font-size-xs, 12px)',
                fontWeight: 600,
                color: 'light-dark(var(--ui-color-gray-7), var(--ui-color-dark-1))',
                backgroundColor: 'transparent',
                border: '1px solid var(--demo-border, #f0f0f0)',
                borderRadius: 'var(--ui-radius-sm, 4px)',
                cursor: 'pointer',
              }}
            >
              {copied ? '已复制' : '复制代码'}
            </button>
          )}
        </CopyButton>
      )}
    </div>
  );
}
