import { useState } from 'react';

export function getInputOnChange<T>(
  setValue: (value: null | undefined | T | ((current: T) => T)) => void
) {
  return (val: null | undefined | T | React.ChangeEvent<any> | ((current: T) => T)) => {
    // 仅匹配 null/undefined，避免 !val 吞掉 '' / 0 / false 等合法 falsy 值
    if (val == null) {
      setValue(val as T);
    } else if (typeof val === 'function') {
      setValue(val as (current: T) => T);
    } else if (typeof val === 'object' && 'nativeEvent' in val) {
      const { currentTarget } = val;

      if (currentTarget.type === 'checkbox') {
        setValue((currentTarget as HTMLInputElement).checked as unknown as T);
      } else if (currentTarget.type === 'file') {
        // file 输入的 .value 是 fakepath 字符串,表单值必须是 FileList,与 form 版 getInputOnChange 对齐
        setValue((currentTarget as HTMLInputElement).files as unknown as T);
      } else {
        setValue((currentTarget as HTMLInputElement).value as unknown as T);
      }
    } else {
      setValue(val);
    }
  };
}

export type UseInputStateReturnValue<T> = [
  T,
  (value: null | undefined | T | React.ChangeEvent<any>) => void,
];

export function useInputState<T>(initialState: T): UseInputStateReturnValue<T> {
  const [value, setValue] = useState<T>(initialState);
  // getInputOnChange 的 setValue 参数类型含 null | undefined（用于清空值），
  // 与 Dispatch<SetStateAction<T>> 不兼容（除非 T 本身含 null），需断言；
  // 运行时传入 null 会将 state 置为 null，调用方需以 T | null 初始化才能合法清空
  return [value, getInputOnChange<T>(setValue as (value: null | undefined | T | ((current: T) => T)) => void)];
}

export namespace useInputState {
  export type ReturnValue<T> = UseInputStateReturnValue<T>;
}
