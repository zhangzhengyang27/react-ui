import { CopyButton, Text } from '@xiaoye-react/ui';
import { DemoCodeValue } from '../DemoCode';
import classes from './DemoHeader.module.css';

export interface DemoHeaderProps {
  title?: string;
  description?: string;
  code?: DemoCodeValue;
}

function normalizeCode(code: DemoHeaderProps['code']): string | undefined {
  if (!code) {
    return undefined;
  }

  if (typeof code === 'string') {
    return code;
  }

  if (Array.isArray(code)) {
    return code.map((item) => `// ${item.fileName || '示例.tsx'}\n${item.code}`).join('\n\n');
  }

  return undefined;
}

export function DemoHeader({ title, description, code }: DemoHeaderProps) {
  const codeValue = normalizeCode(code);

  if (!title && !description) {
    return null;
  }

  return (
    <div className={classes.header}>
      <div className={classes.meta}>
        {title && (
          <Text className={classes.title} fw={600}>
            {title}
          </Text>
        )}
        {description && (
          <Text className={classes.description} size="sm" c="dimmed">
            {description}
          </Text>
        )}
      </div>
      {codeValue && (
        <CopyButton value={codeValue}>
          {({ copied, copy }) => (
            <button type="button" className={classes.copyButton} onClick={copy}>
              {copied ? '已复制' : '复制代码'}
            </button>
          )}
        </CopyButton>
      )}
    </div>
  );
}
