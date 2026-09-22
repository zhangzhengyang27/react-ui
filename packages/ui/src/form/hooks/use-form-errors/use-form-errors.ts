import { useCallback, useRef, useState } from 'react';
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

  return {
    errorsState,
    setErrors,
    clearErrors,
    setFieldError,
    clearFieldError,
  };
}
