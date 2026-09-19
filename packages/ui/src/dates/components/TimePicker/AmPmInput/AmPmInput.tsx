import { useTimePickerContext } from '../TimePicker.context';

interface AmPmInputProps extends Omit<React.ComponentProps<'select'>, 'value' | 'onChange'> {
  labels: { am: string; pm: string };
  value: string | null;
  inputType: 'select' | 'input';
  onChange: (value: string | null) => void;
  readOnly?: boolean;
  onPreviousInput?: () => void;
}

export function AmPmInput({
  labels,
  value,
  onChange,
  className,
  style,
  onPreviousInput,
  readOnly,
  onMouseDown,
  onTouchStart,
  inputType,
  ...others
}: AmPmInputProps) {
  const ctx = useTimePickerContext();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSelectElement>) => {
    if (readOnly) {
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      onChange(labels.am);
    }

    if (event.key === 'End') {
      event.preventDefault();
      onChange(labels.pm);
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();
      if (value === null) {
        onPreviousInput?.();
      } else {
        onChange(null);
      }
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      onPreviousInput?.();
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      onChange(value === labels.am ? labels.pm : labels.am);
    }

    if (event.code === 'KeyA') {
      event.preventDefault();
      onChange(labels.am);
    }

    if (event.code === 'KeyP') {
      event.preventDefault();
      onChange(labels.pm);
    }
  };

  if (inputType === 'input') {
    const displayValue = value || '--';
    const inputSize = displayValue.length + 1;

    // input 模式的值归一化:按首字符 a/p 映射到 am/pm 标签,不匹配时忽略输入,
    // 避免任意自由文本使 am/pm 语义静默失效(值按 AM 处理但界面显示无意义文本)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (readOnly) {
        return;
      }
      const next = event.target.value;
      if (!next) {
        onChange(null);
        return;
      }
      const first = next.trim().charAt(0).toLowerCase();
      if (first === 'a') {
        onChange(labels.am);
      } else if (first === 'p') {
        onChange(labels.pm);
      }
    };

    return (
      <input
        {...ctx.getStyles('field', { className, style })}
        value={displayValue}
        size={inputSize}
        onChange={handleInputChange}
        onClick={((event: any) => event.stopPropagation()) as any}
        onKeyDown={handleKeyDown as any}
        onMouseDown={(event) => {
          event.stopPropagation();
          onMouseDown?.(event as any);
        }}
        data-am-pm
        {...(others as any)}
      />
    );
  }

  return (
    <select
      {...ctx.getStyles('field', { className, style })}
      value={value || ''}
      onChange={(event) => !readOnly && onChange(event.target.value || null)}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={handleKeyDown}
      onMouseDown={(event) => {
        event.stopPropagation();
        onMouseDown?.(event);
      }}
      data-am-pm
      {...others}
    >
      <option value="">--</option>
      <option value={labels.am}>{labels.am}</option>
      <option value={labels.pm}>{labels.pm}</option>
    </select>
  );
}

AmPmInput.displayName = '@xiaoye-react/ui/AmPmInput';
