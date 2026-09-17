import { useCallback, useState } from 'react';
import { ScheduleEventData } from '../types';

// DropTarget 的单一来源是 ../types(此前与 types.ts 重复定义、逐字段相同,
// 是 DragContextValue 类型摩擦的温床);re-export 保持 hooks/index.ts 的既有导出面不变
export type { DropTarget } from '../types';

export interface DragState {
  /** Whether an event is currently being dragged */
  isDragging: boolean;

  /** ID of the event being dragged */
  draggedEventId: string | number | null;

  /** The event being dragged */
  draggedEvent: ScheduleEventData | null;
}

export interface UseDragStateReturn {
  /** Current drag state */
  state: DragState;

  /** Start dragging an event */
  startDrag: (event: ScheduleEventData) => void;

  /** End dragging */
  endDrag: () => void;
}

const initialState: DragState = {
  isDragging: false,
  draggedEventId: null,
  draggedEvent: null,
};

export function useDragState(): UseDragStateReturn {
  const [state, setState] = useState<DragState>(initialState);

  const startDrag = useCallback((event: ScheduleEventData) => {
    setState({
      isDragging: true,
      draggedEventId: event.id,
      draggedEvent: event,
    });
  }, []);

  const endDrag = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    state,
    startDrag,
    endDrag,
  };
}
