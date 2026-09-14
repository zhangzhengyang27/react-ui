import { useRef } from 'react';
import { useUncontrolled } from '@xiaoye-react/hooks';
import { DatePickerType, DatePickerValue, DateStringValue } from '../../types';
import { toDateString, toDateTimeString } from '../../utils';

interface UseUncontrolledDates<Type extends DatePickerType = 'default'> {
  type: Type;
  value: DatePickerValue<Type> | undefined;
  defaultValue: DatePickerValue<Type> | undefined;
  onChange: ((value: DatePickerValue<Type, DateStringValue>) => void) | undefined;
  withTime?: boolean;
}

const getEmptyValue = <Type extends DatePickerType = 'default'>(type: Type) =>
  type === 'range' ? [null, null] : type === 'multiple' ? [] : null;

export const convertDatesValue = (value: any, withTime: boolean) => {
  const converter = withTime ? toDateTimeString : toDateString;
  return Array.isArray(value) ? value.map(converter) : converter(value);
};

export function useUncontrolledDates<Type extends DatePickerType = 'default'>({
  type,
  value,
  defaultValue,
  onChange,
  withTime = false,
}: UseUncontrolledDates<Type>) {
  const storedType = useRef<Type>(type);
  const [_value, _setValue, controlled] = useUncontrolled<any>({
    value: convertDatesValue(value, withTime),
    defaultValue: convertDatesValue(defaultValue, withTime),
    finalValue: getEmptyValue(type),
    onChange,
  });

  let _finalValue = _value;

  if (storedType.current !== type) {
    storedType.current = type;

    if (value === undefined) {
      // 切换 type 时把旧形状的 defaultValue 映射成新形状（default→[v,v]/[v]，
      // range/multiple→取首个），否则字符串 defaultValue 灌入 range/multiple
      // 后续 _value.some 等 Array 方法直接崩溃
      let convertedDefaultValue = defaultValue;
      if (defaultValue !== undefined) {
        if (type === 'range') {
          const raw = Array.isArray(defaultValue) ? defaultValue : [defaultValue, null];
          convertedDefaultValue = [raw[0] ?? null, raw[1] ?? null];
        } else if (type === 'multiple') {
          convertedDefaultValue = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
        }
      }

      _finalValue =
        convertedDefaultValue !== undefined ? convertedDefaultValue : getEmptyValue(type);
      _finalValue = convertDatesValue(_finalValue, withTime);
      _setValue(_finalValue);
    }
  }

  return [_finalValue, _setValue, controlled];
}
