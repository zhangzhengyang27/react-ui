import type { MiniCalendarFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const MiniCalendarStylesApi: StylesApiData<MiniCalendarFactory> = {
  selectors: {
    root: '根元素',
    control: 'Button in the dropdown which is used to select hours/minutes/seconds/am-pm',
    days: 'Days 容器',
    day: 'Single day 元素',
    dayMonth: '月视图中的日期元素',
    dayNumber: 'Day number 元素',
  },

  vars: {
    root: {
      '--mini-calendar-font-size': '控制 all elements (based on em units) 的 size',
    },
  },

  modifiers: [
    {
      selector: 'control',
      modifier: 'disabled',
      condition: 'Next/previous range is after `maxDate` or before `minDate`',
    },
    {
      selector: 'control',
      modifier: 'direction',
      value: '`previous` or `next`',
    },
    {
      selector: 'day',
      modifier: 'selected',
      condition: 'The day matches the `value`',
    },
    {
      selector: 'day',
      modifier: 'disabled',
      condition: 'The day is before `minDate` or after `maxDate`',
    },
  ],
};
