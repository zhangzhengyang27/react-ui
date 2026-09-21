import { BoxProps, ElementProps, NativeSelect } from '@xiaoye-react/ui';
import { getControlLabel } from './get-control-label';
import { SelectData, transformSelectData } from './transform-select-data';
import { ConfiguratorControl } from './types';

export type ConfiguratorSelectControlOptions = ConfiguratorControl<
  'select',
  { data: SelectData; initialValue: string }
>;

export interface ConfiguratorSelectControlProps
  extends BoxProps, ElementProps<'select', 'onChange' | 'value' | 'size'> {
  value: string;
  data: SelectData;
  onChange: (value: string) => void;
  prop: string;
}

export function ConfiguratorSelectControl({
  value,
  onChange,
  prop,
  data,
  // 本控件是受控的（value + onChange），defaultValue 既与 NativeSelect 收窄后的
  // `defaultValue?: string` 类型冲突，也会触发 React 的
  // "A component changed from uncontrolled to controlled" 告警，因此接住不再下传
  defaultValue: _defaultValue,
  ...others
}: ConfiguratorSelectControlProps) {
  return (
    <NativeSelect
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      label={getControlLabel(prop)}
      data={transformSelectData(data)}
      {...others}
    />
  );
}
