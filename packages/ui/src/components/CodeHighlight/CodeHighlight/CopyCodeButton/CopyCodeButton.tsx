import { useClipboard } from '@xiaoye-react/hooks';
import { CodeHighlightControl } from '../CodeHighlightControl/CodeHighlightControl';
import { CopyIcon } from './CopyIcon';

interface CopyCodeButtonProps {
  code: string;
  copiedLabel?: string;
  copyLabel?: string;
}

export function CopyCodeButton({
  code,
  copyLabel = '复制',
  copiedLabel = '已复制',
}: CopyCodeButtonProps) {
  const clipboard = useClipboard();

  return (
    <CodeHighlightControl
      onClick={() => clipboard.copy(code.trim())}
      variant="none"
      tooltipLabel={clipboard.copied ? copiedLabel : copyLabel}
      aria-label={clipboard.copied ? copiedLabel : `${copyLabel}代码`}
    >
      <CopyIcon copied={clipboard.copied} />
    </CodeHighlightControl>
  );
}

CopyCodeButton.displayName = '@xiaoye-react/ui/CopyCodeButton';
