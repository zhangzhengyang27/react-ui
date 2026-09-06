import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFormActions } from './actions';
import { getInputOnChange } from './get-input-on-change';
import { useFormErrors } from './hooks/use-form-errors/use-form-errors';
import { useFormList } from './hooks/use-form-list/use-form-list';
import { useFormStatus } from './hooks/use-form-status/use-form-status';
import { useFormValidating } from './hooks/use-form-validating/use-form-validating';
import { useFormValues } from './hooks/use-form-values/use-form-values';
import { useFormWatch } from './hooks/use-form-watch/use-form-watch';
import { getDataPath, getPath } from './paths';
import {
  FormErrors,
  FormRulesRecord,
  GetInputNode,
  GetInputProps,
  GetTransformedValues,
  Initialize,
  IsValidating,
  Key,
  OnReset,
  OnSubmit,
  Reset,
  SetFieldValue,
  SetValues,
  UseFormInput,
  UseFormReturnType,
} from './types';
import { shouldValidateOnChange, validateFieldValue, validateValues } from './validate';

const defaultResolveValidationError = (err: unknown) =>
  err instanceof Error ? err.message : String(err);

export function useForm<
  Values extends Record<string, any>,
  TransformedValues = Values,
  R extends FormErrors | Promise<FormErrors> = FormErrors,
>(
  input: UseFormInput<Values, TransformedValues> & { validate: (values: Values) => R }
): UseFormReturnType<Values, TransformedValues, (values: Values) => R>;

export function useForm<
  Values extends Record<string, any>,
  TransformedValues = Values,
  Rules extends FormRulesRecord<Values> = FormRulesRecord<Values>,
>(
  input: UseFormInput<Values, TransformedValues> & { validate: Rules }
): UseFormReturnType<Values, TransformedValues, Rules>;

export function useForm<
  Values extends Record<string, any> = Record<string, any>,
  TransformedValues = Values,
>(
  input?: UseFormInput<Values, TransformedValues>
): UseFormReturnType<Values, TransformedValues, undefined>;

export function useForm<
  Values extends Record<PropertyKey, any> = Record<string, any>,
  TransformedValues = Values,
>({
  name,
  mode = 'controlled',
  initialValues,
  initialErrors = {},
  initialDirty = {},
  initialTouched = {},
  clearInputErrorOnChange = true,
  validateInputOnChange = false,
  validateInputOnBlur = false,
  onValuesChange,
  transformValues = ((values: Values) => values) as any,
  enhanceGetInputProps,
  validate: rules,
  onSubmitPreventDefault = 'always',
  touchTrigger = 'change',
  cascadeUpdates = false,
  validateDebounce = 0,
  resolveValidationError = defaultResolveValidationError,
}: UseFormInput<Values, TransformedValues> = {}): UseFormReturnType<Values, TransformedValues> {
  const $errors = useFormErrors<Values>(initialErrors);
  const $values = useFormValues<Values>({ initialValues, onValuesChange, mode });
  const $status = useFormStatus<Values>({ initialDirty, initialTouched, $values, mode });
  const $watch = useFormWatch<Values>({ $values, $status, cascadeUpdates });
  const $list = useFormList<Values>({ $values, $errors, $status, $watch });
  const $validating = useFormValidating();
  const [formKey, setFormKey] = useState(0);
  const [fieldKeys, setFieldKeys] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const validateGeneration = useRef(0);

  const reset: Reset = useCallback(() => {
    $values.resetValues();
    $errors.clearErrors();
    $status.resetDirty();
    $status.resetTouched();
    $validating.clearValidating();
    mode === 'uncontrolled' && setFormKey((key) => key + 1);
  }, []);

  const handleValuesChanges = useCallback(
    (previousValues: Values) => {
      clearInputErrorOnChange && $errors.clearErrors();
      mode === 'uncontrolled' && setFormKey((key) => key + 1);
      $watch.notifyWatchSubscribers(previousValues);
    },
    [clearInputErrorOnChange]
  );

  const initialize: Initialize<Values> = useCallback(
    (values) => {
      const previousValues = $values.refValues.current;
      $values.initialize(values, () => mode === 'uncontrolled' && setFormKey((key) => key + 1));
      handleValuesChanges(previousValues);
    },
    [handleValuesChanges]
  );

  // 计时器表放 ref 而非 useMemo：rules 为内联对象（每渲染新引用）时 memo 重建，
  // 重建后旧表里的已排定 timeout 全部失联（clearTimeout 清的是新空表），防抖完全失效；
  // 卸载时统一清理，挂起的回调也不再触达已卸载组件
  const debounceTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  useEffect(
    () => () => {
      Object.values(debounceTimersRef.current).forEach((timer) => window.clearTimeout(timer));
      debounceTimersRef.current = {};
    },
    []
  );

  const debouncedValidateField = useCallback(
    (path: string) => {
      const handleValidation = (path: string) => {
        const signal = $validating.getAbortSignal(path);
        const result = validateFieldValue(
          path,
          rules,
          $values.refValues.current,
          resolveValidationError,
          signal
        );

        const applyResult = (results: { hasError: boolean; error: React.ReactNode }) => {
          if (signal.aborted) {
            return;
          }
          if (results.hasError) {
            $errors.setFieldError(path as any, results.error);
          } else {
            $errors.clearFieldError(path);
          }
        };

        const cleanup = () => {
          if (!signal.aborted) {
            $validating.setFieldValidating(path, false);
          }
        };

        if (result instanceof Promise) {
          $validating.setFieldValidating(path, true);
          result.then(applyResult).finally(cleanup);
        } else {
          applyResult(result);
        }
      };

      clearTimeout(debounceTimersRef.current[path]);
      if (validateDebounce > 0) {
        debounceTimersRef.current[path] = setTimeout(() => handleValidation(path), validateDebounce);
      } else {
        handleValidation(path);
      }
    },
    [validateDebounce, rules, resolveValidationError]
  );

  const setFieldValue: SetFieldValue<Values> = useCallback(
    (path, value, options) => {
      const shouldValidate = shouldValidateOnChange(path, validateInputOnChange);
      const resolvedValue =
        value instanceof Function ? value(getPath(path, $values.refValues.current) as any) : value;

      $status.setCalculatedFieldDirty(path, resolvedValue);
      touchTrigger === 'change' && $status.setFieldTouched(path, true);
      !shouldValidate && clearInputErrorOnChange && $errors.clearFieldError(path);

      $values.setFieldValue({
        path,
        value,
        updateState: mode === 'controlled',
        subscribers: [
          ...$watch.getFieldSubscribers(path),
          shouldValidate ? () => debouncedValidateField(String(path)) : null,
          options?.forceUpdate !== false && mode !== 'controlled'
            ? () =>
                setFieldKeys((keys) => ({
                  ...keys,
                  [path as string]: (keys[path as string] || 0) + 1,
                }))
            : null,
        ],
      });
    },
    [onValuesChange, rules, debouncedValidateField]
  );

  const setValues: SetValues<Values> = useCallback(
    (values) => {
      const previousValues = $values.refValues.current;
      $values.setValues({ values, updateState: mode === 'controlled' });
      handleValuesChanges(previousValues);
    },
    [onValuesChange, handleValuesChanges]
  );

  // 记录当前代际是否属于提交流程：onSubmit 需要区分「被新提交取代」（新提交负责收尾
  // submitting）和「被外部 validate() 取代」（无人收尾，需兜底复位），否则 submitting 卡死
  const submitGenerationRef = useRef<number | null>(null);
  const pendingSubmitValidationRef = useRef(false);

  const validate = useCallback(() => {
    const generation = ++validateGeneration.current;
    if (pendingSubmitValidationRef.current) {
      submitGenerationRef.current = generation;
      pendingSubmitValidationRef.current = false;
    }
    const signal = $validating.getAbortSignal('__form__');

    const handleResult = (results: {
      hasErrors: boolean;
      errors: Record<string, any>;
    }): { hasErrors: boolean; errors: Record<string, any> } => {
      if (generation !== validateGeneration.current) {
        // 过期代际：不应用错误（避免旧结果覆盖新状态），但原样返回结果，
        // 公开类型不出现 null；取代判定由调用方比对代际完成
        return results;
      }
      $errors.setErrors(results.errors);
      return results;
    };

    const cleanup = () => {
      if (generation === validateGeneration.current) {
        $validating.setFormValidating(false);
      }
    };

    const result = validateValues(rules, $values.refValues.current, resolveValidationError, signal);

    if (result instanceof Promise) {
      $validating.setFormValidating(true);
      return result.then(handleResult).finally(cleanup);
    }

    return handleResult(result);
  }, [rules, resolveValidationError]);

  const validateField = useCallback(
    (path: string) => {
      const signal = $validating.getAbortSignal(String(path));

      const applyResult = (results: { hasError: boolean; error: React.ReactNode }) => {
        if (signal.aborted) {
          return { hasError: false, error: null };
        }
        if (results.hasError) {
          $errors.setFieldError(path, results.error);
        } else {
          $errors.clearFieldError(path);
        }
        return results;
      };

      const cleanup = () => {
        if (!signal.aborted) {
          $validating.setFieldValidating(String(path), false);
        }
      };

      const result = validateFieldValue(
        path,
        rules,
        $values.refValues.current,
        resolveValidationError,
        signal
      );

      if (result instanceof Promise) {
        $validating.setFieldValidating(String(path), true);
        return result.then(applyResult).finally(cleanup);
      }

      return applyResult(result);
    },
    [rules, resolveValidationError]
  );

  const getInputProps: GetInputProps<Values> = (
    path,
    { type = 'input', withError = true, withFocus, ...otherOptions } = {}
  ) => {
    const _withFocus = withFocus ?? type !== 'radio';
    const onChange = getInputOnChange((value) =>
      setFieldValue(path, value as any, { forceUpdate: false })
    );

    const payload: any = { onChange, 'data-path': getDataPath(name, path) };

    if (withError) {
      payload.error = $errors.errorsState[path];
    }

    if (type === 'checkbox') {
      payload[mode === 'controlled' ? 'checked' : 'defaultChecked'] = getPath(
        path,
        $values.refValues.current
      );
    } else if (type === 'radio') {
      payload[mode === 'controlled' ? 'checked' : 'defaultChecked'] =
        getPath(path, $values.refValues.current) === otherOptions.value;
      payload.value = otherOptions.value;
    } else {
      payload[mode === 'controlled' ? 'value' : 'defaultValue'] = getPath(
        path,
        $values.refValues.current
      );
    }

    if (_withFocus) {
      payload.onFocus = () => $status.setFieldTouched(path, true);
      payload.onBlur = () => {
        if (shouldValidateOnChange(path, validateInputOnBlur)) {
          debouncedValidateField(String(path));
        }
      };
    }

    return Object.assign(
      payload,
      enhanceGetInputProps?.({
        inputProps: payload,
        field: path,
        options: { type, withError, withFocus: _withFocus, ...otherOptions },
        form: form as any,
      })
    );
  };

  const onSubmit: OnSubmit<Values, TransformedValues> =
    (handleSubmit, handleValidationFailure) => (event) => {
      if (onSubmitPreventDefault === 'always') {
        event?.preventDefault();
      }

      setSubmitting(true);

      const handleValidation = (results: { hasErrors: boolean; errors: Record<string, any> }) => {
        // 本次提交的验证已被更新的验证取代：放弃本次提交流程。
        // 取代者是新提交（最新代际属于提交流程）时由它收尾 submitting；
        // 取代者是外部 validate() 时无人收尾，这里兜底复位，避免提交按钮永久禁用
        if (submitGenerationRef.current !== validateGeneration.current) {
          setSubmitting(false);
          return;
        }

        if (results.hasErrors) {
          if (onSubmitPreventDefault === 'validation-failed') {
            event?.preventDefault();
          }

          handleValidationFailure?.(results.errors, $values.refValues.current, event);
          setSubmitting(false);
        } else {
          const submitResult = handleSubmit?.(
            transformValues($values.refValues.current) as any,
            event
          );

          if (submitResult instanceof Promise) {
            submitResult.finally(() => setSubmitting(false));
          } else {
            setSubmitting(false);
          }
        }
      };

      pendingSubmitValidationRef.current = true;
      const result = validate();
      if (result instanceof Promise) {
        result.then(handleValidation).catch(() => {
          setSubmitting(false);
        });
      } else {
        handleValidation(result);
      }
    };

  const getTransformedValues: GetTransformedValues<Values, TransformedValues> = (input) =>
    (transformValues as any)(input || $values.refValues.current);

  const onReset: OnReset = useCallback((event) => {
    event.preventDefault();
    reset();
  }, []);

  const isValid = useCallback(
    (path?: string) => {
      const signal = new AbortController().signal;
      if (path) {
        const result = validateFieldValue(
          path,
          rules,
          $values.refValues.current,
          resolveValidationError,
          signal
        );
        if (result instanceof Promise) {
          return result.then((r) => !r.hasError);
        }
        return !result.hasError;
      }
      const result = validateValues(
        rules,
        $values.refValues.current,
        resolveValidationError,
        signal
      );
      if (result instanceof Promise) {
        return result.then((r) => !r.hasErrors);
      }
      return !result.hasErrors;
    },
    [rules, resolveValidationError, $values.refValues.current]
  );

  const key: Key<Values> = (path) => `${formKey}-${String(path)}-${fieldKeys[String(path)] || 0}`;

  const getInputNode: GetInputNode<Values> = (path) =>
    document.querySelector(`[data-path="${getDataPath(name, path)}"]`);

  const resetField = useCallback(
    (path: PropertyKey) => {
      $values.resetField(path, [
        mode !== 'controlled'
          ? () =>
              setFieldKeys((keys) => ({
                ...keys,
                [path as string]: (keys[path as string] || 0) + 1,
              }))
          : null,
      ]);
    },
    [$values.resetField, mode, setFieldKeys]
  );

  const form = {
    watch: $watch.watch,

    initialized: $values.initialized.current,
    values: mode === 'uncontrolled' ? $values.refValues.current : $values.stateValues,
    getValues: $values.getValues,
    getInitialValues: $values.getValuesSnapshot,
    setInitialValues: $values.setValuesSnapshot,
    resetField,
    initialize,
    setValues,
    setFieldValue,

    submitting,
    setSubmitting,

    validating: $validating.validating,
    isValidating: $validating.isValidating as IsValidating<Values>,

    errors: $errors.errorsState,
    setErrors: $errors.setErrors,
    setFieldError: $errors.setFieldError,
    clearFieldError: $errors.clearFieldError,
    clearErrors: $errors.clearErrors,

    resetDirty: $status.resetDirty,
    setTouched: $status.setTouched,
    setDirty: $status.setDirty,
    isTouched: $status.isTouched,
    resetTouched: $status.resetTouched,
    isDirty: $status.isDirty,
    getTouched: $status.getTouched,
    getDirty: $status.getDirty,

    reorderListItem: $list.reorderListItem,
    insertListItem: $list.insertListItem,
    removeListItem: $list.removeListItem,
    replaceListItem: $list.replaceListItem,

    reset,
    validate,
    validateField,
    getInputProps,
    onSubmit,
    onReset,
    isValid,
    getTransformedValues,
    key,

    getInputNode,
  };

  useFormActions(name, form as any);

  return form as any;
}
