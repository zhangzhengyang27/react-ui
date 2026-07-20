import dayjs from 'dayjs';
import { useState } from 'react';
import { ScheduleEventData, WeekView } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';

const startOfWeek = dayjs('2024-01-15')
  .subtract((dayjs('2024-01-15').day() + 6) % 7, 'day')
  .format('YYYY-MM-DD');
const dayAfterStartOfWeek = dayjs(startOfWeek).add(1, 'day').format('YYYY-MM-DD');
const twoDaysAfter = dayjs(startOfWeek).add(2, 'day').format('YYYY-MM-DD');

const events: ScheduleEventData[] = [
  {
    id: 1,
    title: '会议日',
    start: `${startOfWeek} 00:00:00`,
    end: dayjs(startOfWeek).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
  },
  {
    id: 2,
    title: '假日',
    start: `${dayAfterStartOfWeek} 00:00:00`,
    end: dayjs(dayAfterStartOfWeek).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'pink',
  },
  {
    id: 3,
    title: '团队建设',
    start: `${startOfWeek} 00:00:00`,
    end: dayjs(twoDaysAfter).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'orange',
  },
  {
    id: 4,
    title: '早间站会',
    start: `${startOfWeek} 09:00:00`,
    end: `${startOfWeek} 09:30:00`,
    color: 'blue',
  },
  {
    id: 5,
    title: '代码审查',
    start: `${dayAfterStartOfWeek} 14:00:00`,
    end: `${dayAfterStartOfWeek} 15:00:00`,
    color: 'violet',
  },
];

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { WeekView, ScheduleEventData } from '@react-ui/schedule';

const startOfWeek = dayjs('2024-01-15').subtract((dayjs('2024-01-15').day() + 6) % 7, 'day').format('YYYY-MM-DD');
const dayAfterStartOfWeek = dayjs(startOfWeek).add(1, 'day').format('YYYY-MM-DD');
const twoDaysAfter = dayjs(startOfWeek).add(2, 'day').format('YYYY-MM-DD');

const events: ScheduleEventData[] = [
  {
    id: 1,
    title: '会议日',
    start: \`\${startOfWeek} 00:00:00\`,
    end: dayjs(startOfWeek).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
  },
  {
    id: 2,
    title: '假日',
    start: \`\${dayAfterStartOfWeek} 00:00:00\`,
    end: dayjs(dayAfterStartOfWeek).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'pink',
  },
  {
    id: 3,
    title: '团队建设',
    start: \`\${startOfWeek} 00:00:00\`,
    end: dayjs(twoDaysAfter).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'orange',
  },
  {
    id: 4,
    title: '早间站会',
    start: \`\${startOfWeek} 09:00:00\`,
    end: \`\${startOfWeek} 09:30:00\`,
    color: 'blue',
  },
  {
    id: 5,
    title: '代码审查',
    start: \`\${dayAfterStartOfWeek} 14:00:00\`,
    end: \`\${dayAfterStartOfWeek} 15:00:00\`,
    color: 'violet',
  },
];

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));

  return (
    <WeekView
      date={date}
      onDateChange={setDate}
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
    <WeekView
      date={date}
      onDateChange={setDate}
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
  code,
};
