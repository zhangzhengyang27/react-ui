import dayjs from 'dayjs';
import { memo } from 'react';
import { Box, GetStylesApi, UnstyledButton } from '@xiaoye-react/ui';
import { useDatesContext } from '@xiaoye-react/dates';
import { getLabel, ScheduleLabelsOverride } from '../../labels';
import { DateStringValue, DateTimeStringValue, DayOfWeek, ScheduleMode } from '../../types';
import {
  BusinessHoursValue,
  clampIntervalMinutes,
  DayTimeInterval,
  getBusinessHoursMod,
} from '../../utils';
import type { WeekViewControlsRef } from './handle-week-view-key-down';
import type { WeekViewFactory } from './WeekView';

export interface WeekViewTimeSlotProps {
  slot: DayTimeInterval;
  slotIndex: number;
  dayIndex: number;
  /** String(day) 形式的日期串 */
  day: string;
  /** YYYY-MM-DD */
  dayGroup: string;
  dayOfWeek: DayOfWeek;
  intervalMinutes: number;
  /** `useStyles` return value of `WeekView`（身份每渲染变化，比较器忽略） */
  getStyles: GetStylesApi<WeekViewFactory>;
  businessHours?: BusinessHoursValue;
  highlightBusinessHours?: boolean;
  labels?: ScheduleLabelsOverride;
  withEventsDragAndDrop: boolean;
  withDragSlotSelect: boolean;
  mode?: ScheduleMode;
  slotsRef?: WeekViewControlsRef;
  isFirstSlot: boolean;
  isDropTarget: boolean;
  isDragSelected: boolean;
  onSlotClick?: WeekViewDayProps['onSlotClick'];
  onSlotKeyDown?: WeekViewDayProps['onSlotKeyDown'];
  onFirstSlotArrowUp?: WeekViewDayProps['onFirstSlotArrowUp'];
  onSlotPointerDown?: WeekViewDayProps['onSlotPointerDown'];
  getTimeSlotProps?: WeekViewDayProps['getTimeSlotProps'];
}

function shallowEqualProps<T extends Record<string, any>>(a: T, b: T): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  return keysA.every((key) => a[key] === b[key]);
}

/**
 * 单个时间槽单元格。拖拽期间父视图每次 dragover 都会重渲染，
 * memo 让未发生状态变化的槽位（绝大多数）直接跳过协调。
 * getStyles/getTimeSlotProps 的身份随父渲染变化，但其输出由稳定的
 * classNames/styles 配置决定，比较器忽略二者（若消费方的 getTimeSlotProps
 * 输出依赖高频变化的数据，需自行保证引用稳定）
 */
export const WeekViewTimeSlot = memo(
  function WeekViewTimeSlot({
    slot,
    slotIndex,
    dayIndex,
    day,
    dayGroup,
    dayOfWeek,
    intervalMinutes,
    getStyles,
    businessHours,
    highlightBusinessHours,
    labels,
    withEventsDragAndDrop,
    withDragSlotSelect,
    mode,
    slotsRef,
    isFirstSlot,
    isDropTarget,
    isDragSelected,
    onSlotClick,
    onSlotKeyDown,
    onFirstSlotArrowUp,
    onSlotPointerDown,
    getTimeSlotProps,
  }: WeekViewTimeSlotProps) {
    const slotStart = `${dayGroup} ${slot.startTime}` as DateTimeStringValue;
    const slotEnd = `${dayGroup} ${slot.endTime}` as DateTimeStringValue;
    const { onClick: externalOnClick, ...externalSlotProps } =
      getTimeSlotProps?.({ start: slotStart, end: slotEnd }) || {};

    const handleClick =
      mode === 'static'
        ? undefined
        : (e: React.MouseEvent<HTMLButtonElement>) => {
            onSlotClick?.(day, slot.startTime, e);
            externalOnClick?.(e);
          };

    return (
      <UnstyledButton
        ref={(node) => {
          if (node && slotsRef?.current) {
            if (!slotsRef.current[dayIndex]) {
              slotsRef.current[dayIndex] = [];
            }
            slotsRef.current[dayIndex][slotIndex] = node;
          }
        }}
        {...getStyles('weekViewDaySlot')}
        mod={{
          'hour-start': slot.isHourStart,
          ...getBusinessHoursMod({
            time: slot.startTime,
            businessHours,
            highlightBusinessHours,
            dayOfWeek,
          }),
          'drop-target': isDropTarget,
          'drag-selected': isDragSelected,
          static: mode === 'static',
        }}
        __vars={{ '--slot-size': `${clampIntervalMinutes(intervalMinutes) / 60}` }}
        aria-label={`${getLabel('timeSlot', labels)} ${dayGroup} ${slot.startTime} - ${slot.endTime}`}
        tabIndex={mode === 'static' ? -1 : isFirstSlot ? 0 : -1}
        data-drag-slot-index={withDragSlotSelect && mode !== 'static' ? slotIndex : undefined}
        data-drag-slot-group={withDragSlotSelect && mode !== 'static' ? dayGroup : undefined}
        onKeyDown={(e) => {
          if (slotIndex === 0 && e.key === 'ArrowUp' && onFirstSlotArrowUp) {
            e.preventDefault();
            onFirstSlotArrowUp(dayIndex);
          } else if (onSlotKeyDown) {
            onSlotKeyDown(e, dayIndex, slotIndex);
          }
        }}
        onPointerDown={
          withDragSlotSelect && mode !== 'static'
            ? (e) => onSlotPointerDown?.(e, slotIndex, dayGroup)
            : undefined
        }
        onClick={handleClick}
        onDragOver={
          withEventsDragAndDrop && mode !== 'static' ? (e) => e.preventDefault() : undefined
        }
        {...externalSlotProps}
      />
    );
  },
  (prev, next) => {
    const { getStyles: _prevGetStyles, getTimeSlotProps: _prevGetTimeSlotProps, ...prevRest } = prev;
    const { getStyles: _nextGetStyles, getTimeSlotProps: _nextGetTimeSlotProps, ...nextRest } = next;
    return shallowEqualProps(prevRest, nextRest);
  }
);

WeekViewTimeSlot.displayName = '@xiaoye-react/schedule/WeekViewTimeSlot';

export interface WeekViewDayProps {
  /** Date to display */
  day: Date | DateStringValue;

  /** Index of this day in the week */
  dayIndex: number;

  /** Slots intervals */
  slots: DayTimeInterval[];

  /** Number of minutes for each interval, used to calculate slot height */
  intervalMinutes: number;

  /** `useStyles` return value of `WeekView` */
  getStyles: GetStylesApi<WeekViewFactory>;

  /** Indices of weekend days, 0-6, where 0 is Sunday and 6 is Saturday. The default value is defined by `DatesProvider`. */
  weekendDays?: DayOfWeek[];

  /** Events list */
  children?: React.ReactNode;

  /** Labels override */
  labels?: ScheduleLabelsOverride;

  /** If set to true, highlights business hours with white background */
  highlightBusinessHours?: boolean;

  /** Business hours range in `HH:mm:ss` format, or per-day record keyed by day of the week */
  businessHours?: BusinessHoursValue;

  /** If true, slots are drop targets for drag and drop */
  withEventsDragAndDrop?: boolean;

  /** Called when dragging over day slots container */
  onDaySlotsDragOver?: (e: React.DragEvent<HTMLDivElement>, day: string, dayIndex: number) => void;

  /** Called when dragging leaves day slots container */
  onDaySlotsDragLeave?: () => void;

  /** Called when dropping on day slots container */
  onDaySlotsDrop?: (e: React.DragEvent<HTMLDivElement>, day: string, dayIndex: number) => void;

  /** Called when slot is clicked */
  onSlotClick?: (day: string, slotTime: string, event: React.MouseEvent<HTMLButtonElement>) => void;

  /** Index of the slot that is currently a drop target */
  dropTargetSlotIndex?: number;

  /** Interaction mode: 'default' allows all interactions, 'static' disables event interactions */
  mode?: ScheduleMode;

  /** Ref for keyboard navigation */
  slotsRef?: WeekViewControlsRef;

  /** Index of the first focusable slot */
  firstSlotIndex?: { dayIndex: number; slotIndex: number };

  /** Keyboard event handler for slots */
  onSlotKeyDown?: (
    event: React.KeyboardEvent<HTMLButtonElement>,
    dayIndex: number,
    slotIndex: number
  ) => void;

  /** Called when Arrow Up is pressed on the first slot, used to navigate to all-day slot */
  onFirstSlotArrowUp?: (dayIndex: number) => void;

  /** If set, enables drag-to-select time slot ranges */
  withDragSlotSelect?: boolean;

  /** Called when pointer down on a slot for drag selection */
  onSlotPointerDown?: (
    event: React.PointerEvent<HTMLButtonElement>,
    index: number,
    group: string
  ) => void;

  /** Function to check if a slot is drag-selected */
  isSlotDragSelected?: (index: number, group: string) => boolean;

  /** Ref callback for the day slots container */
  daySlotsContainerRef?: (node: HTMLDivElement | null) => void;

  /** Function to get additional props for each time slot */
  getTimeSlotProps?: (data: {
    start: DateTimeStringValue;
    end: DateTimeStringValue;
  }) => Record<string, any> | undefined;
}

export function WeekViewDay({
  day,
  dayIndex,
  slots,
  intervalMinutes,
  getStyles,
  weekendDays,
  children,
  labels,
  highlightBusinessHours,
  businessHours,
  withEventsDragAndDrop,
  onDaySlotsDragOver,
  onDaySlotsDragLeave,
  onDaySlotsDrop,
  onSlotClick,
  dropTargetSlotIndex,
  mode,
  slotsRef,
  firstSlotIndex,
  onSlotKeyDown,
  onFirstSlotArrowUp,
  withDragSlotSelect,
  onSlotPointerDown,
  isSlotDragSelected,
  daySlotsContainerRef,
  getTimeSlotProps,
}: WeekViewDayProps) {
  const ctx = useDatesContext();
  const dayOfWeek = dayjs(day).day() as DayOfWeek;
  const weekend = ctx.getWeekendDays(weekendDays).includes(dayOfWeek);
  const today = dayjs(day).isSame(dayjs(), 'day');

  const dayGroup = dayjs(day).format('YYYY-MM-DD');

  const items = slots.map((slot, slotIndex) => {
    const isDropTarget = dropTargetSlotIndex === slotIndex;
    const isFirstSlot =
      firstSlotIndex?.dayIndex === dayIndex && firstSlotIndex?.slotIndex === slotIndex;
    const isDragSelected = isSlotDragSelected?.(slotIndex, dayGroup) || false;

    return (
      <WeekViewTimeSlot
        key={slot.startTime}
        slot={slot}
        slotIndex={slotIndex}
        dayIndex={dayIndex}
        day={String(day)}
        dayGroup={dayGroup}
        dayOfWeek={dayOfWeek}
        intervalMinutes={intervalMinutes}
        getStyles={getStyles}
        businessHours={businessHours}
        highlightBusinessHours={highlightBusinessHours}
        labels={labels}
        withEventsDragAndDrop={!!withEventsDragAndDrop}
        withDragSlotSelect={!!withDragSlotSelect}
        mode={mode}
        slotsRef={slotsRef}
        isFirstSlot={isFirstSlot}
        isDropTarget={isDropTarget}
        isDragSelected={isDragSelected}
        onSlotClick={onSlotClick}
        onSlotKeyDown={onSlotKeyDown}
        onFirstSlotArrowUp={onFirstSlotArrowUp}
        onSlotPointerDown={onSlotPointerDown}
        getTimeSlotProps={getTimeSlotProps}
      />
    );
  });

  return (
    <Box {...getStyles('weekViewDay')} mod={{ today, weekend }}>
      <Box
        ref={daySlotsContainerRef}
        mod={{ today }}
        {...getStyles('weekViewDaySlots')}
        onDragOver={
          withEventsDragAndDrop && mode !== 'static'
            ? (e) => onDaySlotsDragOver?.(e, String(day), dayIndex)
            : undefined
        }
        onDragLeave={withEventsDragAndDrop && mode !== 'static' ? onDaySlotsDragLeave : undefined}
        onDrop={
          withEventsDragAndDrop && mode !== 'static'
            ? (e) => onDaySlotsDrop?.(e, String(day), dayIndex)
            : undefined
        }
      >
        {children}
        {items}
      </Box>
    </Box>
  );
}
