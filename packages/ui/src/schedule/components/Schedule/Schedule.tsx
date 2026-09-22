import { useEffect, useRef, useState } from 'react';
import { Box, BoxProps, ElementProps } from '../../../core/Box/Box';
import { useProps } from '../../../core/UIProvider/index';
import { UIRadius } from '../../../core/UIProvider/theme.types';
import { factory } from '../../../core/factory/factory';
import { StylesApiProps } from '../../../core/styles-api/styles-api.types';
import { useStyles } from '../../../core/styles-api/use-styles/use-styles';
import { Factory } from '../AgendaView/AgendaView';
import { useUncontrolled } from '@xiaoye-react/hooks';
import { ScheduleLabelsOverride } from '../../labels';
import {
  DateStringValue,
  DateTimeStringValue,
  ScheduleEventData,
  ScheduleMode,
  ScheduleViewLevel,
} from '../../types';
import { DayView, DayViewProps, DayViewStylesNames } from '../DayView/DayView';
import {
  MobileMonthView,
  MobileMonthViewProps,
  MobileMonthViewStylesNames,
} from '../MobileMonthView/MobileMonthView';
import { MonthView, MonthViewProps, MonthViewStylesNames } from '../MonthView/MonthView';
import { RenderEventBody } from '../ScheduleEvent/ScheduleEvent';
import { WeekView, WeekViewProps, WeekViewStylesNames } from '../WeekView/WeekView';
import { YearView, YearViewProps, YearViewStylesNames } from '../YearView/YearView';
import classes from './Schedule.module.css';

export type ScheduleStylesNames =
  | 'root'
  | 'desktopView'
  | 'mobileView'
  | DayViewStylesNames
  | WeekViewStylesNames
  | MonthViewStylesNames
  | YearViewStylesNames
  | MobileMonthViewStylesNames;

export type ScheduleLayout = 'default' | 'responsive';

type ScheduleCommonProps =
  | 'date'
  | 'onDateChange'
  | 'events'
  | 'locale'
  | 'radius'
  | 'labels'
  | 'renderEventBody'
  | 'withEventsDragAndDrop'
  | 'onEventDrop'
  | 'canDragEvent'
  | 'onEventDragStart'
  | 'onEventDragEnd'
  | 'onTimeSlotClick'
  | 'onAllDaySlotClick'
  | 'onEventClick'
  | 'onDayClick'
  | 'onMonthClick'
  | 'withDragSlotSelect'
  | 'onSlotDragEnd'
  | 'view'
  | 'onViewChange'
  | 'mode'
  | 'withAgenda'
  | 'onExternalEventDrop'
  | 'withEventResize'
  | 'onEventResize'
  | 'canResizeEvent'
  | 'recurrenceExpansionLimit';

type ScheduleViewProps<T> = Partial<Omit<T, ScheduleCommonProps>>;

export interface ScheduleProps
  extends BoxProps, StylesApiProps<ScheduleFactory>, ElementProps<'div'> {
  __staticSelector?: string;

  /** Current date to display (controlled) */
  date?: Date | DateStringValue;

  /** Default date (uncontrolled) */
  defaultDate?: Date | DateStringValue;

  /** Called when date changes via navigation */
  onDateChange?: (date: DateStringValue) => void;

  /** Current view level (controlled) */
  view?: ScheduleViewLevel;

  /** Default view level (uncontrolled) */
  defaultView?: ScheduleViewLevel;

  /** Called when view level changes */
  onViewChange?: (view: ScheduleViewLevel) => void;

  /** Events to display across all views */
  events?: ScheduleEventData[];

  /** Locale for date formatting (overrides `DatesProvider`) */
  locale?: string;

  /** Key of theme.radius or any valid CSS value to set border-radius */
  radius?: UIRadius;

  /** Labels override for i18n */
  labels?: ScheduleLabelsOverride;

  /** Custom event body renderer */
  renderEventBody?: RenderEventBody;

  /** Enable drag and drop for events @default false */
  withEventsDragAndDrop?: boolean;

  /** Called when event is dropped */
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

  /** Called when time slot is clicked in DayView/WeekView */
  onTimeSlotClick?: (data: {
    slotStart: DateTimeStringValue;
    slotEnd: DateTimeStringValue;
    nativeEvent: React.MouseEvent<HTMLButtonElement>;
  }) => void;

  /** Called when all-day slot is clicked in DayView/WeekView */
  onAllDaySlotClick?: (date: DateStringValue, event: React.MouseEvent<HTMLButtonElement>) => void;

  /** Called when a day is clicked in MonthView and YearView */
  onDayClick?: (date: DateStringValue, event: React.MouseEvent<HTMLButtonElement>) => void;

  /** If set, enables drag-to-select slot ranges @default false */
  withDragSlotSelect?: boolean;

  /** Called when a slot range is selected by dragging */
  onSlotDragEnd?: (rangeStart: DateTimeStringValue, rangeEnd: DateTimeStringValue) => void;

  /** Called when event is clicked in any view */
  onEventClick?: (event: ScheduleEventData, e: React.MouseEvent<HTMLButtonElement>) => void;

  /** Interaction mode:
   * - `'default'` allows all interactions
   * - `'static'` disables event interactions
   * @default 'default' */
  mode?: ScheduleMode;

  /** Called when an external item is dropped onto the schedule. Receives the `DataTransfer` object and the drop target datetime. */
  onExternalEventDrop?: (dataTransfer: DataTransfer, dropDateTime: DateTimeStringValue) => void;

  /** If true, events can be resized by dragging their edges @default false */
  withEventResize?: boolean;

  /** Called when event is resized */
  onEventResize?: (data: {
    eventId: string | number;
    newStart: DateTimeStringValue;
    newEnd: DateTimeStringValue;
    event: ScheduleEventData;
  }) => void;

  /** Function to determine if event can be resized */
  canResizeEvent?: (event: ScheduleEventData) => boolean;

  /** Max number of generated recurring instances per recurring series @default 2000 */
  recurrenceExpansionLimit?: number;

  /** Layout mode:
   * - `'default'` uses same views on all screen sizes
   * - `'responsive'` switches to YearView/MobileMonthView on small screens
   * @default 'default' */
  layout?: ScheduleLayout;

  /** Props specific to DayView (includes `startTime`, `endTime`, `intervalMinutes`, etc.) */
  dayViewProps?: ScheduleViewProps<DayViewProps>;

  /** Props specific to WeekView (includes `startTime`, `endTime`, `intervalMinutes`, etc.) */
  weekViewProps?: ScheduleViewProps<WeekViewProps>;

  /** Props specific to MonthView (includes `firstDayOfWeek`, `weekendDays`, etc.) */
  monthViewProps?: ScheduleViewProps<MonthViewProps>;

  /** Props specific to YearView (includes `firstDayOfWeek`, `weekendDays`, etc.) */
  yearViewProps?: ScheduleViewProps<YearViewProps>;

  /** Props specific to MobileMonthView (used in responsive layout) */
  mobileMonthViewProps?: ScheduleViewProps<MobileMonthViewProps>;

  /** If set, displays an Agenda button in the header of DayView, WeekView and MonthView @default false */
  withAgenda?: boolean;
}

export type ScheduleFactory = Factory<{
  props: ScheduleProps;
  ref: HTMLDivElement;
  stylesNames: ScheduleStylesNames;
}>;

const defaultProps: Partial<ScheduleProps> = {
  defaultView: 'week',
  mode: 'default',
  layout: 'default',
};

export const Schedule = factory<ScheduleFactory>((_props) => {
  const props = useProps('Schedule', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    date,
    defaultDate,
    onDateChange,
    view,
    defaultView,
    onViewChange,
    events,
    locale,
    radius,
    labels,
    renderEventBody,
    withEventsDragAndDrop,
    onEventDrop,
    canDragEvent,
    onEventDragStart,
    onEventDragEnd,
    onTimeSlotClick,
    onAllDaySlotClick,
    onDayClick,
    onEventClick,
    withDragSlotSelect,
    onSlotDragEnd,
    onExternalEventDrop,
    withEventResize,
    onEventResize,
    canResizeEvent,
    recurrenceExpansionLimit,
    mode,
    layout,
    dayViewProps,
    weekViewProps,
    monthViewProps,
    yearViewProps,
    mobileMonthViewProps,
    withAgenda,
    __staticSelector,
    mod,
    ...others
  } = props;

  const getStyles = useStyles<ScheduleFactory>({
    name: __staticSelector || 'Schedule',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
  });

  // responsive 布局此前同时挂载桌面与移动两套视图（仅 CSS display 切换），
  // 事件展开 + 布局计算翻倍。用 ResizeObserver 跟踪容器宽度（与 @container 断点
  // 一致的 600px），只挂载当前激活的一侧；首次测量前按桌面渲染
  const responsiveRootRef = useRef<HTMLDivElement | null>(null);
  const [isNarrowContainer, setIsNarrowContainer] = useState(false);

  useEffect(() => {
    if (layout !== 'responsive') {
      return undefined;
    }
    const node = responsiveRootRef.current;
    if (!node || typeof ResizeObserver === 'undefined') {
      return undefined;
    }
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      setIsNarrowContainer(width > 0 && width <= 600);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [layout]);

  // 不向 useUncontrolled 传 onChange：受控模式下 setter 就是 onChange 本身，
  // 再叠加 handleViewChange 的显式调用会导致 onViewChange 双触发。
  // onViewChange 由 handleViewChange 显式调用，作为唯一出口
  const [_view, _setView] = useUncontrolled<ScheduleViewLevel>({
    value: view,
    defaultValue: defaultView,
  });

    // defaultDate 缺省时用当前时刻：SSR 下服务端与客户端可能跨日/跨年而不一致，
    // 这属于"由时间派生的内容"、延后求值只会变成水合后突变，无法在组件内消除。
    // 正确用法见 apps/docs/docs/guides/next.zh-CN.md 的「水合与时钟相关的默认值」：
    // 由应用显式传 date / defaultDate。
  const [_date, _setDate] = useUncontrolled<Date | DateStringValue>({
    value: date,
    defaultValue: defaultDate ?? new Date(),
  });

  const handleDateChange = (newDate: DateStringValue) => {
    _setDate(newDate);
    onDateChange?.(newDate);
  };

  const handleViewChange = (newView: ScheduleViewLevel) => {
    _setView(newView);
    onViewChange?.(newView);
  };

  const handleMonthClick = (monthDate: DateStringValue) => {
    handleDateChange(monthDate);
    handleViewChange('month');
  };

  const commonProps = {
    date: _date,
    onDateChange: handleDateChange,
    view: _view,
    onViewChange: handleViewChange,
    events,
    locale,
    radius,
    labels,
    renderEventBody,
    withEventsDragAndDrop: mode === 'static' ? false : withEventsDragAndDrop,
    onEventDrop,
    canDragEvent,
    onEventDragStart,
    onEventDragEnd,
    onTimeSlotClick,
    onAllDaySlotClick,
    onEventClick,
    withDragSlotSelect,
    onSlotDragEnd,
    onExternalEventDrop,
    withEventResize: mode === 'static' ? false : withEventResize,
    onEventResize,
    canResizeEvent,
    recurrenceExpansionLimit,
    mode,
    withAgenda,
  };

  const desktopContent = (() => {
    switch (_view) {
      case 'day':
        return <DayView {...commonProps} {...dayViewProps} />;
      case 'week':
        return <WeekView {...commonProps} {...weekViewProps} />;
      case 'month':
        return <MonthView {...commonProps} onDayClick={onDayClick} {...monthViewProps} />;
      case 'year':
        return <YearView {...commonProps} onMonthClick={handleMonthClick} {...yearViewProps} />;
      default:
        return null;
    }
  })();

  const mobileContent = (() => {
    switch (_view) {
      case 'day':
      case 'week':
      case 'month':
        return (
          <MobileMonthView
            date={_date}
            onDateChange={handleDateChange}
            events={events}
            locale={locale}
            radius={radius}
            labels={labels}
            mode={mode}
            recurrenceExpansionLimit={recurrenceExpansionLimit}
            onYearClick={() => handleViewChange('year')}
            onEventClick={onEventClick}
            onDayClick={onDayClick}
            {...mobileMonthViewProps}
          />
        );
      case 'year':
        return <YearView {...commonProps} onMonthClick={handleMonthClick} {...yearViewProps} />;
      default:
        return null;
    }
  })();

  if (layout === 'responsive') {
    return (
      <Box
        ref={responsiveRootRef}
        {...getStyles('root')}
        mod={[{ layout }, mod]}
        {...others}
      >
        {/* 只挂载当前激活的一侧：事件展开 + 布局计算不再双倍执行 */}
        <Box {...getStyles('desktopView')}>{isNarrowContainer ? null : desktopContent}</Box>
        <Box {...getStyles('mobileView')}>{isNarrowContainer ? mobileContent : null}</Box>
      </Box>
    );
  }

  return (
    <Box {...getStyles('root')} mod={mod} {...others}>
      {desktopContent}
    </Box>
  );
});

Schedule.displayName = '@xiaoye-react/ui/Schedule';
Schedule.classes = classes;

export namespace Schedule {
  export type Props = ScheduleProps;
  export type StylesNames = ScheduleStylesNames;
  export type Factory = ScheduleFactory;
  export type Layout = ScheduleLayout;
}
