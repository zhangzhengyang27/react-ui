/**
 * 这里锁的是一个容易被误判成 bug 的设计：表单各类 getter（getValues / isDirty /
 * isTouched / getDirty / getTouched / isValid / isValidating ...）的身份**必须**随
 * 底层值变化而变化。
 *
 * 因此源码里它们写成 `useCallback(fn, [valueRef.current])` —— 把 ref 的当前值放进依赖表。
 * 这会被 react-hooks/exhaustive-deps 报成 "unnecessary dependency"，看起来像手误，
 * 但清成 `[]` 会静默破坏下游 memoization：调用方拿到的是一个永不变化的函数身份，
 * 于是 form.getValues() 之类作为 useMemo/useEffect 依赖时不再失效，读到旧值。
 *
 * 2026-09-21 实测：把其中 9 处按 lint 建议"改正"后，本文件与 use-field 版共 10 条用例立刻红。
 * 看到这条告警请不要再动依赖表。
 */

import { act, renderHook } from '@testing-library/react';
import { useField } from '../../use-field';

describe('@xiaoye-react/ui/use-field compiler stability', () => {
  it('changes getter identity after a value change', () => {
    const hook = renderHook(() => useField({ initialValue: 'test' }));

    const before = {
      getValue: hook.result.current.getValue,
      isDirty: hook.result.current.isDirty,
    };

    act(() => hook.result.current.getInputProps().onChange('new value'));

    expect(hook.result.current.getValue).not.toBe(before.getValue);
    expect(hook.result.current.isDirty).not.toBe(before.isDirty);
  });

  it('changes isTouched identity after the field is touched', () => {
    const hook = renderHook(() => useField({ initialValue: 'test' }));
    const before = hook.result.current.isTouched;
    act(() => hook.result.current.getInputProps().onFocus?.());
    expect(hook.result.current.isTouched).not.toBe(before);
  });

  it('keeps a stable getter identity across a re-render with no data change', () => {
    const hook = renderHook(() => useField({ initialValue: 'test' }));

    const before = {
      getValue: hook.result.current.getValue,
      isTouched: hook.result.current.isTouched,
      isDirty: hook.result.current.isDirty,
    };

    act(() => hook.rerender());

    expect(hook.result.current.getValue).toBe(before.getValue);
    expect(hook.result.current.isTouched).toBe(before.isTouched);
    expect(hook.result.current.isDirty).toBe(before.isDirty);
  });

  it('reads current data from getters retained across renders', () => {
    const hook = renderHook(() => useField({ initialValue: 'test' }));

    const retainedGetValue = hook.result.current.getValue;
    const retainedIsDirty = hook.result.current.isDirty;
    const retainedIsTouched = hook.result.current.isTouched;

    act(() => hook.result.current.getInputProps().onFocus?.());
    act(() => hook.result.current.getInputProps().onChange('new value'));

    expect(retainedGetValue()).toBe('new value');
    expect(retainedIsDirty()).toBe(true);
    expect(retainedIsTouched()).toBe(true);
  });
});
