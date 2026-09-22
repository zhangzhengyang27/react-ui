import { useCallback, useRef, useState } from 'react';
import { getPath, setPath } from '../../paths';
import { FormMode } from '../../types';

export interface $FormValues<out Values extends Record<PropertyKey, any>> {
  initialized: React.RefObject<boolean>;
  stateValues: Values;
  refValues: React.RefObject<Values>;
  valuesSnapshot: React.RefObject<Values>;
  setValues: <TValues extends Values>(payload: SetValuesInput<TValues>) => void;
  setFieldValue: <TValues extends Values>(payload: SetFieldValueInput<TValues>) => void;
  resetValues: () => void;
  setValuesSnapshot: <TValues extends Values>(payload: TValues) => void;
  initialize: <TValues extends Values>(values: TValues, onInitialize: () => void) => void;
  getValues: () => Values;
  getValuesSnapshot: () => Values;
  resetField: <TValues extends Values>(
    path: PropertyKey,
    subscribers?: (SetFieldValueSubscriber<TValues> | null | undefined)[]
  ) => void;
}

export interface SetValuesSubscriberPayload<Values> {
  path?: PropertyKey;
  updatedValues: Values;
  previousValues: Values;
}

export interface SetValuesInput<out Values = Record<string, any>> {
  values: Partial<Values> | (<TValues extends Values>(values: TValues) => Partial<TValues>);
  mergeWithPreviousValues?: boolean;
  updateState?: boolean;
  subscribers?: (SetFieldValueSubscriber<Values> | null | undefined)[];
}

export type SetFieldValueSubscriber<out Values> = <TValues extends Values>(
  payload: SetValuesSubscriberPayload<TValues>
) => void;

export interface SetFieldValueInput<Values> {
  path: PropertyKey;
  value: any;
  updateState?: boolean;
  subscribers?: (SetFieldValueSubscriber<Values> | null | undefined)[];
}

interface UseFormValuesInput<Values extends Record<PropertyKey, any>> {
  initialValues: Values | undefined;
  mode: FormMode;
  onValuesChange?: ((values: Values, previousValues: Values) => void) | undefined;
}

export function useFormValues<Values extends Record<PropertyKey, any>>({
  initialValues,
  onValuesChange,
  mode,
}: UseFormValuesInput<Values>): $FormValues<Values> {
  const initialized = useRef(false);
  const [stateValues, setStateValues] = useState<Values>(initialValues || ({} as Values));
  const refValues = useRef(stateValues);
  const valuesSnapshot = useRef(stateValues);

  // onValuesChange 经 ref 转发最新值:消费方传内联回调(每渲染新引用)时 setValues
  // 身份保持稳定,reset/initialize/列表操作等空依赖回调触发的 onValuesChange
  // 才能始终是最新版本,不会停留在首帧闭包
  const onValuesChangeRef = useRef(onValuesChange);
  onValuesChangeRef.current = onValuesChange;

  const setValues = useCallback(
    ({
      values,
      subscribers,
      updateState = true,
      mergeWithPreviousValues = true,
    }: SetValuesInput<Values>) => {
      const previousValues = refValues.current;
      const resolvedValues = values instanceof Function ? values(refValues.current) : values;
      const updatedValues = mergeWithPreviousValues
        ? { ...previousValues, ...resolvedValues }
        : (resolvedValues as Values);
      refValues.current = updatedValues;
      if (updateState) {
        setStateValues(updatedValues);
        if (mode === 'uncontrolled') {
          refValues.current = updatedValues;
        }
      }
      onValuesChangeRef.current?.(updatedValues, previousValues);
      subscribers
        ?.filter(Boolean)
        .forEach((subscriber) => subscriber!({ updatedValues, previousValues }));
    },
    // deps 留空保持 setValues 身份稳定(mode 为表单级常量,onValuesChange 已走 ref),
    // 供 reset/initialize/列表操作等空依赖回调安全捕获
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const setFieldValue = useCallback(
    (payload: SetFieldValueInput<Values>) => {
      const currentValue = getPath(payload.path, refValues.current);
      const updatedValue =
        payload.value instanceof Function ? payload.value(currentValue) : payload.value;

      if (currentValue !== updatedValue) {
        const previousValues = refValues.current;
        const updatedValues = setPath(payload.path, updatedValue, refValues.current);
        setValues({ values: updatedValues, updateState: payload.updateState });

        payload.subscribers
          ?.filter(Boolean)
          .forEach((subscriber) =>
            subscriber!({ path: payload.path, updatedValues, previousValues })
          );
      }
    },
    [setValues]
  );

  const setValuesSnapshot = useCallback((payload: Values) => {
    // 浅拷贝后再存：resetValues 以 mergeWithPreviousValues:false 直接引用快照，
    // 若共享同一对象，调用方对 getValues() 结果的就地修改会污染快照，reset 还原到脏数据
    valuesSnapshot.current = { ...payload };
  }, []);

  const initialize = useCallback(
    (values: Values, onInitialize: () => void) => {
      if (!initialized.current) {
        initialized.current = true;
        setValues({ values, updateState: mode === 'controlled' });
        setValuesSnapshot(values);
        onInitialize();
      }
    },
    [setValues]
  );

  const resetValues = useCallback(() => {
    setValues({
      // 再次浅拷贝：setValues 落到 refValues 后不应与快照共享同一对象引用
      values: { ...valuesSnapshot.current },
      updateState: true,
      mergeWithPreviousValues: false,
    });
  }, [setValues]);

  // 依赖里放 ref.current 是有意的：getter 身份必须随值变化，见 tests/use-form/compiler-stability.test.ts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getValues = useCallback(() => refValues.current, [refValues.current]);
  // 依赖里放 ref.current 是有意的：getter 身份必须随值变化，见 tests/use-form/compiler-stability.test.ts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getValuesSnapshot = useCallback(() => valuesSnapshot.current, [valuesSnapshot.current]);

  const resetField = useCallback(
    (path: PropertyKey, subscribers?: (SetFieldValueSubscriber<Values> | null | undefined)[]) => {
      const snapshotValue = getPath(path, valuesSnapshot.current);
      if (typeof snapshotValue === 'undefined') {
        return;
      }
      setFieldValue({
        path,
        value: snapshotValue,
        updateState: mode === 'controlled',
        subscribers,
      });
    },
    [setFieldValue, mode]
  );

  return {
    initialized,
    stateValues,
    refValues,
    valuesSnapshot,
    setValues,
    setFieldValue,
    resetValues,
    setValuesSnapshot,
    initialize,
    getValues,
    getValuesSnapshot,
    resetField,
  };
}
