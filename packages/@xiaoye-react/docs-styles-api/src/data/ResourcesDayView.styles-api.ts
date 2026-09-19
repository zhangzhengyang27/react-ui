import type { ResourcesDayViewFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const ResourcesDayViewStylesApi: StylesApiData<ResourcesDayViewFactory> = {
  selectors: {
    resourcesDayView: '根元素',
    resourcesDayViewRoot: '包裹滚动区域的根容器',
    resourcesDayViewInner: 'Inner container wrapping time labels and rows',
    resourcesDayViewTimeLabelsRow: '包含时间标签的行',
    resourcesDayViewScrollArea: 'Scroll area 组件',
    resourcesDayViewCorner: 'Top-left corner 元素',
    resourcesDayViewTimeLabel: 'Individual time label 元素',
    resourcesDayViewResourceLabel: 'Resource label 元素',
    resourcesDayViewRow: 'Resource row 元素',
    resourcesDayViewRowSlot: 'Individual time slot 元素',
    resourcesDayViewRowSlots: 'Container for all slots in a row',
    resourcesDayViewBackgroundEvent: 'Background event 元素',
    resourcesDayViewAllDayEvent: 'All-day event 元素',
    resourcesDayViewCurrentTimeIndicator: 'Current time indicator 容器',
    resourcesDayViewCurrentTimeIndicatorLine: 'Current time indicator line',
    resourcesDayViewCurrentTimeIndicatorThumb: 'Current time indicator thumb',
    resourcesDayViewCurrentTimeIndicatorTimeBubble: 'Current time indicator time bubble',
    resourcesDayViewEventWrapper: 'Event wrapper 元素',
    resourcesDayViewResizeHandle: 'Event resize handle 元素',
    resourcesDayViewGroupColumn: 'Group label column 元素',
    resourcesDayViewGroupColumnEmpty: '未分组资源的空组列单元格',
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
    resourcesDayView: {
      '--resources-day-view-radius': '控制视图的 `border-radius`',
      '--resources-day-view-slot-width': 'Controls `width` of each time slot column',
      '--resources-day-view-row-height': '控制每个资源行的高度',
      '--resources-day-view-group-label-width': '控制组标签列的宽度',
    },
  },

  modifiers: [
    {
      modifier: 'data-hour-start',
      selector: 'resourcesDayViewRowSlot',
      condition: '时间段位于整点开始',
    },
    {
      modifier: 'data-business-hours',
      selector: 'resourcesDayViewRowSlot',
      condition: '`highlightBusinessHours` 为 true 且时间段在工作时间内',
    },
    {
      modifier: 'data-non-business-hours',
      selector: 'resourcesDayViewRowSlot',
      condition: '`highlightBusinessHours` 为 true 且时间段在工作时间外',
    },
    {
      modifier: 'data-drop-target',
      selector: 'resourcesDayViewRowSlot',
      condition: '时间段是当前拖放目标',
    },
    {
      modifier: 'data-drag-selected',
      selector: 'resourcesDayViewRowSlot',
      condition: 'Slot is selected during drag-to-select',
    },
    {
      modifier: 'data-static',
      selector: 'resourcesDayView',
      condition: '`mode="static"` is set',
    },
    {
      modifier: 'data-scrolled',
      selector: 'resourcesDayViewTimeLabelsRow',
      condition: 'Scroll area is scrolled vertically',
    },
    {
      modifier: 'data-scrolled-x',
      selector: 'resourcesDayViewResourceLabel',
      condition: 'Scroll area is scrolled horizontally',
    },
    {
      modifier: 'data-resizing',
      selector: 'resourcesDayView',
      condition: 'An event is being resized',
    },
    {
      modifier: 'data-resizing',
      selector: 'resourcesDayViewEventWrapper',
      condition: 'This event is being resized',
    },
    {
      modifier: 'data-edge',
      selector: 'resourcesDayViewResizeHandle',
      condition: "Set to 'start' or 'end' based on resize handle position",
    },
    {
      modifier: 'data-active',
      selector: 'resourcesDayViewResizeHandle',
      condition: 'Resize handle is actively being dragged',
    },
  ],
};
