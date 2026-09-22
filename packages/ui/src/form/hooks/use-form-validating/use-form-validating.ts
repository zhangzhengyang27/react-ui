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
    // 依赖里放 ref.current 是有意的：getter 身份必须随值变化，见 tests/use-form/compiler-stability.test.ts
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [validatingRef.current, formValidatingRef.current]
  );

  const getAbortSignal = useCallback((path: string) => {
    const previousController = abortControllers.current[path];
    if (previousController) {
      previousController.abort();
      // 同路径新校验接管时同步复位旧校验遗留的在途标志:
      // 若新校验同步完成(不会再 setFieldValidating(true)),
      // 旧校验 settle 后 cleanup 会因 signal.aborted 跳过复位,标志永久残留
      if (validatingRef.current[path]) {
        validatingRef.current = { ...validatingRef.current, [path]: false };
        setValidatingFields({ ...validatingRef.current });
      }
    }
    abortControllers.current[path] = new AbortController();
    return abortControllers.current[path].signal;
  }, []);

  const abortFieldValidations = useCallback(() => {
    let hasInFlightField = false;
    Object.entries(abortControllers.current).forEach(([path, controller]) => {
      controller.abort();
      // 中止的同时复位该字段的在途标志:被 abort 的校验 promise settle 后,
      // cleanup 会因 signal.aborted 跳过复位,不在此收尾则 validating 永久残留 true,
      // isValidating(path)/form.validating 被永久钉死
      if (validatingRef.current[path]) {
        hasInFlightField = true;
        validatingRef.current = { ...validatingRef.current, [path]: false };
      }
    });
    abortControllers.current = {};
    if (hasInFlightField) {
      setValidatingFields({ ...validatingRef.current });
    }
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
