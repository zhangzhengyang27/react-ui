import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesDayView, ScheduleEventData, ScheduleResourceData } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');
const tomorrow = dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD');

const resources: ScheduleResourceData[] = [
  { id: 'tokyo', label: 'Meeting room: Tokyo' },
  { id: 'paris', label: 'Meeting room: Paris' },
  { id: 'new-york', label: 'Meeting room: New York' },
];

const events: ScheduleEventData[] = [
  {
    id: 1,
    title: 'Offsite',
    start: `${today} 00:00:00`,
    end: `${tomorrow} 00:00:00`,
    color: 'blue',
    resourceId: 'tokyo',
  },
  {
    id: 6,
    title: 'On call',
    start: `${today} 00:00:00`,
    end: `${tomorrow} 00:00:00`,
    color: 'grape',
    resourceId: 'tokyo',
  },
  {
    id: 2,
    title: '迭代计划',
    start: `${today} 10:00:00`,
    end: `${today} 11:30:00`,
    color: 'green',
    resourceId: 'tokyo',
  },
  {
    id: 3,
    title: 'Maintenance',
    start: `${today} 00:00:00`,
    end: `${tomorrow} 00:00:00`,
    color: 'gray',
    display: 'background',
    resourceId: 'paris',
  },
  {
    id: 4,
    title: '客户电话',
    start: `${today} 09:30:00`,
    end: `${today} 10:30:00`,
    color: 'violet',
    resourceId: 'paris',
  },
  {
    id: 5,
    title: '假日',
    start: `${today} 00:00:00`,
    end: `${tomorrow} 00:00:00`,
    color: 'orange',
    resourceId: 'new-york',
  },
];

const dataCode = `
import dayjs from 'dayjs';
import { ScheduleEventData, ScheduleResourceData } from '@xiaoye-react/schedule';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');
const tomorrow = dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD');

const resources: ScheduleResourceData[] = [
  { id: 'tokyo', label: 'Meeting room: Tokyo' },
  { id: 'paris', label: 'Meeting room: Paris' },
  { id: 'new-york', label: 'Meeting room: New York' },
];

// All-day events span the whole day (start at 00:00, end at the next day 00:00).
// Foreground all-day events render as a full-width bar pinned to the top of the
// resource row, background all-day events (display: 'background') tint the whole row.
const events: ScheduleEventData[] = [
  { id: 1, title: 'Offsite', start: \`\${today} 00:00:00\`, end: \`\${tomorrow} 00:00:00\`, color: 'blue', resourceId: 'tokyo' },
  { id: 6, title: 'On call', start: \`\${today} 00:00:00\`, end: \`\${tomorrow} 00:00:00\`, color: 'grape', resourceId: 'tokyo' },
  { id: 2, title: '迭代计划', start: \`\${today} 10:00:00\`, end: \`\${today} 11:30:00\`, color: 'green', resourceId: 'tokyo' },
  { id: 3, title: 'Maintenance', start: \`\${today} 00:00:00\`, end: \`\${tomorrow} 00:00:00\`, color: 'gray', display: 'background', resourceId: 'paris' },
  { id: 4, title: '客户电话', start: \`\${today} 09:30:00\`, end: \`\${today} 10:30:00\`, color: 'violet', resourceId: 'paris' },
  { id: 5, title: '假日', start: \`\${today} 00:00:00\`, end: \`\${tomorrow} 00:00:00\`, color: 'orange', resourceId: 'new-york' },
];
`;

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesDayView } from '@xiaoye-react/schedule';
import { events, resources } from './data';

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));

  return (
    <ResourcesDayView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
    />
  );
}
`;

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));

  return (
    <ResourcesDayView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
    />
  );
}

export const allDayEvents: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
