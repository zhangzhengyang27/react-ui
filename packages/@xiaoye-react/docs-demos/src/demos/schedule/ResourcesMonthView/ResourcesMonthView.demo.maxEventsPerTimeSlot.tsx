import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesMonthView, ScheduleEventData, ScheduleResourceData } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const resources: ScheduleResourceData[] = [
  { id: 'tokyo', label: 'Meeting room: Tokyo' },
  { id: 'paris', label: 'Meeting room: Paris' },
];

const manyEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '团队会议',
    start: `${today} 09:00:00`,
    end: `${today} 10:00:00`,
    color: 'blue',
    resourceId: 'tokyo',
  },
  {
    id: 2,
    title: '代码审查',
    start: `${today} 11:00:00`,
    end: `${today} 12:00:00`,
    color: 'green',
    resourceId: 'tokyo',
  },
  {
    id: 3,
    title: '设计评审',
    start: `${today} 13:00:00`,
    end: `${today} 14:00:00`,
    color: 'violet',
    resourceId: 'tokyo',
  },
  {
    id: 4,
    title: '迭代计划',
    start: `${today} 15:00:00`,
    end: `${today} 16:00:00`,
    color: 'orange',
    resourceId: 'tokyo',
  },
  {
    id: 5,
    title: '回顾会议',
    start: `${today} 16:30:00`,
    end: `${today} 17:30:00`,
    color: 'cyan',
    resourceId: 'tokyo',
  },
  {
    id: 6,
    title: '客户电话',
    start: `${today} 09:00:00`,
    end: `${today} 10:00:00`,
    color: 'pink',
    resourceId: 'paris',
  },
  {
    id: 7,
    title: '研讨会',
    start: `${today} 11:00:00`,
    end: `${today} 12:00:00`,
    color: 'grape',
    resourceId: 'paris',
  },
  {
    id: 8,
    title: '站会',
    start: `${today} 14:00:00`,
    end: `${today} 15:00:00`,
    color: 'red',
    resourceId: 'paris',
  },
  {
    id: 9,
    title: '演示',
    start: `${today} 16:00:00`,
    end: `${today} 17:00:00`,
    color: 'teal',
    resourceId: 'paris',
  },
];

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesMonthView, ScheduleEventData, ScheduleResourceData } from '@xiaoye-react/schedule';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const resources: ScheduleResourceData[] = [
  { id: 'tokyo', label: 'Meeting room: Tokyo' },
  { id: 'paris', label: 'Meeting room: Paris' },
];

const events: ScheduleEventData[] = [
  { id: 1, title: '团队会议', start: \`\${today} 09:00:00\`, end: \`\${today} 10:00:00\`, color: 'blue', resourceId: 'tokyo' },
  { id: 2, title: '代码审查', start: \`\${today} 11:00:00\`, end: \`\${today} 12:00:00\`, color: 'green', resourceId: 'tokyo' },
  { id: 3, title: '设计评审', start: \`\${today} 13:00:00\`, end: \`\${today} 14:00:00\`, color: 'violet', resourceId: 'tokyo' },
  { id: 4, title: '迭代计划', start: \`\${today} 15:00:00\`, end: \`\${today} 16:00:00\`, color: 'orange', resourceId: 'tokyo' },
  { id: 5, title: '回顾会议', start: \`\${today} 16:30:00\`, end: \`\${today} 17:30:00\`, color: 'cyan', resourceId: 'tokyo' },
  { id: 6, title: '客户电话', start: \`\${today} 09:00:00\`, end: \`\${today} 10:00:00\`, color: 'pink', resourceId: 'paris' },
  { id: 7, title: '研讨会', start: \`\${today} 11:00:00\`, end: \`\${today} 12:00:00\`, color: 'grape', resourceId: 'paris' },
  { id: 8, title: '站会', start: \`\${today} 14:00:00\`, end: \`\${today} 15:00:00\`, color: 'red', resourceId: 'paris' },
  { id: 9, title: '演示', start: \`\${today} 16:00:00\`, end: \`\${today} 17:00:00\`, color: 'teal', resourceId: 'paris' },
];

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));

  return (
    <ResourcesMonthView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={events}
      maxEventsPerTimeSlot={3}
      startScrollDate={dayjs('2024-01-15').format('YYYY-MM-DD')}
    />
  );
}
`;

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));

  return (
    <ResourcesMonthView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={manyEvents}
      maxEventsPerTimeSlot={3}
      startScrollDate={dayjs('2024-01-15').format('YYYY-MM-DD')}
    />
  );
}

export const maxEventsPerTimeSlot: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
