import { useEffect, useLayoutEffect, useRef } from 'react';
import type {
  ClearErrors,
  ClearFieldError,
  InsertListItem,
  RemoveListItem,
  ReorderListItem,
  Reset,
  ResetDirty,
  ResetStatus,
  SetErrors,
  SetFieldError,
  SetFieldValue,
  SetFormStatus,
  SetInitialValues,
  SetValues,
  UseFormReturnType,
} from '../types';

function dispatchEvent(type: string, detail?: any): any {
  window.dispatchEvent(new CustomEvent(type, { detail }));
}

function validateFormName(name: string) {
  if (!/^[0-9a-zA-Z-]+$/.test(name)) {
    throw new Error(
      `[@xiaoye-react/form] Form name "${name}" is invalid, it should contain only letters, numbers and dashes`
    );
  }
}

export const useIsomorphicEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function createFormActions<FormValues extends Record<string, any> = Record<string, any>>(
  name: string
) {
  validateFormName(name);

  const setFieldValue: SetFieldValue<FormValues> = (path, value) =>
    dispatchEvent(`ui-form:${name}:set-field-value`, { path, value });

  const setValues: SetValues<FormValues> = (values) =>
    dispatchEvent(`ui-form:${name}:set-values`, values);

  const setInitialValues: SetInitialValues<FormValues> = (values) =>
    dispatchEvent(`ui-form:${name}:set-initial-values`, values);

  const setErrors: SetErrors = (errors) => dispatchEvent(`ui-form:${name}:set-errors`, errors);

  const setFieldError: SetFieldError<FormValues> = (path, error) =>
    dispatchEvent(`ui-form:${name}:set-field-error`, { path, error });

  const clearFieldError: ClearFieldError = (path) =>
    dispatchEvent(`ui-form:${name}:clear-field-error`, path);

  const clearErrors: ClearErrors = () => dispatchEvent(`ui-form:${name}:clear-errors`);

  const reset: Reset = () => dispatchEvent(`ui-form:${name}:reset`);

  const validate: () => void = () => dispatchEvent(`ui-form:${name}:validate`);

  const validateField: (path: any) => void = (path) =>
    dispatchEvent(`ui-form:${name}:validate-field`, path);

  const reorderListItem: ReorderListItem<FormValues> = (path, payload) =>
    dispatchEvent(`ui-form:${name}:reorder-list-item`, { path, payload });

  const removeListItem: RemoveListItem<FormValues> = (path, index) =>
    dispatchEvent(`ui-form:${name}:remove-list-item`, { path, index });

  const insertListItem: InsertListItem<FormValues> = (path, item, index) =>
    dispatchEvent(`ui-form:${name}:insert-list-item`, { path, index, item });

  const setDirty: SetFormStatus = (value) => dispatchEvent(`ui-form:${name}:set-dirty`, value);

  const setTouched: SetFormStatus = (value) =>
    dispatchEvent(`ui-form:${name}:set-touched`, value);

  const resetDirty: ResetDirty<FormValues> = (values) =>
    dispatchEvent(`ui-form:${name}:reset-dirty`, values);

  const resetTouched: ResetStatus = () => dispatchEvent(`ui-form:${name}:reset-touched`);

  return {
    setFieldValue,
    setValues,
    setInitialValues,
    setErrors,
    setFieldError,
    clearFieldError,
    clearErrors,
    reset,
    validate,
    validateField,
    reorderListItem,
    removeListItem,
    insertListItem,
    setDirty,
    setTouched,
    resetDirty,
    resetTouched,
  };
}

function useFormEvent(eventKey: string | undefined, handler: (event: any) => void) {
  // 经 ref 转发最新 handler：effect 依赖只有 eventKey，
  // 直接绑定首帧 handler 会让闭包捕获的 rules/onValuesChange 永远停留在首帧版本
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useIsomorphicEffect(() => {
    if (eventKey) {
      const listener = (event: any) => handlerRef.current(event);
      window.addEventListener(eventKey, listener);
      return () => window.removeEventListener(eventKey, listener);
    }
    return undefined;
  }, [eventKey]);
}

export function useFormActions<Values = Record<string, unknown>, TransformedValues = Values>(
  name: string | undefined,
  form: UseFormReturnType<Values, TransformedValues, any>
) {
  if (name) {
    validateFormName(name);
  }

  // name 为空时 eventKey 必须为 undefined:name 缺省时模板串会拼出
  // 'ui-form:undefined:*' 这类非空字符串,eventKey 真值判空失效,
  // 会向 window 挂 17 个永不派发的死监听
  useFormEvent(name ? `ui-form:${name}:set-field-value` : undefined, (event: CustomEvent) =>
    form.setFieldValue(event.detail.path, event.detail.value)
  );

  useFormEvent(name ? `ui-form:${name}:set-values` : undefined, (event: CustomEvent) =>
    form.setValues(event.detail)
  );

  useFormEvent(name ? `ui-form:${name}:set-initial-values` : undefined, (event: CustomEvent) =>
    form.setInitialValues(event.detail)
  );

  useFormEvent(name ? `ui-form:${name}:set-errors` : undefined, (event: CustomEvent) =>
    form.setErrors(event.detail)
  );

  useFormEvent(name ? `ui-form:${name}:set-field-error` : undefined, (event: CustomEvent) =>
    form.setFieldError(event.detail.path, event.detail.error)
  );

  useFormEvent(name ? `ui-form:${name}:clear-field-error` : undefined, (event: CustomEvent) =>
    form.clearFieldError(event.detail)
  );

  useFormEvent(name ? `ui-form:${name}:clear-errors` : undefined, form.clearErrors);
  useFormEvent(name ? `ui-form:${name}:reset` : undefined, form.reset);
  useFormEvent(name ? `ui-form:${name}:validate` : undefined, form.validate);

  useFormEvent(name ? `ui-form:${name}:validate-field` : undefined, (event: CustomEvent) =>
    form.validateField(event.detail)
  );

  useFormEvent(name ? `ui-form:${name}:reorder-list-item` : undefined, (event: CustomEvent) =>
    form.reorderListItem(event.detail.path, event.detail.payload)
  );

  useFormEvent(name ? `ui-form:${name}:remove-list-item` : undefined, (event: CustomEvent) =>
    form.removeListItem(event.detail.path, event.detail.index)
  );

  useFormEvent(name ? `ui-form:${name}:insert-list-item` : undefined, (event: CustomEvent) =>
    form.insertListItem(event.detail.path, event.detail.item, event.detail.index)
  );

  useFormEvent(name ? `ui-form:${name}:set-dirty` : undefined, (event: CustomEvent) =>
    form.setDirty(event.detail)
  );

  useFormEvent(name ? `ui-form:${name}:set-touched` : undefined, (event: CustomEvent) =>
    form.setTouched(event.detail)
  );

  useFormEvent(name ? `ui-form:${name}:reset-dirty` : undefined, (event: CustomEvent) =>
    form.resetDirty(event.detail)
  );

  useFormEvent(name ? `ui-form:${name}:reset-touched` : undefined, form.resetTouched);
}
