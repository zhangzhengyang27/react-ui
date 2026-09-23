import { useCallback, useMemo, useRef, useState } from 'react';
import { ClearErrors, ClearFieldError, FormErrors, SetErrors, SetFieldError } from '../../types';
import { filterErrors } from './filter-errors/filter-errors';

export interface $FormErrors<Values extends Record<string, any>> {
  errorsState: FormErrors;
  setErrors: SetErrors;
  clearErrors: ClearErrors;
  setFieldError: SetFieldError<Values>;
  clearFieldError: ClearFieldError;
}

export function useFormErrors<Values extends Record<string, any>>(
  initialErrors: FormErrors
): $FormErrors<Values> {
  const [errorsState, setErrorsState] = useState(filterErrors(initialErrors));
  const errorsRef = useRef(errorsState);

  const setErrors: SetErrors = useCallback((errors) => {
    // 基于 ref 同步计算后同时写入 ref 与 state：setState updater 必须保持纯函数，
    // StrictMode/并发渲染下 updater 会被双调用或丢弃，在内部写 ref 会造成脱同步
    const newErrors = filterErrors(typeof errors === 'function' ? errors(errorsRef.current) : errors);
    errorsRef.current = newErrors;
    setErrorsState(newErrors);
  }, []);

  const clearErrors: ClearErrors = useCallback(() => setErrors({}), [setErrors]);

  const clearFieldError: ClearFieldError = useCallback(
    (path) => {
      if (errorsRef.current[path as string] === undefined) {
        return;
      }

      setErrors((current) => {
        const errors = { ...current };
        delete errors[path as string];
        return errors;
      });
    },
    [errorsState]
  );

  const setFieldError: SetFieldError<Values> = useCallback(
    (path, error) => {
      if (error == null || error === false) {
        clearFieldError(path);
      } else if (errorsRef.current[path as string] !== error) {
        setErrors((current) => ({ ...current, [path]: error }));
      }
    },
    [errorsState]
  );

  // 稳定容器：对象身份在组件生命周期内不变，成员每渲染重新赋值（与 onChangeRef 同一套
  // 写法）。此前每渲染 return {} 让下游无法把 $ 系列 store 写进依赖表——写了就等于每渲染
  // 重建回调。getter 的身份仍然按契约随值变化（tests/*/compiler-stability.test.ts），
  // 这里稳定的只是外层容器。
  const store = useMemo(() => ({} as $FormErrors<Values>), []);

  store.errorsState = errorsState;
  store.setErrors = setErrors;
  store.clearErrors = clearErrors;
  store.setFieldError = setFieldError;
  store.clearFieldError = clearFieldError;

  return store;
}
