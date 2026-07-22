import type { ResourcesWeekViewFactory } from '@xiaoye-react/schedule';
import type { StylesApiData } from '../types';

export const ResourcesWeekViewStylesApi: StylesApiData<ResourcesWeekViewFactory> = {
  selectors: {
    resourcesWeekView: '根元素',
    resourcesWeekViewRoot: '包裹滚动区域的根容器',
    resourcesWeekViewInner: '包裹头部行和资源行的内部容器',
    resourcesWeekViewHeaderRows: 'Container for header rows (corner, day labels, time labels)',
    resourcesWeekViewHeaderContent: '日期标签和时间标签行的容器',
    resourcesWeekViewDayLabelsRow: '包含日期标签的行',
    resourcesWeekViewDayLabel: 'Individual day label 元素',
    resourcesWeekViewTimeLabelsRow: '包含时间标签的行',
    resourcesWeekViewScrollArea: 'Scroll area 组件',
    resourcesWeekViewCorner: 'Top-left corner 元素',
    resourcesWeekViewTimeLabel: 'Individual time label 元素',
    resourcesWeekViewResourceLabel: 'Resource label 元素',
    resourcesWeekViewRow: 'Resource row 元素',
    resourcesWeekViewRowSlot: 'Individual time slot 元素',
    resourcesWeekViewRowSlots: 'Container for all slots in a row',
    resourcesWeekViewBackgroundEvent: 'Background event 元素',
    resourcesWeekViewAllDayEvent: 'All-day event 元素',
    resourcesWeekViewCurrentTimeIndicator: 'Current time indicator 容器',
    resourcesWeekViewCurrentTimeIndicatorLine: 'Current time indicator line',
    resourcesWeekViewCurrentTimeIndicatorThumb: 'Current time indicator thumb',
    resourcesWeekViewCurrentTimeIndicatorTimeBubble: 'Current time indicator time bubble',
    resourcesWeekViewEventWrapper: 'Event wrapper 元素',
    resourcesWeekViewResizeHandle: 'Event resize handle 元素',
    resourcesWeekViewGroupColumn: 'Group label column 元素',
    resourcesWeekViewGroupColumnEmpty: '未分组资源的空组列单元格',
    moreEventsButton: '更多事件按钮，属于 MoreEvents',
    moreEventsList: '更多事件列表，属于 MoreEvents',
    moreEventsDropdown: '更多事件下拉框，属于 MoreEvents',
    header: '头部容器，属于 ScheduleHeader',
    headerControl: '头部控制元素，属于 ScheduleHeader',
    viewSelect: '视图选择元素，属于 ScheduleHeader',
    monthYearSelectTarget: 'MonthYearSelect 目标按钮，属于 ScheduleHeader',
    monthYearSelectDropdown: 'MonthYearSelect 下拉框，属于 ScheduleHeader',
    monthYearSelectControl: 'MonthYearSelect 控件，属于 ScheduleHeader',
    monthYearSelectList: 'MonthYearSelect 列表，属于 ScheduleHeader',
    monthYearSelectLabel: 'MonthYearSelect 标签，属于 ScheduleHeader',
  },

  vars: {
    resourcesWeekView: {
      '--resources-week-view-radius': '控制视图的 `border-radius`',
      '--resources-week-view-slot-width': 'Controls `width` of each time slot column',
      '--resources-week-view-row-height': '控制每个资源行的高度',
      '--resources-week-view-group-label-width': '控制组标签列的宽度',
    },
  },

  modifiers: [
    {
      modifier: 'data-hour-start',
      selector: 'resourcesWeekViewRowSlot',
      condition: '时间段位于整点开始',
    },
    {
      modifier: 'data-business-hours',
      selector: 'resourcesWeekViewRowSlot',
      condition: '`highlightBusinessHours` 为 true 且时间段在工作时间内',
    },
    {
      modifier: 'data-non-business-hours',
      selector: 'resourcesWeekViewRowSlot',
      condition: '`highlightBusinessHours` 为 true 且时间段在工作时间外',
    },
    {
      modifier: 'data-drop-target',
      selector: 'resourcesWeekViewRowSlot',
      condition: '时间段是当前拖放目标',
    },
    {
      modifier: 'data-drag-selected',
      selector: 'resourcesWeekViewRowSlot',
      condition: 'Slot is selected during drag-to-select',
    },
    {
      modifier: 'data-static',
      selector: 'resourcesWeekView',
      condition: '`mode="static"` is set',
    },
    {
      modifier: 'data-scrolled',
      selector: 'resourcesWeekViewTimeLabelsRow',
      condition: 'Scroll area is scrolled vertically',
    },
    {
      modifier: 'data-scrolled-x',
      selector: 'resourcesWeekViewResourceLabel',
      condition: 'Scroll area is scrolled horizontally',
    },
    {
      modifier: 'data-today',
      selector: 'resourcesWeekViewDayLabel',
      condition: 'Day label represents today and `highlightToday` is true',
    },
    {
      modifier: 'data-weekend',
      selector: 'resourcesWeekViewDayLabel',
      condition: '日期标签表示周末',
    },
  ],
};
