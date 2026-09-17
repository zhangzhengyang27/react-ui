import dayjs from 'dayjs';
import { renderHook } from '@testing-library/react';
import { useUncontrolledDates } from './use-uncontrolled-dates';

type HookConfig = Parameters<typeof useUncontrolledDates>[0];

const hookDefaults: Omit<HookConfig, 'type'> = {
  defaultValue: undefined!,
  value: undefined!,
  onChange: () => {},
};

const defaultTypeValue = dayjs(new Date()).format('YYYY-MM-DD');

const rangeTypeValue = [
  dayjs(new Date()).format('YYYY-MM-DD'),
  dayjs(new Date(Date.now() + 86400000)).format('YYYY-MM-DD'),
];

const multipleTypeValue = [
  dayjs(new Date(Date.now() - 86400000)).format('YYYY-MM-DD'),
  dayjs(new Date()).format('YYYY-MM-DD'),
  dayjs(new Date(Date.now() + 86400000)).format('YYYY-MM-DD'),
];

const setupHook = (config: Pick<HookConfig, 'type'> & Partial<HookConfig>) =>
  renderHook<any, HookConfig>((innerConfig) => useUncontrolledDates(innerConfig), {
    initialProps: {
      ...hookDefaults,
      ...config,
    },
  });

describe('use-uncontrolled-dates', () => {
  it('returns correct value for type `default` and uncontrolled use in case no defaultValue has been specified', () => {
    const hook = setupHook({
      type: 'default',
    });
    expect(hook.result.current[0]).toBe(null);
  });

  it('returns correct value for type `multiple` and uncontrolled use in case no defaultValue has been specified', () => {
    const hook = setupHook({
      type: 'multiple',
    });
    expect(hook.result.current[0]).toStrictEqual([]);
  });

  it('returns correct value for type `range` and uncontrolled use in case no defaultValue has been specified', () => {
    const hook = setupHook({
      type: 'range',
    });
    expect(hook.result.current[0]).toStrictEqual([null, null]);
  });

  it('returns defaultValue for type `default` and uncontrolled use', () => {
    const hook = setupHook({
      type: 'default',
      defaultValue: defaultTypeValue,
    });
    expect(hook.result.current[0]).toBe(defaultTypeValue);
  });

  it('returns defaultValue for type `multiple` and uncontrolled use', () => {
    const hook = setupHook({
      type: 'multiple',
      defaultValue: multipleTypeValue,
    });
    expect(hook.result.current[0]).toStrictEqual(multipleTypeValue);
  });

  it('returns defaultValue for type `range` and uncontrolled use', () => {
    const hook = setupHook({
      type: 'range',
      defaultValue: rangeTypeValue,
    });
    expect(hook.result.current[0]).toStrictEqual(rangeTypeValue);
  });

  it('returns value for type `default` and controlled use', () => {
    const hook = setupHook({
      type: 'default',
      value: defaultTypeValue,
    });
    expect(hook.result.current[0]).toBe(defaultTypeValue);
  });

  it('returns value for type `multiple` and controlled use', () => {
    const hook = setupHook({
      type: 'multiple',
      value: multipleTypeValue,
    });
    expect(hook.result.current[0]).toStrictEqual(multipleTypeValue);
  });

  it('returns value for type `range` and controlled use', () => {
    const hook = setupHook({
      type: 'range',
      value: rangeTypeValue,
    });
    expect(hook.result.current[0]).toStrictEqual(rangeTypeValue);
  });

  it('allows changing the type in controlled use', () => {
    const hook = setupHook({
      type: 'default',
      value: defaultTypeValue,
    });

    hook.rerender({
      ...hookDefaults,
      type: 'multiple',
      value: multipleTypeValue,
    });
    expect(hook.result.current[0]).toStrictEqual(multipleTypeValue);
  });

  it('resets the value when changing the type in uncontrolled use', () => {
    const hook = setupHook({
      type: 'default',
      defaultValue: defaultTypeValue,
    });

    hook.rerender({
      ...hookDefaults,
      type: 'multiple',
      defaultValue: multipleTypeValue,
    });

    expect(hook.result.current[0]).toStrictEqual(multipleTypeValue);

    hook.rerender({
      ...hookDefaults,
      type: 'default',
    });
    expect(hook.result.current[0]).toStrictEqual(null);

    hook.rerender({
      ...hookDefaults,
      type: 'range',
      defaultValue: rangeTypeValue,
    });
    expect(hook.result.current[0]).toStrictEqual(rangeTypeValue);

    hook.rerender({
      ...hookDefaults,
      type: 'default',
    });
    expect(hook.result.current[0]).toStrictEqual(null);
  });

  it('maps array defaultValue to the first non-null entry when switching back to type `default`', () => {
    const hook = setupHook({
      type: 'range',
      defaultValue: rangeTypeValue,
    });
    expect(hook.result.current[0]).toStrictEqual(rangeTypeValue);

    hook.rerender({
      ...hookDefaults,
      type: 'default',
      defaultValue: rangeTypeValue,
    });

    // 切回 default 时数组 defaultValue 不能原样灌入,否则显示 Invalid Date 且反选失效
    expect(hook.result.current[0]).toBe(rangeTypeValue[0]);
  });

  it('filters null entries when mapping defaultValue to type `multiple`', () => {
    const halfRange = [rangeTypeValue[0], null];

    const hook = setupHook({
      type: 'range',
      defaultValue: halfRange as any,
    });
    expect(hook.result.current[0]).toStrictEqual(halfRange);

    hook.rerender({
      ...hookDefaults,
      type: 'multiple',
      defaultValue: halfRange as any,
    });

    // multiple 分支必须滤 null,否则 join 出 "Invalid Date"
    expect(hook.result.current[0]).toStrictEqual([rangeTypeValue[0]]);
  });

  it('notifies onChange after the type switch render instead of during it', () => {
    const onChange = jest.fn();
    const hook = setupHook({
      type: 'range',
      defaultValue: rangeTypeValue,
      onChange,
    });
    expect(onChange).not.toHaveBeenCalled();

    hook.rerender({
      ...hookDefaults,
      type: 'multiple',
      defaultValue: multipleTypeValue,
      onChange,
    });

    // 渲染期只做形状派生,onChange 在提交 effect 中触发一次且值与派生结果一致
    expect(hook.result.current[0]).toStrictEqual(multipleTypeValue);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(multipleTypeValue);
  });
});
