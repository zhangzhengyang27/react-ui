import { useCallback, useMemo, useRef, useState } from 'react';
import isEqual from 'fast-deep-equal';
import { getStatus } from '../../get-status';
import { clearListState } from '../../lists';
import { getPath } from '../../paths';
import {
  ClearFieldDirty,
  FormMode,
  FormStatus,
  GetFieldStatus,
  ResetDirty,
  ResetStatus,
  SetCalculatedFieldDirty,
  SetFieldDirty,
  SetFieldTouched,
} from '../../types';
import type { $FormValues } from '../use-form-values/use-form-values';

export interface $FormStatus<out Values extends Record<string, any>> {
  touchedState: FormStatus;
  dirtyState: FormStatus;
  touchedRef: React.RefObject<FormStatus>;
  dirtyRef: React.RefObject<FormStatus>;
  setTouched: React.Dispatch<React.SetStateAction<FormStatus>>;
  setDirty: React.Dispatch<React.SetStateAction<FormStatus>>;
  resetDirty: ResetStatus;
  resetTouched: ResetStatus;
  isTouched: GetFieldStatus<Values>;
  setFieldTouched: SetFieldTouched<Values>;
  setFieldDirty: SetFieldDirty<Values>;
  setTouchedState: React.Dispatch<React.SetStateAction<FormStatus>>;
  setDirtyState: React.Dispatch<React.SetStateAction<FormStatus>>;
  clearFieldDirty: ClearFieldDirty;
  isDirty: GetFieldStatus<Values>;
  getDirty: () => FormStatus;
  getTouched: () => FormStatus;
  setCalculatedFieldDirty: SetCalculatedFieldDirty<Values>;
}

interface UseFormStatusInput<out Values extends Record<string, any>> {
  initialDirty: FormStatus;
  initialTouched: FormStatus;
  mode: FormMode;
  $values: $FormValues<Values>;
}

export function useFormStatus<Values extends Record<string, any>>({
  initialDirty,
  initialTouched,
  mode,
  $values,
}: UseFormStatusInput<Values>): $FormStatus<Values> {
  const [touchedState, setTouchedState] = useState(initialTouched);
  const [dirtyState, setDirtyState] = useState(initialDirty);

  const touchedRef = useRef(initialTouched);
  const dirtyRef = useRef(initialDirty);

  const setTouched = useCallback((values: FormStatus | ((current: FormStatus) => FormStatus)) => {
    const resolvedValues = typeof values === 'function' ? values(touchedRef.current) : values;
    touchedRef.current = resolvedValues;

    if (mode === 'controlled') {
      setTouchedState(resolvedValues);
    }
  }, [mode]);

  const setDirty = useCallback(
    (values: FormStatus | ((current: FormStatus) => FormStatus), forceUpdate = false) => {
      const resolvedValues = typeof values === 'function' ? values(dirtyRef.current) : values;
      dirtyRef.current = resolvedValues;

      if (mode === 'controlled' || forceUpdate) {
        setDirtyState(resolvedValues);
      }
    },
    [mode]
  );

  const resetTouched: ResetStatus = useCallback(() => setTouched({}), [setTouched]);

  const resetDirty: ResetDirty<Values> = useCallback((values) => {
    const newSnapshot = values
      ? { ...$values.refValues.current, ...values }
      : $values.refValues.current;
    $values.setValuesSnapshot(newSnapshot);
    setDirty({});
  }, [$values, setDirty]);

  const setFieldTouched: SetFieldTouched<Values> = useCallback((path, touched) => {
    setTouched((currentTouched) => {
      if (getStatus(currentTouched, path) === touched) {
        return currentTouched;
      }

      return { ...currentTouched, [path]: touched };
    });
  }, [setTouched]);

  const setFieldDirty: SetFieldDirty<Values> = useCallback((path, dirty, forceUpdate) => {
    setDirty((currentDirty) => {
      if (getStatus(currentDirty, path) === dirty) {
        return currentDirty;
      }

      return { ...currentDirty, [path]: dirty };
    }, forceUpdate);
  }, [setDirty]);

  const setCalculatedFieldDirty: SetCalculatedFieldDirty<Values> = useCallback((path, value) => {
    const currentDirty = getStatus(dirtyRef.current, path);
    const dirty = !isEqual(getPath(path, $values.getValuesSnapshot()), value);
    const clearedState = clearListState(path, dirtyRef.current);
    clearedState[path as string] = dirty;
    setDirty(clearedState, currentDirty !== dirty);
  }, [$values, setDirty]);

  const isTouched: GetFieldStatus<Values> = useCallback(
    (path) => getStatus(touchedRef.current, path),
    // 依赖里放 ref.current 是有意的：getter 身份必须随值变化，见 tests/use-form/compiler-stability.test.ts
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [touchedRef.current]
  );

  const clearFieldDirty: ClearFieldDirty = useCallback(
    (path) =>
      setDirty((current) => {
        if (typeof path !== 'string') {
          return current;
        }

        const result = clearListState(path, current);
        delete result[path];

        if (isEqual(result, current)) {
          return current;
        }

        return result;
      }),
    [setDirty]
  );

  const isDirty: GetFieldStatus<Values> = useCallback(
    (path) => {
      if (path) {
        const overriddenValue = getPath(path, dirtyRef.current);
        if (typeof overriddenValue === 'boolean') {
          return overriddenValue;
        }

        const sliceOfValues = getPath(path, $values.refValues.current);
        const sliceOfInitialValues = getPath(path, $values.valuesSnapshot.current);
        return !isEqual(sliceOfValues, sliceOfInitialValues);
      }

      const isOverridden = Object.keys(dirtyRef.current).length > 0;
      if (isOverridden) {
        return getStatus(dirtyRef.current);
      }

      return !isEqual($values.refValues.current, $values.valuesSnapshot.current);
    },
    [dirtyRef.current, $values.refValues.current, $values.valuesSnapshot.current]
  );

  // 依赖里放 ref.current 是有意的：getter 身份必须随值变化，见 tests/use-form/compiler-stability.test.ts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getDirty = useCallback(() => dirtyRef.current, [dirtyRef.current]);
  // 依赖里放 ref.current 是有意的：getter 身份必须随值变化，见 tests/use-form/compiler-stability.test.ts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTouched = useCallback(() => touchedRef.current, [touchedRef.current]);

  // 稳定容器：对象身份在组件生命周期内不变，成员每渲染重新赋值（与 onChangeRef 同一套
  // 写法）。此前每渲染 return {} 让下游无法把 $ 系列 store 写进依赖表——写了就等于每渲染
  // 重建回调。getter 的身份仍然按契约随值变化（tests/*/compiler-stability.test.ts），
  // 这里稳定的只是外层容器。
  const store = useMemo(() => ({} as $FormStatus<Values>), []);

  store.touchedState = touchedState;
  store.dirtyState = dirtyState;
  store.touchedRef = touchedRef;
  store.dirtyRef = dirtyRef;
  store.setTouched = setTouched;
  store.setDirty = setDirty;
  store.resetDirty = resetDirty;
  store.resetTouched = resetTouched;
  store.isTouched = isTouched;
  store.setFieldTouched = setFieldTouched;
  store.setFieldDirty = setFieldDirty;
  store.setTouchedState = setTouchedState;
  store.setDirtyState = setDirtyState;
  store.clearFieldDirty = clearFieldDirty;
  store.isDirty = isDirty;
  store.getDirty = getDirty;
  store.getTouched = getTouched;
  store.setCalculatedFieldDirty = setCalculatedFieldDirty;

  return store;
}
