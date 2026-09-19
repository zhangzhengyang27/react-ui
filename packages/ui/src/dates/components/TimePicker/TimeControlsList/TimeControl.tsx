import { UnstyledButton } from '../../../../components/UnstyledButton/UnstyledButton';
import { useTimePickerContext } from '../TimePicker.context';
import { padTime } from '../utils/pad-time/pad-time';

interface TimeControlProps {
  value: number | string;
  active: boolean;
  onSelect: (value: any) => void;
}

export function TimeControl({ value, active, onSelect }: TimeControlProps) {
  const ctx = useTimePickerContext();

  return (
    <UnstyledButton
      mod={{ active }}
      onClick={() => onSelect(value)}
      onMouseDown={(event) => event.preventDefault()}
      data-value={value}
      // 原为 tabIndex={-1},键盘用户完全无法进入下拉列表,恢复默认可聚焦
      tabIndex={0}
      {...ctx.getStyles('control')}
    >
      {typeof value === 'number' ? padTime(value) : value}
    </UnstyledButton>
  );
}

TimeControl.displayName = '@xiaoye-react/ui/TimeControl';
