import { useEffect, useRef } from 'react';
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
  // 切 type 派生的新值先挂到 ref,渲染期不提交:B10-2 修复——此前渲染期直接调 _setValue,
  // 非受控 setter 会连带触发消费者 onChange,在渲染期 setState 父组件会触发
  // React "Cannot update a component while rendering" 报错
  const pendingValueRef = useRef<any>(undefined);

  if (storedType.current !== type) {
    storedType.current = type;

    if (value === undefined) {
      // 切换 type 时把旧形状的 defaultValue 映射成新形状（default→数组取首个非 null，
      // range→[start,end] / multiple→数组并滤 null），否则字符串 defaultValue 灌入
      // range/multiple 后续 _value.some 等 Array 方法直接崩溃、数组灌回 default 显示 Invalid Date
      // 形状映射产物与泛型 DatePickerValue 无关,显式放宽为 any
      let convertedDefaultValue: any = defaultValue;
      if (defaultValue !== undefined) {
        if (type === 'range') {
          const raw = Array.isArray(defaultValue) ? defaultValue : [defaultValue, null];
          convertedDefaultValue = [raw[0] ?? null, raw[1] ?? null];
        } else if (type === 'multiple') {
          convertedDefaultValue = Array.isArray(defaultValue)
            ? defaultValue.filter((v) => v != null)
            : [defaultValue];
        } else if (type === 'default') {
          convertedDefaultValue = Array.isArray(defaultValue)
            ? defaultValue.find((v) => v != null) ?? null
            : defaultValue;
        }
      }

      _finalValue =
        convertedDefaultValue !== undefined ? convertedDefaultValue : getEmptyValue(type);
      _finalValue = convertDatesValue(_finalValue, withTime);
      pendingValueRef.current = _finalValue;
    }
  }

  // 渲染期只计算、effect 里提交:setter 的 onChange 转发延后到提交阶段
  useEffect(() => {
    if (pendingValueRef.current !== undefined) {
      _setValue(pendingValueRef.current);
      pendingValueRef.current = undefined;
    }
  });

  return [_finalValue, _setValue, controlled];
}
