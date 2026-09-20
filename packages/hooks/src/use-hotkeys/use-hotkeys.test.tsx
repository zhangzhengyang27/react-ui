import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useHotkeys } from './use-hotkeys';

const dispatchEvent = (data: any) => {
  const event = new KeyboardEvent('keydown', data);
  document.documentElement.dispatchEvent(event);
};

describe('@xiaoye-react/hooks/use-hotkey', () => {
  it('should listen to document events', () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys([['shift+ctrl+S', handler]]));
    dispatchEvent({ shiftKey: true, ctrlKey: true, key: 'S' });
    expect(handler).toHaveBeenCalled();
  });

  it('should not fire when keys mismatch', () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys([['alt+L', handler]]));
    dispatchEvent({ metaKey: true, key: 'L' });
    expect(handler).not.toHaveBeenCalled();
  });

  it('should not fire when event is no exact match', () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys([['mod+P', handler]]));
    dispatchEvent({ metaKey: true, altKey: true, key: 'P' });
    expect(handler).not.toHaveBeenCalled();
  });

  it('correctly handles space key', () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys([['shift+space', handler]]));
    dispatchEvent({ shiftKey: true, key: 'space' });
    expect(handler).toHaveBeenCalled();
  });

  it('correctly handles [plus] key', () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys([['shift+[plus]', handler]]));
    dispatchEvent({ shiftKey: true, key: '+' });
    expect(handler).toHaveBeenCalled();
  });

  it('correctly handles physical key assignments like Digit1', () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys([['Digit1', handler, { usePhysicalKeys: true }]]));
    dispatchEvent({ code: 'Digit1' });
    expect(handler).toHaveBeenCalled();
  });

  it('correctly ignores unclear numerical assignments when usePhysicalKeys is true', () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys([['1', handler, { usePhysicalKeys: true }]], [], true));
    dispatchEvent({ code: 'Numpad1' });
    expect(handler).not.toHaveBeenCalled();
  });

  it('correctly assumes physical keys when usePhysicalKeys is true', () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys([['A', handler, { usePhysicalKeys: true }]], [], true));
    dispatchEvent({ code: 'KeyA' });
    expect(handler).toHaveBeenCalled();
  });

  it('does not re-register the listener when an inline array changes identity on rerender', () => {
    const addSpy = vi.spyOn(document.documentElement, 'addEventListener');
    const removeSpy = vi.spyOn(document.documentElement, 'removeEventListener');
    const handler = vi.fn();

    const { rerender } = renderHook(({ _value }) => useHotkeys([['ctrl+S', handler]]), {
      initialProps: { _value: 1 },
    });

    const initialAdds = addSpy.mock.calls.filter(([t]) => t === 'keydown').length;
    const initialRemoves = removeSpy.mock.calls.filter(([t]) => t === 'keydown').length;

    rerender({ _value: 2 });
    rerender({ _value: 3 });

    expect(addSpy.mock.calls.filter(([t]) => t === 'keydown').length).toBe(initialAdds);
    expect(removeSpy.mock.calls.filter(([t]) => t === 'keydown').length).toBe(initialRemoves);

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('calls the latest handler after rerender (no stale closure)', () => {
    const first = vi.fn();
    const second = vi.fn();

    const { rerender } = renderHook(({ handler }) => useHotkeys([['ctrl+S', handler]]), {
      initialProps: { handler: first },
    });

    rerender({ handler: second });

    act(() => {
      dispatchEvent({ ctrlKey: true, key: 'S' });
    });

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('removes the listener on unmount', () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() => useHotkeys([['ctrl+S', handler]]));

    unmount();

    act(() => {
      dispatchEvent({ ctrlKey: true, key: 'S' });
    });

    expect(handler).not.toHaveBeenCalled();
  });
});
