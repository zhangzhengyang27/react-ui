import { createContext } from 'react';
import { ScheduleEventData } from '../../types';

/**
 * 泛型参数 T 为 drop target 的具体形态,由各视图自定义(日期串/{day,slotIndex}/
 * {resourceId,slotIndex} 等),context 层无法预知——此前固定为 DropTarget 与视图真实
 * 形态不符,是 use-drag-drop-handlers TS2322 的根源。默认 unknown 保持无参引用兼容。
 */
export interface DragContextValue<T = unknown> {
  /** Whether an event is currently being dragged */
  isDragging?: boolean;

  /** ID of the event being dragged */
  draggedEventId?: string | number | null;

  /** The event being dragged */
  draggedEvent?: ScheduleEventData | null;

  /** Current drop target information */
  dropTarget?: T | null;

  /** Called when drag starts */
  onDragStart?: (event: ScheduleEventData) => void;

  /** Called when drag ends */
  onDragEnd?: () => void;

  /** Set the current drop target
   * (方法双变声明:具体视图的 setDropTarget 需能赋给泛型已擦除的 context 值) */
  setDropTarget?(target: T | null): void;
}

export const DragContext = createContext<DragContextValue>({});
