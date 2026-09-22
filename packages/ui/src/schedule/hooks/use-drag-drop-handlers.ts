import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { useEffectEvent } from '@xiaoye-react/hooks';
import { DragContextValue } from '../components/DragContext/DragContext';
import { DateTimeStringValue, ScheduleEventData, ScheduleMode } from '../types';
import { useDragState } from './use-drag-state';

/** 浅比较两个 drop target：{day, slotIndex} 等平面对象按字段比较，其余按严格相等 */
function isSameDropTarget<T>(a: T | null, b: T): boolean {
  if (a === b) {
    return true;
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a as Record<string, unknown>);
    const keysB = Object.keys(b as Record<string, unknown>);
    if (keysA.length !== keysB.length) {
      return false;
    }
    return keysA.every(key => (a as Record<string, unknown>)[key] === (b as Record<string, unknown>)[key]);
  }
  return false;
}

export interface UseDragDropHandlersOptions<T = any> {
  /** Whether drag and drop is enabled */
  enabled: boolean;

  /** Schedule interaction mode */
  mode: ScheduleMode;

  /** Called when event is dropped at new location */
  onEventDrop?: (data: {
    eventId: string | number;
    newStart: DateTimeStringValue;
    newEnd: DateTimeStringValue;
    event: ScheduleEventData;
  }) => void;

  /** Function to determine if event can be dragged */
  canDragEvent?: (event: ScheduleEventData) => boolean;

  /** Called when any event drag starts */
  onEventDragStart?: (event: ScheduleEventData) => void;

  /** Called when any event drag ends */
  onEventDragEnd?: () => void;

  /**
   * Function to calculate drop target dates from drop location.
   * Receives the target location and the dragged event.
   */
  calculateDropTarget: (target: T, draggedEvent: ScheduleEventData) => { start: Date; end: Date };

  /** Called when an external item is dropped onto the schedule */
  onExternalDrop?: (e: React.DragEvent, target: T) => void;
}

export interface DragDropHandlers<T = any> {
  /** Context value for DragContext.Provider */
  dragContextValue: DragContextValue<T>;

  /** Current drop target */
  dropTarget: T | null;

  /** Handle drag start event */
  handleDragStart: (event: ScheduleEventData) => void;

  /** Handle drag end event */
  handleDragEnd: () => void;

  /** Handle drag over event */
  handleDragOver: (e: React.DragEvent, target: T) => void;

  /** Handle drag leave event */
  handleDragLeave: () => void;

  /** Handle drop event */
  handleDrop: (e: React.DragEvent, target: T) => void;

  /** Check if event is draggable */
  isDraggableEvent: (event: ScheduleEventData) => boolean;

  /** Check if target is the current drop target */
  isDropTarget: (target: T) => boolean;
}

/**
 * Hook that provides unified drag-drop handlers for Schedule views.
 * Handles drag state management and event drops across Day, Week, and Month views.
 *
 * @template T - Type of the drop target (e.g., slot index, day string, etc.)
 */
export function useDragDropHandlers<T = any>(
  options: UseDragDropHandlersOptions<T>
): DragDropHandlers<T> {
  const {
    enabled,
    mode,
    onEventDrop,
    canDragEvent,
    onEventDragStart,
    onEventDragEnd,
    calculateDropTarget,
    onExternalDrop,
  } = options;

  const stableOnEventDrop = useEffectEvent(onEventDrop || (() => {}));
  const stableOnEventDragStart = useEffectEvent(onEventDragStart || (() => {}));
  const stableOnEventDragEnd = useEffectEvent(onEventDragEnd || (() => {}));
  const stableOnExternalDrop = useEffectEvent(onExternalDrop || (() => {}));

  const dragState = useDragState();
  const [dropTarget, setDropTargetState] = useState<T | null>(null);

  const handleDragEnd = useCallback(() => {
    dragState.endDrag();
    setDropTargetState(null);
    stableOnEventDragEnd();
  }, [dragState, stableOnEventDragEnd]);

  const handleDragStart = useCallback(
    (event: ScheduleEventData) => {
      if (!enabled || mode === 'static') {
        return;
      }
      dragState.startDrag(event);
      stableOnEventDragStart(event);
    },
    [enabled, mode, dragState, stableOnEventDragStart]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent, target: T) => {
      if (mode === 'static') {
        return;
      }

      let isInternalDrag = dragState.state.isDragging;

      if (isInternalDrag && !event.dataTransfer.types.includes('application/json')) {
        handleDragEnd();
        isInternalDrag = false;
      }

      if (isInternalDrag && !enabled) {
        return;
      }

      if (!isInternalDrag && !onExternalDrop) {
        return;
      }

      event.preventDefault();
      event.dataTransfer.dropEffect = isInternalDrag ? 'move' : 'copy';
      // dragover 在拖拽期间持续高频触发：目标未变时跳过 setState，
      // 否则每次 dragover 都导致整个视图（全部事件）重渲染
      setDropTargetState(current => (isSameDropTarget(current, target) ? current : target));
    },
    [enabled, mode, dragState.state.isDragging, onExternalDrop, handleDragEnd]
  );

  const handleDragLeave = useCallback(() => {
    setDropTargetState(null);
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent, target: T) => {
      event.preventDefault();

      const isInternalDrag =
        dragState.state.isDragging && event.dataTransfer.types.includes('application/json');

      if (isInternalDrag && enabled && dragState.state.draggedEvent && onEventDrop) {
        const { start, end } = calculateDropTarget(target, dragState.state.draggedEvent);
        stableOnEventDrop({
          eventId: dragState.state.draggedEventId!,
          newStart: dayjs(start).format('YYYY-MM-DD HH:mm:ss'),
          newEnd: dayjs(end).format('YYYY-MM-DD HH:mm:ss'),
          event: dragState.state.draggedEvent,
        });
        handleDragEnd();
        return;
      }

      if (!isInternalDrag && onExternalDrop) {
        if (dragState.state.isDragging) {
          handleDragEnd();
        }
        stableOnExternalDrop(event, target);
        setDropTargetState(null);
        return;
      }

      setDropTargetState(null);
    },
    [
      enabled,
      dragState.state,
      onEventDrop,
      onExternalDrop,
      calculateDropTarget,
      handleDragEnd,
      stableOnEventDrop,
      stableOnExternalDrop,
    ]
  );

  const isDraggableEvent = useCallback(
    (event: ScheduleEventData) => {
      return (
        enabled &&
        mode !== 'static' &&
        event.display !== 'background' &&
        (canDragEvent ? canDragEvent(event) : true)
      );
    },
    [enabled, mode, canDragEvent]
  );

  const isDropTarget = useCallback(
    (target: T) => {
      return isSameDropTarget(dropTarget, target);
    },
    [dropTarget]
  );

  // 拖拽/悬浮期间 dragover 每帧触发视图重渲染，context value 不 memo 会放大整树更新。
  // dropTarget/setDropTarget 用 hook 内真实的 dropTarget 状态：
  // 此前读 dragState.state.dropTarget（从未被写入，恒 null），是对外语义误导的死 API。
  // 泛型 T 直接贯通 context 值（消除此前的 TS2322 与 as T 强转）：
  // 各视图 target 形态不同（日期串/槽位对象），由 DragContextValue<T> 承载
  const dragContextValue = useMemo<DragContextValue<T>>(
    () => ({
      isDragging: dragState.state.isDragging,
      draggedEventId: dragState.state.draggedEventId,
      draggedEvent: dragState.state.draggedEvent,
      dropTarget,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      setDropTarget: (target) => setDropTargetState(target),
    }),
    [
      dragState.state.isDragging,
      dragState.state.draggedEventId,
      dragState.state.draggedEvent,
      dropTarget,
      handleDragStart,
      handleDragEnd,
    ]
  );

  return {
    dragContextValue,
    dropTarget,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    isDraggableEvent,
    isDropTarget,
  };
}
