import { useCallback, useRef, useState } from 'react';

export interface $FormValidating {
  validating: boolean;
  isValidating: (path?: string) => boolean;
  setFieldValidating: (path: string, validating: boolean) => void;
  setFormValidating: (validating: boolean) => void;
  getAbortSignal: (path: string) => AbortSignal;
  /** 中止全部在途字段级异步校验（提交级校验开始时调用，防止过期结果污染错误状态） */
  abortFieldValidations: () => void;
  clearValidating: () => void;
}

export function useFormValidating(): $FormValidating {
  const [validatingFields, setValidatingFields] = useState<Record<string, boolean>>({});
  const [formValidating, setFormValidatingState] = useState(false);
  const validatingRef = useRef<Record<string, boolean>>({});
  const formValidatingRef = useRef(false);
  const abortControllers = useRef<Record<string, AbortController>>({});

  const setFieldValidating = useCallback((path: string, value: boolean) => {
    validatingRef.current = { ...validatingRef.current, [path]: value };
    setValidatingFields({ ...validatingRef.current });
  }, []);

  const setFormValidating = useCallback((value: boolean) => {
    formValidatingRef.current = value;
    setFormValidatingState(value);
  }, []);

  const isValidating = useCallback(
    (path?: string) => {
      if (path) {
        return !!validatingRef.current[path];
      }
      if (formValidatingRef.current) {
        return true;
      }
      return Object.values(validatingRef.current).some(Boolean);
    },
    [validatingRef.current, formValidatingRef.current]
  );

  const getAbortSignal = useCallback((path: string) => {
    abortControllers.current[path]?.abort();
    abortControllers.current[path] = new AbortController();
    return abortControllers.current[path].signal;
  }, []);

  const abortFieldValidations = useCallback(() => {
    Object.values(abortControllers.current).forEach((c) => c.abort());
    abortControllers.current = {};
  }, []);

  const clearValidating = useCallback(() => {
    validatingRef.current = {};
    setValidatingFields({});
    formValidatingRef.current = false;
    setFormValidatingState(false);
    Object.values(abortControllers.current).forEach((c) => c.abort());
    abortControllers.current = {};
  }, []);

  const validating = formValidating || Object.values(validatingFields).some(Boolean);

  return {
    validating,
    isValidating,
    setFieldValidating,
    setFormValidating,
    getAbortSignal,
    abortFieldValidations,
    clearValidating,
  };
}
