import { useState } from 'react';
import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Select, Stack } from '@react-ui/ui';
import { DayView, ScheduleEventData } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';

dayjs.extend(utc);
dayjs.extend(tz);

const timezones = ['UTC', 'America/New_York', 'Europe/Berlin', 'Asia/Kolkata', 'Asia/Tokyo'];

function getEvents(date: string): ScheduleEventData[] {
  return [
    {
      id: 1,
      title: '早间站会',
      start: `${date} 09:00:00`,
      end: `${date} 09:30:00`,
      color: 'blue',
    },
    {
      id: 2,
      title: '团队会议',
      start: `${date} 12:00:00`,
      end: `${date} 13:00:00`,
      color: 'teal',
    },
    {
      id: 3,
      title: '代码审查',
      start: `${date} 16:00:00`,
      end: `${date} 17:00:00`,
      color: 'grape',
    },
  ];
}

const code = `
import { useState } from 'react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Select, Stack } from '@react-ui/ui';
import { DayView } from '@react-ui/schedule';
import { getEvents } from './data';

dayjs.extend(utc);
dayjs.extend(timezone);

const timezones = ['UTC', 'America/New_York', 'Europe/Berlin', 'Asia/Kolkata', 'Asia/Tokyo'];

function Demo() {
  const [tz, setTz] = useState('UTC');

  // getCurrentTime is called on every tick, so the indicator keeps updating
  const getCurrentTime = () => dayjs('2024-01-15').tz(tz).format('YYYY-MM-DD HH:mm:ss');
  const currentDate = getCurrentTime().split(' ')[0];

  return (
    <Stack>
      <Select
        label="显示时区"
        data={timezones}
        value={tz}
        onChange={(value) => setTz(value!)}
        allowDeselect={false}
      />

      <DayView
        date={currentDate}
        events={getEvents(currentDate)}
        getCurrentTime={getCurrentTime}
        startScrollTime={dayjs(getCurrentTime()).subtract(2, 'hour').format('HH:mm:ss')}
        withCurrentTimeIndicator
        withCurrentTimeBubble
      />
    </Stack>
  );
}
`;

const dataCode = `
import dayjs from 'dayjs';
import { ScheduleEventData } from '@react-ui/schedule';

export function getEvents(date: string): ScheduleEventData[] {
  return [
    { id: 1, title: '早间站会', start: \`\${date} 09:00:00\`, end: \`\${date} 09:30:00\`, color: 'blue' },
    { id: 2, title: '团队会议', start: \`\${date} 12:00:00\`, end: \`\${date} 13:00:00\`, color: 'teal' },
    { id: 3, title: '代码审查', start: \`\${date} 16:00:00\`, end: \`\${date} 17:00:00\`, color: 'grape' },
  ];
}
`;

function Demo() {
  const [tz, setTz] = useState('UTC');

  const getCurrentTime = () => dayjs('2024-01-15').tz(tz).format('YYYY-MM-DD HH:mm:ss');
  const currentDate = getCurrentTime().split(' ')[0];

  return (
    <Stack>
      <Select
        label="显示时区"
        data={timezones}
        value={tz}
        onChange={(value) => setTz(value!)}
        allowDeselect={false}
      />

      <DayView
        date={currentDate}
        events={getEvents(currentDate)}
        getCurrentTime={getCurrentTime}
        startScrollTime={dayjs(getCurrentTime()).subtract(2, 'hour').format('HH:mm:ss')}
        withCurrentTimeIndicator
        withCurrentTimeBubble
      />
    </Stack>
  );
}

export const timezone: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
