import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCallback, useState } from 'react';
import type { FormFieldSubscriber } from '../../types';
import { useForm } from '../../use-form';

function TestComponent({ watch }: { watch: FormFieldSubscriber<any, any> }) {
  const form = useForm({ initialValues: { name: 'test', area: 'area' } });
  form.watch('name', watch);

  return (
    <>
      <input {...form.getInputProps('name')} aria-label="name" />
      <input {...form.getInputProps('area')} aria-label="area" />
    </>
  );
}

describe('@xiaoye-react/ui/watch', () => {
  it('allows observing field changes', async () => {
    const spy = jest.fn();
    render(<TestComponent watch={spy} />);
    expect(spy).not.toHaveBeenCalled();

    await userEvent.type(screen.getByLabelText('name'), '1');

    expect(spy).toHaveBeenCalledWith({
      previousValue: 'test',
      value: 'test1',
      touched: true,
      dirty: true,
    });

    await userEvent.type(screen.getByLabelText('name'), '{backspace}');

    expect(spy).toHaveBeenCalledWith({
      previousValue: 'test1',
      value: 'test',
      touched: true,
      dirty: false,
    });
  });

  it('does not call subscriber function when other field changes', async () => {
    const spy = jest.fn();
    render(<TestComponent watch={spy} />);
    expect(spy).not.toHaveBeenCalled();

    await userEvent.type(screen.getByLabelText('area'), '1');

    expect(spy).not.toHaveBeenCalled();
  });

  it('calls subscriber function when field changes due to form initialize', () => {
    const hook = renderHook(() =>
      useForm({ mode: 'uncontrolled', initialValues: { a: '', b: '' } })
    );
    const spy = jest.fn();

    act(() => renderHook(() => hook.result.current.watch('a', spy)));
    expect(spy).not.toHaveBeenCalled();

    act(() => hook.result.current.initialize({ a: 'c', b: '' }));

    expect(spy).toHaveBeenCalledWith({
      previousValue: '',
      value: 'c',
      touched: false,
      dirty: false,
    });
  });

  it('does not call subscriber function when other field changes due to form initialize', () => {
    const hook = renderHook(() =>
      useForm({ mode: 'uncontrolled', initialValues: { a: '', b: '' } })
    );
    const spy = jest.fn();

    act(() => renderHook(() => hook.result.current.watch('a', spy)));
    expect(spy).not.toHaveBeenCalled();

    act(() => hook.result.current.initialize({ a: '', b: 'd' }));

    expect(spy).not.toHaveBeenCalled();
  });

  it('notifies parent watcher when nested array field changes via setFieldValue', () => {
    const hook = renderHook(() =>
      useForm({
        mode: 'uncontrolled',
        initialValues: {
          products: [{ name: 'phone', price: 1000, quantity: 1 }],
        },
      })
    );

    const spy = jest.fn();
    act(() => renderHook(() => hook.result.current.watch('products', spy)));
    expect(spy).not.toHaveBeenCalled();

    act(() => hook.result.current.setFieldValue('products.0.quantity', 5));
    expect(spy).toHaveBeenCalledWith({
      previousValue: [{ name: 'phone', price: 1000, quantity: 1 }],
      value: [{ name: 'phone', price: 1000, quantity: 5 }],
      touched: true,
      dirty: true,
    });
  });

  it('notifies parent watcher when insertListItem is called', () => {
    const hook = renderHook(() =>
      useForm({
        mode: 'uncontrolled',
        initialValues: {
          products: [{ name: 'phone' }],
        },
      })
    );

    const spy = jest.fn();
    act(() => renderHook(() => hook.result.current.watch('products', spy)));

    act(() => hook.result.current.insertListItem('products', { name: 'tablet' }));
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        previousValue: [{ name: 'phone' }],
        value: [{ name: 'phone' }, { name: 'tablet' }],
      })
    );
  });

  it('notifies parent watcher when removeListItem is called', () => {
    const hook = renderHook(() =>
      useForm({
        mode: 'uncontrolled',
        initialValues: {
          products: [{ name: 'phone' }, { name: 'tablet' }],
        },
      })
    );

    const spy = jest.fn();
    act(() => renderHook(() => hook.result.current.watch('products', spy)));

    act(() => hook.result.current.removeListItem('products', 1));
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        previousValue: [{ name: 'phone' }, { name: 'tablet' }],
        value: [{ name: 'phone' }],
      })
    );
  });

  it('notifies parent watcher when reorderListItem is called', () => {
    const hook = renderHook(() =>
      useForm({
        mode: 'uncontrolled',
        initialValues: {
          products: [{ name: 'phone' }, { name: 'tablet' }],
        },
      })
    );

    const spy = jest.fn();
    act(() => renderHook(() => hook.result.current.watch('products', spy)));

    act(() => hook.result.current.reorderListItem('products', { from: 0, to: 1 }));
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        previousValue: [{ name: 'phone' }, { name: 'tablet' }],
        value: [{ name: 'tablet' }, { name: 'phone' }],
      })
    );
  });

  it('notifies parent watcher when replaceListItem is called', () => {
    const hook = renderHook(() =>
      useForm({
        mode: 'uncontrolled',
        initialValues: {
          products: [{ name: 'phone' }, { name: 'tablet' }],
        },
      })
    );

    const spy = jest.fn();
    act(() => renderHook(() => hook.result.current.watch('products', spy)));

    act(() => hook.result.current.replaceListItem('products', 0, { name: 'laptop' }));
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        previousValue: [{ name: 'phone' }, { name: 'tablet' }],
        value: [{ name: 'laptop' }, { name: 'tablet' }],
      })
    );
  });

  it('does not invoke parent watcher multiple times when parent and child are both watched', () => {
    const hook = renderHook(() =>
      useForm({
        mode: 'uncontrolled',
        initialValues: {
          products: [{ name: 'phone', quantity: 1 }],
        },
      })
    );

    const parentSpy = jest.fn();
    const childSpy = jest.fn();
    act(() => renderHook(() => hook.result.current.watch('products', parentSpy)));
    act(() => renderHook(() => hook.result.current.watch('products.0.quantity', childSpy)));

    act(() => hook.result.current.insertListItem('products', { name: 'tablet', quantity: 2 }));
    expect(parentSpy).toHaveBeenCalledTimes(1);

    parentSpy.mockClear();
    childSpy.mockClear();

    act(() => hook.result.current.setFieldValue('products.0.quantity', 5));
    expect(parentSpy).toHaveBeenCalledTimes(1);
    expect(childSpy).toHaveBeenCalledTimes(1);
  });

  it('cascades updates when cascadeUpdate is set to true', () => {
    const hook = renderHook(() =>
      useForm({
        mode: 'uncontrolled',
        cascadeUpdates: true,
        initialValues: { person: { name: '' } },
      })
    );

    const personSpy = jest.fn();

    act(() => renderHook(() => hook.result.current.watch('person', personSpy)));
    act(() => hook.result.current.setFieldValue('person.name', 'jane doe'));
    expect(personSpy).toHaveBeenCalledWith({
      previousValue: { name: '' },
      value: { name: 'jane doe' },
      touched: true,
      dirty: true,
    });

    const nameSpy = jest.fn();
    act(() => renderHook(() => hook.result.current.watch('person.name', nameSpy)));
    act(() => hook.result.current.setFieldValue('person', { name: 'john doe' }));
    expect(nameSpy).toHaveBeenCalledWith({
      previousValue: 'jane doe',
      value: 'john doe',
      touched: true,
      dirty: true,
    });
  });

  it('cascadeUpdates notifies child watcher on setValues', () => {
    const hook = renderHook(() =>
      useForm({
        mode: 'uncontrolled',
        cascadeUpdates: true,
        initialValues: { person: { name: '' } },
      })
    );

    const nameSpy = jest.fn();
    act(() => renderHook(() => hook.result.current.watch('person.name', nameSpy)));

    act(() => hook.result.current.setValues({ person: { name: 'jane doe' } }));
    expect(nameSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        previousValue: '',
        value: 'jane doe',
      })
    );
  });

  it('cascadeUpdates notifies child watcher on initialize', () => {
    const hook = renderHook(() =>
      useForm({
        mode: 'uncontrolled',
        cascadeUpdates: true,
        initialValues: { person: { name: '' } },
      })
    );

    const nameSpy = jest.fn();
    act(() => renderHook(() => hook.result.current.watch('person.name', nameSpy)));

    act(() => hook.result.current.initialize({ person: { name: 'jane doe' } }));
    expect(nameSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        previousValue: '',
        value: 'jane doe',
      })
    );
  });

  it('cascadeUpdates notifies child watcher on list operations', () => {
    const hook = renderHook(() =>
      useForm({
        mode: 'uncontrolled',
        cascadeUpdates: true,
        initialValues: { products: [{ name: 'phone' }] },
      })
    );

    const nameSpy = jest.fn();
    act(() => renderHook(() => hook.result.current.watch('products.0.name', nameSpy)));

    act(() => hook.result.current.replaceListItem('products', 0, { name: 'tablet' }));
    expect(nameSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        previousValue: 'phone',
        value: 'tablet',
      })
    );
  });

  // 回归：watch 内部注册订阅的 effect 曾只依赖 callback。消费方越规范
  // （用 useCallback 把 callback 稳定住），换 watched 字段时就越不会重新订阅，
  // 于是订阅永远挂在旧字段上——新字段收不到通知，旧字段却还在通知。
  // 上方那条 effect 压着 rules-of-hooks 豁免，exhaustive-deps 分析不到它，只能靠这条守住。
  it('re-subscribes when the watched path changes and the callback identity is stable', () => {
    const spy = jest.fn();

    const view = renderHook(() => {
      const [field, setField] = useState<'a' | 'b'>('a');
      const form = useForm({ mode: 'uncontrolled', initialValues: { a: '', b: '' } });
      const stableCallback = useCallback(spy, []);
      form.watch(field, stableCallback);
      return { form, setField };
    });

    act(() => view.result.current.setField('b'));

    act(() => view.result.current.form.setValues({ a: '', b: 'changed' }));
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ value: 'changed' }));

    spy.mockClear();
    act(() => view.result.current.form.setValues({ a: 'stale', b: 'changed' }));
    expect(spy).not.toHaveBeenCalled();
  });
});
