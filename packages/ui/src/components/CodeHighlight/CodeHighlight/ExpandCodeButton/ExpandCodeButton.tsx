import { CodeHighlightControl } from '../CodeHighlightControl/CodeHighlightControl';
import { ExpandIcon } from './ExpandIcon';

interface ExpandCodeButtonProps {
  expanded: boolean;
  onExpand: (value: boolean) => void;
  collapseCodeLabel?: string;
  expandCodeLabel?: string;
}

export function ExpandCodeButton({
  expanded,
  onExpand,
  expandCodeLabel = '展开代码',
  collapseCodeLabel = '收起代码',
}: ExpandCodeButtonProps) {
  return (
    <CodeHighlightControl
      onClick={() => onExpand(!expanded)}
      tooltipLabel={expanded ? collapseCodeLabel : expandCodeLabel}
      aria-label={expanded ? collapseCodeLabel : expandCodeLabel}
    >
      <ExpandIcon expanded={expanded} />
    </CodeHighlightControl>
  );
}

ExpandCodeButton.displayName = '@xiaoye-react/ui/ExpandCodeButton';
