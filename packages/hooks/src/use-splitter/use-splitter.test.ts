import { act, renderHook } from '@testing-library/react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { vi } from 'vitest';
import { useSplitter, type UseSplitterOptions, type UseSplitterPanel } from './use-splitter';

const CONTAINER_WIDTH = 400;

/** jsdom 不做布局，getBoundingClientRect 恒为 0 宽，而百分比拖拽要按容器像素宽度换算增量 */
function createContainerNode(width: number) {
  const node = document.createElement('div');
  node.getBoundingClientRect = () =>
    ({
      left: 0,
      top: 0,
      right: width,
      bottom: 100,
      width,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }) as DOMRect;
  return node;
}

/** 拖拽事件只需带 pointerId/clientX/button，不必依赖 jsdom 缺失的 PointerEvent 构造器 */
function firePointer(type: string, target: EventTarget, init: Record<string, unknown>) {
  act(() => {
    const event = new Event(type, { bubbles: true });
    Object.assign(event, init);
    target.dispatchEvent(event);
  });
}

function setup(panels: UseSplitterPanel[], extra: Partial<UseSplitterOptions> = {}) {
  const { result } = renderHook(() => useSplitter({ panels, ...extra }));
  const container = createContainerNode(CONTAINER_WIDTH);
  const handle = document.createElement('div');

  act(() => {
    result.current.ref(container);
    result.current.getHandleProps({ index: 0 }).ref(handle);
  });

  return { result, handle };
}

const drag = (handle: HTMLElement, fromX: number, toX: number, pointerId = 1) => {
  firePointer('pointerdown', handle, { pointerId, clientX: fromX, button: 0 });
  firePointer('pointermove', document, { pointerId, clientX: toX });
  firePointer('pointerup', document, { pointerId, clientX: toX });
};

const key = (event: Pick<ReactKeyboardEvent, 'key' | 'shiftKey'>) =>
  ({ ...event, preventDefault: () => {} }) as ReactKeyboardEvent;

describe('@xiaoye-react/hooks/use-splitter', () => {
  it('clamps the dragged pane to its own min', () => {
    const { result, handle } = setup([{ defaultSize: 50, min: 20 }, { defaultSize: 50 }]);

    drag(handle, 200, 0);

    expect(result.current.sizes).toEqual([20, 80]);
  });

  it('clamps the dragged pane to its own max', () => {
    const { result, handle } = setup([{ defaultSize: 50, max: 60 }, { defaultSize: 50 }]);

    drag(handle, 200, 400);

    expect(result.current.sizes).toEqual([60, 40]);
  });

  it('ignores pointer events from a pointer other than the one that started the drag', () => {
    const { result, handle } = setup([
      { defaultSize: 50 },
      { defaultSize: 50 },
    ]);

    firePointer('pointerdown', handle, { pointerId: 1, clientX: 200, button: 0 });
    firePointer('pointermove', document, { pointerId: 2, clientX: 350 });
    // 另一根手指抬起既不能改动尺寸，也不能提前结束拖拽
    firePointer('pointerup', document, { pointerId: 2, clientX: 350 });
    firePointer('pointermove', document, { pointerId: 1, clientX: 300 });
    firePointer('pointerup', document, { pointerId: 1, clientX: 300 });

    expect(result.current.sizes).toEqual([75, 25]);
  });

  it('borrows from non-adjacent panes when redistribute is set, still honouring min/max', () => {
    const { result, handle } = setup(
      [{ defaultSize: 50, max: 60 }, { defaultSize: 25, min: 25 }, { defaultSize: 25 }],
      { redistribute: 'nearest' },
    );

    // 向右拖 62.5%：第一个面板只能长到 max(60)，相邻面板已顶在 min，缺口向更后面的面板借
    drag(handle, 200, 450);

    expect(result.current.sizes).toEqual([60, 25, 15]);
  });

  it('keeps only the adjacent pair in play without redistribute', () => {
    const { result, handle } = setup([
      { defaultSize: 50, max: 60 },
      { defaultSize: 25, min: 25 },
      { defaultSize: 25 },
    ]);

    drag(handle, 200, 450);

    // 邻居没有可让的空间，拖拽整体被卡住，第三个面板不参与
    expect(result.current.sizes).toEqual([50, 25, 25]);
  });

  it('moves by step on arrow keys and clamps at min/max on Home/End', () => {
    const { result, handle } = setup([{ defaultSize: 50, min: 40, max: 70 }, { defaultSize: 50 }]);
    const press = (event: Pick<ReactKeyboardEvent, 'key' | 'shiftKey'>) =>
      act(() => result.current.getHandleProps({ index: 0 }).onKeyDown(key(event)));

    press({ key: 'ArrowRight', shiftKey: false });
    expect(result.current.sizes).toEqual([51, 49]);

    press({ key: 'ArrowRight', shiftKey: true });
    expect(result.current.sizes).toEqual([61, 39]);

    press({ key: 'End', shiftKey: false });
    expect(result.current.sizes).toEqual([70, 30]);

    press({ key: 'Home', shiftKey: false });
    expect(result.current.sizes).toEqual([40, 60]);
  });

  it('exposes panel min/max through the handle aria range', () => {
    const { result } = setup([{ defaultSize: 50, min: 20, max: 70 }, { defaultSize: 50 }]);
    const props = result.current.getHandleProps({ index: 0 });

    expect(props.role).toBe('separator');
    expect(props['aria-valuemin']).toBe(20);
    expect(props['aria-valuemax']).toBe(70);
    expect(props['aria-valuenow']).toBe(50);
  });

  it('calls onSizeChange with the sizes produced by a drag', () => {
    const onSizeChange = vi.fn();
    const { handle } = setup([{ defaultSize: 50, min: 20 }, { defaultSize: 50 }], { onSizeChange });

    drag(handle, 200, 0);

    expect(onSizeChange).toHaveBeenLastCalledWith([20, 80]);
  });
});
