import type { ResourcesMonthViewFactory } from '@xiaoye-react/schedule';
import type { StylesApiData } from '../types';

export const ResourcesMonthViewStylesApi: StylesApiData<ResourcesMonthViewFactory> = {
  selectors: {
    resourcesMonthView: '根元素',
    resourcesMonthViewRoot: '包裹滚动区域的根容器',
    resourcesMonthViewScrollArea: 'Scroll area 组件',
    resourcesMonthViewDayLabelsRow: '包含日期标签的行',
    resourcesMonthViewCorner: 'Top-left corner 元素',
    resourcesMonthViewDayLabel: 'Individual day label 元素',
    resourcesMonthViewDayLabelWeekday: '日期标签内的星期文本',
    resourcesMonthViewDayLabelNumber: '日期标签内的日期数字',
    resourcesMonthViewRow: 'Resource row 元素',
    resourcesMonthViewResourceLabel: 'Resource label 元素',
    resourcesMonthViewRowSlots: '一行中所有日期单元格的容器',
    resourcesMonthViewCell: 'Individual day cell 元素',
    resourcesMonthViewInner: '包裹日期标签和行的内部容器',
    resourcesMonthViewGroupColumn: 'Group label column 元素',
    resourcesMonthViewGroupColumnEmpty: '未分组资源的空组列单元格',
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
    resourcesMonthView: {
      '--resources-month-view-radius': '控制视图的 `border-radius`',
      '--resources-month-view-day-width': 'Controls `width` of each day column',
      '--resources-month-view-row-height': '控制每个资源行的高度',
      '--resources-month-view-group-label-width': '控制组标签列的宽度',
    },
  },

  modifiers: [
    {
      modifier: 'data-weekend',
      selector: 'resourcesMonthViewDayLabel',
      condition: '日期标签表示周末',
    },
    {
      modifier: 'data-today',
      selector: 'resourcesMonthViewDayLabel',
      condition: 'Day label represents today and `highlightToday` is true',
    },
    {
      modifier: 'data-weekend',
      selector: 'resourcesMonthViewCell',
      condition: '单元格表示周末',
    },
    {
      modifier: 'data-drop-target',
      selector: 'resourcesMonthViewCell',
      condition: '单元格是当前拖放目标',
    },
    {
      modifier: 'data-drag-selected',
      selector: 'resourcesMonthViewCell',
      condition: 'Cell is selected during drag-to-select',
    },
    {
      modifier: 'data-static',
      selector: 'resourcesMonthViewCell',
      condition: '`mode="static"` is set',
    },
    {
      modifier: 'data-static',
      selector: 'resourcesMonthView',
      condition: '`mode="static"` is set',
    },
  ],
};
