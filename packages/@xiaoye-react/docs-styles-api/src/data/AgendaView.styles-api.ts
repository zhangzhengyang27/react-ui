import type { AgendaViewFactory } from '@xiaoye-react/schedule';
import type { StylesApiData } from '../types';

export const AgendaViewStylesApi: StylesApiData<AgendaViewFactory> = {
  selectors: {
    agendaView: '根元素',
    agendaViewHeader: 'Header container with date range and close button',
    agendaViewHeaderLabel: 'Date range label in the header',
    agendaViewBody: 'Body container for date groups',
    agendaViewDateGroup: 'Date group 容器',
    agendaViewDateHeader: 'Date header text within a group',
    agendaViewEvent: '事件项按钮',
    agendaViewEventBody: 'Event body layout 容器',
    agendaViewEventColor: '事件颜色指示器',
    agendaViewEventTitle: '事件标题文本',
    agendaViewEventTime: '事件时间标签',
    agendaViewNoEvents: '无事件消息',
  },

  vars: {
    agendaView: {
      '--agenda-view-radius': '控制边框圆角',
    },
  },

  modifiers: [],
};
